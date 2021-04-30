import React, {useState, useEffect} from "react";
import {useHistory} from "react-router-dom";
import {Colors} from "../../views/design/Colors";
import {TaskList} from "../task/Task"
import styled from "styled-components";
import "./Task.css"
import {InputField} from "../../views/Labels";
import Header from "../../views/design/Header";
import {CircleButton, RectButton} from "../../views/Button";
import Rodal from "rodal";
import {Label} from "../../views/Labels";
import { api, handleError } from '../../helpers/api';


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
    const [taskName, setTaskName] = useState()
    const [taskDate, setTaskDate] = useState()
    const [tasks, setTasks] = useState([{name: 'TEst'}])
    const [rerender, setRerender] = useState()
    const history = useHistory()

    async function getTasks(){
        try {
            const response = await api.get('/users/'+ localStorage.getItem('ID')+'/tasks')//TODO: API call to get ALL tasks


            console.log('Is this even run?');
            console.log('length:'+ response.data.length)

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

    function postTask(){
        try {
            const requestBody = JSON.stringify({
                name: taskName,
                description: 'empty',
                deadline: {
                    time: "2021-04-30T13:57:52",
                    visible: "true"
                }
            });

            const response = api.post('/users/'+ localStorage.getItem('ID')+'/tasks', requestBody)

            console.log('posted!!!!')
            setRerender(true)

        } catch (error) {
            alert(`Something went wrong during postTasks: \n${handleError(error)}`);
        }
    }



    // this will run, when the component is first initialized
    useEffect(() => {
        document.body.style.backgroundColor = Colors.COLOR13;
        console.log('Runed only when initialized')

    }, []);

    // this will run only when TaskDate
    useEffect(() => {
        document.body.style.backgroundColor = Colors.COLOR13;
        getTasks()
        console.log('Runs only when task date changes')

    }, [taskName, rerender]);


    useEffect(()=>{
        document.body.style.backgroundColor = Colors.COLOR11;
        console.log('runs every other time')
    })

    return (
        <div style={{padding: '0px'}}>
            <AddButton
                onClick={() => setVisible(true)}>
                <i className="fas fa-plus fa-2x"/>
            </AddButton>

                <Rodal height='300' customStyles={{borderRadius: '20px'}} visible={visible} border-radius='20px' closeOnEsc='true' onClose={() => setVisible(false)}>
                    <Label style={{color: 'black'}}>NEW TASK</Label>
                    <div>Title:
                        <InputField
                            onChange={e => {
                                setTaskName(e.target.value);
                            }}
                            placeholder='Enter title here'></InputField></div>
                    <div>Date:
                        <InputField
                        type="date"
                        width='80%'
                        onChange={e => {
                            setTaskDate(e.target.value)
                        }}
                        /></div>
                    <div style={{alignItems: 'center'}}>
                        <RectButton
                        style={{
                            position: 'absolute',
                            bottom: '0'
                        }}
                        //disabled={taskName  || taskDate}
                        onClick={() => {
                            postTask();
                            setVisible(false);
                        }}>
                        Submit</RectButton>
                    </div>
                </Rodal>

            <Header title='MY TASKS'>
            </Header>
            <TaskList tasks={tasks}/>
        </div>
    )
}