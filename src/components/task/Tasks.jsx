import React, {useState, useEffect} from "react";
import {useHistory} from "react-router-dom";
import {Colors} from "../../views/design/Colors";
import {Task} from "../task/Task"
import styled from "styled-components";
import "./Task.css"
import {InputField, PageTitle} from "../../views/Labels";
import {BaseContainer} from "../../views/Layout";
import {NavBar} from "../navigation/navBar";
import Header from "../../views/design/Header";
import {CircleButton, RectButton} from "../../views/Button";
import Rodal from "rodal";
import {CalendarContainer} from "../home/Calendar";


export const DateLabel = styled.label`
  margin-top: 10px;
  font-size: 20px;
  color: black;  
`;

const AddButton = styled(CircleButton)`
    position: 'absolute';
    top: 22px;
    right: 30px;
    filter: drop-shadow(0px 4px 4px rgba(0, 0, 0, 0.25));
`;



export function Tasks(){
    const [userID, setUserID] = useState('userID')
    const [visible, setVisible] = useState(false)
    const history = useHistory()

    useEffect(()=>{
        document.body.style.backgroundColor = Colors.COLOR11;
    })

    return (
        <div style={{padding: '0px'}}>
            <AddButton
                onClick={() => setVisible(true)}>
                <i className="fas fa-plus fa-2x"/>
            </AddButton>

                <Rodal height='300' customStyles={{borderRadius: '20px'}} visible={visible} border-radius='20px' closeOnEsc='true' onClose={() => setVisible(false)}>
                    <h1>Hello!</h1>
                </Rodal>

            <Header title='MY TASKS'>
            </Header>
            <div class='row'>
                <div class='column'>
                    <DateLabel>Today</DateLabel>
                    <Task name='Assignment'/>
                    <Task name='Paper'/>
                    <Task name='Assignment'/>
                    <Task name='Read Book'/>
                    <Task name='Paper'/>
                    <Task name='Assignment'/>
                    <Task name='M2'/>
                    <Task name='Reading'/>
                    <Task name='Assignment'/>
                    <Task name='Paper'/>
                    <Task name='Assignment'/>
                </div>
                <div class='column'>
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
                </div>
            </div>
        </div>
    )
}