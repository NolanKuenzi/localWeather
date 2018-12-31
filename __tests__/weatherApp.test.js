import React from "react";
import Enzyme, { shallow, mount } from "enzyme";
import { WeatherApp } from "../src/js/weatherApp.js";
import regeneratorRuntime from "regenerator-runtime";
import "../__mocks__/getData.js";
jest.mock("../__mocks__/getData.js");

const mockGeolocation = {
  getCurrentPosition: jest.fn()
    .mockImplementationOnce((success) => Promise.resolve(success({
      coords: {
        latitude: 51.1,
        longitude: 45.3
      } 
    })))
};
global.navigator.geolocation = mockGeolocation;

describe("WeatherApp Component", () => {  
  it("Renders a <div />", () => {
    const wrapper = shallow(<WeatherApp />);
    expect(wrapper.exists()).toBe(true);
  });
  test("Geolocation is called in componentDidMount", () => {
    const wrapper = shallow(<WeatherApp />);
    expect(mockGeolocation.getCurrentPosition.mock.calls.length).toBe(2);
  });
});

