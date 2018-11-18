
import "../css/main.css";
import React from "react";
import ReactDOM from "react-dom";

function Header() {
  return (
    <div><h1 id="topHeader">Local Weather App</h1></div>
  );
}
class WeatherApp extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
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
    const toggle = document.getElementById("toggle");
    if (toggle.innerHTML === "° C") {
      this.setState({
        temp: fTemp
      });
      toggle.innerHTML = "° F";
    } else {
      this.setState({
        temp: cTemp
      });
      toggle.innerHTML = "° C";
    }
  }
  componentDidMount() {
    const dataFunc = this.dataRecievedFunc;
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
        const getData =  new Promise((resolve, reject) => {
          const req = new XMLHttpRequest();
          req.open("GET", api0, true);
          req.onload = () => resolve(JSON.parse(req.responseText));
          req.onerror = () => reject(req.statusText);
          req.send();
        });
        getData.then(data => {
          dataFunc(data.name, data.main.temp, data.weather[0].description, data.weather[0].icon);           
        }).catch(error => {
          alert("Geolocation data failed to load, plase try again.");
          return;
        });
      } /* Success Function */
    })(); /* getWeatherAppData IIFE */
  } 
  render() {
    return (
      <div id="contain">
        <div className="weatherData" id="city"><h1>{this.state.city}</h1></div>
        <div className="weatherData" id="temp"><h2>{this.state.temp === "" ? "" : Math.round(this.state.temp)}</h2><p id="toggle" onClick={this.toggleC_F}>{this.state.temp === "" ? "" : "° C"}</p></div>
        <div className="weatherData" id="description"><h2>{this.state.description}</h2></div>
        <div className="weatherData" id="icon"><img id="iconImg" src={this.state.icon} /></div>
      </div>
    ); 
  }
}  
function Footer() {
  return (
    <div id="footer"><h3>Copyright © 2018 Nolan Kuenzi. Made for the freeCodeCamp Development Challenge: Show the Local Weather.</h3></div>
  );
} 
function App() {
  return (
    <div>
      <Header />
      <WeatherApp />
      <Footer />
    </div>
  );
}
ReactDOM.render(<App />, document.getElementById("app"));