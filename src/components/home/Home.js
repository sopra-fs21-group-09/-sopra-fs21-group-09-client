import React, {useEffect, useState} from 'react';
import { SideBar, HomeContainer } from '../../views/Layout'
import {withRouter} from "react-router-dom"
import {CalendarContainer} from "./Calendar"
import {Upcoming, UpcomingContainer} from "./HomeContainers"
import {Task, TasksContainer} from "../task/Task"
import Events from '../home/Events' 
import {Label, DateLabel} from "../../views/Labels"
import { Colors } from "../../views/design/Colors"
import ShadowScrollbars from "../../views/design/Scrollbars"
import {NavBar} from "../navigation/navBar.jsx"
import styled from "styled-components"
import NpmCal from './NpmCal'
import { api, handleError } from '../../helpers/api';
import { CircleButton, RectButtonSmall, RectButton } from '../../views/Button';
import { InputField } from '../../views/Labels'
import Rodal from 'rodal';
import 'rodal/lib/rodal.css';
import {TasksForHome} from "../task/Task";

//Constants we need for this page
const PageTitle = styled.h1`
  color: #4F4F4F;
  font-size: 50px;
  margin-top: 2%;
  margin-left: 8%;
  text-transform: uppercase;
  position: fixed;
`;

const AddButton = styled(CircleButton)`
    position: 'absolute';
    bottom: 0;
    right: 0;
    filter: drop-shadow(0px 4px 4px rgba(0, 0, 0, 0.25));
`;

const Home = props => {
    const [user, setUser] = useState({username: ''});
    const [tasks, setTasks] = useState([])
    

    async function getUser(){
        try {
            const response = await api.get(`/users/${localStorage.getItem('id')}`);//TODO: get User by Token
            setUser(response.data);

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

    async function getTasks(){
        try {
            const response = await api.get('/users/'+ localStorage.getItem('id')+'/tasks')


            const array = []
            var i;
            for (i = 0; i < response.data.length; i++) {
                array.push(response.data[i]);
            }

            setTasks(array)

        } catch (error) {
            alert(`Something went wrong during get Tasks: \n${handleError(error)}`);
        }
    }

    // this will run, when the component is first initialized
    useEffect(() => {
        document.body.style.backgroundColor = Colors.COLOR13;
        getUser();
        getTasks();
    }, []);

    // this will run when the component mounts and anytime the stateful data changes
    useEffect(() => {
        //Change the whole background for just this file
        document.body.style.backgroundColor = Colors.COLOR11;
        const random = () => Math.floor(Math.random() * 255);
        console.log(random())
        console.log('tasks')
        console.log(tasks)
    });

    return (
        <HomeContainer>
            <NavBar/>
            <PageTitle>Welcome Home, {user.username}</PageTitle>
            <CalendarContainer>
                <NpmCal></NpmCal>
            </CalendarContainer>
            <SideBar>
                <UpcomingContainer>
                    <Label>Upcoming</Label>
                    <Events></Events>
                </UpcomingContainer>
                <hr width="95%"/>
                <TasksContainer>
                    <Label>TO-DO</Label>
                    <ShadowScrollbars style={{ height: 320 }}>
                            <TasksForHome tasks={tasks}/>
                    </ShadowScrollbars>
                </TasksContainer>
            </SideBar>
        </HomeContainer>
    )
}

export default withRouter(Home);