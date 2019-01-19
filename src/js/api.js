import regeneratorRuntime from "regenerator-runtime";

export default async function(input) {
  let data;
  try {
    const request = await fetch(input);
    data = await request.json();
  } catch(error) {
    alert("Geolocation data failed to load, plase try again.");
  }
  return data;
} 