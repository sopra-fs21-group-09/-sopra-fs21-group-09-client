import React from 'react';
import styled from 'styled-components';
import { BaseContainer } from '../../helpers/layout';
import { api, handleError } from '../../helpers/api';
import User from '../shared/models/User';
import {Link, withRouter} from 'react-router-dom';
import { Button } from '../../views/design/Button';

const FormContainer = styled.div`
  margin-left: 0px;
  margin-right: 0px;
  margin-top: 2em;
  display: flex;
  flex-direction: column;
  align-items: stretch;
  min-height: 250px;
  justify-content: center;
`;

const Form = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 120%;
  height: 350px;
  font-size: 16px;
  font-weight: 300;
  padding-left: 37px;
  margin-left: -40px;
  padding-right: 37px;
  border-radius: 5px;
  background: linear-gradient(rgb(27, 124, 186), rgb(2, 46, 101));
  transition: opacity 0.5s ease, transform 0.5s ease;
`;

const InputField = styled.input`
  &::placeholder {
    color: rgba(255, 255, 255, 1.0);
  }
  height: 35px;
  padding-left: 15px;
  margin-left: -4px;
  border: none;
  border-radius: 20px;
  margin-bottom: 20px;
  background: rgba(255, 255, 255, 0.2);
  color: white;
`;

const Label = styled.label`
  display:inline-block;
  width: 20%;
  color: white;
  margin-bottom: 10px;
`;

/**
 * Classes in React allow you to have an internal state within the class and to have the React life-cycle for your component.
 * You should have a class (instead of a functional component) when:
 * - You need an internal state that cannot be achieved via props from other parent components
 * - You fetch data from the server (e.g., in componentDidMount())
 * - You want to access the DOM via Refs
 * https://reactjs.org/docs/react-component.html
 * @Class
 */
class UserProfileEdit extends React.Component {
  constructor() {
    super();
    this.state = {
      birthday: null,
      username: null
    };
  }

  async edit() {
    try {
      const requestBody = JSON.stringify({
        username: this.state.username,
        birthday: this.state.birthday
      });
      await api.put(`/users/${this.props.location.state.user.id}`, requestBody);

      this.props.history.push({
        pathname: `${this.props.base}`,
        state: {
          user: this.props.location.state.user,
          base: "/game"
        }})

    } catch (error) {
      alert(`Something went wrong during the login: \n${handleError(error)}`);
    }
  }

  /**
   *  Every time the user enters something in the input field, the state gets updated.
   * @param key (the key of the state for identifying the field that needs to be updated)
   * @param value (the value that gets assigned to the identified state key)
   */
  handleInputChange(key, value) {
    // Example: if the key is username, this statement is the equivalent to the following one:
    // this.setState({'username': value});
    this.setState({ [key]: value });
  }

  toProfile(){
    this.props.history.push({
      pathname: `${this.props.base}`,
      state: {
        user: this.props.location.state.user,
        base: "/game/userProfile"
      }
    })}


  /**
   * componentDidMount() is invoked immediately after a component is mounted (inserted into the tree).
   * Initialization that requires DOM nodes should go here.
   * If you need to load data from a remote endpoint, this is a good place to instantiate the network request.
   * You may call setState() immediately in componentDidMount().
   * It will trigger an extra rendering, but it will happen before the browser updates the screen.
   */
  componentDidMount() {}

  render() {
    return (
      <BaseContainer>
        <FormContainer>
          <Form>
            <Label>Username</Label>
            <InputField
                placeholder="Enter here.."
                onChange={e => {
                  this.handleInputChange('username', e.target.value);
                }}

            />
            <Label>Birthday</Label>
            <InputField
            type="date"
            min="1900-01-01"
            max="2021-01-01"
                onChange={e => {
                  this.handleInputChange('birthday', e.target.value);
                }}
            />
              <Button
                  disabled={!this.state.username && !this.state.birthday}
                  width="100%"
                  onClick={() => {
                    this.edit();
                  }}
              >
                Edit
              </Button>
            <p></p>
            <Button
                width="100%"
                onClick={() => {
                  this.toProfile();
                }}
            >
              Go back
            </Button>
            <p></p>
          </Form>
        </FormContainer>
      </BaseContainer>
    );
  }
}

/**
 * You can get access to the history object's properties via the withRouter.
 * withRouter will pass updated match, location, and history props to the wrapped component whenever it renders.
 */
export default withRouter(UserProfileEdit);
