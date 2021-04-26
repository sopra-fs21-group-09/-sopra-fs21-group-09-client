import React from 'react';
import styled from 'styled-components';
import { BaseContainer } from '../../views/Layout';
import { api, handleError } from '../../helpers/api';
import {withRouter} from "react-router-dom";
import {SmallCircleButton, CircleButton, RectButtonSmall, RectButtonBig} from '../../views/Button';
import {PageTitle} from '../../views/Labels';
import { Colors } from "../../views/design/Colors";
import {NavBar} from "../navigation/navBar";
import {faAlignCenter} from "@fortawesome/free-solid-svg-icons";
import ShadowScrollbars from "../../views/design/Scrollbars";

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

class ModuleDetail extends React.Component {
    constructor() {
        super();
        this.state = {

        };
        let colors = ['red', 'blue', 'green', 'teal', 'rosybrown', 'tan', 'plum', 'saddlebrown'];
    }

    getNewRandomColor() {
        let boxes = document.getElementsByClassName("Box");
        console.log(boxes.length);
        let colors = ['#D3212D', '#0048BA', '#4CE600', '#FF8C19', '#2ac2d3', '#841ed3', '#F19CBB',
            '#99CC00', '#d3c331', '#67d363', '#3b96d3'];
        let i;
        for (i = 0; i < boxes.length; i++) {
            // Pick a random color from the array 'colors'.
            boxes[i].style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
        }
    }

    /**
     * HTTP GET request is sent to the backend.
     * If the request is successful, the modules are shown
     */
    async moduleDetail() {
        try {

        } catch (error) {
            alert(`Something went wrong during the login: \n${handleError(error)}`);
        }
    }

    componentDidMount() {
        //Change the whole background for just this file
        document.body.style.backgroundColor = Colors.COLOR11;
        this.getNewRandomColor();
    }

    handleInputChange(key, value) {
        // Example: if the key is username, this statement is the equivalent to the following one:
        // this.setState({'username': value});
        this.setState({ [key]: value });
    }

    render() {
        return (
            <BaseContainer>
                <NavBar/>
                <PageTitle>ModuleDetail</PageTitle>
                <BigContainer>
                    <LeftContainer>
                        <Label>Info</Label>
                        <Line>
                            <IconHolder>
                                <span style={{fontSize: 35}}>
                                    <i className="far fa-user"></i>
                                </span>
                            </IconHolder>
                            <TextField1>Prof. Thomas Fritz</TextField1>
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
                        <TextField1>https://zoom.us/...</TextField1><br />
                        </Line>
                        <Label>Deadlines</Label><br />
                        <TextField2>Quiz 3: Thursday, 24.04.2021, 14.00-16.00</TextField2><br />
                        <TextField2>Quiz 4: Thursday, 24.04.2021, 14.00-16.00</TextField2><br />
                        <TextField2>Quiz 5: Thursday, 24.04.2021, 14.00-16.00</TextField2><br />
                        <TextField2>Quiz 6: Thursday, 24.04.2021, 14.00-16.00</TextField2><br />
                    </LeftContainer>
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
                                        this.props.history.push('/joinGroup');
                                    }}
                                >
                                    <span style={{fontSize: 25}}>
                                        <i className="fas fa-plus"></i>
                                    </span>
                                </SmallCircleButton>
                            </SmallRightContainer>
                        </ShadowScrollbars>
                    </RightContainer>
                </BigContainer>
                <ButtonContainer>
                    <RectButtonBig
                        width="100%"
                        onClick={() => {
                            this.props.history.goBack();
                        }}
                    >
                        Back
                    </RectButtonBig>
                </ButtonContainer>
            </BaseContainer>
        )
    }
}

export default withRouter(ModuleDetail);