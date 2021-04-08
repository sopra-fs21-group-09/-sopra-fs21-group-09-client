import React, {Component} from "react";
import styled from "styled-components";
import {HomeContainer} from "./layout";
import {CircleButton, RectangleButton, RectButton, RoundButton} from "./Button";
import "./design/styleSheet.css"

//GROUP
export const GroupContainer = styled.div`
  border-radius: 6px;
  align-items: center;
  border: 1px solid #018692;
  background-color: #018692;
  width: 15%;
  height: 0;
  padding-top: 15%;
  position:relative;
  z-index: -1;
`;

export const GroupName = styled.label`
  color: white;
  text-transform: uppercase;    
  position: absolute;
  top: 0;
  left: 0;
  z-index: 1;
  padding: 50px 50px;
  margin: auto;
  width: 50%;
`;

export class Group extends Component {
    render() {
        return (<GroupContainer>
                <GroupName>GROUP NAME</GroupName>
            </GroupContainer>
        )
    }
}

//TASK
export const TaskContainer = styled.div`
`;

export const Task = styled.div`
  margin: 6px 0;
  width: 280px;
  padding: 10px;
  border-radius: 6px;
  display: flex;
  align-items: center;
  width: 517px;
  height: 48px;
  left: 113px;
  top: 432px;
  background: #E5E5E5;
  border: 3px solid #018692;
  border-radius: 45px;
  box-sizing: border-box;
`;




//WEEKDAY
export const WeekdayContainer = styled.div`
  align-items: center;
  width: 15%;
  height: 816px; 
  padding: 20px 0px 0px 0px;
  background: #FEFEFE;
  border-radius: 30px;
  position: relative;
  z-index: -1;
  text-align: center;
`;

export const WeekDayLabel = styled.label`
  color: grey;
  text-transform: uppercase;
  vertical-align: middle;
  margin-bottom: 10px;
`;

export class Weekday extends Component {
    render() {
        return (<WeekdayContainer>
                <WeekDayLabel>Monday</WeekDayLabel>
            </WeekdayContainer>
        )
    }
}

//CALENDAR ENTRY
export const CalendarEntryContainer = styled.div`
  margin: 6px 0;
  width: 100%;
  height: 80px;
  padding: 10px;
  border-radius: 6px;
  display: flex;
  align-items: center;
  border: 1px solid #ffffff26;
  background-color: #E86539; 
`;

export const CalendarEntryTitle = styled.label`
  margin: 6px 0;
`;

export const CalendarEntryDescription = styled.label`
  margin: 6px 0;
  font-size: 10px;
`;

export class CalendarEntry extends Component {
    render() {
        return (<CalendarEntryContainer>
                <CalendarEntryTitle>Title</CalendarEntryTitle>
                <div className="new_line"/>
                <CalendarEntryDescription>Description</CalendarEntryDescription>
            </CalendarEntryContainer>
        )
    }
}

//CALENDAR TODO: find out why Calendar Entries do not appear in front
export const CalendarContainer = styled.div`
  display: flex;
  width: 70%;
  height: 816px; 
  justify-content : space-around
`;

export class Calendar extends Component {
    render() {
        return (<CalendarContainer>
                    <Weekday>
                        <CalendarEntry></CalendarEntry>
                        <CalendarEntry></CalendarEntry>
                        <CalendarEntry></CalendarEntry>
                    </Weekday>
                    <Weekday>
                        <CalendarEntry></CalendarEntry>
                        <CalendarEntry></CalendarEntry>
                        <CalendarEntry></CalendarEntry>
                    </Weekday>
                    <Weekday>
                        <CalendarEntry></CalendarEntry>
                        <CalendarEntry></CalendarEntry>
                        <CalendarEntry></CalendarEntry>
                    </Weekday>
                    <Weekday>
                        <CalendarEntry></CalendarEntry>
                        <CalendarEntry></CalendarEntry>
                        <CalendarEntry></CalendarEntry>
                    </Weekday>
                    <Weekday>
                        <CalendarEntry></CalendarEntry>
                        <CalendarEntry></CalendarEntry>
                        <CalendarEntry></CalendarEntry>
                    </Weekday>
                </CalendarContainer>
        )
    }
}


//LOGO
// Contains the Logo in the registration and login page
export const LogoContainer = styled.div`
  height: ${props => props.height}px;
  background: ${props => props.background};
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 5%;
`;

// Main light grey container for the login and registration page
export const LoginMainContainer = styled.div`
  height: ${props => props.height}px;
  background: ${props => props.background};
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: left;
  margin-top: 2%;
  margin-bottom: 4%;
  background: #E5E5E5;
  margin-left: 30%;
  padding-left: 15px;
  margin-right: 30%;
  padding-right: 15px;
  border-radius: 20px;
`;





