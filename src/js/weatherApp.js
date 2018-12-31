import React from "react";
import regeneratorRuntime from "regenerator-runtime";

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
    this.getData = this.getData.bind(this);
    this.dataRecievedFunc = this.dataRecievedFunc.bind(this);
    this.toggleC_F = this.toggleC_F.bind(this);
  }
  getData(input) {
    const api = input;
    const dataRecFunc = this.dataRecievedFunc;
    const getDataFunc = (async function(api) {
      try {
        const request = await fetch(input);
        const data = await request.json();
        dataRecFunc(data.name, data.main.temp, data.weather[0].description, data.weather[0].icon); 
      } catch(error) {
        alert("Geolocation data failed to load, plase try again.");
      }
    })();
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
    const getDataFunc = this.getData;
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
        const api0 = "https://fcc-weather-api.glitch.me/api/current?lat="+lat+"&lon="+long;
        getDataFunc(api0);
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