import React, {useEffect, useState} from 'react';
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
import { api, handleError } from '../../helpers/api';

//Constants we need for this page
const PageTitle = styled.h1`
  color: #4F4F4F;
  font-size: 50px;
  margin-top: 2%;
  margin-left: 8%;
  text-transform: uppercase;
  position: fixed;
`;

const Home = props => {
    const [user, setUser] = useState({username: ''});

    async function getUser(){
        try {
            const response = await api.get('/users/1');//TODO:remove 1
            setUser(response.data)

            // This is just some data for you to see what is available.
            // Feel free to remove it.
            console.log('request to:', response.request.responseURL);
            console.log('status code:', response.status);
            console.log('status text:', response.statusText);
            console.log('requested data:', response.data);

            // See here to get more data.
            console.log(response);
        } catch (error) {
            alert(`Something went wrong while fetching the users: \n${handleError(error)}`);
        }
    }

    // this will run, when the component is first initialized
    useEffect(() => {
        document.body.style.backgroundColor = Colors.COLOR13;
        getUser();
    }, []);

    // this will run when the component mounts and anytime the stateful data changes
    useEffect(() => {
        //Change the whole background for just this file
        document.body.style.backgroundColor = Colors.COLOR11;
        const random = () => Math.floor(Math.random() * 255);
        console.log(random())
    });

    return (
        <HomeContainer>
            <NavBar/>
            <PageTitle>Welcome Home, {user.username}</PageTitle>
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

export default withRouter(Home);