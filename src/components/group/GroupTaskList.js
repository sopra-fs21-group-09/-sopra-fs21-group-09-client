import React from "react";
import {GroupTask, todayGroupTasks, tomorrowsGroupTasks, nxtMonthsGroupTasks, otherGroupTasks} from "./GroupTask";
import styled from "styled-components";
import ShadowScrollbars from "../../views/design/Scrollbars";

const DateLabel = styled.label`
  margin-left: 3.5%;
  font-size: 20px;
  color: orange;  
`;

const InfoLabel = styled.label`
  font-size: 18px;
  margin-left: 4%;
  color: black;  
`;

export function GroupTaskList(props) {
    const tasks = props.tasks;
    if (!tasks) {
        return null;
    }

    const todayGroupTaskItem = todayGroupTasks(props).map((task) =>
        <GroupTask name={task.name} description={task.description}
              time={task.deadline ? task.deadline.time : ""} id={task.id}/>
    );

    const tomorrowsGroupTaskItem = tomorrowsGroupTasks(props).map((task) =>
        <GroupTask name={task.name} description={task.description}
              time={task.deadline ? task.deadline.time : ""} id={task.id}/>
    );

    const otherGroupTaskItem = otherGroupTasks(props).map((task) =>
        <GroupTask name={task.name} description={task.description}
              time={task.deadline ? task.deadline.time : ""} id={task.id}/>
    );

    const nxtMonthsGroupTaskItem = nxtMonthsGroupTasks(props).map((task) =>
        <GroupTask name={task.name} description={task.description}
              time={task.deadline ? task.deadline.time : ""} id={task.id}/>
    );

    return (
            <div>
                <DateLabel>Today</DateLabel><br/>
                <ShadowScrollbars style={{height: 120}}>
                    <InfoLabel>{todayGroupTaskItem.length === 0? '-> No tasks yet!': ''}</InfoLabel>
                    {todayGroupTaskItem}
                </ShadowScrollbars><br/>

                <DateLabel>Tomorrow</DateLabel><br/>
                <ShadowScrollbars style={{height: 120}}>
                    <InfoLabel>{tomorrowsGroupTaskItem.length === 0? '-> No tasks yet!': ''}</InfoLabel>
                    {tomorrowsGroupTaskItem}
                </ShadowScrollbars><br/>

                <DateLabel>Later</DateLabel><br/>
                <ShadowScrollbars style={{height: 120}}>
                    <InfoLabel>{nxtMonthsGroupTaskItem.length === 0? '-> No tasks yet!': ''}</InfoLabel>
                    {nxtMonthsGroupTaskItem}
                </ShadowScrollbars><br/>

            </div>
    )

}