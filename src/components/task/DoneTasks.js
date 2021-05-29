import React from "react";
import {api, handleError} from "../../helpers/api";
import ShadowScrollbars from "../../views/design/Scrollbars";
import {TaskButton, TaskContainer} from "./Task";
import styled from "styled-components";

const InfoLabel = styled.label`
  display: flex;
  justify-content: center;
  font-size: 14px;
  color: black;  
`;

export const DoneTasks = props => {
    const [open, setClosed] = React.useState(false)

    //deletes task
    async function markAsUnDone(){
        try {
            console.log('markAsUnDone '+ props.id)
            await api.patch(`users/${sessionStorage.getItem('id')}/tasks/${props.id}`);

        } catch (error) {
            alert(`Something went wrong during deleting the task: \n${handleError(error)}`);
        }
    }

    return (<TaskContainer style={{margin: '5px 0px 0px 5%'}}>
        <TaskButton onClick={()=>{setClosed(true); markAsUnDone();}}>
            {open ? '' : <i className="fas fa-check fa-xs"/>}
        </TaskButton>
        {props.name}
        {' '}
        {' '}
    </TaskContainer>)
}

export function doneTasks(props) {
    const tasks = props.doneTasks;
    const taskArray = []

    for (let i=0; i < tasks.length; i++){
        taskArray.push(tasks[i])
    }

    return taskArray

}

export function DoneTaskList(props) {
    const tasks = props.doneTasks;
    if (!tasks) {
        return null;
    }

    const taskItem = doneTasks(props).map((task) =>
        <DoneTasks name={task.name} description={task.description}
                   time={task.deadline ? task.deadline.time : ""} id={task.id}/>
    );

    return (
        <div>
            <ShadowScrollbars style={{height: 200}}>
                <InfoLabel>{taskItem.length === 0? '-> No tasks done yet!': ''}</InfoLabel>
                {taskItem}
            </ShadowScrollbars>
        </div>
    )

}

