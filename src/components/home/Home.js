import React from 'react';
import styled from 'styled-components';
import { SideBar, HomeContainer } from '../../views/layout';
import { api, handleError } from '../../helpers/api';
import {withRouter} from "react-router-dom";
import {Button, RectButton, CircleButton, RoundButton, RectangleButton} from "../../views/Button";
import {TaskContainer, CalendarContainer, Group, Weekday, WeekDayLabel, CalendarEntryContainer, GroupContainer, Task, WeekdayContainer, CalendarEntryTitle, CalendarEntry} from "../../views/Container";

const Label = styled.label`
  color: white;
  text-transform: uppercase;
  margin: 0px;
  padding: 0px;     

  
`;

class Home extends React.Component {
    constructor() {
        super();
        this.state = {
        };
    }

    componentDidMount() {
    }

    render() {
        return (
            <HomeContainer>
                <CircleButton>MENU</CircleButton>
                <CalendarContainer>
                    <WeekdayContainer>
                        <WeekDayLabel>Monday</WeekDayLabel>
                        <CalendarEntry></CalendarEntry>
                        <CalendarEntry></CalendarEntry>
                        <CalendarEntry></CalendarEntry>
                    </WeekdayContainer>
                    <WeekdayContainer>
                        <WeekDayLabel>Monday</WeekDayLabel>
                        <CalendarEntry></CalendarEntry>
                        <CalendarEntry></CalendarEntry>
                        <CalendarEntry></CalendarEntry>
                    </WeekdayContainer>
                    <WeekdayContainer>
                        <WeekDayLabel>Monday</WeekDayLabel>
                        <CalendarEntry></CalendarEntry>
                        <CalendarEntry></CalendarEntry>
                        <CalendarEntry></CalendarEntry>
                    </WeekdayContainer>
                    <WeekdayContainer>
                        <WeekDayLabel>Monday</WeekDayLabel>
                        <CalendarEntry></CalendarEntry>
                        <CalendarEntry></CalendarEntry>
                        <CalendarEntry></CalendarEntry>
                    </WeekdayContainer>
                    <WeekdayContainer>
                        <WeekDayLabel>Monday</WeekDayLabel>
                        <CalendarEntry></CalendarEntry>
                        <CalendarEntry></CalendarEntry>
                        <CalendarEntry></CalendarEntry>
                    </WeekdayContainer>
                    <WeekdayContainer>
                        <WeekDayLabel>Monday</WeekDayLabel>
                        <CalendarEntry></CalendarEntry>
                        <CalendarEntry></CalendarEntry>
                        <CalendarEntry></CalendarEntry>
                    </WeekdayContainer>
                </CalendarContainer>
                <SideBar>
                    <TaskContainer>
                        <Label>TO-DO</Label>
                        <Task>
                        </Task>
                        <Task>
                        </Task>
                        <Task>
                        </Task>
                    </TaskContainer>

                </SideBar>


            </HomeContainer>
        )
    }
}

export default withRouter(Home);