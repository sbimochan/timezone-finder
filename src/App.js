import './normalize.css';
import './skeleton.css';
import React, {useState, useEffect} from 'react';
import TimePicker from 'react-times';

// use material theme
import 'react-times/css/material/default.css';
// or you can use classic theme
import 'react-times/css/classic/default.css';

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
    if (minutesDifference > 0) {
      
      setTimeDiff('-'+ minutesToHoursConverter(minutesDifference));
    } else {
      
      setTimeDiff(minutesToHoursConverter(minutesDifference));
    }

  });

  function minutesToHoursConverter(minutesDifference) {
    minutesDifference = Math.abs(minutesDifference);
    let hour = Math.floor(minutesDifference / 60);
    let minute = minutesDifference % 60;
    let time = hour + ':' + minute;
    return time;
  }
  return (
    <div className='container'>
      <div className="row">
        <h1>Time zone finder</h1>
      </div>
      <div className='row'>
        {/* <div className='six columns'>
          <h4>Your time</h4>
          <TimePicker
            onTimeChange={(options) => {
            setFromHour(parseInt(options.hour), 10);
            setFromMinute(parseInt(options.minute), 10);
          }}
            time={fromHour + ':' + fromMinute}/>
        </div> */}
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