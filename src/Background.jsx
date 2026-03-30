function getTimeOfDay() {
  const hour = new Date().getHours();
  if (hour >= 5 && hour < 18) return "day";
  return "night";
}

const weatherBackgrounds = {
  sunny:   { day: "/images/background/sunnyDayHiker.jpg", night: "/images/background/clearNightHiker.jpg" },
  rainy:   { day: "/images/background/rainyDayHiker.jpg",  night: "/images/background/rainyNightHiker.jpg" },
  cloudy:  { day: "/images/background/cloudyDayHiker.jpg",  night: "/images/background/cloudyNightHiker.jpg" },
  stormy:  { day: "/images/background/stormyDayHiker.jpg", night: "/images/background/stormyNightHiker.jpg" },
  snowy:   { day: "/images/background/snowyDayHiker.jpg",night: "/images/background/snowyNightHiker.jpg" },
  foggy:   { day: "/images/background/foggyDayHiker.jpg", night: "/images/background/foggyNightHiker.jpg" },
};

function Background({ condition }) {
  const timeOfDay = getTimeOfDay();
  const bg = weatherBackgrounds[condition]?.[timeOfDay] ?? "/images/background/clearNightHiker.jpg"; 

  return (
    <img id="background" src={bg} alt="Background" className="background" />
  );
}

export default Background;