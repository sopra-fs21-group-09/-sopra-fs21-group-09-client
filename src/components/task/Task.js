import styled from "styled-components";
import {Colors} from "../../views/design/Colors";
import React from "react";
import {CalendarContainer} from "../home/Calendar";
import {api, handleError} from "../../helpers/api";
import User from "../profile/User";

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
            //const response = await api.post('/tasks');

            //console.log('Marked as Done: ' + response.data);

        } catch (error) {
            alert(`Something went wrong during markedAsDone: \n${handleError(error)}`);
        }

    }

    return (<TaskContainer>
        <TaskButton
            onClick={()=>{setClosed(!open); markAsDone();}}
        >
            {open ? '' : <i className="fas fa-check fa-xs"></i>}
            }</TaskButton>
        {props.name}
    </TaskContainer>)
}

