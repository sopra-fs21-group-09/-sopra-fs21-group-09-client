import React, {Component} from "react";
import styled from "styled-components";
import "../../views/design/StyleSheet.css"
import { Colors } from "../../views/design/Colors"

export const UpcomingContainer = styled.div`
  height: 50%;
  margin: 0px 10px 10px 10px;
`;

export const Upcoming = styled.div`
  &:hover {
    transform: translateY(-2px);
  }
  width: 100%;
  height: 25px;
  padding: 10px;
  margin: 5px 0px 5px 0px;
  border-radius: 5px;
  display: flex;
  align-items: center;
  color: white;
  background-color: ${Colors.LECTURES}; 
`;

