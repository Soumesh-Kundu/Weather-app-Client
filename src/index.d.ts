//custom types
export type GeoLocation = {
  latitude: number;
  longitude: number;
};
export type WeatherData = {
  location: {
    lat: number;
    lon: number;
    name: string;
    country: string;
    localtime: string;
    region: string;
  };
  current: {
    temp_c: number;
    condition: {
      text: string;
      icon: string;
    };
    last_updated: string;
    is_day: 0 | 1;
    feelslike_c: number;
    humidity: number;
    wind_kph: number;
    wind_dir: string;
    uv: number;
    cloud:number,
    gust_kph:number
  },
  forecast:{
    max_temp_c:number,
    min_temp_c:number,
    avg_temp_c:number,
    maxwind_kph:number,
    sunrise:string,
    sunset:string,
  }
};
export type ErrorMessage={
  has:boolean
}