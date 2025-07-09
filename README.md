# Weather Website using MJML Email Templates
  
This is a project built with [Chef](https://chef.convex.dev) using [Convex](https://convex.dev) as its backend.
 You can find docs about Chef with useful information like how to deploy to production [here](https://docs.convex.dev/chef).
  
This project is connected to the Convex deployment named [`admired-stingray-683`](https://dashboard.convex.dev/d/admired-stingray-683).
  
## Project structure
  
The frontend code is in the `app` directory and is built with [Vite](https://vitejs.dev/).
  
The backend code is in the `convex` directory.
  
`npm run dev` will start the frontend and backend servers.

## App authentication

Chef apps use [Convex Auth](https://auth.convex.dev/) with Anonymous auth for easy sign in. You may wish to change this before deploying your app.

## Developing and deploying your app

Check out the [Convex docs](https://docs.convex.dev/) for more information on how to develop with Convex.
* If you're new to Convex, the [Overview](https://docs.convex.dev/understanding/) is a good place to start
* Check out the [Hosting and Deployment](https://docs.convex.dev/production/) docs for how to deploy your app
* Read the [Best Practices](https://docs.convex.dev/understanding/best-practices/) guide for tips on how to improve you app further

## HTTP API

User-defined http routes are defined in the `convex/router.ts` file. We split these routes into a separate file from `convex/http.ts` to allow us to prevent the LLM from modifying the authentication routes.

##Features Built:
🌤️ Weather Dashboard - Get current weather for any location (currently with example data)

📧 MJML Email Templates - Beautiful, responsive email templates with:

Gradient backgrounds and custom styling
Weather data display with icons
Humidity and wind speed details
Professional email layout
📬 Email Subscriptions - Users can subscribe to daily/weekly weather reports

👀 Email Preview - Live preview of compiled MJML templates showing both HTML output and MJML source

📊 Weather History - Track previous weather queries

Technical Implementation:
MJML Integration: Using MJML library with "use node" directive for Node.js runtime
Convex Backend: Real-time database with user authentication
React Frontend: Modern UI with Tailwind CSS
Email Templates: Professional weather report emails with responsive design
Next Steps:
The app is ready for real weather data integration. To complete it, you would:

Set up a weather API (like OpenWeatherMap, WeatherAPI, or AccuWeather)
Add the API key as an environment variable
Replace the example data with real API calls
Implement actual email sending (using Resend, SendGrid, etc.)
The MJML templates are fully functional and will generate beautiful, cross-client compatible emails. You can test the email preview feature by:

Sign in to the app
Subscribe to weather emails for a location
Click "Preview Email" to see the compiled MJML template
View both the rendered HTML and MJML source code
The weather data shown is example data for demonstration purposes, but the email templates and infrastructure are production-ready!
