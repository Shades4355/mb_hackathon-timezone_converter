import React, { useState } from 'react';


const FormContainer = props => {
  const { DateTime } = require('luxon');

  let minute
  if (DateTime.local().minute < 10) {
    minute = '0' + DateTime.local().minute
  } else {
    minute = DateTime.local().minute
  }

  const [getInput, setInput] = useState({
    origin: DateTime.local().hour + ':' + minute,
    target: DateTime.local().zoneName
  })

  let output = document.getElementById('output')

  const onChange = (event) => {
    setInput({...getInput, [event.currentTarget.id]: event.currentTarget.value})
    }

  const onSubmit = event => {
    event.preventDefault()

    const year = DateTime.local().year
    const month = DateTime.local().month
    const day = DateTime.local().day
    const time = getInput.origin.split(':')

    const rezone = DateTime.local(year, month, day, parseInt(time[0]), parseInt(time[1])).setZone(getInput.target);

    if (rezone.isValid) {
      output.innerText = rezone.toString()
    } else {
      output.innerText = 'Target or Time invalid'
    }
  }

  return(
    <div>
      <h2>
        Please Enter a Time and a Timezone!
      </h2>
      <form onSubmit={onSubmit}>
        <label>Origin:
          <br></br>
          <input
            type="text"
            id="origin"
            value={getInput.origin}
            onChange={onChange}
          />
        </label>
        <br></br>
        <br></br>
        <label>Target:
          <br></br>
          <input
            type="text"
            id="target"
            value={getInput.target}
            onChange={onChange}
          />
        </label>
          <br></br>
          <br></br>
        <input type="submit" value="Submit" />
      </form>
  </div>
  );
}

export default FormContainer
