import React from "react";
import styled from "styled-components";


const Container = styled.div`
  margin: 6px 0;
  height: 200px;
  width: 280px;
  padding: 10px;
  border-radius: 6px;
  display: flex;
  align-items: center;
  border: 1px solid #ffffff26;
`;


const Table = styled.table`
  width:100%;
  height:100%;
`;

const Row = styled.tr`
  text-align:left;
`;

const Fat = styled.td`
 font-weight:bold;

`;

/**
 * This is an example of a Functional and stateless component (View) in React. Functional components are not classes and thus don't handle internal state changes.
 * Conceptually, components are like JavaScript functions. They accept arbitrary inputs (called “props”) and return React elements describing what should appear on the screen.
 * They are reusable pieces, and think about each piece in isolation.
 * Functional components have to return always something. However, they don't need a "render()" method.
 * https://reactjs.org/docs/components-and-props.html
 * @FunctionalComponent
 */


const Profile = ({ user }) => {
  return (
    <Container>
        <Table>
            <Row>
                <Fat>Username</Fat>
                <td>{user.username}</td>
            </Row>
            <Row>
                <Fat>Status</Fat>
                <td>{user.status}</td>
            </Row>
            <Row>
                <Fat>Creation Date</Fat>
                <td>{user.creationDate}</td>
            </Row>
            <Row>
                <Fat>Birthday</Fat>
                <td>{user.birthday}</td>
            </Row>

        </Table>
    </Container>
  );
};

export default Profile;

