import "./normalize.css";
import "./skeleton.css";
import "react-times/css/material/default.css";
import "./App.css";
import React, { useState, useEffect } from "react";

import TimePicker from "react-times";
import timezoneOffset from 'timezones.json';
// import { timezoneOffset } from "./timezoneOffset";


function App() {
  const [hour, setHour] = useState(10);
  const [minute, setMinute] = useState(45);
  const [meridiem, setMeridiem] = useState("PM");
  const [timeDiff, setTimeDiff] = useState(0);
  const [offset, setOffset] = useState([]);

  useEffect(() => {
    const currentDate = new Date();
    const fromTime = currentDate.getHours() * 60 + currentDate.getMinutes();
    const toTime =
      meridiem === "PM" ? (hour + 12) * 60 + minute : hour * 60 + minute;
    const currentTimeZoneOffset = currentDate.getTimezoneOffset();
    const minutesDifference = (fromTime - toTime) + currentTimeZoneOffset;
    if (minutesDifference > 0) {
      setTimeDiff(parseInt("-" + timeTransformer(minutesDifference), 10));
    } else {
      setTimeDiff(timeTransformer(minutesDifference));
    }
  }, [meridiem, hour, minute]);

  useEffect(() => {
    const timezone = timezoneOffset.filter((el) => el.offset === timeDiff);
    if (timezone) {
      setOffset(timezone);
    } else {
      setOffset([]);
    }
  }, [timeDiff]);

  function timeTransformer(minutesDifference) {
    const absMinutesDifference = Math.abs(minutesDifference);
    const hour = Math.floor(absMinutesDifference / 60);
    const minute = absMinutesDifference % 60;
    const roundUp = Math.round(minute / 5) * 5;
    if (roundUp) {
      const time = hour + "." + roundUp;
      return parseInt(time, 10);
    } else {
      return hour;
    }
  }

  return (
    <div className="container overflow-x-hidden">
      <div className="row mb-30">
        <h3>Time zone finder</h3>
      </div>
      <div className="row">
        <div className="four columns">
          <TimePicker
            focused
            onTimeChange={(options) => {
              setHour(parseInt(options.hour, 10));
              setMinute(parseInt(options.minute, 10));
              setMeridiem(options.meridiem);
            }}
            time={hour + ":" + minute}
            meridiem={meridiem}
            theme="material"
            colorPalette="dark"
            timeMode="12"
            showTimezone={true}
            closeOnOutsideClick={false}
          />
        </div>
        <table className="eight columns time-detail ">
          <thead>
            <tr>
              <th>Time Zone</th>
              <th className="possible-locations">Possible Locations</th>
            </tr>
          </thead>
          <tbody>
            {offset.length > 0 ? (
              offset.map((el, index) => (
                <tr key={index}>
                  <td className="time-zone">{el.text}</td>
                  <td className="possible-locations">{el.utc}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="2" className="time-zone no-result">No Result</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
export default App;
