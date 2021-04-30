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

            //console.log('Marked as Done: ' + response.data);

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
        {props.description}
        {' '}
        {/*props.time*/}
    </TaskContainer>)
}


export function TaskListNEW(props) {
    const tasks = props.tasks;
    const [tasksToday, setTasksToday] = useState()
    if (!tasks) {
        return null;
    }

    const taskItem = tasks.map((task) =>
        <Task name={task.name} description={task.description}
              time={task.deadline ? task.deadline.time : ""} id={task.id}/>
    );


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

    console.log('TASK1 Deadline:')
    //console.log(tasks[0].deadline)


    return (
        <div class='row'>
            <div class='column'>
                <DateLabel>Today</DateLabel>
                {taskItem}
            </div>
            <div class='column'>
                <DateLabel>Tomorrow</DateLabel>
                <Task name='Assignment'/>
                <DateLabel>22.05.2021</DateLabel>
                <Task name='Read Book'/>
                <Task name='Paper'/>
                <DateLabel>23.05.2021</DateLabel>
                <Task name='Assignment'/>
                <Task name='M2'/>
                <DateLabel>24.05.2021</DateLabel>
                <Task name='Reading'/>
                <Task name='Assignment'/>
                <DateLabel>25.05.2021</DateLabel>
                <Task name='Paper'/>
                <Task name='Assignment'/>
            </div>
        </div>
    )

}

