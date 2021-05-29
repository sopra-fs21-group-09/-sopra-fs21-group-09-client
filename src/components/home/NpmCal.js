import React, {useState, useEffect} from 'react'
import {useHistory} from "react-router-dom"
import styled from 'styled-components'
import { Calendar, Views, momentLocalizer} from 'react-big-calendar'
import moment from 'moment'
import '../../../node_modules/react-big-calendar/lib/css/react-big-calendar.css'
import Rodal from 'rodal'
import 'rodal/lib/rodal.css'
import {CircleButton, RectButtonSmall, DeleteButton} from '../../views/Button'
import { InputField, InputArea } from '../../views/Labels'
import { api, handleError } from '../../helpers/api'
import { Colors } from '../../views/design/Colors'
import "../../views/design/StyleSheet.css"
import ShadowScrollbars from "../../views/design/Scrollbars";

const EventInfo = styled.div`
  display grid;
  grid-template-columns: 25% 75%;
  grid-template-rows: 1;
  grid-column-gap: 1em;
  justifyContent: center;
  margin-top: 5px;
`;

export const DoubleButton = styled.div`
  bottom: 0px;
  display: grid;
  grid-template-columns: 50% 50%;
  grid-template-rows: 1;
  grid-column-gap: 1em;
  margin-top: 10px;
  alignItems: center; 
  justifyContent:center;
`;

const EventLabel = styled.div`
  padding-top: 8px;
  font-weight: bold;
`; 

const ColoredDateCellWrapper = ({ children }) =>
  React.cloneElement(React.Children.only(children), {
    style: {
    },
})

const ColoredEventWrapper = events => {
  return {
    style: {
      background: getEventColor(events),
      border: getEventColor(events),
    }
  }
}

function getEventColor(e) {
  if (e.label === 'EVENT') {return Colors.BLUE}
  if (e.label === 'MEETING') {return Colors.MEETING}
  if (e.label === 'LECTURE') {return Colors.LECTURES}
  if (e.label === 'EXERCISE') {return Colors.EXERCISES}
  if (e.label === 'EXAM' || e.label == 'DEADLINE') {return Colors.EXAMS}
  if (e.label === 'PRIVATE') {return Colors.PRIVATE}
  else {return Colors.DARK_GREY}
}

//calendar time formatting
const localizer = momentLocalizer(moment)

