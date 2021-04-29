import React, {useState, useEffect} from "react";
import {withRouter, useHistory} from "react-router-dom";
import {Group} from "./Group";
import {RectButtonBig, SmallCircleButton} from "../../views/Button";
import ShadowScrollbars from "../../views/design/Scrollbars";
import styled from "styled-components";
import {Colors} from "../../views/design/Colors";
import {BaseContainer} from "../../views/Layout";
import {NavBar} from "../navigation/navBar";
import {PageTitle} from "../../views/Labels";

//Constants we need for this page
const BigContainer = styled.div`
  width: 100%;
  height: 800px;
  border: none;
  margin: 60px 10px;  
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-template-rows: repeat(auto-fill, 100px);
  grid-row-gap: 4em;
  grid-column-gap: 4em;
  width: 100%;
  border: none;
  margin-left: -5%;
`;


export function MyGroups(){
    const [userID, setUserID] = useState('userID')
    const history = useHistory()

    useEffect(()=>{
        document.body.style.backgroundColor = Colors.COLOR11;
        //const response = await api.get('/users/'+ userID);
    })

    return (
        <BaseContainer>
            <NavBar/>
            <PageTitle>My GROUPS</PageTitle>
            <BigContainer>
                            <Group name={'09'}/>
                            <Group name={'10'}/>
                            <Group name={'11'}/>
                            <Group name={'12'}/>
                            <Group name={'13'}/>
                            <SmallCircleButton
                                onClick={() => {
                                    history.push('/joinAppGroup')
                                }}>
                                    <span style={{fontSize: 25}}>
                                        <i className="fas fa-plus"></i>
                                    </span>
                            </SmallCircleButton>
            </BigContainer>
        </BaseContainer>
    )

    /*return <div>
        {response.groups.map(group => {
            return (
                //groups
            );
        })}
    </div>*/
}