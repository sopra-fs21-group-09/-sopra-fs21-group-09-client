import styled from "styled-components";
import React, {Component} from "react";
import {Colors} from "../../views/design/Colors";

//WEEKDAY
export const WeekdayContainer = styled.div`
  align-items: center;
  height: 100%;
  width: 80%;
  margin-right: 5px;
  padding: 5px 5px 0px 5px;
  background: #E5E5E5;
  border-radius: 20px;
  text-align: center;
`;

export const WeekDayLabel = styled.label`
  color: grey;
  text-transform: uppercase;
  vertical-align: middle;
  margin-bottom: 10px;
`;

export const Weekday = props => {
        return (<WeekdayContainer>
                <WeekDayLabel>{props.day}</WeekDayLabel>
            </WeekdayContainer>
        )
}

//CALENDAR ENTRY
export const CalendarEntryContainer = styled.div`
  &:hover {
    transform: translateY(-2px);
    background: ${Colors.LECTURES};
  }
  position: relative;
  width: 100%;
  height: 80px;
  padding: 10px;
  margin: 5px 0px 5px 0px;
  border-radius: 5px;
  align-items: center;
  color: white;
  background-color: ${Colors.LECTURES};
`;

export const CalendarEntryTitle = styled.label`
  margin: 6px 0;
`;

export const CalendarDescription = styled.label`
  margin: 6px 0;
  font-size: 10px;
`;

export class CalendarEntry extends Component {
    constructor() {
        super();
        this.state = {
            top: null
        }
    }

    calculatePosy(start, end) {
        return end - start;
    }

    render() {
        return (<CalendarEntryContainer>
                <CalendarEntryTitle>{this.props.title}</CalendarEntryTitle>
                <CalendarDescription>{this.props.description}</CalendarDescription>
            </CalendarEntryContainer>
        )
    }
}

export const CalendarContainer = styled.div`
  position: absolute;
  top: 100px;
  left: 100px;
  width: 70%;
  height: 85%;
  display: flex;
  justify-content : space-around;
`;

export const DeadlineContainer = styled.div`
  width: 100%;
  height: 10%;
  margin: 5px 0px 5px 0px;
`;

export const Deadline = styled.div`
  &:hover {
    transform: translateY(-2px);
    background: #EB8769;
  }
  width: 100%;
  height: 25px;
  padding: 10px;
  margin: 5px 0px 0px 0px;
  border-radius: 5px;
  float: left;
  display: flex;
  align-items: center;
  background-color: ${Colors.PRIVATE}; 
`;