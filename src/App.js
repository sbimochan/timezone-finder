import './normalize.css';
import './skeleton.css';
import React, {useState, useEffect} from 'react';
import TimePicker from 'react-times';

// use material theme
import 'react-times/css/material/default.css';
// or you can use classic theme
import 'react-times/css/classic/default.css';

function App() {
  const [fromHour,
    setFromHour] = useState(9);
  const [fromMinute,
    setFromMinute] = useState(15);
  const [toHour,
    setToHour] = useState(11);
  const [toMinute,
    setToMinute] = useState(15);
  const [timeDiff,
    setTimeDiff] = useState(0);

  useEffect(() => {
    let fromTime = fromHour * 60 + fromMinute;
    let toTime = toHour * 60 + toMinute;
    console.log({fromTime});
    console.log({toTime})
    let currentDate = new Date();
    let currentTimeZoneOffset = currentDate.getTimezoneOffset();
    let minutesDifference = (fromTime - toTime) + currentTimeZoneOffset;
    console.log(minutesDifference)
    if (minutesDifference > 0) {
      setTimeDiff(minutesToHoursConverter(minutesDifference));

    } else {

      setTimeDiff('-'+ minutesToHoursConverter(minutesDifference));
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
        <div className='six columns'>
          <h4>Your time</h4>
          <TimePicker
            onTimeChange={(options) => {
            setFromHour(parseInt(options.hour), 10);
            setFromMinute(parseInt(options.minute), 10);
          }}
            time={fromHour + ':' + fromMinute}/>
        </div>
        <div className='six columns'>
          <h4>Their time</h4>
          <TimePicker
            onTimeChange=
            { (options) => { setToHour(parseInt(options.hour,10)); setToMinute(parseInt(options.minute,10)); } }
            time={toHour + ':' + toMinute}/>
        </div>
      </div>
      <div className='row'>
        {timeDiff}
      </div>
    </div>
  )
}
export default App;