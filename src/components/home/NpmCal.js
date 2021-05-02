import React, {useState, useEffect} from 'react'
import styled from 'styled-components';
import { Calendar, Views, momentLocalizer} from 'react-big-calendar'
import moment from 'moment'
import '../../../node_modules/react-big-calendar/lib/css/react-big-calendar.css'
import Rodal from 'rodal'
import 'rodal/lib/rodal.css'
import {CircleButton, RectButtonSmall} from '../../views/Button'
import { InputField, InputArea } from '../../views/Labels'
import { api, handleError } from '../../helpers/api'

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
      background: '#026C8D'
    },
  })

//calendar time formatting
const localizer = momentLocalizer(moment)

export default function NpmCal() {

  //rerendering when calendar constant changes
  const [calendar, setCalendar] = useState(0);
  useEffect(() => {getEvents()}, []);
  useEffect(() => {getEvents(); console.log('mounted or updated');}, [calendar]);

  //set initial values for event details
  const [eventId, setEventId] = useState();
  const [eventTitle, setEventTitle] = useState();
  const [eventStart, setEventStart] = useState(toDatetimeLocal(new Date()));
  const [eventEnd, setEventEnd] = useState(toDatetimeLocal(new Date()));
  const [eventDesc, setEventDesc] = useState();
  const [eventLabel, setEventLabel] = useState('EVENT');

  //reset event so when one event submitted, initial values appear in add-overlay
  function resetEvent(){
    setEventTitle('');
    setEventStart(toDatetimeLocal(new Date()));
    setEventEnd(toDatetimeLocal(new Date()));
    setEventDesc('');
    setEventLabel('EVENT');
  }

  //constants for rodal-overlay visibility 
  const [addVisible, setAddVisible] = useState(false);
  const [eventVisible, setEventVisible] = useState(false);
  const [editVisible, setEditVisible] = useState(false);

  //set warning for invalid inputs
  const [warningVisible, setWarningVisible] = useState(false);
  const [warning, setWarning] = useState(false);

  //event-label dropdown menu 
  const [eventLabels] = React.useState([ //TODO: Set default event type
      {label: "Event", value: "EVENT"},
      {label: "Lecture", value: "LECTURE"},
      {label: "Exercise", value: "EXERCISE"},
      {label: "Meeting", value: "MEETING"},
      {label: "Exam", value: "EXAM"},    
    ]);

  //check if event is valid -> required: title, start, end, label, start<end
  function checkEvent(method) {
    if(eventTitle && eventStart && eventEnd && eventStart<eventEnd){
      if(method=='put'){putEvent();}
      if(method=='post'){postEvent();}
      setAddVisible(false);
      setEditVisible(false);
      resetEvent();
      getEvents();
      setCalendar(calendar+1);
    } else {
      setWarning("Make sure you filled out title, start, end and selected a label!");
      setWarningVisible(true);
    }
  }

  const [events, setEvents] = useState([]);
  
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

  function putEvent(){
    try {
        const requestBody = JSON.stringify({
            id: eventId,
            title: eventTitle,
            start: new Date (eventStart),
            end: new Date(eventEnd),
            desc: eventDesc,
            label: eventLabel,
        });

        console.log(eventId);
        const response = api.put('/events/'+eventId, requestBody) 

    } catch (error) {
        alert(`postEvent-Error: \n${handleError(error)}`);
    }
  }

  function addZero(i) { if (i < 10) { i = "0" + i; } return i; }

  function toDatetimeLocal(date){
    var
    YYYY = date.getFullYear(),
    MM = addZero(date.getMonth() + 1),
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

  return (
    <div>
    <Calendar
      popup
      selectable
      events={events}
      views={Views.week}
      step={60}
      showMultiDayTimes
      defaultDate={new Date()}
      components={{
        eventWrapper: ColoredDateCellWrapper,
      }}
      localizer={localizer}
      onSelectEvent={event => {setEventVisible(true); setEventId(event.id); setEventTitle(event.title); setEventStart(event.start.toLocaleString()); setEventEnd(event.end.toLocaleString()); setEventLabel(event.label); setEventDesc(event.desc);}}
      onSelectSlot={e => handleSelect(e)}
    />
    <CircleButton
      style={{position: 'absolute', bottom: 0, right: 0, filter: 'drop-shadow(0px 4px 4px rgba(0, 0, 0, 0.25)'}}
      onClick={() => setAddVisible(true)}><i className="fas fa-plus fa-2x"></i></CircleButton>
      {/*Overlay for ADDING Event */}
      <Rodal height='400' customStyles={{borderRadius: '20px', padding:'20px'}} visible={addVisible} closeOnEsc='true' onClose={() => {setAddVisible(false); resetEvent();}}>
        <div style={{fontSize: '20px', fontWeight: 'bold'}}>Add Event</div><br/>
        <EventInfo>
        <EventLabel>Title:</EventLabel><InputField placeholder='Enter title here' onChange={e => setEventTitle(e.target.value)}/>
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
        <RectButtonSmall onClick={() => checkEvent('post')}>Submit</RectButtonSmall>
      </Rodal>
    {/*Overlay for giving DETAILS of an event*/}
    <Rodal height='250' customStyles={{borderRadius: '20px', padding:'20px'}} visible={eventVisible} closeOnEsc='true' onClose={() => {setEventVisible(false)}}>
        <div style={{fontSize: '20px', fontWeight: 'bold'}}>{eventTitle}</div><br/>
        <EventInfo>
          <div>Start:</div><div>{eventStart}</div>
          <div>End:</div><div>{eventEnd}</div>
          <div>Label:</div><div>{eventLabel}</div>
          <div>Description:</div><div>{eventDesc}</div>
        </EventInfo><br/><br/>
        <RectButtonSmall onClick={() => {setEventVisible(false); setEditVisible(true);}}>Edit</RectButtonSmall>
    </Rodal>
    {/*Overlay for EDITING event*/}
    <Rodal height='400' customStyles={{borderRadius: '20px', padding:'20px'}} visible={editVisible} closeOnEsc='true' onClose={() => setEditVisible(false)}>
        <div style={{fontSize: '20px', fontWeight: 'bold'}}>Edit {eventTitle}</div><br/>
        <EventInfo>
          <div>Title:</div><InputField value={eventTitle} onChange={e => {setEventTitle(e.target.value)}}></InputField>
          <EventLabel>Start:</EventLabel>
            <InputField type='datetime-local' onChange={e => {setEventStart(e.target.value)}}/>
          <EventLabel>End:</EventLabel>
            <InputField type='datetime-local' onChange={e => {setEventEnd(e.target.value)}}/>
          <div>Type:</div><div>
          <select style={{height: '35px', paddingLeft:'3%', border:'#E5E5E5', borderRadius: '20px', background:'#E5E5E5', marginBottom:'5px'}}>
            {eventLabels.map(({ label, value }) => (
            <option key={value} value={value}>{label}</option>))}
          </select>
          </div>
          <div>Description:</div><InputArea placeholder='Enter description here' onChange={e => setEventDesc(e.target.value)}></InputArea>
        </EventInfo>
        <br/>
        <div><RectButtonSmall onClick={() => checkEvent('put')}>Submit</RectButtonSmall></div>
      </Rodal>

      <Rodal height='200' width='200' customStyles={{borderRadius: '20px', padding:'20px'}} visible={warningVisible} closeOnEsc='true' onClose={() => setWarningVisible(false)}>
        <i class="fas fa-exclamation-circle fa-5x" style={{color: 'red', display: 'flex', alignItems: 'center', justifyContent:'center'}}></i>
        <div style={{textAlign:'center', marginTop: '10px'}}>{warning}</div>
      </Rodal>
  </div>
)} 