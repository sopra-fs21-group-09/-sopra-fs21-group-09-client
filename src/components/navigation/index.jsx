import { motion } from "framer-motion";
import React from "react";
import { useState} from "react";
import { useHistory } from "react-router-dom";
import styled from "styled-components";
import { MenuToggle } from "./menuToggle";
import { NavMenu } from "./navMenu";

const HamburgerMenuContainer = styled.div`
  display: flex;
  position: fixed;
  top: 3%;
  left: 3%; 
  z-index: 99;
`;

const HamburgerIcon = styled.div`
  color: ${({ reverseColor }) => (reverseColor ? "#000" : "#fff")};
  cursor: pointer;
  z-index: 99;
  transition: all 250ms ease-in-out;
`;

/*change size here*/
const MenuContainer = styled(motion.div)`
  min-width: 300px;
  width: 10%;
  max-width: 44%;
  height: 100%;
  background-color: #fff;
  box-shadow: -2px 0 2px rgba(15, 15, 15, 0.3);
  z-index: 90;
  position: fixed;
  top: 0;
  left: 0;
  transform: translateX(4em);
  user-select: none;
  padding: 1.5em 2em;
`;

const BottomContainer = styled.div`
  display: inline-block;
  width: 100%;
  position: fixed;
  bottom: 0;
  left: 0;
  padding: 1.5em 2em;
`;

const IconContainer = styled.div`
  font-size: 16px;
  color: #555;
  padding-left: 15px;
`;

const BottomButton = styled(motion.button)`
  border: 0;
  background: transparent;
  color: #555;
  font-size: 14px;
  font-weight: 900;
  transition: all 250ms ease-in-out;
  display: flex;
  cursor: pointer;
  padding-left: 15px;
  padding-top: 14px;
  padding-bottom: 15px;
 

  &:hover {
    color: #666;
  }

  &:focus {
    outline: none;
  }
`;
/* to display a line inbetween
&:not(:last-of-type) {
    border-left: 1px solid #b4b4b4;
  }*/

const ContentContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 5em;
`;

/*change percentage for size*/
const menuVariants = {
  open: {
    transform: "translateX(-3%)",
  },
  closed: {
    transform: "translateX(-103%)",
  },
};

const menuTransition = {
  type: "spring",
  duration: 1,
  stiffness: 33,
  delay: 0.1,
};

const commonVariants = {
  show: {
    transform: "translateX(0em)",
    opacity: 1,
    transition: {
      delay: 0.3,
      duration: 0.01,
    },
  },
  hide: {
    transform: "translateX(5em)",
    opacity: 0,
  },
};

const commonTransition = { type: "spring", duration: 0.05 };

export function HamburgerMenu(props) {
  const [isOpen, setOpen] = useState(false);

  const toggleMenu = () => {
    setOpen(!isOpen);
  };

  const history = useHistory();

  return (
    <HamburgerMenuContainer>
      <MenuToggle toggle={toggleMenu} isOpen={isOpen}/>
      <MenuContainer
        initial={false}
        animate={isOpen ? "open" : "closed"}
        variants={menuVariants}
        transition={menuTransition}
      >
        <ContentContainer>
          <NavMenu isOpen={isOpen} />
        </ContentContainer>
        <BottomContainer>
          <BottomButton
              onClick={() => history.push('/profile')}
              initial={false}
              animate={isOpen ? "show" : "hide"}
              variants={commonVariants}
              transition={commonTransition}
          >
            BROFILE
          </BottomButton>
          <BottomButton
              onClick={() =>
                {history.push('/login');
                localStorage.removeItem('token');}
              }
              initial={false}
              animate={isOpen ? "show" : "hide"}
              variants={commonVariants}
              transition={commonTransition}
          >
            LOGOUT
          </BottomButton>
        </BottomContainer>
      </MenuContainer>
    </HamburgerMenuContainer>
  );
}
