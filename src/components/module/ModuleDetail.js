import React, {useEffect, useState} from 'react';
import styled from 'styled-components';
import { BaseContainer } from '../../views/Layout';
import { api, handleError } from '../../helpers/api';
import {withRouter, useLocation} from "react-router-dom";
import {SmallCircleButton, CircleButton, RectButtonSmall, RectButtonBig} from '../../views/Button';
import {PageTitle} from '../../views/Labels';
import { Colors, getNewRandomColor } from "../../views/design/Colors";
import {NavBar} from "../navigation/navBar";
import {faAlignCenter} from "@fortawesome/free-solid-svg-icons";
import ShadowScrollbars from "../../views/design/Scrollbars";
import {useHistory} from "react-router-dom";
import { Redirect } from 'react-router';
import {Deadline} from "../home/Calendar";

//Constants we need for this page
const BigContainer = styled.div`
  width: 100%;
  height: 550px;
  border: none;
  margin-bottom: 20px;
  columns: 2;
`;

const LeftContainer = styled.div`
  width: 100%;
  height: 100%;
  padding-left: 15px;
  border: none;
`;

const RightContainer = styled.div`
  width: 100%;
  height: 100%;
  border: none;
  padding-left: 5%;
`;

const SmallRightContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-template-rows: repeat(auto-fill, 100px);
  grid-row-gap: 1em;
  grid-column-gap: 1em;
  width: 100%;
  border: none;
  margin-left: -5%;
`;

//This is the div that will be generated with each new group
const GroupContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  place-self: center;
  font-size: 30px;
  background: red;
  width: 100px;
  height: 100px;
  border-radius: 20%;
`;

const Label = styled.label`
  margin-top: 2%;
  margin-bottom: 2%;
  text-transform: uppercase;
  line-height:320%;
  color: ${Colors.COLOR14};
  font-size: 28px;
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: center;
  padding-top: 3%;
`;

const Line = styled.div`
  width: 50%;
  margin-bottom: 2%;
  columns: 2;
  height: 55px;
`;

const IconHolder = styled.div`
  font-weight: 700;
  font-size: 12px;
  text-align: center;
  background: white;
  width: 55px;
  height: 55px;
  border-radius: 50%;
`;

const TextField1 = styled.label`
  color: black;
  text-transform: uppercase;
  float: left;
  height: 55px;
  margin-left: -50%;
  display: flex;
  align-items: center;
`;

const TextField2 = styled.label`
  color: black;
  margin-top: 1%;
  margin-bottom: 1%;
  text-transform: uppercase;
  line-height:200%;
`;

export const Deadlines = props => {
    return(
        <div>
            <Label>Deadlines</Label><br />
            <TextField2>Quiz 3: Thursday, 24.04.2021, 14.00-16.00</TextField2><br />
            <TextField2>Quiz 4: Thursday, 24.04.2021, 14.00-16.00</TextField2><br />
            <TextField2>Quiz 5: Thursday, 24.04.2021, 14.00-16.00</TextField2><br />
            <TextField2>Quiz 6: Thursday, 24.04.2021, 14.00-16.00</TextField2><br />
        </div>
    )
}

export const Info = props => {
    return(
        <div>
            <Label>Info</Label>
            <Line>
                <IconHolder>
                    <span style={{fontSize: 35}}>
                        <i className="far fa-user"></i>
                    </span>
                </IconHolder>
                <TextField1>{props.module ? props.module.prof_name : 'Not Loaded Yet'}</TextField1>
            </Line>
            <Line>
                <IconHolder>
                    <span style={{fontSize: 35}}>
                        <i className="far fa-calendar"></i>
                    </span>
                </IconHolder>
                <TextField1>Monday, 14.00-16.00</TextField1><br />
            </Line>
            <Line>
                <IconHolder>
                    <span style={{fontSize: 35}}>
                        <i className="fas fa-video"></i>
                    </span>
                </IconHolder>
                <TextField1>{props.module ? props.module.zoom_link : 'Not Loaded Yet'}</TextField1><br />
            </Line>
        </div>
    )
}

export const JoinedGroups = props => {
    console.log('in JoinedGroups')
    console.log(props.module)
    return(
        <RightContainer>
            <Label>Joined Groups</Label>
            <ShadowScrollbars style={{height: 420}}>
                <SmallRightContainer>
                    <GroupContainer className={"Box"}>09</GroupContainer>
                    <GroupContainer className={"Box"}>10</GroupContainer>
                    <GroupContainer className={"Box"}>11</GroupContainer>
                    <GroupContainer className={"Box"}>12</GroupContainer>
                    <SmallCircleButton
                        width="100%"
                        onClick={() => {
                            props.history.push({
                                pathname: '/joinModuleGroup',
                                moduleId: props.module.id,
                                moduleName: props.module.name
                                //module: props.module  TODO: find out why this does not work
                            });
                        }}
                    >
                                    <span style={{fontSize: 25}}>
                                        <i className="fas fa-plus"></i>
                                    </span>
                    </SmallCircleButton>
                </SmallRightContainer>
            </ShadowScrollbars>
        </RightContainer>
    )
}

export function ModuleDetail(props){//props is id

    const colors = ['red', 'blue', 'green', 'teal', 'rosybrown', 'tan', 'plum', 'saddlebrown'];
    const location = useLocation();
    const [module, setModule] = useState();
    const history = useHistory();

    function getRandomColors(){
        getNewRandomColor()
    }

    /**
     * HTTP GET request is sent to the backend.
     * If the request is successful, the modules are shown
     */
    async function moduleDetail() {
        try {
            const response = await api.get('/users/'+ localStorage.getItem('id')+'/modules')

        } catch (error) {
            alert(`Something went wrong during getting the moduleDetail: \n${handleError(error)}`);
        }
    }


    useEffect(() => {
        //Change the whole background for just this file
        document.body.style.backgroundColor = Colors.COLOR11;
        getRandomColors();
    }, []);

    useEffect(() => {
        console.log(location.pathname); // result: '/secondpage'
        console.log(location.module); // result: 'some_value'
        setModule(location.module)
    }, [location]);


        return (
            <BaseContainer>
                <NavBar/>
                <PageTitle>Module Detail</PageTitle>
                <BigContainer>
                    <LeftContainer>
                        <Info module={module}/>
                        <Deadlines/>
                    </LeftContainer>
                    <JoinedGroups history={history} module={module}/>
                </BigContainer>
                <ButtonContainer>
                    <RectButtonBig
                        width="100%"
                        onClick={() => {
                            history.push('/modules')
                        }}
                    >
                        Back to your Modules
                    </RectButtonBig>
                </ButtonContainer>
            </BaseContainer>
        )
}
