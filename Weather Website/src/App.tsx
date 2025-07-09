import { Authenticated, Unauthenticated, useQuery } from "convex/react";
import { api } from "../convex/_generated/api";
import { SignInForm } from "./SignInForm";
import { SignOutButton } from "./SignOutButton";
import { Toaster } from "sonner";
import { WeatherDashboard } from "./WeatherDashboard";

export default function App() {
  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-blue-50 to-indigo-100">
      <header className="sticky top-0 z-10 bg-white/80 backdrop-blur-sm h-16 flex justify-between items-center border-b shadow-sm px-4">
        <div className="flex items-center gap-2">
          <span className="text-2xl">🌤️</span>
          <h2 className="text-xl font-semibold text-primary">Weather Hub</h2>
        </div>
        <SignOutButton />
      </header>
      <main className="flex-1 p-8">
        <Content />
      </main>
      <Toaster />
    </div>
  );
}

function Content() {
  const loggedInUser = useQuery(api.auth.loggedInUser);

  if (loggedInUser === undefined) {
    return (
      <div className="flex justify-center items-center min-h-[400px]">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto">
      <Authenticated>
        <WeatherDashboard />
      </Authenticated>
      
      <Unauthenticated>
        <div className="flex flex-col items-center justify-center min-h-[400px] gap-8">
          <div className="text-center">
            <h1 className="text-5xl font-bold text-primary mb-4">Weather Hub</h1>
            <p className="text-xl text-secondary mb-2">
              Get personalized weather reports delivered to your inbox
            </p>
            <p className="text-lg text-gray-600">
              Beautiful MJML email templates • Real-time weather data • Custom schedules
            </p>
          </div>
          
          <div className="w-full max-w-md">
            <SignInForm />
          </div>
        </div>
      </Unauthenticated>
    </div>
  );
}
