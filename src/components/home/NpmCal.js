import React, {useState, useEffect} from 'react'
import styled from 'styled-components';
import { Calendar, Views, momentLocalizer} from 'react-big-calendar'
import moment from 'moment'
import '../../../node_modules/react-big-calendar/lib/css/react-big-calendar.css'
import Rodal from 'rodal'
import 'rodal/lib/rodal.css'
import {CircleButton, RectButtonSmall} from '../../views/Button'
import { InputField } from '../../views/Labels'
import { api, handleError } from '../../helpers/api'

import events from './Events'


const EventInfo = styled.div`
  display grid;
  grid-template-columns: 25% 75%;
  grid-template-rows: 1;
  grid-column-gap: 1em;
`;

const ColoredDateCellWrapper = ({ children }) =>
  React.cloneElement(React.Children.only(children), {
    style: {
    },
  })

const localizer = momentLocalizer(moment)

const NpmCal = props => {

  const [eventTitle, setEventTitle] = useState();
  const [eventStart, setEventStart] = useState();
  const [eventEnd, setEventEnd] = useState();
  const [eventDesc, setEventDesc] = useState();
  const [eventLabel, setEventLabel] = useState();

  const startLabel = new Date(eventStart);

  const initialState = ''; 
  function resetEvent(){
    setEventTitle({ ...initialState });
    setEventStart({ ...initialState });
    setEventEnd({ ...initialState });
    setEventDesc({ ...initialState });
    setEventLabel({ ...initialState });
  }

  const [render, setRender] = useState(false);  {/*useEffect(() => console.log('mounted'), []);*/}

  const [addVisible, setAddVisible] = useState(false);
  const [eventVisible, setEventVisible] = useState(false);
  const [editVisible, setEditVisible] = useState(false);

  const [eventLabels] = React.useState([ //TODO: Set default event type
      {label: "Event", value: "EVENT"},
      {label: "Lecture", value: "LECTURE"},
      {label: "Exercise", value: "EXERCISE"},
      {label: "Meeting", value: "MEETING"},
      {label: "Exam", value: "EXAM"},    
    ]);

  const [events2, setEvents] = useState([]);
  
  async function getEvents(){
    try {
      const response = await api.get('/users/'+ localStorage.getItem('id') +'/events')
      
      for (var i = 0; i < response.data.length; i++) {
        response.data[i].start= new Date(response.data[i].start.replace('\"','\''));
        response.data[i].end = new Date(response.data[i].end.replace('\"','\''));
      }

      console.log(response.data)

      setEvents(response.data);

    } catch (error) {
      alert(`getEvent-Error: \n${handleError(error)}`);
    }
  }
    
  function postEvent(){
      try {
          const requestBody = JSON.stringify({
              title: eventTitle,
              start: new Date (eventStart),
              end: new Date(eventEnd),
              desc: eventDesc,
              label: eventLabel,
          });

          const response = api.post('/users/'+ localStorage.getItem('id') +'/events', requestBody) 

      } catch (error) {
          alert(`postEvent-Error: \n${handleError(error)}`);
      }
  }

  useEffect(() => {getEvents()}, []);

  useEffect(() => {console.log('mounted or updated');}, [render]);

  return (
    <div>
    <Calendar
      selectable
      events={events2}
      views={Views.week}
      step={60}
      showMultiDayTimes
      defaultDate={new Date()}
      components={{
        timeSlotWrapper: ColoredDateCellWrapper,
      }}
      localizer={localizer}
      onSelectEvent={event => {setEventVisible(true); setEventTitle(event.title); setEventStart(event.start.toLocaleString()); setEventEnd(event.end.toLocaleString()); setEventLabel(event.label); setEventDesc(event.desc);}}
    />
    <CircleButton
      style={{position: 'absolute', bottom: 0, right: 0, filter: 'drop-shadow(0px 4px 4px rgba(0, 0, 0, 0.25)'}}
      onClick={() => setAddVisible(true)}><i className="fas fa-plus fa-2x"></i></CircleButton>
      {/*Overlay for ADDING Event */}
      <Rodal height='300' customStyles={{borderRadius: '20px', padding:'20px'}} visible={addVisible} closeOnEsc='true' onClose={() => setAddVisible(false)}>
        <div><b>Add Event</b></div><br/>
        <EventInfo>
          <div>Title:</div><div><InputField placeholder='Enter title here' onChange={e => {setEventTitle(e.target.value); console.log(eventTitle)}}/></div>
          <div>Start:</div>
            <InputField type='datetime-local' onChange={e => {setEventStart(e.target.value)}}/>
          <div>End:</div>
            <InputField type='datetime-local' onChange={e => {setEventEnd(e.target.value)}}/>
          <div>Label:</div><div>
          <select style={{height: '35px', paddingLeft:'3%', border:'#E5E5E5', borderRadius: '20px', background:'#E5E5E5'}} 
                  onChange={e => setEventLabel(e.target.value)}>
            {eventLabels.map(({ label, value }) => (
            <option key={value} value={value}>{label}</option>))}
          </select>
          </div>
        </EventInfo>
        <br/> 
        <div><RectButtonSmall onClick={() => {postEvent(); setAddVisible(false);}}>Submit</RectButtonSmall></div>
      </Rodal>
    {/*Overlay for giving DETAILS of an event*/}
    <Rodal height='300' customStyles={{borderRadius: '20px', padding:'20px'}} visible={eventVisible} closeOnEsc='true' onClose={() => {setEventVisible(false)}}>
        <div><b>{eventTitle}</b></div><br/>
        <EventInfo>
          <div>Start:</div><div>{eventStart}</div>
          <div>End:</div><div>{eventEnd}</div>
          <div>Label:</div><div>{eventLabel}</div>
          <div>Description:</div><div>{eventDesc}</div>
        </EventInfo><br/><br/><br/><br/>
        <RectButtonSmall onClick={() => {setEventVisible(false); setEditVisible(true);}}>Edit</RectButtonSmall>
    </Rodal>
    {/*Overlay for EDITING event*/}
    <Rodal height='300' customStyles={{borderRadius: '20px', padding:'20px'}} visible={editVisible} closeOnEsc='true' onClose={() => setEditVisible(false)}>
        <div><b>Edit {eventTitle}</b></div><br/>
        <EventInfo>
          <div>Title:</div><InputField placeholder={eventTitle}></InputField>
          <div>Start:</div>
            <InputField type='datetime-local' placeholder={eventStart} onChange={e => {setEventStart(e.target.value)}}/>
          <div>End:</div>
            <InputField type='datetime-local' data-date="" data-date-format="YYYY-MM-DD HH:mm" value={eventEnd} onChange={e => {setEventEnd(e.target.value)}}/>
          <div>Type:</div><div>
          <select style={{height: '35px', paddingLeft:'3%', border:'#E5E5E5', borderRadius: '20px', background:'#E5E5E5'}}>
            {eventLabels.map(({ label, value }) => (
            <option key={value} value={value}>{label}</option>))}
          </select>
          </div>
          <div>Description:</div><InputField placeholder='Enter description here'></InputField>
        </EventInfo>
        <br/>
        <div><RectButtonSmall>Submit</RectButtonSmall></div>
      </Rodal>
  </div>
  )}
export default NpmCal