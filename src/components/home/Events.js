import React, {useState, useEffect} from 'react'
import { api, handleError } from '../../helpers/api'
import styled from 'styled-components'
import {Colors} from '../../views/design/Colors'
import ShadowScrollbars from '../../views/design/Scrollbars'
import { DateLabelHome } from '../../views/Labels'

const Event = styled.div`
  &:hover {
    transform: translateY(-2px);
    background: white;
    color: black;
  }
  width: 90%;
  height: 30px;
  margin-top: 5px;
  border-radius: 10px;
  vertical-align: center;
  padding-top: 3px;
  padding-left: 7px;
  overflow: hidden;
  text-overflow: ellipsis;
  color: white;
`;

function getEventColor(e) {
  if (e.label === 'EVENT') {return Colors.BLUE}
  if (e.label === 'MEETING') {return Colors.MEETING}
  if (e.label === 'LECTURE') {return Colors.LECTURES}
  if (e.label === 'EXERCISE') {return Colors.EXERCISES}
  if (e.label === 'EXAM') {return Colors.EXAMS}
  if (e.label === 'PRIVATE') {return Colors.PRIVATE}
  else {return Colors.DARK_GREY}
}

export default function Events() {

  useEffect(() => {getEvents(); console.log('mounted or updated');}, []);

  const today = new Date();

  const [events, setEvents] = useState({
    today: [], 
    tomorrow: [],
    thisMonth: [],
  });

  async function getEvents(){
    try {
      const response = await api.get('/users/'+ sessionStorage.getItem('id') +'/events')
      let todayArray = [];
      let tomorrowArray = [];
      let thisMonthArray = [];
      
      for (let e of response.data) {
        e.start= new Date(e.start.replace('\"','\''));
        e.end = new Date(e.end.replace('\"','\''));

        if(e.start.getFullYear() === today.getFullYear()){
          if (e.start.getMonth() === today.getMonth()){
            if(e.start.getDate() === today.getDate()){
              todayArray.push(e);
            }
            else if (e.start.getDate() === today.getDate() + 1){
              tomorrowArray.push(e);
            }
            else {
              thisMonthArray.push(e);
            }
          }
        }
      }

      setEvents({today: todayArray, tomorrow: tomorrowArray, thisMonth: thisMonthArray});
      
    } catch (error) {
      alert(`getEvent-Error: \n${handleError(error)}`);
    }
  }

  return (
    <ShadowScrollbars style={{height: 400}}>
      {events.today.length !== 0 ? <DateLabelHome>Today</DateLabelHome> : ''}
      {events.today.map(events => <Event style={{background: getEventColor(events)}}>{events.title}</Event>)}
      <br/>
      {events.tomorrow.length !== 0 ? <DateLabelHome>Tomorrow</DateLabelHome> : ''}
      {events.tomorrow.map(events => <Event style={{background: getEventColor(events)}}>{events.title}</Event>)}
      <br/>
      {events.thisMonth.length !== 0 ? <DateLabelHome>This Month</DateLabelHome> : ''}
      {events.thisMonth.map(events => <Event style={{background: getEventColor(events)}}>{events.title}</Event>)}
    </ShadowScrollbars>
  )
}