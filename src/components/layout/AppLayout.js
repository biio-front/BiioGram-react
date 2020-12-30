import React, { useCallback, useState } from 'react';
import PropTypes from 'prop-types';
import { Header, Icon, Image } from 'semantic-ui-react';
import 'semantic-ui-css/semantic.min.css';
import styled from 'styled-components';
import NavMenu from 'components/layout/NavMenu';
import { NavLink } from 'react-router-dom';

const AppLayout = ({ children }) => {
  const [oepnMenu, setOpenMenu] = useState(false);

  const onClick = useCallback(() => {
    setOpenMenu((prev) => !prev);
  }, []);

  return (
    <>
      <s.header>
        <nav>
          <Header as="h1" floated="left">
            <NavLink to="/">BiioGram</NavLink>
          </Header>
          <div className="menu">
            <NavLink to="/posting">
              <Icon name="plus" size="large" />
            </NavLink>
            <Image
              src="https://react.semantic-ui.com/images/wireframe/square-image.png"
              avatar
              floated="right"
              onClick={onClick}
            />
          </div>
        </nav>
        {oepnMenu && <NavMenu />}
      </s.header>
      <section>{children}</section>
      <footer>&copy; 2020 biio All rights reserved</footer>
    </>
  );
};

const s = {};
s.header = styled.header`
  padding: 20px;
  background-color: #fff;
  & > nav {
    width: 100%;
    height: 34px;
    & .menu {
      float: right;
      padding-top: 5px;
      & i {
        padding-top: 2px;
      }
      & img {
        cursor: pointer;
        float: right;
      }
    }
  }
`;

AppLayout.propTypes = {
  children: PropTypes.node.isRequired,
};
export default AppLayout;
