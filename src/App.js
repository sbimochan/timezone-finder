import React, { useState, useEffect } from 'react';

import TimePicker from 'react-times';
import { timezoneOffset } from './timezoneOffset';

import './normalize.css';
import './skeleton.css';
import 'react-times/css/material/default.css';
import './App.css';

function App() {
  const [hour,
    setHour] = useState(10);
  const [minute,
    setMinute] = useState(45);
  const [meridiem,
    setMeridiem] = useState('PM');
  const [timeDiff,
    setTimeDiff] = useState(0);
  const [offset,
    setOffset] = useState([]);

  useEffect(() => {
    let currentDate = new Date();
    let fromTime = currentDate.getHours() * 60 + currentDate.getMinutes();
    let toTime = meridiem === 'PM' ? (hour + 12) * 60 + minute : hour * 60 + minute;
    let currentTimeZoneOffset = currentDate.getTimezoneOffset();
    let minutesDifference = (fromTime - toTime) + currentTimeZoneOffset;
    if (minutesDifference > 0) {
      setTimeDiff(parseInt('-' + timeTransformer(minutesDifference), 10));
    } else {
      setTimeDiff(timeTransformer(minutesDifference));
    }
    //basically fixed the issue of the loop, 
    // (like in react component class- when we update state on component did upadte , it kepts on update loop)
    // refrer to https://reactjs.org/docs/hooks-effect.html#effects-with-cleanup
  }, [meridiem, hour, minute]);

  useEffect(() => {
    let timezone = timezoneOffset.filter(el => el.offset === timeDiff);
    if (timezone) {
      setOffset(timezone);
    } else {
      setOffset([]);
    }
    //basically fixed the issue of the loop, 
    // (like in react component class- when we update state on component did upadte , it kepts on update loop)
    // refrer to https://reactjs.org/docs/hooks-effect.html#effects-with-cleanup
  }, [timeDiff]);

  function timeTransformer(minutesDifference) {
    minutesDifference = Math.abs(minutesDifference);
    let hour = Math.floor(minutesDifference / 60);
    let minute = minutesDifference % 60;
    let roundUp = Math.round(minute / 5) * 5;
    if (roundUp) {
      let time = hour + '.' + roundUp;
      return parseInt(time, 10);
    } else {
      return hour;
    }
  }

  return (
    <div className='container'>

      <div className="row mb-30">
        <h3>Time zone finder</h3>
      </div>
      <div className='row'>
        <div className='six columns'>
            <TimePicker
              focused
              onTimeChange=
              {(options) => { setHour(parseInt(options.hour, 10)); setMinute(parseInt(options.minute, 10)); setMeridiem(options.meridiem); }}
              time={hour + ':' + minute}
              meridiem={meridiem}
              theme="material"
              colorPalette="dark"
              timeMode="12"
              showTimezone={true}
              closeOnOutsideClick={false} />
        </div>
        <ul className="six columns time-detail">
          {offset.map((el, index) => <li key={index}>{el.utc + ' ' + el.text}</li>)}
        </ul>
      </div>
    </div>
  )
}
export default App;