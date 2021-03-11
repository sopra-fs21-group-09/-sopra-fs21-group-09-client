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

const AttributeContainer = styled.div`
    float:left;
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

const Attribute = styled.div`
  font-weight: lighter;
  margin-left: 5px;
`;

const Value = styled.div`
  margin-left: auto;
  margin-right: 10px;
  font-weight: bold;
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
       <AttributeContainer><Attribute>Username:</Attribute><Value>{user.username}</Value></AttributeContainer>
        <AttributeContainer><Attribute>Online status:</Attribute><Value>{user.status}</Value></AttributeContainer>
        <AttributeContainer><Attribute>Creation date:</Attribute><Value>{user.creationDate}</Value></AttributeContainer>
        <AttributeContainer><Attribute>Birthday:</Attribute><Value>{user.birthday}</Value></AttributeContainer>
    </Container>
  );
};

export default Profile;
