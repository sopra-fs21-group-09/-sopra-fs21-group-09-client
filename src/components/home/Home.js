import React from 'react';
import styled from 'styled-components';
import { SideBar, HomeContainer } from '../../views/layout';
import {withRouter} from "react-router-dom";
import {CircleButton} from "../../views/Button";
import {TaskContainer, CalendarContainer, WeekDayLabel, Task, WeekdayContainer, CalendarEntry} from "../../views/Container";
import HamburgerMenu from "../../views/HamburgerMenu"
import {Label, DateLabel} from "../../views/layout"

class Home extends React.Component {
    constructor() {
        super();
        this.state = {
            open: [false, true, false, true]
        };
    }

    handleClick(id) {
		let { open } = this.state;
        this.setState({
			open: [...open.slice(0, id), !open[id], ...open.slice(id + 1)]
		});
	}

    componentDidMount() {
    }

    render() {
        return (
            <HomeContainer>
                <CircleButton>Home
                    {/* <HamburgerMenu
                        isOpen={this.state.open[1]}
                        menuClicked={this.handleClick.bind(this, 1)}
                        width={50}
                        height={40}
                        strokeWidth={3}
                        rotate={0}
                        color='black'
                        borderRadius={5}
                        animationDuration={0.4}
                    /> */}
                </CircleButton>
                <CalendarContainer>
                    <WeekdayContainer>
                        <WeekDayLabel>MON</WeekDayLabel>
                        <CalendarEntry></CalendarEntry>
                        <CalendarEntry></CalendarEntry>
                        <CalendarEntry></CalendarEntry>
                    </WeekdayContainer>
                    <WeekdayContainer>
                        <WeekDayLabel>TUE</WeekDayLabel>
                        <CalendarEntry></CalendarEntry>
                        <CalendarEntry></CalendarEntry>
                        <CalendarEntry></CalendarEntry>
                    </WeekdayContainer>
                    <WeekdayContainer>
                        <WeekDayLabel>WED</WeekDayLabel>
                        <CalendarEntry></CalendarEntry>
                        <CalendarEntry></CalendarEntry>
                        <CalendarEntry></CalendarEntry>
                    </WeekdayContainer>
                    <WeekdayContainer>
                        <WeekDayLabel>THU</WeekDayLabel>
                        <CalendarEntry></CalendarEntry>
                        <CalendarEntry></CalendarEntry>
                        <CalendarEntry></CalendarEntry>
                    </WeekdayContainer>
                    <WeekdayContainer>
                        <WeekDayLabel>FRI</WeekDayLabel>
                        <CalendarEntry></CalendarEntry>
                        <CalendarEntry></CalendarEntry>
                        <CalendarEntry></CalendarEntry>
                    </WeekdayContainer>
                    <WeekdayContainer>
                        <WeekDayLabel>SAT</WeekDayLabel>
                        <CalendarEntry></CalendarEntry>
                        <CalendarEntry></CalendarEntry>
                        <CalendarEntry></CalendarEntry>
                    </WeekdayContainer>
                    <WeekdayContainer>
                        <WeekDayLabel>SUN</WeekDayLabel>
                        <CalendarEntry></CalendarEntry>
                        <CalendarEntry></CalendarEntry>
                        <CalendarEntry></CalendarEntry>
                    </WeekdayContainer>
                </CalendarContainer>
                <SideBar>
                    <TaskContainer>
                        <Label>TO-DO</Label>
                        <DateLabel>Today</DateLabel>
                        <Task>Assignment</Task>
                        <Task>Paper</Task>
                        <DateLabel>Tomorrow</DateLabel>
                        <Task>Study</Task>
                    </TaskContainer>
                </SideBar>
            </HomeContainer>
        )
    }
}

export default withRouter(Home);