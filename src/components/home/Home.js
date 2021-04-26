import React from 'react';
import { SideBar, HomeContainer } from '../../views/Layout'
import {withRouter} from "react-router-dom"
import {CalendarContainer, WeekDayLabel, WeekdayContainer, CalendarEntry, DeadlineContainer, Deadline} from "./Calendar"
import {Upcoming, UpcomingContainer} from "./HomeContainers"
import {Task, TasksContainer} from "../task/Task"
import {Label, DateLabel} from "../../views/Labels"
import { Colors } from "../../views/design/Colors"
import ShadowScrollbars from "../../views/design/Scrollbars"
import {NavBar} from "../navigation/navBar.jsx"
import styled from "styled-components"
import NpmCal from './NpmCal'

//Constants we need for this page
const PageTitle = styled.h1`
  color: #4F4F4F;
  font-size: 50px;
  margin-top: 2%;
  margin-left: 8%;
  text-transform: uppercase;
  position: fixed;
`;

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
        document.body.style.backgroundColor = Colors.COLOR11;
    }

    render() {
        return (
            <HomeContainer>
                <NavBar/>
                <PageTitle>Welcome Home, "Name"</PageTitle>
                <CalendarContainer><NpmCal></NpmCal></CalendarContainer>
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