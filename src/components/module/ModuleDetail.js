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
  margin-left: 16%;
  text-transform: uppercase;
  line-height:320%;
  color: orange;
  font-size: 25px;
`;

const ModuleBox = styled.div`
  height: 60px;
  width: 100%;
  columns: 2;
  margin-left: 0%;
  margin-right: 7%;
  margin-top: 1%;
  margin-bottom: 1%;
  border: 1px solid black;
  background: white;
  border-radius: 10px;
`;

const InboxLabel = styled.div`
  color: black;
  font-size: 25px;
  text-align: center;
  padding-top: 10px;
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: center;
  padding-top: 3%;
`;

const Scrollbar = styled.div`
    overflow: auto;
    height: 450px;
    width: 100%;
`;

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
                    <ButtonContainer>
                        <RectButtonBig
                            width="100%"
                            onClick={() => {
                                this.props.history.push('/module');
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