import React from 'react';
import styled from 'styled-components';
import { BaseContainer } from '../../views/Layout';
import { api, handleError } from '../../helpers/api';
import {withRouter} from "react-router-dom";
import {CircleButton, RectButtonSmall, RectButtonBig} from '../../views/Button';
import {PageTitle} from '../../views/Labels';
import { Colors } from "../../views/design/Colors";
import {NavBar} from "../navigation/navBar";

//Constants we need for this page
const BigContainer = styled.div`
  width: 100%;
  padding-left: 15px;
  margin-left: 3%;
  margin-right: 7%;
  border: none;
  margin-bottom: 20px;
`;

const Label = styled.label`
  margin-top: 2%;
  margin-bottom: 2%;
  margin-left: -2.5%;
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
  background: orange;
  margin-bottom: 2%;
`;

const IconHolder = styled.div`
  font-weight: 700;
  font-size: 12px;
  text-align: center;
  background: white;
  width: 55px;
  height: 55px;
  border-radius: 50%;
  margin-left: -2.5%;
`

const TextField1 = styled.label`
  color: black;
  margin-left: 30%;
  text-transform: uppercase;
  float: right;
`

const TextField2 = styled.label`
  color: black;
  margin-top: 1%;
  margin-bottom: 1%;
  margin-left: -2.5%;
  text-transform: uppercase;
  line-height:200%;
`

class ModuleDetail extends React.Component {
    constructor() {
        super();
        this.state = {

        };
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
                    <Label>Info</Label>
                    <Line>
                        <IconHolder>T</IconHolder>
                        <TextField1>Prof. Thomas Fritz</TextField1>
                    </Line>
                    <Line>
                    <IconHolder>T</IconHolder>
                    <TextField1>Monday, 14.00-16.00</TextField1><br />
                    </Line>
                    <Line>
                    <IconHolder>T</IconHolder>
                    <TextField1>https://zoom.us/...</TextField1><br />
                    </Line>
                    <Label>Deadlines</Label><br />
                    <TextField2>Quiz 3: Thursday, 24.04.2021, 14.00-16.00</TextField2><br />
                    <TextField2>Quiz 4: Thursday, 24.04.2021, 14.00-16.00</TextField2><br />
                    <TextField2>Quiz 5: Thursday, 24.04.2021, 14.00-16.00</TextField2><br />
                    <TextField2>Quiz 6: Thursday, 24.04.2021, 14.00-16.00</TextField2><br />
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
                </BigContainer>
            </BaseContainer>
        )
    }
}

export default withRouter(ModuleDetail);