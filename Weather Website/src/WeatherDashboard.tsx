import { useState } from "react";
import { useMutation, useQuery, useAction } from "convex/react";
import { api } from "../convex/_generated/api";
import { toast } from "sonner";
import { EmailPreview } from "./EmailPreview";

export function WeatherDashboard() {
  const [location, setLocation] = useState("New York");
  const [emailLocation, setEmailLocation] = useState("New York");
  const [email, setEmail] = useState("");
  const [frequency, setFrequency] = useState("daily");
  const [emailPreview, setEmailPreview] = useState<any>(null);
  
  const getCurrentWeather = useMutation(api.weather.getCurrentWeather);
  const subscribeToEmails = useMutation(api.weather.subscribeToWeatherEmails);
  const sendWeatherEmail = useAction(api.weather.sendWeatherEmail);
  
  const weatherHistory = useQuery(api.weather.getWeatherHistory) || [];
  const emailSubscriptions = useQuery(api.weather.getEmailSubscriptions) || [];
  const user = useQuery(api.auth.loggedInUser);

  const handleGetWeather = async () => {
    try {
      const weather = await getCurrentWeather({ location });
      toast.success(`Weather updated for ${location}`);
    } catch (error) {
      toast.error("Failed to get weather data");
    }
  };

  const handleSubscribe = async () => {
    if (!email) {
      toast.error("Please enter an email address");
      return;
    }
    
    try {
      await subscribeToEmails({
        email,
        location: emailLocation,
        frequency,
      });
      toast.success("Successfully subscribed to weather emails!");
      setEmail("");
    } catch (error) {
      toast.error("Failed to subscribe");
    }
  };

  const handleSendTestEmail = async (subscriptionId: any) => {
    try {
      const result = await sendWeatherEmail({ subscriptionId });
      toast.success("Test email generated! Check the preview below.");
    } catch (error) {
      toast.error("Failed to send test email");
    }
  };

  const handlePreviewEmail = async (subscriptionId: any) => {
    try {
      const result = await sendWeatherEmail({ subscriptionId });
      // The result will contain the MJML template data
      setEmailPreview(result);
      toast.success("Email preview generated!");
    } catch (error) {
      toast.error("Failed to generate preview");
    }
  };

  const latestWeather = weatherHistory[0];

  return (
    <div className="space-y-8">
      {/* Welcome Section */}
      <div className="text-center">
        <h1 className="text-4xl font-bold text-primary mb-2">
          Welcome back, {user?.email?.split('@')[0]}! 🌤️
        </h1>
        <p className="text-lg text-gray-600">
          Get weather updates and beautiful email reports
        </p>
      </div>

      {/* Current Weather Card */}
      {latestWeather && (
        <div className="bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl p-6 text-white shadow-lg">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-bold">{latestWeather.location}</h2>
              <p className="text-lg opacity-90">{latestWeather.condition}</p>
            </div>
            <div className="text-right">
              <div className="text-5xl font-bold">{latestWeather.temperature}°C</div>
              <div className="text-6xl">{latestWeather.icon}</div>
            </div>
          </div>
          <div className="mt-4 grid grid-cols-2 gap-4 bg-white/10 rounded-lg p-4">
            <div className="flex items-center gap-2">
              <span>💧</span>
              <span>Humidity: {latestWeather.humidity}%</span>
            </div>
            <div className="flex items-center gap-2">
              <span>💨</span>
              <span>Wind: {latestWeather.windSpeed} km/h</span>
            </div>
          </div>
        </div>
      )}

      <div className="grid md:grid-cols-2 gap-8">
        {/* Get Weather Section */}
        <div className="bg-white rounded-xl p-6 shadow-lg">
          <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
            <span>🌍</span>
            Get Weather
          </h2>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Location
              </label>
              <input
                type="text"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Enter city name"
              />
            </div>
            <button
              onClick={handleGetWeather}
              className="w-full bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition-colors font-medium"
            >
              Get Current Weather
            </button>
          </div>
          
          <div className="mt-6 space-y-3">
            <p className="text-sm text-gray-600 bg-yellow-50 p-3 rounded-lg border border-yellow-200">
              <strong>Note:</strong> Currently showing example weather data for demonstration. 
              Ready to integrate with a real weather API!
            </p>
            <div className="text-sm text-blue-600 bg-blue-50 p-3 rounded-lg border border-blue-200">
              <strong>MJML Features:</strong> Beautiful responsive email templates with gradients, 
              custom styling, and perfect cross-client compatibility.
            </div>
          </div>
        </div>

        {/* Email Subscription Section */}
        <div className="bg-white rounded-xl p-6 shadow-lg">
          <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
            <span>📧</span>
            Email Reports
          </h2>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Email Address
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="your@email.com"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Location
              </label>
              <input
                type="text"
                value={emailLocation}
                onChange={(e) => setEmailLocation(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="City for weather reports"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Frequency
              </label>
              <select
                value={frequency}
                onChange={(e) => setFrequency(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="daily">Daily</option>
                <option value="weekly">Weekly</option>
              </select>
            </div>
            <button
              onClick={handleSubscribe}
              className="w-full bg-green-500 text-white py-2 px-4 rounded-lg hover:bg-green-600 transition-colors font-medium"
            >
              Subscribe to Weather Emails
            </button>
          </div>
        </div>
      </div>

      {/* Email Subscriptions */}
      {emailSubscriptions.length > 0 && (
        <div className="bg-white rounded-xl p-6 shadow-lg">
          <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
            <span>📬</span>
            Your Subscriptions
          </h2>
          <div className="space-y-3">
            {emailSubscriptions.map((sub) => (
              <div key={sub._id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                <div>
                  <p className="font-medium">{sub.email}</p>
                  <p className="text-sm text-gray-600">
                    {sub.location} • {sub.frequency} • {sub.isActive ? "Active" : "Inactive"}
                  </p>
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={() => handlePreviewEmail(sub._id)}
                    className="bg-purple-500 text-white px-3 py-2 rounded-lg hover:bg-purple-600 transition-colors text-sm"
                  >
                    Preview Email
                  </button>
                  <button
                    onClick={() => handleSendTestEmail(sub._id)}
                    className="bg-blue-500 text-white px-3 py-2 rounded-lg hover:bg-blue-600 transition-colors text-sm"
                  >
                    Test Email
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      <EmailPreview 
        emailPreview={emailPreview} 
        onClose={() => setEmailPreview(null)} 
      />

      {/* Weather History */}
      {weatherHistory.length > 0 && (
        <div className="bg-white rounded-xl p-6 shadow-lg">
          <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
            <span>📊</span>
            Recent Weather
          </h2>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {weatherHistory.slice(0, 6).map((weather) => (
              <div key={weather._id} className="p-4 border border-gray-200 rounded-lg">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="font-medium">{weather.location}</h3>
                  <span className="text-2xl">{weather.icon}</span>
                </div>
                <p className="text-2xl font-bold text-blue-600">{weather.temperature}°C</p>
                <p className="text-sm text-gray-600">{weather.condition}</p>
                <p className="text-xs text-gray-500 mt-2">
                  {new Date(weather.timestamp).toLocaleString()}
                </p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
