"use client";

import { useEffect, useState } from "react";

export function HeroWeather() {
  const [weather, setWeather] = useState<{ temp: number; desc: string } | null>(null);

  useEffect(() => {
    fetch("https://wttr.in/Lieren,Netherlands?format=j1")
      .then((res) => res.json())
      .then((data) => {
        const current = data.current_condition[0];
        setWeather({
          temp: parseInt(current.temp_C),
          desc: current.lang_nl?.[0]?.value || current.weatherDesc[0].value,
        });
      })
      .catch(() => {});
  }, []);

  if (!weather) return null;

  return (
    <p className="text-gray-400 text-xs mt-3">
      {weather.temp}&deg;C &middot; {weather.desc}
    </p>
  );
}
