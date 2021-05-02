import React, {useState, useEffect, useReducer} from 'react'
import styled from 'styled-components';
import { Calendar, Views, momentLocalizer} from 'react-big-calendar'
import moment from 'moment'
import '../../../node_modules/react-big-calendar/lib/css/react-big-calendar.css'
import Rodal from 'rodal'
import 'rodal/lib/rodal.css'
import {CircleButton, RectButtonSmall} from '../../views/Button'
import { InputField, InputArea } from '../../views/Labels'
import { api, handleError } from '../../helpers/api'

import events from './Events'

const EventInfo = styled.div`
  display grid;
  grid-template-columns: 25% 75%;
  grid-template-rows: 1;
  grid-column-gap: 1em;
`;

const EventLabel = styled.div`
  color: ${props => props.warning ? 'red' : 'black'};
  padding-top: '5px';
  font-weight: 'bold';
`;

const ColoredDateCellWrapper = ({ children }) =>
  React.cloneElement(React.Children.only(children), {
    style: {
    },
  })

const localizer = momentLocalizer(moment)

const NpmCal = props => {

  const [eventTitle, setEventTitle] = useState();
  const [eventStart, setEventStart] = useState(toDatetimeLocal(new Date()));
  const [eventEnd, setEventEnd] = useState(toDatetimeLocal(new Date()));
  const [eventDesc, setEventDesc] = useState();
  const [eventLabel, setEventLabel] = useState();

  function resetEvent(){
    setEventTitle('');
    setEventStart('');
    setEventEnd('');
    setEventDesc('');
    setEventLabel('');
  }

  const [render, setRender] = useState(0);  {/*useEffect(() => console.log('mounted'), []);*/}

  const [addVisible, setAddVisible] = useState(false);
  const [eventVisible, setEventVisible] = useState(false);
  const [editVisible, setEditVisible] = useState(false);

  const [warningVisible, setWarningVisible] = useState(false);
  const [warning, setWarning] = useState(false);

  const [eventLabels] = React.useState([ //TODO: Set default event type
      {label: "Event", value: "EVENT"},
      {label: "Lecture", value: "LECTURE"},
      {label: "Exercise", value: "EXERCISE"},
      {label: "Meeting", value: "MEETING"},
      {label: "Exam", value: "EXAM"},    
    ]);

  function checkEvent() {
    if(eventTitle && eventLabel && eventStart && eventEnd && eventStart<eventEnd){
      postEvent();
      setAddVisible(false);
      resetEvent();
      getEvents();
    } else {
      setWarning("Start date must be earlier than end date!");
      setWarningVisible(true);
    }
  }

  const [events2, setEvents] = useState([]);
  
  async function getEvents(){
    try {
      const response = await api.get('/users/'+ localStorage.getItem('id') +'/events')
      
      for (var i = 0; i < response.data.length; i++) {
        response.data[i].start= new Date(response.data[i].start.replace('\"','\''));
        response.data[i].end = new Date(response.data[i].end.replace('\"','\''));
      }

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

  function addZero(i) {
    if (i < 10) {
      i = "0" + i;
    }
    return i;
  }

  function toDatetimeLocal(date){
    var
    YYYY = date.getFullYear(),
    MM = addZero(date.getMonth()),
    DD = addZero(date.getDate()),
    HH = addZero(date.getHours()),
    II = addZero(date.getMinutes());

    return YYYY+'-'+MM+'-'+DD+'T'+HH+':'+II;
  }

  function handleSelect({start, end}) {
    setEventStart(toDatetimeLocal(start));
    setEventEnd(toDatetimeLocal(end));
    setAddVisible(true);
  }

  useEffect(() => {getEvents()}, []);

  useEffect(() => {getEvents(); console.log('mounted or updated');}, [events]);

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
      onSelectSlot={e => handleSelect(e)}
    />
    <CircleButton
      style={{position: 'absolute', bottom: 0, right: 0, filter: 'drop-shadow(0px 4px 4px rgba(0, 0, 0, 0.25)'}}
      onClick={() => setAddVisible(true)}><i className="fas fa-plus fa-2x"></i></CircleButton>
      {/*Overlay for ADDING Event */}
      <Rodal height='400' customStyles={{borderRadius: '20px', padding:'20px'}} visible={addVisible} closeOnEsc='true' onClose={() => setAddVisible(false)}>
        <div style={{fontSize: '20px', fontWeight: 'bold'}}>Add Event</div><br/>
        <EventInfo>
          <EventLabel>Title:</EventLabel><InputField placeholder='Enter title here' onChange={e => {setEventTitle(e.target.value); console.log(eventTitle)}}/>
          <EventLabel>Start:</EventLabel>
            <InputField type='datetime-local' value={eventStart} onChange={e => {setEventStart(e.target.value)}}/>
          <EventLabel>End:</EventLabel>
            <InputField type='datetime-local' value={eventEnd} onChange={e => {setEventEnd(e.target.value)}}/>
          <EventLabel>Label:</EventLabel>
          <div>
            <select style={{height: '35px', paddingLeft:'3%', border:'#E5E5E5', borderRadius: '20px', background:'#E5E5E5', marginBottom:'5px'}} 
                    onChange={e => setEventLabel(e.target.value)}>
              {eventLabels.map(({ label, value }) => (
              <option key={value} value={value}>{label}</option>))}
            </select>
          </div>
          <EventLabel>Description:</EventLabel><InputArea placeholder='Enter description here' onChange={e => setEventDesc(e.target.value)}></InputArea>
        </EventInfo>
        <br/> 
        <RectButtonSmall onClick={() => checkEvent()}>Submit</RectButtonSmall>
      </Rodal>
    {/*Overlay for giving DETAILS of an event*/}
    <Rodal height='200' customStyles={{borderRadius: '20px', padding:'20px'}} visible={eventVisible} closeOnEsc='true' onClose={() => {setEventVisible(false)}}>
        <div style={{fontSize: '20px', fontWeight: 'bold'}}>{eventTitle}</div><br/>
        <EventInfo>
          <div>Start:</div><div>{eventStart}</div>
          <div>End:</div><div>{eventEnd}</div>
          <div>Label:</div><div>{eventLabel}</div>
          <div>Description:</div><div>{eventDesc}</div>
        </EventInfo><br/><br/><br/><br/>
        <RectButtonSmall onClick={() => {setEventVisible(false); setEditVisible(true);}}>Edit</RectButtonSmall>
    </Rodal>
    {/*Overlay for EDITING event*/}
    <Rodal height='400' customStyles={{borderRadius: '20px', padding:'20px'}} visible={editVisible} closeOnEsc='true' onClose={() => setEditVisible(false)}>
        <div style={{fontSize: '20px', fontWeight: 'bold'}}>Edit {eventTitle}</div><br/>
        <EventInfo>
          <div>Title:</div><InputField placeholder={eventTitle}></InputField>
          <div>Start:</div>
            <InputField type='datetime-local' placeholder={eventStart} onChange={e => {setEventStart(e.target.value)}}/>
          <div>End:</div>
            <InputField type='datetime-local' data-date="" data-date-format="YYYY-MM-DD HH:mm" value={eventEnd} onChange={e => {setEventEnd(e.target.value)}}/>
          <div>Type:</div><div>
          <select style={{height: '35px', paddingLeft:'3%', border:'#E5E5E5', borderRadius: '20px', background:'#E5E5E5', marginBottom:'5px'}}>
            {eventLabels.map(({ label, value }) => (
            <option key={value} value={value}>{label}</option>))}
          </select>
          </div>
          <div>Description:</div><InputArea placeholder='Enter description here' onChange={e => setEventDesc(e.target.value)}></InputArea>
        </EventInfo>
        <br/>
        <div><RectButtonSmall onClick={() => checkEvent()}>Submit</RectButtonSmall></div>
      </Rodal>

      <Rodal height='200' width='200' customStyles={{borderRadius: '20px', padding:'20px'}} visible={warningVisible} closeOnEsc='true' onClose={() => setWarningVisible(false)}>
        <i class="fas fa-exclamation-circle fa-5x" style={{color: 'red', display: 'flex', alignItems: 'center', justifyContent:'center'}}></i>
        <div style={{textAlign:'center', marginTop: '10px'}}>{warning}</div>
      </Rodal>
  </div>
  )}
export default NpmCal