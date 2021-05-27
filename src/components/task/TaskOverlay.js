import {Label} from "../../views/Labels";
import {RectButton} from "../../views/Button";
import Rodal from "rodal";
import React, {useEffect, useState} from "react";
import {api, handleError} from "../../helpers/api";
import styled from "styled-components";
import {Colors} from "../../views/design/Colors";
import {useHistory} from "react-router";

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

export function TaskOverlay(props) {
    const [visible, setVisible] = useState(false)
    const [taskName, setTaskName] = useState()
    const [taskDate, setTaskDate] = useState()
    const [deadline, setDeadline] = useState(false)
    const [displayRodal, setDisplayRodal] = useState(false)
    const [description, setDescription] = useState('')
    const history = useHistory()

    //POST:/users/{userId}/tasks
    async function postTask(){
        try {
            //POST Deadline to module
            if(props.moduleId){
                console.log('POSTED TO MODULE')
                const requestBody = JSON.stringify({
                    name: taskName,
                    description: description,
                    deadline: {
                        time: taskDate,
                        visible: deadline
                    }
                });

                await api.post('/modules/'+props.moduleId+'/tasks', requestBody)

                setVisible(false)
                setDisplayRodal(false)
                history.push({
                    pathname: '/moduleDetail',
                    displayRodal: false
                });

                setVisible(false)
                setDisplayRodal(false)
                history.push({
                    pathname: '/moduleDetail',
                    displayRodal: false
                });
            }
            //POST tasks to group
            else if (props.groupId){
                console.log('POSTED GROUP TASK')
                const requestBody = JSON.stringify({
                    name: taskName,
                    description: "bla",
                    deadline: {
                        time: taskDate,
                        visible: "true"
                    }
                });

                await api.post(`/groups/${props.groupId}/tasks`, requestBody)

                setVisible(false)
                setDisplayRodal(false)
                history.push({
                    pathname: '/groupDetail',
                    detail: {id: props.groupId}
                });
            }
            //POST task to users/{userId}
            else {
                console.log('POSTED User TASK')
                const requestBody = JSON.stringify({
                    name: taskName,
                    description: description,
                    deadline: {
                        time: taskDate,
                        visible: deadline
                    }
                });

                const response = await api.post('/users/' + sessionStorage.getItem('id') + '/tasks', requestBody)

                setVisible(false)
                setDisplayRodal(false)
                history.push({
                    pathname: '/tasks',
                    displayRodal: false
                });
            }

            document.getElementById("input").value = null;

        } catch (error) {
            alert(`Something went wrong during postTasks: \n${handleError(error)}`);
        }
    }

    //this runs whenever props change
    useEffect(() => {
        //console.log('#2 PROPS changed')
        //if props are set and displayRodal is true
        if (props && props.displayRodal){
            //set visible to true
            setVisible(true)
            //console.log('#2.1 DisplayRodal is True')
        }
        //if displayRodal is false
        if (!props.displayRodal){
            //console.log('#2.2 FIRST RENDER: do not show rodal')
            //show Rodal next time
            if (props){
                setVisible(false)
                setDisplayRodal(props.displayRodal)
            }
        }
    },[props]);

    return(
    <Rodal height={350} customStyles={{borderRadius: '20px'}} visible={visible} border-radius='20px' closeOnEsc={true} onClose={() => setVisible(false)}>
        <Label style={{color: 'black'}}>NEW TASK</Label>
        <ColumnDiv>
            <TextLabel> Title: </TextLabel>
            <InputField
                id='input'
                style={{width: '75%'}}
                onChange={e => {
                    setTaskName(e.target.value);
                }}
                placeholder='Title ...'/>
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
            <input type='checkbox' onClick={() => setDeadline(true)}/>
        </ColumnDiv>
        <div>
            <InputField
                id='input'
                style={{height: '75%'}}
                onChange={e => { setDescription(e.target.value);}}
                placeholder='Description ...'/>
        </div>
        <ColumnDiv style={{justifyContent: 'center'}}>
            <RectButton
                style={{
                    position: 'absolute',
                    bottom: '0',
                }}
                disabled={!taskName  || !taskDate}
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