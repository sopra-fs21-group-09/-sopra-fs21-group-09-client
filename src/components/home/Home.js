import React from 'react';
import styled from 'styled-components';
import { SideBar, HomeContainer } from '../../views/layout';
import {withRouter} from "react-router-dom";
import {CircleButton} from "../../views/Button";
import {Task, TasksContainer, CalendarContainer, WeekDayLabel, WeekdayContainer, CalendarEntry, DeadlineContainer, Deadline, UpcomingContainer, Upcoming} from "../../views/Container";
import HamburgerMenu from "../../views/HamburgerMenu"
import {Label, DateLabel} from "../../views/layout"
import { COLORS } from "../../views/design/colors";
import ShadowScrollbars from "../../views/design/Scrollbars"
import {NavBar} from "../navigation/navBar.jsx"

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
        //Change the whole background for just this file
        document.body.style.backgroundColor = COLORS.COLOR11;
    }

    render() {
        return (
            <HomeContainer>
                {/*<CircleButton>
                    <HamburgerMenu
                        isOpen={this.state.open[0]}
                        menuClicked={this.handleClick.bind(this, 0)}
                        width={40}
                        height={30}
                        strokeWidth={3}
                        rotate={0}
                        color='black'
                        borderRadius={10}
                        animationDuration={0.4}
                    />
                </CircleButton>*/}
                <NavBar/>
                <CalendarContainer>
                    <WeekdayContainer>
                        <WeekDayLabel>MON</WeekDayLabel>
                        <DeadlineContainer></DeadlineContainer>
                        <CalendarEntry></CalendarEntry>
                        <CalendarEntry></CalendarEntry>
                        <CalendarEntry></CalendarEntry>
                    </WeekdayContainer>
                    <WeekdayContainer>
                        <WeekDayLabel>TUE</WeekDayLabel>
                        <DeadlineContainer></DeadlineContainer>
                        <CalendarEntry></CalendarEntry>
                        <CalendarEntry></CalendarEntry>
                        <CalendarEntry></CalendarEntry>
                    </WeekdayContainer>
                    <WeekdayContainer>
                        <WeekDayLabel>WED</WeekDayLabel>
                        <DeadlineContainer></DeadlineContainer>
                        <CalendarEntry></CalendarEntry>
                        <CalendarEntry></CalendarEntry>
                        <CalendarEntry></CalendarEntry>
                    </WeekdayContainer>
                    <WeekdayContainer>
                        <WeekDayLabel>THU</WeekDayLabel>
                        <DeadlineContainer></DeadlineContainer>
                        <CalendarEntry></CalendarEntry>
                        <CalendarEntry></CalendarEntry>
                        <CalendarEntry></CalendarEntry>
                    </WeekdayContainer>
                    <WeekdayContainer>
                        <WeekDayLabel>FRI</WeekDayLabel>
                        <DeadlineContainer></DeadlineContainer>
                        <CalendarEntry></CalendarEntry>
                        <CalendarEntry></CalendarEntry>
                        <CalendarEntry></CalendarEntry>
                    </WeekdayContainer>
                    <WeekdayContainer>
                        <WeekDayLabel>SAT</WeekDayLabel>
                        <DeadlineContainer></DeadlineContainer>
                        <CalendarEntry title='SOFTCON' description='' start='0800' end='1000'></CalendarEntry>
                    </WeekdayContainer>
                    <WeekdayContainer>
                        <WeekDayLabel>SUN</WeekDayLabel>
                        <DeadlineContainer>
                            <ShadowScrollbars style={{ height: 70 }}>
                                <Deadline>Assignment</Deadline>
                                <Deadline>Paper</Deadline>
                                <Deadline>Assignment</Deadline>
                                <Deadline>Paper</Deadline>
                            </ShadowScrollbars>
                        </DeadlineContainer>
                        <CalendarEntry></CalendarEntry>
                        <CalendarEntry></CalendarEntry>
                        <CalendarEntry></CalendarEntry>
                    </WeekdayContainer>
                </CalendarContainer>
                <SideBar>
                    <UpcomingContainer>
                        <Label>Upcoming</Label>
                        <ShadowScrollbars  style={{ height: 340 }}>
                            <DateLabel>Today</DateLabel>
                            <Upcoming>Software Engineering</Upcoming>
                            <Upcoming>SOPRA</Upcoming>
                            <Upcoming>SWE Midterm</Upcoming>
                            <DateLabel>Tomorrow</DateLabel>
                            <Upcoming>Software Engineering</Upcoming>
                            <Upcoming>SOPRA</Upcoming>
                            <Upcoming>SWE Midterm</Upcoming>
                            <DateLabel>23.08.2021</DateLabel>
                            <Upcoming>Software Engineering</Upcoming>
                            <Upcoming>SOPRA</Upcoming>
                            <Upcoming>SWE Midterm</Upcoming>
                            <DateLabel>24.08.2021</DateLabel>
                            <Upcoming>Software Engineering</Upcoming>
                            <Upcoming>SOPRA</Upcoming>
                            <Upcoming>SWE Midterm</Upcoming>
                        </ShadowScrollbars>
                    </UpcomingContainer>
                    <hr width="95%"/>
                    <TasksContainer>
                        <Label>TO-DO</Label>
                        <ShadowScrollbars style={{ height: 320 }}>
                            <DateLabel>Today</DateLabel>
                            <Task name='Assignment'/>
                            <Task name='Paper'/>
                            <DateLabel>Tomorrow</DateLabel>
                            <Task name='Assignment'/>
                            <DateLabel>22.08.2021</DateLabel>
                            <Task name='Read Book'/>
                            <Task name='Paper'/>
                            <DateLabel>23.08.2021</DateLabel>
                            <Task name='Assignment'/>
                            <Task name='M2'/>
                            <DateLabel>24.08.2021</DateLabel>
                            <Task name='Reading'/>
                            <Task name='Assignment'/>
                            <DateLabel>25.08.2021</DateLabel>
                            <Task name='Paper'/>
                            <Task name='Assignment'/>
                        </ShadowScrollbars>
                    </TasksContainer>
                </SideBar>

            </HomeContainer>
        )
    }
}

export default withRouter(Home);