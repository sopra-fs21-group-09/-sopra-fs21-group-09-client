import React from 'react';
import styled from 'styled-components';
import { BaseContainer } from '../../views/Layout';
import { api, handleError } from '../../helpers/api';
import {withRouter} from "react-router-dom";
import {RectButtonBig} from '../../views/Button';
import { Colors } from "../../views/design/Colors";
import {NavBar} from "../navigation/navBar";
import {Group} from "../group/Group";

//Constants we need for this page
const BigContainer = styled.div`
  width: 100%;
  height: 550px;
  padding-left: 15px;
  border: none;
  margin-bottom: 20px;
  background: orange;
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

const InputField = styled.input`
  &::placeholder {
    color: #4F4F4F;
  }
  height: 35px;
  width: 30%;
  padding-left: 15px;
  margin-top: -2%;
  margin-left: 7%;
  margin-right: 7%;
  border: none;
  background: white;
  border-radius: 20px;
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

class GroupLogin extends React.Component {
    constructor() {
        super();
        this.InputOne = React.createRef();
        this.InputTwo = React.createRef();
        this.state = {

        };
    }

    /**
     * HTTP POST request is sent to the backend.
     * If the request is successful, the user is logged into group
     */
    async loginGroup() {
        try {
            const requestBody = JSON.stringify({
                name: this.state.name,
                password: this.state.password,
                open: this.state.open,
                memberLimit: this.state.memberLimit
            });

            console.log(requestBody);
            const response = await api.post(`/users/${localStorage.getItem('id')}/groups`, requestBody);

            // Get the returned user and update a new object.
            //const group = new Group(response.data);

            console.log(response);
            //console.log(group.data());
            // Login successfully worked --> navigate to the route /game in the GameRouter
            this.props.history.push(`/myGroups`);
        } catch (error) {
            alert(`Something went wrong during group creation: \n${handleError(error)}`);
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
                <BigContainer>

                </BigContainer>
            </BaseContainer>
        )
    }
}

export default withRouter(GroupLogin);