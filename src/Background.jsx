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

function Background({ condition, selectedHour, weather }) {
  const getTimeOfDay = () => {
    const now = selectedHour
      ? new Date(selectedHour.dt * 1000)
      : new Date();

    const nowTs = now.getTime() / 1000;
    const timezone = weather?.city?.timezone ?? 0;

    const sunrise = weather?.city?.sunrise;
    const sunset = weather?.city?.sunset;

    if (sunrise && sunset) {
      const localNow = nowTs + timezone;
      const localSunrise = sunrise + timezone;
      const localSunset = sunset + timezone;

      const secondsInDay = 86400;
      const nowTod = ((localNow % secondsInDay) + secondsInDay) % secondsInDay;
      const sunriseTod = ((localSunrise % secondsInDay) + secondsInDay) % secondsInDay;
      const sunsetTod = ((localSunset % secondsInDay) + secondsInDay) % secondsInDay;
          
      return nowTod >= sunriseTod && nowTod < sunsetTod ? "day" : "night";

    }

    const hour = now.getHours();
    return hour >= 5 && hour < 18 ? "day" : "night";
  };

  const timeOfDay = getTimeOfDay();
  const bg = weatherBackgrounds[condition]?.[timeOfDay] ?? "/images/background/clearNightHiker.jpg";

  return (
    <img id="background" src={bg} alt="Background" className="background" />
  );
}

export default Background;