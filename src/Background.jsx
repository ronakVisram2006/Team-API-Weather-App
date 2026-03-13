function getTimeOfDay() {
  const hour = new Date().getHours();
  if (hour >= 5 && hour < 8) return "sunrise";
  if (hour >= 8 && hour < 18) return "day";
  if (hour >= 18 && hour < 21) return "sunset";
  return "night";
}

const weatherBackgrounds = {
  sunny:   { day: "/images/background/sunnyDayHiker.jpg",   sunrise: "/images/background/sunriseImage.jpg", sunset: "/images/background/rainySunsetHiker.jpg", night: "/images/background/clearNightHiker.jpg" },
  rainy:   { day: "/images/background/rainyDayhiker.jpg",   sunrise: "/images/background/rainySunriseHiker.jpg",   sunset: "/images/background/rainySunsetHiker.jpg",  night: "/images/background/rainyNightHiker.jpg" },
  cloudy:  { day: "/images/background/cloudyDayHiker.jpg",  sunrise: "/images/background/cloudySunriseHiker.jpg",  sunset: "/images/background/cloudySunsetHiker.jpg", night: "/images/background/cloudyNightHiker.jpg" },
  stormy:  { day: "/images/background/stormyDayHiker.jpg",  sunrise: "/images/background/stormySunriseHiker.jpg",  sunset: "/images/background/stormySunsetHiker.jpg", night: "/images/background/stormyNightHiker.jpg" },
  snowy:   { day: "/images/background/snowyDayHiker.jpg",   sunrise: "/images/background/snowySunriseHiker.jpg",   sunset: "/images/background/snowySunsetHiker.jpg",  night: "/images/background/snowyNightHiker.jpg" },
  foggy:   { day: "/images/background/foggyDayHiker.jpg",   sunrise: "/images/background/foggySunriseHiker.jpg",   sunset: "/images/background/foggySunsetHiker.jpg",  night: "/images/background/foggyNightHiker.jpg" },
};

function Background({ condition }) {
  const timeOfDay = getTimeOfDay();
  const bg = weatherBackgrounds[condition]?.[timeOfDay] ?? "/images/background/sunnyNightHiker.jpg"; 

  return (
    <img id="background" src={bg} alt="Background" className="background" />
  );
}

export default Background;