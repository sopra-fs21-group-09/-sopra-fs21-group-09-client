import styled from "styled-components";
import {Colors} from "../../views/design/Colors";
import React from "react";
import {api} from "../../helpers/api";

export const GroupTaskContainer = styled.div`
  &:hover {
    transform: translateY(-2px);
    background: ${Colors.TASK};
    color: white;
  }
  width: 90%;
  padding: 4px 0px 5px 10px;
  margin: 5px 0px 0px 5%;
  border: 3px solid #018692;
  border-radius: 45px;
  display: flex;
  align-items: center;
  background: #E5E5E5;
`;

export const GroupTaskButton = styled.button` 
  &:hover {
    transform: translateY(-0.5px);
    color: white;
    cursor: pointer;
  }
  background-color: white;
  border: none;
  color: white;
  text-align: center;
  border-radius: 50%;
  margin-right: 10px; 
  display: inline-block;
  padding: 0;
  padding-left: 0px; 
  line-height: 23px;
  width: 23px;
  height: 23px;
`;

export const GroupTask = props => {
    const [open, setClosed] = React.useState(true)

    async function markAsDone(){
        try {
            console.log('markAsDone')
            await api.delete('/tasks/'+props.id);

        } catch (error) {
            //alert(`Something went wrong during markedAsDone: \n${handleError(error)}`);
        }

    }

    return (<GroupTaskContainer>
        <GroupTaskButton onClick={()=>{setClosed(false); markAsDone();}}>
            {open ? '' : <i className="fas fa-check fa-xs"></i>}
        </GroupTaskButton>
        {props.name}
        {' '}
        {/*props.description*/}
        {' '}
        {/*props.time*/}
    </GroupTaskContainer>)
}

function todayGroupDate(){
    let today = new Date();
    const dd = String(today.getDate()).padStart(2, '0');
    const mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
    const yyyy = today.getFullYear();

    today = yyyy + '-' + mm + '-' + dd;
    return today;
}

function tomorrowsGroupDate(){
    let tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    const dd = String(tomorrow.getDate()).padStart(2, '0');
    const mm = String(tomorrow.getMonth() + 1).padStart(2, '0'); //January is 0!
    const yyyy = tomorrow.getFullYear();

    tomorrow = yyyy + '-' + mm + '-' + dd;
    return tomorrow;
}


export function todayGroupTasks(props) {
    const tasks = props.tasks;
    const taskArray = []
    for (let i = 0; i < tasks.length; i++) {
        if (tasks[i].deadline) {
            if (tasks[i].deadline.time.includes(todayGroupDate())) {
                taskArray.push(tasks[i])
            }}
    }
    return taskArray
}

export function tomorrowsGroupTasks(props) {
    const tasks = props.tasks;
    const taskArray = []
    for (let i = 0; i < tasks.length; i++) {
        if (tasks[i].deadline) {
            if (tasks[i].deadline.time.includes(tomorrowsGroupDate())) {
                taskArray.push(tasks[i])
            }}
    }
    return taskArray
}

export function nxtMonthsGroupTasks(props) {
    const tasks = props.tasks;
    const taskArray = []
    for (let i = 0; i < tasks.length; i++) {
        if (tasks[i].deadline) {
            if (!tasks[i].deadline.time.includes(todayGroupDate()) && !tasks[i].deadline.time.includes(tomorrowsGroupDate())) {
                taskArray.push(tasks[i])
            }}
    }
    return taskArray
}


export function otherGroupTasks(props) {
    const tasks = props.tasks;
    const taskArray = []
    for (let i = 0; i < tasks.length; i++) {
        if (!tasks[i].deadline) {
            taskArray.push(tasks[i])
        }
    }
    return taskArray
}
