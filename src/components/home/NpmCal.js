import React from 'react'
import { Calendar, Views, momentLocalizer} from 'react-big-calendar'
import events from './Events'
import * as dates from './Dates'
import moment, { calendarFormat } from 'moment'
import '../../../node_modules/react-big-calendar/lib/css/react-big-calendar.css'

let allViews = Object.keys(Views).map(k => Views[k])

const ColoredDateCellWrapper = ({ children }) =>
  React.cloneElement(React.Children.only(children), {
    style: {
       
    },
  })

const localizer = momentLocalizer(moment)

const NpmCal = props => (
  <div>
    <Calendar
      events={events}
      views={Views.month}
      step={60}
      showMultiDayTimes
      defaultDate={new Date()}
      components={{
        timeSlotWrapper: ColoredDateCellWrapper,
      }}
      localizer={localizer}
    />
  </div>
)

export default NpmCal