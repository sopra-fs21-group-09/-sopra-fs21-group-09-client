import styled from "styled-components";
import {Colors} from "../../views/design/Colors";
import React from "react";
import {api, handleError} from "../../helpers/api";
import ShadowScrollbars from "../../views/design/Scrollbars";
import { DateLabelHome } from "../../views/Labels"

export const TasksContainer = styled.div`
  margin: 0px 10px 0px 10px;
  height: 50%;
`;

export const TaskContainer = styled.div`
  &:hover {
    transform: translateY(-2px);
    background: ${Colors.TASK};
    color: white;
  }
  width: 90%;
  padding: 4px 0px 5px 10px;
  border: 3px solid #018692;
  border-radius: 45px;
  display: flex;
  align-items: center;
  background: #E5E5E5;
`;

export const TaskButton = styled.button` 
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

export const DateLabel = styled.label`
  margin-left: 5%;
  font-size: 20px;
  color: orange;
`;

const InfoLabel = styled.label`
  margin-left: 6.5%;
  font-size: 18px;
  color: black;  
`;

export const Task = props => {
    const [open, setClosed] = React.useState(true)

    //deletes task
    async function markAsDone(){
        try {
            console.log('markAsDone '+ props.id)
            await api.delete('/tasks/'+props.id);

        } catch (error) {
            alert(`Something went wrong during deleting the task: \n${handleError(error)}`);
        }
    }

    return (<TaskContainer style={{margin: '5px 0px 0px 5%'}}>
        <TaskButton onClick={()=>{setClosed(false); markAsDone();}}>
            {open ? '' : <i className="fas fa-check fa-xs"/>}
        </TaskButton>
        {props.name}
        {' '}
        {/*props.description*/}
        {' '}
        {/*props.time*/}
    </TaskContainer>)
}

function todaysDate(){
    let today = new Date();
    let dd = String(today.getDate()).padStart(2, '0');
    let mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
    let yyyy = today.getFullYear();

    today = yyyy + '-' + mm + '-' + dd;
    return today;
}

function tomorrowsDate(){
    let tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    let dd = String(tomorrow.getDate()).padStart(2, '0');
    let mm = String(tomorrow.getMonth() + 1).padStart(2, '0'); //January is 0!
    let yyyy = tomorrow.getFullYear();

    tomorrow = yyyy + '-' + mm + '-' + dd;
    return tomorrow;
}


export function todaysTasks(props) {
    const tasks = props.tasks;
    const taskArray = []
    for (let i = 0; i < tasks.length; i++) {
        if (tasks[i].deadline) {
            if (tasks[i].deadline.time.includes(todaysDate())) {
                taskArray.push(tasks[i])
            }}
    }
    return taskArray

}

export function tomorrowsTasks(props) {
    const tasks = props.tasks;
    const taskArray = []
    for (let i = 0; i < tasks.length; i++) {
        if (tasks[i].deadline) {
            if (tasks[i].deadline.time.includes(tomorrowsDate())) {
                taskArray.push(tasks[i])
            }}
    }
    return taskArray

}

export function nxtMonthsTasks(props) {
    const tasks = props.tasks;
    const taskArray = []
    for (let i = 0; i < tasks.length; i++) {
        if (tasks[i].deadline) {
            if (!tasks[i].deadline.time.includes(todaysDate()) && !tasks[i].deadline.time.includes(tomorrowsDate())) {
                taskArray.push(tasks[i])
            }}
    }
    return taskArray

}


export function otherTasks(props) {
    const tasks = props.tasks;
    const taskArray = []
    for (let i = 0; i < tasks.length; i++) {
        if (!tasks[i].deadline) {
            taskArray.push(tasks[i])
        }
    }
    return taskArray

}

export function TaskList(props) {
    const tasks = props.tasks;
    if (!tasks) {
        return null;
    }

    const todaysTaskItem = todaysTasks(props).map((task) =>
        <Task name={task.name} description={task.description}
              time={task.deadline ? task.deadline.time : ""} id={task.id}/>
    );

    const tomorrowsTaskItem = tomorrowsTasks(props).map((task) =>
        <Task name={task.name} description={task.description}
              time={task.deadline ? task.deadline.time : ""} id={task.id}/>
    );

    const nxtMonthsTaskItem = nxtMonthsTasks(props).map((task) =>
        <Task name={task.name} description={task.description}
              time={task.deadline ? task.deadline.time : ""} id={task.id}/>
    );

    const otherTaskItem = otherTasks(props).map((task) =>
        <Task name={task.name} description={task.description}
              time={task.deadline ? task.deadline.time : ""} id={task.id}/>
    );

    return (
        <div className='row'>
            <div className='column'>
                <DateLabel>Today</DateLabel>
                <ShadowScrollbars style={{height: 250}}>
                    <InfoLabel>{todaysTaskItem.length === 0? 'No tasks yet!': ''}</InfoLabel>
                    {todaysTaskItem}
                </ShadowScrollbars>
                <DateLabel>{tomorrowsTaskItem? 'Tomorrow': ''}</DateLabel>
                <ShadowScrollbars style={{height: 250}}>
                    <InfoLabel>{tomorrowsTaskItem.length === 0? 'No tasks yet!': ''}</InfoLabel>
                    {tomorrowsTaskItem}
                </ShadowScrollbars>
            </div>
            <div className='column'>
                <DateLabel>{nxtMonthsTaskItem? 'Later': ''}</DateLabel>
                <ShadowScrollbars style={{height: 500}}>
                    <InfoLabel>{nxtMonthsTaskItem.length === 0? 'No tasks yet!': ''}</InfoLabel>
                    {nxtMonthsTaskItem}
                </ShadowScrollbars>

                {/*<DateLabel>{otherTasks!=[]? 'No Date': 'x'}</DateLabel>
                {otherTaskItem}*/}
            </div>
        </div>
    )

}

export function TasksForHome(props){
    const tasks = props.tasks;
    if (!tasks) {
        return null;
    }

    const todaysTaskItem = todaysTasks(props).map((task) =>
        <Task name={task.name} description={task.description}
              time={task.deadline ? task.deadline.time : ""} id={task.id}/>
    );

    const tomorrowsTaskItem = tomorrowsTasks(props).map((task) =>
        <Task name={task.name} description={task.description}
              time={task.deadline ? task.deadline.time : ""} id={task.id}/>
    );

    const nxtMonthsTaskItem = nxtMonthsTasks(props).map((task) =>
        <Task name={task.name} description={task.description}
              time={task.deadline ? task.deadline.time : ""} id={task.id}/>
    );


    return (
        <div>
            {todaysTaskItem.length!==0 ? <DateLabelHome>Today</DateLabelHome> : ''}
                {todaysTaskItem}
            {tomorrowsTaskItem.length!==0 ? <DateLabelHome>Tomorrow</DateLabelHome> : ''}
                {tomorrowsTaskItem}
            {nxtMonthsTaskItem.length!==0 ? <DateLabelHome>Later</DateLabelHome> : ''}
                {nxtMonthsTaskItem}
        </div>
    )

}

export const Deadline = props => {
    return (<TaskContainer style={{margin: '5px 0px 0px 0px'}}>
        <p style={{marginTop:'0px', marginBottom:'0px', marginRight:'25px'}}>{props.time.slice(0,10)+'\t'}</p>
        {'\t'+props.name}
    </TaskContainer>)
}



export function DeadlinesForModule(props){
    const deadlines = props.tasks.map((task) =>
        <Deadline name={task.name} description={task.description}
              time={task.deadline ? task.deadline.time : ""} id={task.id}/>
    );
    return(
        <div>
            {deadlines}
        </div>
    )

}

