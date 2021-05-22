import React, {useEffect, useState} from 'react';
import styled from 'styled-components';
import { BaseContainer } from '../../views/Layout';
import { api, handleError } from '../../helpers/api';
import {useHistory, useLocation, withRouter} from "react-router-dom";
import {RectButtonBig} from '../../views/Button';
import {PageTitle} from '../../views/Labels';
import { Colors } from "../../views/design/Colors";
import {NavBar} from "../navigation/navBar";
import "../../views/design/StyleSheet.css";

//Constants we need for this page
const BigContainer = styled.div`
  width: 100%;
  height: 550px;
  padding-left: 2%;
  border: none;
  margin-bottom: 20px;
`;

const FirstLine = styled.div`
  margin-bottom: 2%;
  height: 20%;
  display: flex;
  align-items: center;
`;

const NextLine = styled.div`
  margin-bottom: 2%;
  height: 30%;
`;

const InLine = styled.div`
  height: 15%;
  display: flex;
  margin-bottom: 1px;
  align-items: center;
`;

const Label = styled.label`
  text-transform: uppercase;
  color: ${Colors.COLOR14};
  font-size: 28px;
  margin-bottom: 2%;
  display: flex;
  align-items: center;
`;

const InputFieldRadio = styled.input`
  &::placeholder {
    color: #4F4F4F;
  }
  height: 35px;
  width: 30%;
  padding-left: 15px;
  margin-left: 7%;
  margin-right: 7%;
  border: none;
  background: white;
  border-radius: 20px;
  
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: center;
  margin-bottom: -5%;
  margin-top: 2%;
  width: 100%;
`;

const CreateGroup = (props) => {
    let inputOne = React.createRef();
    let inputTwo = React.createRef();
    const [name, setName] = useState(null);
    const [password, setPassword] = useState(null);
    const [open, setOpen] = useState(null);
    const [memberLimit, setMemberLimit] = useState(0);
    const [settings, setSettings] = useState(true);
    const [limitation, setLimitation] = useState(true);
    const [moduleId, setModuleId] = useState(null);
    const history = useHistory();
    const location = useLocation();

    /**
     * HTTP GET request is sent to the backend.
     * If the request is successful, the group is created
     */
    async function createGroup() {
        try {
            const requestBody = JSON.stringify({
                name: name,
                password: password,
                open: open,
                memberLimit: memberLimit
            });

            //CREATES GROUP FOR MODULE TODO: The group doesn't get displayed in module details
            if (moduleId){
                await api.post(`/modules/${moduleId}/users/${localStorage.getItem('id')}/groups`, requestBody);
                history.push(`/moduleDetail`);
            }
            //CREATES GROUP FOR USER
            else{
                await api.post(`/users/${localStorage.getItem('id')}/groups`, requestBody);
                history.push(`/myGroups`);
            }

        } catch (error) {
            alert(`Something went wrong during group creation: \n${handleError(error)}`);
        }
    }

    // this will run, when the component is first initialized
    useEffect(() => {
        //Change the whole background for just this file
        document.body.style.backgroundColor = Colors.COLOR11;
        console.log(props)
        setModuleId(location.moduleId)
    }, []);

    // this will run when the component mounts and anytime the stateful data changes
    useEffect(() => {
        console.log(location.moduleId)
    }, [moduleId]);


    function setPrivacy(event) {
        if (event.target.value === "True"){
            inputOne.current.removeAttribute("disabled");
            setOpen(false);
        } else if (event.target.value === "False"){
            inputOne.current.setAttribute("disabled", "");
            setOpen(true);
        } else if (event.target.value === "One"){
            inputTwo.current.removeAttribute("disabled");
        } else if (event.target.value === "Zero"){
            inputTwo.current.setAttribute("disabled", "");
            setMemberLimit(null);
        }
    }

    return (
        <BaseContainer>
            <NavBar/>
            <PageTitle>Create a new group</PageTitle>
            <BigContainer>
                <FirstLine>
                    <Label>Name:</Label>
                    <input
                        type="text"
                        className="input"
                        maxlength="10"
                        placeholder="Enter group name..."
                        onChange={e => {setName(e.target.value);}}
                    />
                </FirstLine>
                <NextLine>
                    <Label>Settings</Label>
                    <div onChange={setPrivacy.bind(this)} style={{fontSize:25}}>
                        <InLine>
                            <input type="radio" value="True" name="privacy" style={{height: 25, width: 25}} onClick={() => setSettings(true)}/> Private:
                            <InputFieldRadio
                                ref={inputOne}
                                style={{fontSize: 17}}
                                placeholder="Set password..."
                                disabled
                                id="privacy"
                                onChange={e => {
                                    setPassword(e.target.value);
                                }}
                            />
                        </InLine>
                        <InLine>
                            <input type="radio" value="False" name="privacy" style={{height: 25, width: 25}} onClick={ ()=> setSettings(false)}/> Public
                        </InLine>
                    </div>
                </NextLine>
                <NextLine>
                    <Label>Limitations</Label>
                    <div onChange={setPrivacy.bind(this)} style={{fontSize:25}}>
                        <InLine>
                            <input type="radio" value="One" name="limitation" style={{height: 25, width: 25}} onClick={() => setLimitation(true)}/> Limited Group Size:
                            <InputFieldRadio
                                ref={inputTwo}
                                type="number"
                                style={{fontSize: 17, width: 120}}
                                placeholder="Enter Size..."
                                disabled
                                onChange={e => {
                                    setMemberLimit(e.target.value);
                                }}
                            />
                        </InLine>
                        <InLine>
                            <input type="radio" value="Zero" name="limitation" style={{height: 25, width: 25}} onClick={() => setLimitation(false)}/> Unlimited
                        </InLine>
                    </div>
                </NextLine>
                <ButtonContainer>
                    <RectButtonBig
                        disabled={!name|| (settings && !password) || (limitation && !memberLimit)}
                        width="100%"
                        onClick={() => {
                            createGroup();
                        }}
                    >
                        Create
                    </RectButtonBig>
                </ButtonContainer>
            </BigContainer>
        </BaseContainer>
    )

}

export default withRouter(CreateGroup);