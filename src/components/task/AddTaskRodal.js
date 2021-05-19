import {Label} from "../../views/Labels";
import {RectButton} from "../../views/Button";
import Rodal from "rodal";
import React, {useEffect, useState} from "react";
import {api, handleError} from "../../helpers/api";
import styled from "styled-components";
import {Colors} from "../../views/design/Colors";

export const ColumnDiv = styled.div`
   display: flex;
  align-items: center;
`;

const TextLabel = styled.p`
   padding-right: 15px; 
`;

export const InputField = styled.input`
  &::placeholder {
    color: ${Colors.COLOR13};
  }
  width: 90%; 
  padding: 3%;
  margin-bottom: 2%;
  height: 35px;
  border: none;
  background: ${Colors.LIGHT_GREY};
  border-radius: 20px;
  align-items: center;
  rows: 3; 
`;

export function AddTaskRodal(props) {
    const [visible, setVisible] = useState(false)
    const [taskName, setTaskName] = useState()
    const [taskDate, setTaskDate] = useState()
    const [deadline, setDeadline] = useState(false)
    const [displayRodal, setDisplayRodal] = useState(false)
    const [description, setDescription] = useState('')

    //POST:/users/{userId}/tasks
    function postTask(){
        try {
            const requestBody = JSON.stringify({
                name: taskName,
                description: description,
                deadline: {
                    time: taskDate,
                    visible: deadline
                }
            });

            const response = api.post('/users/'+ localStorage.getItem('id')+'/tasks', requestBody)

            document.getElementById("input").value = null;

        } catch (error) {
            alert(`Something went wrong during postTasks: \n${handleError(error)}`);
        }
    }

    //this runs whenever props change
    useEffect(() => {
        console.log('#2 PROPS changed')
        //if props are set and displayRodal is true
        if (props && props.displayRodal){
            //set visible to true
            setVisible(true)
            console.log('#2.1 DisplayRodal is True')
        }
        //if displayRodal is false
        if (!props.displayRodal){
            console.log('#2.2 FIRST RENDER: do not show rodal')
            //show Rodal next time
            if (props){
                setVisible(false)
                setDisplayRodal(props.displayRodal)
            }
        }
    },[props]);

    return(
    <Rodal height={350} customStyles={{borderRadius: '20px'}} visible={visible} border-radius='20px' onClose={() => setVisible(false)}>
        <Label style={{color: 'black'}}>NEW TASK</Label>
        <ColumnDiv>
            <TextLabel> Title: </TextLabel>
            <InputField
                id='input'
                style={{width: '75%'}}
                onChange={e => {
                    setTaskName(e.target.value);
                }}
                placeholder='Title ...'></InputField>
        </ColumnDiv>
        <ColumnDiv>
            <TextLabel> Date: </TextLabel>
            <InputField
                id='input'
                style={{width: '75%'}}
                type="date"
                onChange={e => {
                    setTaskDate(e.target.value)
                }}
            />
        </ColumnDiv>
        <ColumnDiv>
            <TextLabel>Display in Calendar:</TextLabel>
            <input type='checkbox' onClick={() => setDeadline(true)}></input>
        </ColumnDiv>
        <div>
            <InputField
                id='input'
                style={{height: '75%'}}
                onChange={e => { setDescription(e.target.value);}}
                placeholder='Description ...'></InputField>
        </div>
        <ColumnDiv style={{justifyContent: 'center'}}>
            <RectButton
                style={{
                    position: 'absolute',
                    bottom: '0',
                }}
                //disabled={!taskName  || !taskDate}
                onClick={() => {
                    postTask();
                    setVisible(false);
                }}>
                Submit</RectButton>
        </ColumnDiv>
    </Rodal>
    )
}
//test