export default function NpmCal() {

  //rerendering when calendar constant changes
  const [calendar, setCalendar] = useState(0);
  const [render, setRender] = useState(0);
  useEffect(() => {getEvents()}, []);
  useEffect(() => {getEvents(); setRender(render+1); console.log('mounted or updated');}, [calendar]);
  useEffect(() => {getEvents(); console.log('rerendering')}, [render]);
  useEffect(() => {getEvents()}, [approval]);

  const history = useHistory();
  const routeChange = () =>{ 
    let path = `tasks`; 
    history.push(path);
  }

  const initialState = {
    id: "",
    title: "",
    start: new Date(),
    end: new Date(),
    allDay: false,
    desc: "",
    label: "EVENT"
  };

  const [event, setEvent] = useState(initialState);
  const [events, setEvents] = useState([]);

  //reset event so when one event submitted, initial values appear in add-overlay
  function resetEvent(){
    setEvent(initialState);
  }

  //constants for rodal-overlay visibility 
  const [addVisible, setAddVisible] = useState(false);
  const [eventVisible, setEventVisible] = useState(false);
  const [taskVisible, setTaskVisible] = useState(false);
  const [editVisible, setEditVisible] = useState(false);

  //show warning for invalid inputs
  const [warningVisible, setWarningVisible] = useState(false);
  const [warning, setWarning] = useState(false);

  //show approval for successful state
  const [approvalVisible, setApprovalVisible] = useState(false);
  const [approval, setApproval] = useState(false);

  //show deletion warning
  const [deleteWarningVisible, setDeleteWarningVisible] = useState(false);

  //event-label dropdown menu 
  const [eventLabels] = React.useState([ //TODO: Set default event type
      {label: "Event", value: "EVENT"},
      {label: "Lecture", value: "LECTURE"},
      {label: "Exercise", value: "EXERCISE"},
      {label: "Meeting", value: "MEETING"},
      {label: "Exam", value: "EXAM"},
      {label: "Private", value: "PRIVATE"},    
    ]);

  //check if event is valid -> required: title, start, end, label, start<end
  function checkEvent(method) {
    if(event.title){
      if(new Date(event.start)<new Date(event.end)){
        if(method==='put'){
          putEvent();
          setApproval("Your event has been updated!");
        }
        if(method==='post'){
          postEvent();
          setApproval("Your event has been created!");
        }
        setCalendar(calendar+1);
        setRender(render+1);
        setAddVisible(false);
        setEditVisible(false);
        setApprovalVisible(true);
        resetEvent();
      } else {
        setWarning('Start date must be earlier than end time!');
        setWarningVisible(true);
      }
    } else {
        setWarning('Please enter a title!');
        setWarningVisible(true);
    }
  }
  
  async function getEvents(){
    try {
      const response_events = await api.get('/users/'+ sessionStorage.getItem('id') +'/events')
      const response_deadlines = await api.get('/users/'+ sessionStorage.getItem('id') + '/deadlines')
      
      let response = response_events.data.concat(response_deadlines.data)

      for (let e of response) {
        e.start= new Date(e.start.replace('\"','\''));
        e.end = new Date(e.end.replace('\"','\''));
      }

      setEvents(response);

    } catch (error) {
      alert(`getEvent-Error: \n${handleError(error)}`);
    }
  }

  async function deleteEvent() {
    try {
      await api.delete('/events/'+ event.id)
      setDeleteWarningVisible(false);
      setEventVisible(false);
      setEditVisible(false);
      setApproval('Your event has been deleted')
      setApprovalVisible(true);
      resetEvent();
      getEvents();
      setCalendar(calendar+1);
    } catch (error){
      alert(`deleteEvent-Error: \n${handleError(error)}`);
    }
  }
    
  function postEvent(){
      try {
          const requestBody = JSON.stringify({
              title: event.title,
              start: event.start,
              end: event.end,
              allDay: event.allDay,
              desc: event.desc,
              label: event.label,
          });

          api.post('/users/'+ sessionStorage.getItem('id') +'/events', requestBody)

      } catch (error) {
          alert(`postEvent-Error: \n${handleError(error)}`);
      }
  }

  async function putEvent(){
    try {
        const requestBody = JSON.stringify({
            id: event.id,
            title: event.title,
            start: event.start,
            end: event.end,
            desc: event.desc,
            label: event.label,
        });

        await api.put('/events/'+event.id, requestBody)

    } catch (error) {
        alert(`postEvent-Error: \n${handleError(error)}`);
    }
  }

  function addZero(i) { if (i < 10) { i = "0" + i; } return i; }

  function toDatetimeLocal(d){
    let date = new Date(d);
    let
    YYYY = date.getFullYear(),
    MM = addZero(date.getMonth() + 1),
    DD = addZero(date.getDate()),
    HH = addZero(date.getHours()),
    II = addZero(date.getMinutes());

    return YYYY+'-'+MM+'-'+DD+'T'+HH+':'+II;
  }

  return (
    <div>
    <Calendar
      popup
      selectable
      events={events}
      views={Views.week}
      step={15}
      timeslots={8}
      defaultView={Views.WEEK}
      defaultDate={new Date()}
      eventPropGetter={ColoredEventWrapper}
      components={{
        timeSlotWrapper: ColoredDateCellWrapper
      }}
      localizer={localizer}
      onSelectEvent={e => {setEvent(e); (event.label=='DEADLINE'? setTaskVisible(true) : setEventVisible(true));}}
      onSelectSlot={e => {setEvent({...event, title:'', start:e.start, end:e.end}); setAddVisible(true);}}
    />
    <CircleButton
      style={{position: 'absolute', bottom: 5, right: 5, filter: 'drop-shadow(0px 4px 4px rgba(0, 0, 0, 0.25)'}}
      onClick={() => {resetEvent(); setAddVisible(true);}}><i className="fas fa-plus fa-2x"/></CircleButton>

      {/*Overlay for ADDING Event */}
      <Rodal height={430} customStyles={{borderRadius: '20px', padding:'20px'}} visible={addVisible} closeOnEsc={true} onClose={() => setAddVisible(false)}>
        <div style={{fontSize: '20px', fontWeight: 'bold'}}>Add Event</div><br/>
        <EventInfo>
          <EventLabel>Title:</EventLabel><InputField placeholder='Enter title here' value={event.title} onChange={e => setEvent({ ...event, title: e.target.value})}/>
          <EventLabel>Start:</EventLabel>
            <InputField type='datetime-local' value={toDatetimeLocal(event.start)} onChange={e => setEvent({ ...event, start: e.target.value})}/>
          <EventLabel>End:</EventLabel>
            <InputField type='datetime-local' value={toDatetimeLocal(event.end)} onChange={e => setEvent({ ...event, end: e.target.value})}/>
          <EventLabel style={{marginBottom:'10px'}}>All Day:</EventLabel>
            <input type='checkbox' style={{position: 'relative', top:'30%'}} onClick={() => setEvent({ ...event, allDay: !event.allDay})}/>
          <EventLabel>Label:</EventLabel>
          <div>
            <select style={{height: '35px', paddingLeft:'3%', border:'#E5E5E5', borderRadius: '20px', background:'#E5E5E5', marginBottom:'5px'}} 
                    onChange={e => setEvent({ ...event, label: e.target.value})}>
              {eventLabels.map(({ label, value }) => (
              <option key={value} value={value}>{label}</option>))}
            </select>
          </div>
          <EventLabel>Description:</EventLabel><InputArea placeholder='Enter description here' onChange={e => setEvent({ ...event, desc: e.target.value})}/>
        </EventInfo>
        <RectButtonSmall onClick={() => checkEvent('post')}>Submit</RectButtonSmall>
      </Rodal>

    {/*Overlay for giving DETAILS of an EVENT*/}
    <Rodal height={270} customStyles={{borderRadius: '20px', padding:'20px'}} visible={eventVisible} closeOnEsc={true} onClose={() => {setEventVisible(false)}}>
        <div style={{fontSize: '20px', fontWeight: 'bold', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap'}}>{event.title}</div><br/>
        <EventInfo>
          <div style={{fontWeight:'bold'}}>Start:</div><div>{event.start.toLocaleString()}</div>
          <div style={{fontWeight:'bold'}}>End:</div><div>{event.end.toLocaleString()}</div>
          <div style={{fontWeight:'bold'}}>Label:</div><div>{event.label}</div>
          <div style={{fontWeight:'bold'}}>Description:</div><ShadowScrollbars style={{height: 70}}><div style={{whiteSpace: 'pre-line'}}>{event.desc}</div></ShadowScrollbars>
        </EventInfo>
        <DoubleButton style={{gridTemplateColumns: '80% 15%'}}>
          <RectButtonSmall onClick={() => {setEventVisible(false); setEditVisible(true);}}>Edit</RectButtonSmall>
          <DeleteButton onClick={() => setDeleteWarningVisible(true)}>
            <i className="far fa-trash-alt" aria-hidden="true"/>
          </DeleteButton>
        </DoubleButton>
    </Rodal>

    {/*giving DETAILS of a TASK*/}
    <Rodal height={240} customStyles={{borderRadius: '20px', padding:'20px'}} visible={taskVisible} closeOnEsc={true} onClose={() => {setTaskVisible(false)}}>
        <div style={{fontSize: '20px', fontWeight: 'bold', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap'}}>{event.title}</div><br/>
        <EventInfo>
          <div style={{fontWeight:'bold'}}>Date:</div><div>{event.start.toLocaleDateString('de-DE')}</div>
          <div style={{fontWeight:'bold'}}>Label:</div><div>{event.label}</div>
          <div style={{fontWeight:'bold'}}>Description:</div><ShadowScrollbars style={{height: 70}}><div style={{whiteSpace: 'pre-line'}}>{event.desc}</div></ShadowScrollbars>
        </EventInfo>
        <RectButtonSmall onClick={routeChange}>Go to Tasks</RectButtonSmall>
    </Rodal>

    {/*Overlay for EDITING event*/}
    <Rodal height={430} customStyles={{borderRadius: '20px', padding:'20px'}} visible={editVisible} closeOnEsc={true} onClose={() => setEditVisible(false)}>
        <div style={{fontSize: '20px', fontWeight: 'bold'}}>Edit event</div><br/>
        <EventInfo>
          <EventLabel>Title:</EventLabel><InputField value={event.title} onChange={e => setEvent({ ...event, title: e.target.value})}/>
          <EventLabel style={{marginBottom:'10px'}}>All Day:</EventLabel>
            {event.allDay? 
              <input type='checkbox' checked style={{position: 'relative', top:'30%'}} onClick={() => setEvent({ ...event, allDay: !event.allDay})}/> : 
              <input type='checkbox' style={{position: 'relative', top:'30%'}} onClick={() => setEvent({ ...event, allDay: !event.allDay})}/>}
          <EventLabel>Start:</EventLabel>
            <InputField type='datetime-local' value={toDatetimeLocal(event.start)} onChange={e => setEvent({ ...event, start: e.target.value})}/>
          <EventLabel>End:</EventLabel>
            <InputField type='datetime-local' value={toDatetimeLocal(event.end)} onChange={e => setEvent({ ...event, end: e.target.value})}/>
          <EventLabel>Label:</EventLabel><div>
          <select style={{height: '35px', paddingLeft:'3%', border:'#E5E5E5', borderRadius: '20px', background:'#E5E5E5', marginBottom:'5px'}} value={event.label} onChange={e => setEvent({ ...event, label: e.target.value})}>
            {eventLabels.map(({ label, value }) => ( 
            <option key={value} value={value}>{label}</option>))}
          </select>
          </div>
          <EventLabel>Description:</EventLabel><InputArea placeholder='Enter description here' value={event.desc} onChange={e => setEvent({ ...event, desc: e.target.value})}/>
        </EventInfo>
        <RectButtonSmall onClick={() => checkEvent('put')}>Submit</RectButtonSmall>
      </Rodal>

      {/*Overlay for warnings of some sort.*/}
      <Rodal height={200} width={200} customStyles={{borderRadius: '20px', padding:'20px'}} visible={warningVisible} closeOnEsc={true} onClose={() => setWarningVisible(false)}>
        <i className="fas fa-exclamation-circle fa-5x" style={{color: 'red', display: 'flex', alignItems: 'center', justifyContent:'center'}}/>
        <div style={{textAlign:'center', marginTop: '10px'}}>{warning}</div>
      </Rodal>

      {/*Overlay for confirmation of SETTING/EDITING/DELETING event*/}
      <Rodal height={170} width={200} customStyles={{borderRadius: '20px', padding:'20px'}} visible={approvalVisible} closeOnEsc={true} onClose={() => setApprovalVisible(false)}>
        <i className="fa fa-check-circle fa-5x" aria-hidden="true" style={{color: 'green', display: 'flex', alignItems: 'center', justifyContent:'center'}}/>
        <div style={{textAlign:'center', marginTop: '10px'}}>{approval}</div>
      </Rodal>

      {/*Overlay for DELETING event*/}
      <Rodal height={200} width={300} customStyles={{borderRadius: '20px', padding:'20px'}} visible={deleteWarningVisible} closeOnEsc={true} onClose={() => setDeleteWarningVisible(false)}>
        <i className="far fa-trash-alt fa-4x" aria-hidden="true" style={{color: 'red', display: 'flex', alignItems: 'center', justifyContent:'center'}}/>
        <div style={{textAlign:'center', marginTop: '10px', overflow: 'hidden', textOverflow: 'ellipsis'}}>Are you sure you want to delete this event?</div>
        <DoubleButton  style={{gridTemplateColumns: '40% 40%'}}>
          <DeleteButton onClick={() => deleteEvent()}>YES</DeleteButton>
          <RectButtonSmall style={{marginLeft: '12px'}} onClick={() => setDeleteWarningVisible(false)}>NO</RectButtonSmall>
        </DoubleButton>
      </Rodal>
  </div>
)} 