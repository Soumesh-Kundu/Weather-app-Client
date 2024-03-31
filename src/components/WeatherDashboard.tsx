import { WeatherData } from "../index";
import { FaLocationDot } from "react-icons/fa6";
import { IoMdSunny } from "react-icons/io";
import { FaMoon } from "react-icons/fa";
import { MdWaterDrop } from "react-icons/md";
import { FaWind } from "react-icons/fa";
import { GiWindsock } from "react-icons/gi";
import { PiThermometerHotFill } from "react-icons/pi";
import { BsCloudSunFill } from "react-icons/bs";
import { BsThermometerSun } from "react-icons/bs";
import { WiSunrise } from "react-icons/wi";
import { WiSunset } from "react-icons/wi";
import { GiWindSlap } from "react-icons/gi";
import { motion } from "framer-motion";
//list to get the appropiate day
const days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];
//animations state for weather section
const WeatherInitial = { opacity: 0, x: -50 };
const WeatherAnimate = { opacity: 1, x: 0 };
const transitonMotion = {
  duration: 0.4,
};

//animation states for details section
const detailsInitial = { opacity: 0, y: -30 };
const detailsAnimate = { opacity: 1, y: 0 };

export default function WeatherDashboard({
  weatherData,
}: {
  weatherData: WeatherData;
}) {
  const time = new Date(weatherData?.location?.localtime);
  return (
    <>
      {/* weather data section */}
      <div className="h-full max-w-screen-xl py-10 mx-auto sm:px-6">
        <div className="grid gap-3 h-1/4 grid-template sm:gap-0">
          <motion.div
            initial={WeatherInitial}
            transition={transitonMotion}
            animate={WeatherAnimate}
            className="flex flex-col items-center justify-end grid-location justify-self-center"
          >
            <div className="flex items-center gap-3 text-2xl ">
              <FaLocationDot />{" "}
              <p className="font-semibold">{weatherData?.location?.name}</p>
            </div>
            <div className="text-xl">
              {weatherData?.location.region}, {weatherData?.location?.country}
            </div>
            <div className="font-medium">
              {days[time.getDay()]},{" "}
              <span >{time.toDateString().slice(4)}</span>
            </div>
          </motion.div>
          <motion.div
            initial={WeatherInitial}
            animate={WeatherAnimate}
            className="content-center h-full md:content-end grid-temperature justify-self-center"
          >
            <div className="flex items-center gap-2">
              {
                <img
                  className=""
                  src={`https://${weatherData?.current?.condition?.icon.slice(
                    2
                  )}`}
                  alt="weather logo"
                />
              }
              <span className="text-5xl">
                {weatherData?.current?.temp_c}&#176;c
              </span>
            </div>
            <div className="flex justify-center">
              <span>
                Feels like: {weatherData?.current?.feelslike_c}&#176;c
              </span>
            </div>
          </motion.div>
          <motion.div
            initial={WeatherInitial}
            animate={WeatherAnimate}
            className="flex content-start px-20 grid-condtion justify-self-center"
          >
            <div>
              <span className="flex items-center h-auto gap-1 mt-0 text-lg font-medium sm:mt-2">
                {weatherData?.current && weatherData?.current?.is_day ? (
                  <IoMdSunny className="animate-spin spin-duration" />
                ) : (
                  <FaMoon />
                )}
                {weatherData?.current?.condition?.text}
              </span>
            </div>
          </motion.div>
        </div>
        {/* details forecast section */}
        {/* temperature */}
        <div className="flex flex-col max-w-3xl gap-4 px-3 py-5 mx-5 mt-20 font-semibold text-black bg-white rounded-lg shadow-md sm:gap-3 sm:py-3 sm:mx-auto sm:mt-10">
          <motion.div
            initial={detailsInitial}
            animate={detailsAnimate}
            className="flex justify-between px-5"
          >
            <p className="flex items-center gap-2">
              Temperature{" "}
              <BsThermometerSun className="text-lg text-yellow-600" />
            </p>{" "}
            <span>
              {weatherData?.forecast?.max_temp_c} ~{" "}
              {weatherData?.forecast?.min_temp_c} &#176;c
            </span>
          </motion.div>
          {/* Feels like */}
          <motion.div
            initial={detailsInitial}
            animate={detailsAnimate}
            transition={{ delay: 0.1 }}
            className="flex justify-between px-5"
          >
            <p className="flex items-center gap-2">
              Feels Like{" "}
              <PiThermometerHotFill className="text-lg text-orange-500" />
            </p>{" "}
            <span>{weatherData?.current?.feelslike_c}&#176;c </span>
          </motion.div>
          {/* Avg. temperature */}
          <motion.div
            initial={detailsInitial}
            animate={detailsAnimate}
            transition={{ delay: 0.2 }}
            className="flex justify-between px-5"
          >
            <p className="flex items-center gap-2">Average Temperature </p>{" "}
            <span>{weatherData?.forecast?.avg_temp_c}&#176;c </span>
          </motion.div>
          {/* Humidity */}
          <motion.div
            initial={detailsInitial}
            animate={detailsAnimate}
            transition={{ delay: 0.3 }}
            className="flex justify-between px-5"
          >
            <p className="flex items-center gap-2">
              Humidity <MdWaterDrop className="text-lg text-blue-600" />
            </p>{" "}
            <span>{weatherData?.current?.humidity} %</span>
          </motion.div>
          {/*Current Wind speed */}
          <motion.div
            initial={detailsInitial}
            animate={detailsAnimate}
            transition={{ delay: 0.4 }}
            className="flex justify-between px-5"
          >
            <p className="flex items-center gap-2">
              Wind Speed <FaWind className="text-lg text-gray-500" />
            </p>{" "}
            <span>{weatherData?.current?.wind_kph} km/h</span>
          </motion.div>
          {/* Max wind speed */}
          <motion.div
            initial={detailsInitial}
            animate={detailsAnimate}
            transition={{ delay: 0.5 }}
            className="flex justify-between px-5"
          >
            <p className="flex items-center gap-2">
              Max Wind Speed <GiWindSlap className="text-lg text-gray-800" />
            </p>{" "}
            <span>{weatherData?.forecast?.maxwind_kph} km/h</span>
          </motion.div>
          {/* wind direction */}
          <motion.div
            initial={detailsInitial}
            animate={detailsAnimate}
            transition={{ delay: 0.6 }}
            className="flex justify-between px-5"
          >
            <p className="flex items-center gap-2">
              Wind Direction <GiWindsock className="text-lg text-amber-500" />
            </p>{" "}
            <span>{weatherData?.current?.wind_dir} </span>
          </motion.div>
          {/* Cloudness */}
          <motion.div
            initial={detailsInitial}
            animate={detailsAnimate}
            transition={{ delay: 0.7 }}
            className="flex justify-between px-5"
          >
            <p className="flex items-center gap-2">
              Cloud <BsCloudSunFill className="text-lg text-gray-500" />
            </p>{" "}
            <span>{weatherData?.current?.cloud} % </span>
          </motion.div>
          {/* today sunrise time */}
          <motion.div
            initial={detailsInitial}
            animate={detailsAnimate}
            transition={{ delay: 0.8 }}
            className="flex justify-between px-5"
          >
            <p className="flex items-center gap-2">
              Sunrise <WiSunrise className="text-xl text-amber-500" />
            </p>{" "}
            <span>{weatherData?.forecast?.sunrise} </span>
          </motion.div>
          {/* today sunset time */}
          <motion.div
            initial={detailsInitial}
            animate={detailsAnimate}
            transition={{ delay: 0.9 }}
            className="flex justify-between px-5"
          >
            <p className="flex items-center gap-2">
              Sunset <WiSunset className="text-xl text-orange-600" />
            </p>{" "}
            <span>{weatherData?.forecast?.sunset} </span>
          </motion.div>
        </div>
      </div>
    </>
  );
}
