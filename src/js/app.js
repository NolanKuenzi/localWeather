
import "../css/main.css";
import React from "react";
import ReactDOM from "react-dom";
import { WeatherApp } from "./weatherApp.js";

function Header() {
  return (
    <div><h1 id="topHeader">Local Weather App</h1></div>
  );
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