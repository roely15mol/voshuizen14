"use client";

import { useEffect, useState } from "react";

interface WeatherData {
  temperature: number;
  description: string;
  icon: string;
}

export function WeatherWidget() {
  const [weather, setWeather] = useState<WeatherData | null>(null);

  useEffect(() => {
    // Using wttr.in free API - no key needed
    fetch("https://wttr.in/Netherlands?format=j1")
      .then((res) => res.json())
      .then((data) => {
        const current = data.current_condition[0];
        setWeather({
          temperature: parseInt(current.temp_C),
          description: current.lang_nl?.[0]?.value || current.weatherDesc[0].value,
          icon: current.weatherCode,
        });
      })
      .catch(() => {
        // Silently fail - weather is not critical
      });
  }, []);

  if (!weather) return null;

  return (
    <div className="flex items-center gap-2">
      <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 15a4.5 4.5 0 0 0 4.5 4.5H18a3.75 3.75 0 0 0 1.332-7.257 3 3 0 0 0-3.758-3.848 5.25 5.25 0 0 0-10.233 2.33A4.502 4.502 0 0 0 2.25 15Z" />
      </svg>
      <span>{weather.temperature}°C</span>
      <span className="hidden sm:inline">· {weather.description}</span>
    </div>
  );
}
