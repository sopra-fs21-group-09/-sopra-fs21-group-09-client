import React, {useState} from 'react'
import styled from 'styled-components';
import { Calendar, Views, momentLocalizer} from 'react-big-calendar'
import moment, { calendarFormat } from 'moment'
import '../../../node_modules/react-big-calendar/lib/css/react-big-calendar.css'
import Rodal from 'rodal'
import 'rodal/lib/rodal.css'
import DatePicker from 'react-date-picker';
import events from './Events'
import * as dates from './Dates'
import {CircleButton, RectButtonBig, RectButtonSmall} from '../../views/Button'
import { InputField } from '../../views/Labels'

let allViews = Object.keys(Views).map(k => Views[k])

const EventInfo = styled.div`
  display grid;
  grid-template-columns: 20% 80%;
  grid-template-rows: 1;
  grid-column-gap: 1em;
`;
const DateInfo = styled.div`
  display grid;
  grid-template-columns: 60% 40%;
  grid-gap: 0px;
`;

const ColoredDateCellWrapper = ({ children }) =>
  React.cloneElement(React.Children.only(children), {
    style: {
       
    },
  })

const localizer = momentLocalizer(moment)

const NpmCal = props => {

  const [addVisible, setAddVisible] = useState(false);
  const [eventVisible, setEventVisible] = useState(false);
  const [editVisible, setEditVisible] = useState(false);
  const [dateValue, onChange] = useState(new Date());

  const [eventTypes] = React.useState([ //TODO: Set default event type
      {label: "Event", value: "Event"},
      {label: "Deadline", value: "Deadline"},
      {label: "Lectures", value: "Lectures"},
      {label: "Exercises", value: "Exercises"},
      {label: "Meeting", value: "Meeting"},
      {label: "Private", value: "Private"},    
    ]);

  return (
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
      onSelectEvent={() => setEventVisible(true)}
    />
    <CircleButton 
      style={{position: 'absolute', bottom: 0, right: 0}}
      onClick={() => setAddVisible(true)}>ADD</CircleButton>
      {/*Overlay for ADDING Event */}
      <Rodal height='300' customStyles={{borderRadius: '20px'}} visible={addVisible} closeOnEsc='true' onClose={() => setAddVisible(false)}>
        <div><b>Add Event</b></div><br/>
        <EventInfo>
          <div>Title:</div><div><InputField placeholder='Enter title here'></InputField></div>
          <div>Start:</div>
            <DateInfo>
              <InputField type='date'/>
              <InputField type='time'/>
            </DateInfo>
          <div>End:</div>
            <DateInfo>
              <InputField type='date'/>
              <InputField type='time'/>
            </DateInfo>
          <div>Type:</div><div>
          <select style={{height: '35px', paddingLeft:'3%', border:'#E5E5E5', borderRadius: '20px', background:'#E5E5E5'}}>
            {eventTypes.map(({ label, value }) => (
            <option key={value} value={value}>{label}</option>))}
          </select>
          </div>
        </EventInfo>
        <br/>
        <div><RectButtonSmall>Submit</RectButtonSmall></div>
      </Rodal>
    {/*Overlay for giving DETAILS of an event*/}
    <Rodal height='300' customStyles={{borderRadius: '20px'}} visible={eventVisible} closeOnEsc='true' onClose={() => setEventVisible(false)}>
        <div><b>Event Title</b></div><br/>
        <EventInfo>
          <div>Start</div><div>26.02.2021 18:00</div>
          <div>End:</div><div>26.02.2021 20:00</div>
          <div>Type:</div><div>Meeting</div><div></div>
        </EventInfo><br/><br/><br/><br/><br/>
        <RectButtonSmall onClick={() => {setEditVisible(true); setEventVisible(false); }}>Edit</RectButtonSmall>
    </Rodal>
    {/*Overlay for EDITING event*/}
    <Rodal height='300' customStyles={{borderRadius: '20px'}} visible={editVisible} closeOnEsc='true' onClose={() => setEditVisible(false)}>
        <div><b>Edit Event</b></div><br/>
        <EventInfo>
          <div>Title:</div><InputField placeholder='Enter title here'></InputField>
          <div>Start:</div>
            <DateInfo>
              <InputField type='date'/>
              <InputField type='time'/>
            </DateInfo>
          <div>End:</div>
            <DateInfo>
              <InputField type='date'/>
              <InputField type='time'/>
            </DateInfo>
          <div>Type:</div><div>
          <select style={{height: '35px', paddingLeft:'3%', border:'#E5E5E5', borderRadius: '20px', background:'#E5E5E5'}}>
            {eventTypes.map(({ label, value }) => (
            <option key={value} value={value}>{label}</option>))}
          </select>
          </div>
          {/*<div>Description:</div><InputField placeholder='Enter description here'></InputField>*/}
        </EventInfo>
        <br/>
        <div><RectButtonSmall>Submit</RectButtonSmall></div>
      </Rodal>
  </div>
  )}
export default NpmCal