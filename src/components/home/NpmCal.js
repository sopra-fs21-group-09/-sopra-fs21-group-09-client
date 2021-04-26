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
      views={allViews}
      step={60}
      showMultiDayTimes
      max={dates.add(dates.endOf(new Date(2015, 17, 1), 'day'), -1, 'hours')}
      defaultDate={new Date(2015, 3, 1)}
      components={{
        timeSlotWrapper: ColoredDateCellWrapper,
      }}
      localizer={localizer}
    />
  </div>
)

export default NpmCal