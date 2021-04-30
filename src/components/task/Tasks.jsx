import React, {useState, useEffect} from "react";
import {useHistory} from "react-router-dom";
import {Colors} from "../../views/design/Colors";
import {Task} from "../task/Task"
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
                console.log(response.data[i])
            }

            console.log(array)
            console.log(array[0])
            setTasks(array)
            console.log('Task was set')

        } catch (error) {
            alert(`Something went wrong during get Tasks: \n${handleError(error)}`);
        }
    }

    function TaskList(props) {
        const tasks = props.tasks;
        if (!tasks) {
            return null;
        }
        const taskItem = tasks.map((task) =>
            <Task name={task.name} description={task.description} time={task.deadlineGetDTO?task.deadlineGetDTO.time:""} id={task.id}/>
        );
        return (
            <ul>{taskItem}</ul>
        );
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

    }, [taskDate]);


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
                                setTaskDate(e.target.value)
                            }}
                            placeholder='Enter title here'></InputField></div>
                    <div>Date:
                        <InputField
                            onChange={e => {
                                setTaskName(e.target.value)
                            }}
                        type="date"
                        width='80%'
                        onChange={e => {
                            setTaskDate(e.target.value)
                        }}
                        /></div>
                    <div><RectButton
                        style={{alignItems: 'center'}}
                        disabled={!taskName  || !taskName}
                        >Submit</RectButton></div>
                </Rodal>

            <Header title='MY TASKS'>
            </Header>
            {/*<TaskList tasks={[{name: 'TEST1'}, {name: '2344'}]}/>*/}
            <TaskList tasks={tasks}/>
            {/*{tasks.map(task => {
            <div class='row'>
                <div class='column'>
                    <DateLabel>Today</DateLabel>
                        <Task name={task.name}/>
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
            })}*/}
        </div>
    )
}