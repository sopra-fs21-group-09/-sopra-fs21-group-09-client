import React from "react";
import {Task, todaysTasks, tomorrowsTasks, nxtMonthsTasks, otherTasks} from "../task/Task";
import styled from "styled-components";
import {Colors} from "../../views/design/Colors";

const DateLabel = styled.label`
  margin-left: -1.5%;
  font-size: 20px;
  color: orange;  
`;

const InfoLabel = styled.label`
  font-size: 18px;
  color: black;  
`;

export function GroupTaskList(props) {
    const tasks = props.tasks;
    if (!tasks) {
        return null;
    }

    const todayTaskItem = todaysTasks(props).map((task) =>
        <Task name={task.name} description={task.description}
              time={task.deadline ? task.deadline.time : ""} id={task.id}/>
    );

    const tomorrowsTaskItem = tomorrowsTasks(props).map((task) =>
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

    console.log('otherTaskItem:'+ otherTaskItem)

    return (
            <div>
                <DateLabel>Today</DateLabel><br/>
                {todayTaskItem}
                <InfoLabel>{todayTaskItem.length == 0? '-> No tasks yet!': ''}</InfoLabel><br/>

                <DateLabel>Tomorrow</DateLabel><br/>
                {tomorrowsTaskItem}
                <InfoLabel>{tomorrowsTaskItem.length == 0? '-> No tasks yet!': ''}</InfoLabel><br/>

                <DateLabel>Next Month</DateLabel><br/>
                {nxtMonthsTaskItem}
                <InfoLabel>{nxtMonthsTaskItem.length == 0? '-> No tasks yet!': ''}</InfoLabel><br/>
            </div>
    )

}