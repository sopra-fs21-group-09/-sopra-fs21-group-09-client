import React, {useEffect, useState} from 'react';
import styled from 'styled-components';
import { BaseContainer } from '../../views/Layout';
import { api, handleError } from '../../helpers/api';
import {useHistory} from "react-router-dom";
import {RectButtonBig} from '../../views/Button';
import {PageTitle} from '../../views/Labels';
import { Colors } from "../../views/design/Colors";
import {NavBar} from "../navigation/navBar";
import {JoinModuleList} from "./Module";

//Constants we need for this page
const BigContainer = styled.div`
  width: 100%;
  padding-left: 15px;
  margin-left: 3%;
  margin-right: 7%;
  border: none;
  margin-bottom: 20px;
`;

const Line = styled.div`
  display grid;
  grid-template-columns: 3fr 1fr 1fr;
  grid-template-rows: 1;
  grid-column-gap: 1em;
  width: 100%;
  height: 70px;
`;

const Label = styled.label`
  place-self: center;
  text-transform: uppercase;
  color: orange;
  font-size: 25px;
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 2%;
  width: 100%;
`;


export function JoinModules() {
    const [modules, setModules] = useState([])
    const history = useHistory()

    /**
     * HTTP GET request is sent to the backend.
     * If the request is successful, the modules are shown
     */
    async function getModules() {
        try {
            const allModules = await api.get('/modules');
            const joinableModules = await api.get('/modules');

            const joinedModules = await api.get('/users/'+localStorage.getItem('id')+'/modules');

            // Get all modules where the user is not in
            for (let i = 0; i < allModules.data.length; i++){
                for (let z = 0; z < joinedModules.data.length; z++){
                    if (allModules.data[i].id === joinedModules.data[z].id){
                        delete joinableModules.data[i];
                    }
                }
            }

            setModules(joinableModules.data)

        } catch (error) {
            alert(`Something went wrong during get Modules: \n${handleError(error)}`);
        }
    }

    // this will run, when the component is first initialized
    useEffect(() => {
        document.body.style.backgroundColor = Colors.COLOR11;
        console.log('JoinModule initialized')
        getModules();
    }, []);

    return (
        <BaseContainer>
            <NavBar/>
            <PageTitle>JOIN A MODULE</PageTitle>
            <BigContainer>
                <Line style={{textAlign: 'left'}}>
                    <Label>Module Name</Label>
                </Line>
                <JoinModuleList modules={modules}/>
                <ButtonContainer>
                    <RectButtonBig
                        width="100%"
                        onClick={() => {
                            history.push('/modules');
                        }}
                    >
                        GET BACK TO MY MODULES
                    </RectButtonBig>
                </ButtonContainer>
            </BigContainer>
        </BaseContainer>
    )
}