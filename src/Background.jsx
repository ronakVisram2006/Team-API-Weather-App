function getTimeOfDay() {
  const hour = new Date().getHours();
  if (hour >= 5 && hour < 8) return "sunrise";
  if (hour >= 8 && hour < 18) return "day";
  if (hour >= 18 && hour < 21) return "sunset";
  return "night";
}

const weatherBackgrounds = {
  sunny:   { day: "/images/background/sunnyDayHiker.jpg",   sunrise: "/images/background/sunriseImage.jpg", sunset: "/images/background/trial.jpeg", night: "/images/background/trial.jpeg" },
  rainy:   { day: "/images/background/rainyDayhiker.jpg",   sunrise: "/images/background/rainySunriseHiker.jpg",   sunset: "/images/background/trial.jpeg",  night: "/images/background/sunnyDayHiker.jpg" },
  cloudy:  { day: "/images/background/cloudyDayHiker.jpg",  sunrise: "/images/background/cloudySunriseHiker.jpg",  sunset: "/images/background/trial.jpeg", night: "/images/background/trial.jpeg" },
  stormy:  { day: "/images/background/stormyDayHiker.jpg",  sunrise: "/images/background/stormySunriseHiker.jpg",  sunset: "/images/background/trial.jpeg", night: "/images/background/trial.jpeg" },
  snowy:   { day: "/images/background/snowyDayHiker.jpg",   sunrise: "/images/background/snowySunriseHiker.jpg",   sunset: "/images/background/trial.jpeg",  night: "/images/background/trial.jpeg" },
  foggy:   { day: "/images/background/foggyDayHiker.jpg",   sunrise: "/images/background/foggySunriseHiker.jpg",   sunset: "/images/background/trial.jpeg",  night: "/images/background/trial.jpeg" },
};

function Background({ condition }) {
  const timeOfDay = getTimeOfDay();
  const bg = weatherBackgrounds[condition]?.[timeOfDay] ?? "/images/background/sunriseImage.jpg";

  return (
    <img id="background" src={bg} alt="Background" className="background" />
  );
}

export default Background;