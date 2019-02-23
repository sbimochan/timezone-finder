import './normalize.css';
import './skeleton.css';
import 'react-times/css/material/default.css';
import 'react-times/css/classic/default.css';
import React, {useState, useEffect} from 'react';

import TimePicker from 'react-times';
import {timezoneOffset} from './timezoneOffset';

function App() {
  const [hour,
    setHour] = useState(11);
  const [minute,
    setMinute] = useState(15);
  const [timeDiff,
    setTimeDiff] = useState(0);

  useEffect(() => {
    let currentDate = new Date();
    let fromTime = currentDate.getHours() * 60 + currentDate.getMinutes();
    let toTime = hour * 60 + minute;
    let currentTimeZoneOffset = currentDate.getTimezoneOffset();
    let minutesDifference = (fromTime - toTime) + currentTimeZoneOffset;
    console.log(new Date())
    if (minutesDifference > 0) {
      setTimeDiff('-' + timeTransformer(minutesDifference));
    } else {
      setTimeDiff(timeTransformer(minutesDifference));
    }

  });

  function timeTransformer(minutesDifference) {
    minutesDifference = Math.abs(minutesDifference);
    let hour = Math.floor(minutesDifference / 60);
    let minute = minutesDifference % 60;
    let roundUp = Math.round(minute / 15) * 15
    if (roundUp) {
      let time = hour + '.' + roundUp;
      return time
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
          <h4>Their time</h4>
          <TimePicker
            onTimeChange=
            { (options) => { setHour(parseInt(options.hour,10)); setMinute(parseInt(options.minute,10)); } }
            time={hour + ':' + minute}/>
        </div>
      </div>
      <div className='row'>
        {timeDiff}
      </div>
    </div>
  )
}
export default App;