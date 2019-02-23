import './normalize.css';
import './skeleton.css';
import 'react-times/css/material/default.css';
import 'react-times/css/classic/default.css';
import React, {useState, useEffect} from 'react';

import TimePicker from 'react-times';
import {timezoneOffset} from './timezoneOffset';

function App() {
  const [hour,
    setHour] = useState(10);
  const [minute,
    setMinute] = useState(42);
  const [timeDiff,
    setTimeDiff] = useState(0);
  const [offset,
    setOffset] = useState([]);

  useEffect(() => {
    let currentDate = new Date();
    let fromTime = currentDate.getHours() * 60 + currentDate.getMinutes();
    let toTime = hour * 60 + minute;
    let currentTimeZoneOffset = currentDate.getTimezoneOffset();
    let minutesDifference = (fromTime - toTime) + currentTimeZoneOffset;
    if (minutesDifference > 0) {
      setTimeDiff(parseInt('-' + timeTransformer(minutesDifference)), 10);
    } else {
      setTimeDiff(timeTransformer(minutesDifference));
    }
    console.log(timeDiff)
    // debugger
    let timezone = timezoneOffset.filter(el => el.offset === timeDiff);
    console.log(timezone)
    if (timezone) {
      setOffset(timezone)
    } else {
      setOffset(null)
    }

  });

  function timeTransformer(minutesDifference) {
    minutesDifference = Math.abs(minutesDifference);
    let hour = Math.floor(minutesDifference / 60);
    let minute = minutesDifference % 60;
    let roundUp = Math.round(minute / 15) * 15
    if (roundUp) {
      let time = hour + '.' + roundUp;
      return parseInt(time, 10);
    } else {
      return hour
    }
  }

  return (
    <div className='container'>
      <div className="row">
        <h1>Time zone finder</h1>
      </div>
      <div className='row'>
        <div className='six columns'>
          <TimePicker
            onTimeChange=
            { (options) => { setHour(parseInt(options.hour,10)); setMinute(parseInt(options.minute,10)); } }
            time={hour + ':' + minute}/>
        </div>
      </div>
      <div className='row'>
        <ul>
          {offset.map(el => <li>{el.utc +' '+ el.text}</li>)}
        </ul>
      </div>
    </div>
  )
}
export default App;