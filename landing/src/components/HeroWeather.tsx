"use client";

import { useEffect, useState } from "react";

export function HeroWeather({ accent }: { accent: string }) {
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
    <div className="flex items-center justify-center gap-3 text-white/40">
      <span className="w-8 h-px" style={{ background: accent, opacity: 0.4 }} />
      <p className="text-xs tracking-wide">
        {weather.temp}&deg;C &middot; {weather.desc}
      </p>
      <span className="w-8 h-px" style={{ background: accent, opacity: 0.4 }} />
    </div>
  );
}
