import styled from "styled-components";
import {Colors} from "../../views/design/Colors";
import React, {useState} from "react";
import {CalendarContainer} from "../home/Calendar";
import {api, handleError} from "../../helpers/api";
import User from "../profile/User";
import {DateLabel} from "./Tasks";
import {today} from "../home/Dates";

export const TasksContainer = styled.div`
  margin: 0px 10px 0px 10px;
  heigth: 50%;
`;

export const TaskContainer = styled.div`
  &:hover {
    transform: translateY(-2px);
    background: ${Colors.TASK};
    color: white;
  }
  width: 100%;
  padding: 5px 0px 5px 10px;
  margin: 5px 0px 0px 0px;
  border: 3px solid #018692;
  border-radius: 45px;
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
  padding-left: 3.5px; 
  line-height: 23px;
  width: 23px;
  height: 23px;
`;

//TODO: if task marked as solved api.put()
export const Task = props => {
    const [open, setClosed] = React.useState(true)

    async function markAsDone(){
        try {
            //TODO: connect with backend POST/tasks
            console.log('markAsDone')
            const response = await api.delete('/task/'+props.id);

        } catch (error) {
            //alert(`Something went wrong during markedAsDone: \n${handleError(error)}`);
        }

    }

    return (<TaskContainer>
        <TaskButton onClick={()=>{setClosed(!open); markAsDone();}}>
            {open ? '' : <i className="fas fa-check fa-xs"></i>}
        </TaskButton>
        {props.name}
        {' '}
        {/*props.description*/}
        {' '}
        {/*props.time*/}
    </TaskContainer>)
}

function todaysDate(){
    var today = new Date();
    var dd = String(today.getDate()).padStart(2, '0');
    var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
    var yyyy = today.getFullYear();

    today = yyyy + '-' + mm + '-' + dd;
    return today;
}


function todaysTasks(props) {
    const tasks = props.tasks;
    const taskArray = []
    for (var i = 0; i < tasks.length; i++) {
        if (tasks[i].deadline) {
            if (tasks[i].deadline.time.includes(todaysDate())) {
                taskArray.push(tasks[i])
            }}
    }

    return taskArray

}

function nxtMonthsTasks(props) {
    const tasks = props.tasks;
    const taskArray = []
    for (var i = 0; i < tasks.length; i++) {
        if (tasks[i].deadline) {
            if (!tasks[i].deadline.time.includes(todaysDate())) {
                taskArray.push(tasks[i])
            }}
    }

    return taskArray

}


function otherTasks(props) {
    const tasks = props.tasks;
    const taskArray = []
    for (var i = 0; i < tasks.length; i++) {
        if (!tasks[i].deadline) {
            taskArray.push(tasks[i])
        }
    }

    return taskArray

}

export function TaskList(props) {
    const tasks = props.tasks;
    const [tasksToday, setTasksToday] = useState()
    if (!tasks) {
        return null;
    }

    const todaysTaskItem = todaysTasks(props).map((task) =>
        <Task name={task.name} description={task.description}
              time={task.deadline ? task.deadline.time : ""} id={task.id}/>
    );

    const otherTaskItem = otherTasks(props).map((task) =>
        <Task name={task.name} description={task.description}
              time={task.deadline ? task.deadline.time : ""} id={task.id}/>
    );

    const nxtMonthsTaskItem = nxtMonthsTasks(props).map((task) =>
        <Task name={task.name} description={task.description}
              time={task.deadline ? task.deadline.time : ""} id={task.id}/>
    );



    //const tasksToday2 = tasks.filter( (task) => task.deadline.time.includes("30"))
    /*const taskItemToday = tasks.filter(task => task.name.includes('s')).map((taskToday) =>
        <Task name={taskToday.name} description={taskToday.description}
              time={taskToday.deadline ? taskToday.deadline.time : ""} id={taskToday.id}/>
    );

    let filteredNumbers = tasks.filter(function (task) {
        const array = []
        if (task.deadline) {
            if (task.deadline.time) {
                array.push(task)
            }
        }
        setTasksToday(array)
    });*/
    //setTasksToday(test(props))


    return (
        <div class='row'>
            <div class='column'>
                <DateLabel>Today</DateLabel>
                {todaysTaskItem}
            </div>
            <div class='column'>
                <DateLabel>Next Month</DateLabel>
                {nxtMonthsTaskItem}
                <DateLabel>No Date</DateLabel>
                {otherTaskItem}
            </div>
        </div>
    )

}

