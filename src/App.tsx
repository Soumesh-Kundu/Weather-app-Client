import { useEffect, useState } from "react";
import { io } from "socket.io-client";
import { GeoLocation, WeatherData, ErrorMessage } from "./index";
import { ToastContainer, toast } from "react-toastify";
import WeatherDashboard from "./components/WeatherDashboard";
import Loader from "./components/Loader";
import { metronome, bouncy } from "ldrs";
import { AnimatePresence } from "framer-motion";
import Error from "./components/Error";
import "react-toastify/dist/ReactToastify.css";
//registering ldrs loaders
metronome.register();
bouncy.register();


function App() {
  //intial state for tracking geoLocation
  const [geoLocation, setLocation] = useState<GeoLocation>({
    latitude: 0,
    longitude: 0,
  });
  //intialization of Weather Data state
  const [weatherData, setWeatherData] = useState<WeatherData>(
    {} as unknown as WeatherData
  );
  //initialization if server error
  const [error, setError] = useState<ErrorMessage>({ has: false });
  const socket = io(import.meta.env.VITE_BASE_URL);
  //function for reposible for tracking geoLocations
  function getLocations() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        setLocation((_) => ({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
        }));
      });
    }
  }
  let retryCount=0
  //take recente weather data
  socket.on("update", (data) => {
    setWeatherData(data);
  });
  //evernt triggerd if it faileds to fetch recent data
  socket.on("exception", (data) => {
    if (data?.failed_to_fetch) {
      retryCount++
      if (retryCount < 4) {//3 retry to fetch data otherwise call server error to show error section
        toast.error("Couldn't get the latest Weather update. retrying...");
        console.log(retryCount)
        setTimeout(() => {
          socket.emit("current", {
            latitude: geoLocation.latitude,
            longitude: geoLocation.longitude,
          });
        }, (retryCount+1) * 3000);
      } else {
        setError({ has: true });
        toast.error("Server is not responding, Please refresh or try again later.");
      }
    }
  });
  //taking geolocation of user
  useEffect(() => {
    getLocations();
  }, []);
  //calling intal event to retrive weather updates each and every 30 seconds
  useEffect(() => {
    if (!geoLocation.latitude || !geoLocation.longitude) return;
    socket.emit("current", {
      latitude: geoLocation.latitude,
      longitude: geoLocation.longitude,
    });
  }, [geoLocation]);
  return (
    <>
      <div className="h-screen text-white bg-gradient">
        <AnimatePresence>
          {Object.keys(weatherData).length > 0 ? (//if no weather data is available show loader
            <WeatherDashboard weatherData={weatherData} />
          ) : !error.has ? (//if error occers after 3 retry show error
            <Loader />
          ) : (
            <Error />
          )}
        </AnimatePresence>
        <ToastContainer theme="colored" position="bottom-right" />
      </div>
    </>
  );
}

export default App;
