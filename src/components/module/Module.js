import React, {useState} from "react";
import {RectButtonSmall} from "../../views/Button";
import styled from "styled-components";
import {DateLabel} from "../task/Tasks";
import {Task} from "../task/Task";
import ShadowScrollbars from "../../views/design/Scrollbars";
import Group from "../group/AllAppGroups";
import {useHistory} from "react-router-dom";
import {ModuleDetail} from "./ModuleDetail";

const ModuleBox = styled.div`
  height: 60px;
  width: 99%;
  display grid;
  grid-template-columns: 40% 40% 15%;
  grid-template-rows: 1;
  grid-column-gap: 1em;
  margin-top: 1%;
  margin-bottom: 1%;
  border: 1px solid black;
  background: white;
  border-radius: 10px;
`;

const InboxLabel = styled.div`
  color: black;
  font-size: 25px;
  place-self: center;
`;

const InboxButtonContainer = styled.div`
  place-self: center;
  width: 80%;
`;


export const Module = props => {
    const history = useHistory()

    return (
        <ModuleBox>
            <InboxLabel>{props.name}</InboxLabel>
            <InboxLabel>{props.description}</InboxLabel>
            <InboxButtonContainer>
                <RectButtonSmall
                    width="100%"
                    onClick={() => {
                        history.push('/moduleDetail');
                        {ModuleDetail(props.id)}
                    }}
                >
                    Info
                </RectButtonSmall>
            </InboxButtonContainer>
        </ModuleBox>
    )
}

export const JoinModule = props => {
    const history = useHistory()

    return (
        <ModuleBox>
            <InboxLabel>{props.name}</InboxLabel>
            <InboxButtonContainer style={{width: '30%'}}>
                <RectButtonSmall
                    onClick={() => {
                    }}
                >
                    Join
                </RectButtonSmall>
            </InboxButtonContainer>
            <InboxButtonContainer>
                <RectButtonSmall
                    width="100%"
                    onClick={() => {
                        history.push('/moduleDetail');
                    }}
                >
                    Info
                </RectButtonSmall>
            </InboxButtonContainer>
        </ModuleBox>
    )
}



export function ModuleList(props) {
    const modules = props.modules

    return (
        <ShadowScrollbars style={{height: 430}}>
            {modules.map(module => {
                return (
                    <Module name={module.name} description={module.description}/>
                );
            })}
        </ShadowScrollbars>
    )

}

export function JoinModuleList(props) {
    const modules = props.modules

    return (
        <ShadowScrollbars style={{height: 430}}>
            {modules.map(module => {
                return (
                    <JoinModule name={module.name} description={module.description}/>
                );
            })}
        </ShadowScrollbars>
    )

}