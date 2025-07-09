import { query, mutation, action, internalQuery } from "./_generated/server";
import { v } from "convex/values";
import { getAuthUserId } from "@convex-dev/auth/server";
import { api, internal } from "./_generated/api";

export const getCurrentWeather = mutation({
  args: { location: v.string() },
  handler: async (ctx, args) => {
    const userId = await getAuthUserId(ctx);
    if (!userId) {
      throw new Error("Not authenticated");
    }

    // For now, return example data - we'll replace this with real API data later
    const exampleWeather = {
      location: args.location,
      temperature: Math.floor(Math.random() * 30) + 10, // 10-40°C
      condition: ["Sunny", "Cloudy", "Rainy", "Partly Cloudy"][Math.floor(Math.random() * 4)],
      humidity: Math.floor(Math.random() * 40) + 40, // 40-80%
      windSpeed: Math.floor(Math.random() * 20) + 5, // 5-25 km/h
      icon: "☀️",
      timestamp: Date.now(),
    };

    // Save to database
    await ctx.db.insert("weatherReports", {
      userId,
      ...exampleWeather,
    });

    return exampleWeather;
  },
});

export const getWeatherHistory = query({
  args: {},
  handler: async (ctx) => {
    const userId = await getAuthUserId(ctx);
    if (!userId) {
      return [];
    }

    return await ctx.db
      .query("weatherReports")
      .withIndex("by_user", (q) => q.eq("userId", userId))
      .order("desc")
      .take(10);
  },
});

export const subscribeToWeatherEmails = mutation({
  args: {
    email: v.string(),
    location: v.string(),
    frequency: v.string(),
  },
  handler: async (ctx, args) => {
    const userId = await getAuthUserId(ctx);
    if (!userId) {
      throw new Error("Not authenticated");
    }

    // Check if subscription already exists
    const existing = await ctx.db
      .query("emailSubscriptions")
      .withIndex("by_user", (q) => q.eq("userId", userId))
      .filter((q) => q.eq(q.field("location"), args.location))
      .first();

    if (existing) {
      // Update existing subscription
      await ctx.db.patch(existing._id, {
        email: args.email,
        frequency: args.frequency,
        isActive: true,
      });
      return existing._id;
    } else {
      // Create new subscription
      return await ctx.db.insert("emailSubscriptions", {
        userId,
        email: args.email,
        location: args.location,
        frequency: args.frequency,
        isActive: true,
      });
    }
  },
});

export const getEmailSubscriptions = query({
  args: {},
  handler: async (ctx) => {
    const userId = await getAuthUserId(ctx);
    if (!userId) {
      return [];
    }

    return await ctx.db
      .query("emailSubscriptions")
      .withIndex("by_user", (q) => q.eq("userId", userId))
      .collect();
  },
});

export const sendWeatherEmail = action({
  args: {
    subscriptionId: v.id("emailSubscriptions"),
  },
  handler: async (ctx, args): Promise<{ success: boolean; email: string; mjmlData: any }> => {
    const subscription: any = await ctx.runQuery(internal.weather.getSubscription, {
      subscriptionId: args.subscriptionId,
    });

    if (!subscription) {
      throw new Error("Subscription not found");
    }

    // Get current weather for the location
    const weather: any = await ctx.runMutation(api.weather.getCurrentWeather, {
      location: subscription.location,
    });

    // Generate MJML email template
    const mjmlTemplate: any = await ctx.runAction(internal.mjmlActions.generateWeatherEmailTemplate, {
      weather,
      location: subscription.location,
    });

    // Send email (we'll implement this after setting up the email service)
    console.log("Would send email to:", subscription.email);
    console.log("MJML Template:", mjmlTemplate);

    return { 
      success: true, 
      email: subscription.email,
      mjmlData: mjmlTemplate 
    };
  },
});

export const getSubscription = internalQuery({
  args: { subscriptionId: v.id("emailSubscriptions") },
  handler: async (ctx, args) => {
    return await ctx.db.get(args.subscriptionId);
  },
});
