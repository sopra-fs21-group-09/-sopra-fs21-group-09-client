import React, {useEffect, useState} from 'react';
import { SideBar, HomeContainer } from '../../views/Layout'
import {withRouter} from "react-router-dom"
import { UpcomingContainer } from "./HomeContainers"
import { TasksContainer, TasksForHome} from "../task/Task"
import Events from '../home/Events' 
import {BlueLabel, Label} from "../../views/Labels"
import { Colors } from "../../views/design/Colors"
import ShadowScrollbars from "../../views/design/Scrollbars"
import {NavBar} from "../navigation/navBar.jsx"
import styled from "styled-components"
import NpmCal from './NpmCal'
import { api, handleError } from '../../helpers/api';
import 'rodal/lib/rodal.css';
import Rodal from "rodal";

//Constants we need for this page
const PageTitle = styled.h1`
  color: #4F4F4F;
  font-size: 50px;
  margin-top: 2%;
  margin-left: 8%;
  text-transform: uppercase;
  position: fixed;
`;

export const CalendarContainer = styled.div`
  position: absolute;
  top: 100px;
  left: 100px;
  width: 70%;
  height: 85%;
  display: flex;
  justify-content : space-around;
`;

const Home = () => {
    const [user, setUser] = useState({username: ''});
    const [tasks, setTasks] = useState([])
    const [displayIntro, setDisplayIntro] = useState(false)

    async function getUser(){
        try {
            const response = await api.get(`/users/${sessionStorage.getItem('id')}`);//TODO: get User by Token
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
            const response = await api.get('/users/'+ sessionStorage.getItem('id')+'/tasks')


            const array = [];
            for (let e of response.data) {
                array.push(e)
            }

            setTasks(array)

        } catch (error) {
            alert(`Something went wrong during get Tasks: \n${handleError(error)}`);
        }
    }

    async function onClose(){
        sessionStorage.setItem('intro', 'false');
        setDisplayIntro(false);
    }

    // this will run, when the component is first initialized
    useEffect(() => {
        document.body.style.backgroundColor = Colors.COLOR13;
        getUser();
        getTasks();

        if (sessionStorage.getItem('intro') === 'true'){
            setDisplayIntro(true);
        } else {
            setDisplayIntro(false);
        }
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
            {/*Intro Overlay*/}
            <Rodal height={350} customStyles={{borderRadius: '20px'}} visible={displayIntro} closeOnEsc={true}
                   onClose={() => onClose()}>
                <BlueLabel  style={{color: 'orange'}}>Welcome to Brolat</BlueLabel>
                <ShadowScrollbars style={{height: 250}}>
                    <h3>Thank you for using our website!</h3>
                    <p>You are currently having a look at your personal Home Screen. Here you can find a calendar,
                        where all your tasks, meetings, lectures and more will be displayed.</p>
                    <p> On the right you can see two sections.
                        Calendar entries that are due very closely will be displayed in "Upcoming". And all your tasks that you set for yourself
                        are being shown to you in "To-Do", where you can also mark them as done.</p>
                    <h4>Please check out the menu on the left where you can find many more functions!</h4>
                    <p>Visit "Modules", to join the modules you are attending and create or join study groups inside that module.
                        All the corresponding lectures and meetings will be automatically displayed in your calendar as well.</p>
                    <p>Looking for a study group? <br/>Create or join one via "Groups" and share tasks as well
                        as a text editor.</p>
                    <p>Got some personal tasks to do? <br/>Set them in "Tasks" and they will be added to your To-Do List.</p>
                    <h3>Have fun studying with Brolat!</h3>
                </ShadowScrollbars>
            </Rodal>
            <CalendarContainer>
                <NpmCal/>
            </CalendarContainer>
            <SideBar>
                <UpcomingContainer>
                    <Label>Upcoming</Label>
                    <Events/>
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