import React, {useEffect, useState} from 'react';
import { SideBar, HomeContainer } from '../../views/Layout'
import {withRouter} from "react-router-dom"
import {CalendarContainer} from "./Calendar"
import {Upcoming, UpcomingContainer} from "./HomeContainers"
import {Task, TasksContainer} from "../task/Task"
import {Label, DateLabel} from "../../views/Labels"
import { Colors } from "../../views/design/Colors"
import ShadowScrollbars from "../../views/design/Scrollbars"
import {NavBar} from "../navigation/navBar.jsx"
import styled from "styled-components"
import NpmCal from './NpmCal'
import { api, handleError } from '../../helpers/api';
import { CircleButton, RectButtonBig, RectButton } from '../../views/Button';
import { InputField } from '../../views/Labels'
import Rodal from 'rodal';
import 'rodal/lib/rodal.css';

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
`;

const Home = props => {
    const [user, setUser] = useState({username: ''});
    const [visible, setVisible] = useState(false);

    const [eventTypes] = React.useState([ //TODO: Set default event type
        {label: "Event", value: "Event"},
        {label: "Deadline", value: "Deadline"},
        {label: "Lectures", value: "Lectures"},
        {label: "Exercises", value: "Exercises"},
        {label: "Meeting", value: "Meeting"},
        {label: "Private", value: "Private"},    
      ]);

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
            <CalendarContainer>
            <CircleButton 
                    style={{position: 'absolute', bottom: 0, right: 0}}
                    onClick={() => setVisible(true)}>ADD</CircleButton>
                <Rodal height='300' customStyles={{borderRadius: '20px'}} visible={visible} border-radius='20px' closeOnEsc='true' onClose={() => setVisible(false)}>
                    <div><b>Add Event</b></div><br/>
                    <div>Title:  <InputField placeholder='Enter title here'></InputField></div>
                    <div>Date: <InputField type="date" width='80%'/></div>
                    <div>Type: 
                        <select style={{height: '35px', paddingLeft:'3%', margin: '2%', border:'#E5E5E5', borderRadius: '20px', background:'#E5E5E5'}}>
                            {eventTypes.map(({ label, value }) => (
                                <option key={value} value={value}>{label}</option>
                            ))}
                        </select>
                    </div>
                    <div>Deadline <input type='checkbox'></input></div><br/>
                    <div><RectButton style={{alignItems: 'center'}}>Submit</RectButton></div>
                </Rodal>
                <NpmCal></NpmCal>
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

export default withRouter(Home);