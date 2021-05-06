import React from "react";
import {Task, todaysTasks, tomorrowsTasks, nxtMonthsTasks, otherTasks} from "../task/Task";
import styled from "styled-components";

const DateLabel = styled.label`
  font-size: 20px;
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
                <DateLabel>{tomorrowsTaskItem? 'Tomorrow': ''}</DateLabel><br/>
                {tomorrowsTaskItem}
                <DateLabel>{nxtMonthsTaskItem? 'Next Month': ''}</DateLabel>
                {nxtMonthsTaskItem}
            </div>
    )

}