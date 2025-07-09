# Weather Website using MJML Email Templates

## Features Built

- 🌤️ **Weather Dashboard**: Get current weather for any location (currently with example data).

- 📧 **MJML Email Templates**: Beautiful, responsive email templates with:
  - Gradient backgrounds and custom styling
  - Weather data display with icons
  - Humidity and wind speed details
  - Professional email layout

- 📬 **Email Subscriptions**: Users can subscribe to daily/weekly weather reports.

- 👀 **Email Preview**: Live preview of compiled MJML templates showing both HTML output and MJML source.

- 📊 **Weather History**: Track previous weather queries.


## Technical Implementation

- **MJML Integration**: Using MJML library with "use node" directive for Node.js runtime.
  
- **Convex Backend**: Real-time database with user authentication.
  
- **React Frontend**: Modern UI with Tailwind CSS.
  
- **Email Templates**: Professional weather report emails with responsive design.


## Next Steps

The app is ready for real weather data integration. To complete it, you would:

- Set up a weather API (like OpenWeatherMap, WeatherAPI, or AccuWeather).
  
- Add the API key as an environment variable.
  
- Replace the example data with real API calls.
  
- Implement actual email sending (using Resend, SendGrid, etc.).

The MJML templates are fully functional and will generate beautiful, cross-client compatible emails. You can test the email preview feature by:

- Signing in to the app.
  
- Subscribing to weather emails for a location.
  
- Clicking "Preview Email" to see the compiled MJML template.
  
- Viewing both the rendered HTML and MJML source code.

The weather data shown is example data for demonstration purposes, but the email templates and infrastructure are production-ready!
