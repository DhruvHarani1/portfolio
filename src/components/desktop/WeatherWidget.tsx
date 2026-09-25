"use client";

import { useEffect, useState } from "react";

// Ahmedabad — where Dhruv is based. Real visitor geolocation isn't
// requested here; that permission prompt is more than a portfolio
// widget should ask for.
const LAT = 23.0225;
const LON = 72.5714;

interface WeatherData {
  temperature: number;
  code: number;
}

function describeCode(code: number): { label: string; icon: string } {
  if (code === 0) return { label: "Clear sky", icon: "☀️" };
  if (code <= 2) return { label: "Partly cloudy", icon: "🌤️" };
  if (code === 3) return { label: "Overcast", icon: "☁️" };
  if (code <= 48) return { label: "Foggy", icon: "🌫️" };
  if (code <= 57) return { label: "Drizzle", icon: "🌦️" };
  if (code <= 67) return { label: "Rain", icon: "🌧️" };
  if (code <= 77) return { label: "Snow", icon: "🌨️" };
  if (code <= 82) return { label: "Rain showers", icon: "🌦️" };
  if (code <= 99) return { label: "Thunderstorm", icon: "⛈️" };
  return { label: "—", icon: "🌡️" };
}

export default function WeatherWidget() {
  const [data, setData] = useState<WeatherData | null>(null);
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    let cancelled = false;
    fetch(
      `https://api.open-meteo.com/v1/forecast?latitude=${LAT}&longitude=${LON}&current=temperature_2m,weather_code&timezone=auto`
    )
      .then((res) => (res.ok ? res.json() : Promise.reject()))
      .then((json) => {
        if (cancelled) return;
        setData({
          temperature: Math.round(json.current.temperature_2m),
          code: json.current.weather_code,
        });
      })
      .catch(() => !cancelled && setFailed(true));
    return () => {
      cancelled = true;
    };
  }, []);

  if (failed || !data) return null;

  const { label, icon } = describeCode(data.code);

  return (
    <div className="flex items-center gap-2.5 rounded-xl border border-white/10 bg-black/25 px-3.5 py-2.5 text-white backdrop-blur-md">
      <span className="text-2xl leading-none">{icon}</span>
      <div>
        <p className="text-lg font-semibold leading-none">{data.temperature}°C</p>
        <p className="mt-0.5 text-[11px] text-white/70">Ahmedabad · {label}</p>
      </div>
    </div>
  );
}
