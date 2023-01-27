// Require google from googleapis package.
const { google } = require('googleapis')

// Require oAuth2 from our google instance.
const { OAuth2 } = google.auth

// Create a new instance of oAuth and set our Client ID & Client Secret.
const oAuth2Client = new OAuth2(
  '713801279282-5n8pqs5fb0v12d0g5udcateva4jab49s.apps.googleusercontent.com',
  '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'
)

// Call the setCredentials method on our oAuth2Client instance and set our refresh token.
oAuth2Client.setCredentials({
  refresh_token: '1//0g3PnGsqRnI8aCgYIARAAGBASNwF-L9Ir46ess4t-xDnSWfhzHDqpxgICO2oQ_WkQtXaO79xXW6TFN3yAQH5T_WSewAp6WUV9mjs',
})

// Create a new calender instance.
const calendar = google.calendar({ version: 'v3', auth: oAuth2Client })

// Create a new event start date instance for temp uses in our calendar.
const eventStartTime = "2023-01-19T09:30:00+05:30"
// eventStartTime.setDate(eventStartTime.getDay() + 2)

// Create a new event end date instance for temp uses in our calendar.
const eventEndTime = "2023-01-19T10:00:00+05:30"
// eventEndTime.setDate(eventEndTime.getDay() + 4)
// eventEndTime.setMinutes(eventEndTime.getMinutes() + 45)

// Create a dummy event for temp uses in our calendar
const event = {
  summary: `Games`,
  location: `3595 California St, San Francisco, CA 94118`,
  description: `dummmy description`,
  colorId: 1,
  "start": {
    "dateTime": eventStartTime,
    "timeZone": "Asia/Kolkata"
  },
  "end": {
    "dateTime": eventEndTime,
    "timeZone": "Asia/Kolkata"
  },
  conferenceData: {
    createRequest: {
      conferenceSolutionKey: {
        type: 'hangoutsMeet',
      },
      requestId: 'abcdedf'
    },
  },
  "attendees": [
    {"email": "saransh@classplus.co"},
    {"email": "surabhi@classplus.co"},
    {"email": "amir.sohel@classplus.co"}
  ],
  reminders: {
    useDefault: false,
    overrides: [
      { method: 'email', minutes: 30 },
      { method: 'popup', minutes: 30 },
      { method: 'popup', minutes: 24 * 60 }
    ],
  },
  colorId: 2,
}


    // calendar.events.insert(
    //     { calendarId: 'primary', resource: event, prettyPrint: true,
    //     conferenceDataVersion: 1,
    //     sendUpdates: 'all', },
    //     (err, event) => {
    //       // Check for errors and log them if they exist.
    //       if (err) return console.error('Error Creating Calender Event:', err)
    //       // Else log that the event was created.
    //       console.log(event)
    //       return console.log('Calendar event successfully created.')
    //     }
    //   )

    //   return

    // calendar.events.get({calendarId:'primary', eventId:"vop1mq9oo2oe4ejv32frlait5k"}).then((data)=>{console.log(data.data.id) calendar.events.update({ })})

    // return

// Check if we a busy and have an event on our calendar for the same time.
calendar.freebusy.query(
  {
    resource: {
      timeMin: eventStartTime,
      timeMax: eventEndTime,
      timeZone: 'Asia/Kolkata',
      items: [{ id: 'primary' }],
    },
  },
  (err, res) => {
    // Check for errors in our query and log them if they exist.
    if (err) return console.error('Free Busy Query Error: ', err)

    console.log(res.data.calendars.primary)

    // Create an array of all events on our calendar during that time.
    const eventArr = res.data.calendars.primary.busy

    console.log(eventArr)
    

    // Check if event array is empty which means we are not busy
    if (eventArr.length === 0)
      // If we are not busy create a new calendar event.
      return calendar.events.insert(
        { calendarId: 'primary', resource: event, prettyPrint: true,
        conferenceDataVersion: 1,
        sendUpdates: 'all', },
        (err, event) => {
          // Check for errors and log them if they exist.
          if (err) return console.error('Error Creating Calender Event:', err)
          // Else log that the event was created.
          console.log(event)
          return console.log('Calendar event successfully created.')
        }
      )

    // If event array is not empty log that we are busy.
    return console.log(`Sorry I'm busy...`)
  }
)