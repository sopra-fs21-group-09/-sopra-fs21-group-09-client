import React from 'react';
import styled from 'styled-components';
import { BaseContainer } from '../../helpers/layout';
import { api, handleError } from '../../helpers/api';

const Label = styled.label`
  color: white;
  margin-bottom: 10px;
  text-transform: uppercase;
`;

class Home extends React.Component {
    constructor() {
        super();
        this.state = {
        };
    }

    componentDidMount() {
    }

    render() {
        return (
            <BaseContainer>
                <Label>Welcome to your Home Screen</Label>
            </BaseContainer>
        )
    }
}

export default withRouter(Home);