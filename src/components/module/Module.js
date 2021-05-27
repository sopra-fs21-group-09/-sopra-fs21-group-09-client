import React from "react";
import {RectButtonSmall} from "../../views/Button";
import styled from "styled-components";
import ShadowScrollbars from "../../views/design/Scrollbars";
import {useHistory} from "react-router-dom";
import {api, handleError} from "../../helpers/api";

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
  margin-left: 2%;
  color: black;
  font-size: 25px;
  place-self: center;
  overflow-wrap: break-word;
  word-wrap: break-word;
  hyphens: auto;
  font-size: 1vw;
  z-index: 1;
`;

const InboxButtonContainer = styled.div`
  place-self: center;
  width: 80%;
`;

async function userJoinModule(id){
    try {
        await api.post('/users/'+ sessionStorage.getItem('id')+'/modules/'+id)
    } catch (error) {
        alert(`Something went wrong during post module: \n${handleError(error)}`);
    }
}

function infoButton(history, module){
    return(
    <InboxButtonContainer>
        <RectButtonSmall
            width="100%"
            onClick={() => {
                history.push({
                    pathname: '/moduleDetail',
                    module: module
                });
                sessionStorage.setItem('moduleInfo', module.id);
            }}
        >
            Info
        </RectButtonSmall>
    </InboxButtonContainer>
    )
}

export const Module = props => {
    const history = useHistory()

    console.log('MODULE')
    console.log(props.module)

    return (
        <ModuleBox>
            <InboxLabel>{props.module.name}</InboxLabel>
            <InboxLabel>{props.module.category}</InboxLabel>
            {infoButton(history, props.module)}
        </ModuleBox>
    )
}

export const JoinModule = props => {
    const history = useHistory()
    return (
        <ModuleBox>
            <InboxLabel>{props.module.name}</InboxLabel>
            <InboxButtonContainer style={{width: '30%'}}>
                <RectButtonSmall
                    onClick={() => {
                        userJoinModule(props.module.id);
                        history.push({
                            pathname: '/modules',
                            changeProps: true
                        });
                    }}
                >
                    Join
                </RectButtonSmall>
            </InboxButtonContainer>
            {infoButton(history, props.module)}
        </ModuleBox>
    )
}



export function ModuleList(props) {
    const modules = props.modules

    return (
        <ShadowScrollbars style={{height: 430}}>
            {modules.map(module => {
                return (
                    <Module module={module}/>
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
                    <JoinModule module={module}/>
                );
            })}
        </ShadowScrollbars>
    )

}