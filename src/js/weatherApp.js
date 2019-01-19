import React from "react";
import regeneratorRuntime from "regenerator-runtime";
import api from "./api";

class WeatherApp extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      toggle: "",
      city: "",
      temp: "",
      description: "",
      icon: ""
    };
    this.dataRecievedFunc = this.dataRecievedFunc.bind(this);
    this.toggleC_F = this.toggleC_F.bind(this);
  }
  dataRecievedFunc(city, temp, description, icon) {
    this.setState({
      toggle: "° C",
      city: city,
      temp: temp,
      description: description,
      icon: icon
    });
  }
  toggleC_F() {
    const newTemp = this.state.temp;
    const fTemp = Math.round((newTemp * (9/5)) + 32);
    const cTemp = Math.round((newTemp - 32) * (5/9));
    if (this.state.toggle === "° C") {
      this.setState({
        toggle: "° F",
        temp: fTemp
      });
    } else {
      this.setState({
        toggle: "° C",
        temp: cTemp
      });
    } 
  }
  componentDidMount() {
    const dataRecieved = this.dataRecievedFunc;
    const getWeatherAppData = (function() {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(success);
      } else {
        alert("Unfortunately Geolocation is not supported by your browser");
        return;
      }
      function success(position) {
        const lat = position.coords.latitude;
        const long = position.coords.longitude;
        const weatherLocation = "https://fcc-weather-api.glitch.me/api/current?lat="+lat+"&lon="+long;
        const getWeatherLocation = (async function() {
          const data = await api(weatherLocation);
          dataRecieved(data.name, data.main.temp, data.weather[0].description, data.weather[0].icon); 
        })();
      } 
    })(); 
  }
  render() {
    return (
      <div id="contain">
        <div className="weatherData" id="city"><h1>{this.state.city}</h1></div>
        <div className="weatherData" id="temp"><h2>{this.state.temp === "" ? "" : Math.round(this.state.temp)}</h2><p id="toggle" onClick={this.toggleC_F}>{this.state.toggle}</p></div>
        <div className="weatherData" id="description"><h2>{this.state.description}</h2></div>
        <div className="weatherData" id="icon"><img id="iconImg" src={this.state.icon} /></div>
      </div>
    ); 
  }
} 
export { WeatherApp };