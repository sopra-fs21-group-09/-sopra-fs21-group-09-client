import React from 'react';
import styled from 'styled-components';
import { api, handleError } from '../../helpers/api';
import { RectButton } from '../../views/Button';
import { withRouter } from 'react-router-dom';
import {COLORS} from "../../views/design/colors";
import User from "../profile/User";

//Change the whole background for just this file
document.body.style.backgroundColor = COLORS.COLOR11;

//Constants we need for this page
const EditMainContainer = styled.div`
  height: ${props => props.height}px;
  background: ${props => props.background};
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: left;
  margin-top: 10%;
  margin-bottom: 4%;
  background: ${COLORS.COLOR13};
  margin-left: 30%;
  padding-left: 15px;
  margin-right: 30%;
  padding-right: 15px;
  border-radius: 20px;
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 20px;
`;

const Title = styled.label`
  color: white;
  margin-bottom: 30px;
  text-transform: uppercase;
  text-align: center;
  margin: 3%;
  font-size: 30px;
`;

const Label = styled.label`
  color: white;
  margin-bottom: 10px;
  text-transform: uppercase;
`;

const InputField = styled.input`
  &::placeholder {
    color: rgba(255, 255, 255, 1.0);
  }
  height: 35px;
  padding-left: 15px;
  margin-left: -4px;
  border: none;
  margin-bottom: 20px;
  background: rgba(255, 255, 255, 0.2);
  color: white;
  border-radius: 20px;
`;

class Edit extends React.Component {
    constructor() {
        super();
        this.state = {
            user: null,
            loading: true
        };
    }

    /**
     * HTTP POST request is sent to the backend.
     * If the request is successful, a new user is returned to the front-end
     * and its token is stored in the localStorage.
     */
    async edit() {
        try {
            const requestBody = JSON.stringify({
                id: this.state.id,
                username: this.state.username,
                birthday: this.state.birthday,
                matrikel_nr: this.state.matrikel_nr
            });

            const response = await api.put(`/users/${localStorage.getItem('id')}`, requestBody);

            // Get the returned user and update a new object.
            const user = new User(response.data);

            // Store the token into the local storage.
            localStorage.setItem('token', user.token);

            // Login successfully worked --> navigate to the route /game in the GameRouter
            this.props.history.push(`/game/Profile`);
        } catch (error) {
            alert(`Something went wrong during the edit: \n${handleError(error)}`);
        }
    }

    /**
     *  Every time the user enters something in the input field, the state gets updated.
     * @param key (the key of the state for identifying the field that needs to be updated)
     * @param value (the value that gets assigned to the identified state key)
     */
    handleInputChange(key, value) {
        this.setState({ [key]: value });
    }

    async componentDidMount() {
        try {

        } catch (error) {
            alert(`Something went wrong while fetching the users: \n${handleError(error)}`);
        }
    }

    render() {
            return (
                <EditMainContainer>
                    <Title>Here you can edit your profile:</Title>
                    <Label>Change Username:</Label>
                    <InputField
                        placeholder="Enter your new username here..."
                        onChange={e => {
                            this.handleInputChange('username', e.target.value);
                        }}
                    />
                    <Label>Change Birthday:</Label>
                    <InputField
                        placeholder="Enter your birthday here..."
                        onChange={e => {
                            this.handleInputChange('birthday', e.target.value);
                        }}
                    />
                    <Label>Change Matrikelnumber:</Label>
                    <InputField
                        placeholder="Enter your Matrikelnumber here..."
                        onChange={e => {
                            this.handleInputChange('matrikelnumber', e.target.value);
                        }}
                    />
                    <ButtonContainer>
                        <RectButton
                            disabled={!this.state.username || !this.state.birthday || !this.state.matrikel_nr}
                            width="60%"
                            onClick={() => {
                                this.edit();
                            }}
                        >
                            Change your Brofile Information!
                        </RectButton>
                    </ButtonContainer>
                    <ButtonContainer>
                        <RectButton
                            width="100%"
                            onClick={() => {
                                this.props.history.push('/profile');
                            }}
                        >
                            Back to Profile
                        </RectButton>
                    </ButtonContainer>
                </EditMainContainer>
            );
        }

}

export default withRouter(Edit);