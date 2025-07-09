import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";
import { authTables } from "@convex-dev/auth/server";

const applicationTables = {
  weatherReports: defineTable({
    userId: v.id("users"),
    location: v.string(),
    temperature: v.number(),
    condition: v.string(),
    humidity: v.number(),
    windSpeed: v.number(),
    icon: v.string(),
    timestamp: v.number(),
  }).index("by_user", ["userId"]),
  
  emailSubscriptions: defineTable({
    userId: v.id("users"),
    email: v.string(),
    location: v.string(),
    frequency: v.string(), // "daily", "weekly"
    isActive: v.boolean(),
  }).index("by_user", ["userId"])
    .index("by_email", ["email"]),
};

export default defineSchema({
  ...authTables,
  ...applicationTables,
});
