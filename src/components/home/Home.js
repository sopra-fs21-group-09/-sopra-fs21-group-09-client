import React from 'react';
import styled from 'styled-components';
import { BaseContainer } from '../../helpers/layout';
import { api, handleError } from '../../helpers/api';
import {withRouter} from "react-router-dom";
import {Button, RectButton, CircleButton, RoundButton, RectangleButton} from "../../views/Button";
import {Weekday, WeekDayLabel, CalendarEntryContainer, GroupContainer, TaskContainer, WeekdayContainer, CalendarEntryTitle, CalendarEntry} from "../../views/Container";

const Label = styled.label`
  color: white;
  text-transform: uppercase;
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
            <BaseContainer>
                <RectButton>RectButton</RectButton>
                <CircleButton>CircleButton</CircleButton>
                <Label>Welcome to your Home Screen</Label>
                <GroupContainer>
                <Label>Home Group</Label>
                </GroupContainer>
                <TaskContainer><Label>Task</Label></TaskContainer>
                <WeekdayContainer>
                    <WeekDayLabel>Monday</WeekDayLabel>
                    <CalendarEntry></CalendarEntry>
                </WeekdayContainer>
            </BaseContainer>
        )
    }
}

export default withRouter(Home);