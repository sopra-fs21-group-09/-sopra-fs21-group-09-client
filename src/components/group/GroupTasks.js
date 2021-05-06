import React from "react";
import {Task, todaysTasks, tomorrowsTasks, nxtMonthsTasks, otherTasks} from "../task/Task";
import styled from "styled-components";
import ShadowScrollbars from "../../views/design/Scrollbars";

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
                <ShadowScrollbars style={{height: 80}}>
                    {todayTaskItem}
                </ShadowScrollbars>
                <InfoLabel>{todayTaskItem.length == 0? '-> No tasks yet!': ''}</InfoLabel><br/>

                <DateLabel>Tomorrow</DateLabel><br/>
                <ShadowScrollbars style={{height: 80}}>
                    {tomorrowsTaskItem}
                </ShadowScrollbars>
                <InfoLabel>{tomorrowsTaskItem.length == 0? '-> No tasks yet!': ''}</InfoLabel><br/>

                <DateLabel>Next Month</DateLabel><br/>
                <ShadowScrollbars style={{height: 80}}>
                    {nxtMonthsTaskItem}
                </ShadowScrollbars>
                <InfoLabel>{nxtMonthsTaskItem.length == 0? '-> No tasks yet!': ''}</InfoLabel><br/>
            </div>
    )

}