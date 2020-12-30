import React, { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { Icon, List, Loader } from 'semantic-ui-react';
import { logoutRequest } from 'redux/user/userSlice';
import DropDownMenu from 'components/common/DropDownMenu';

const NavMenu = () => {
  const { logoutLoading } = useSelector((state) => state.user);
  const dispatch = useDispatch();

  const onLogout = useCallback(() => dispatch(logoutRequest()), []);

  return (
    <DropDownMenu top="64px">
      <List.Item>
        <NavLink to="/profile">
          <Icon name="user circle" /> 프로필
        </NavLink>
      </List.Item>
      <List.Item>
        <NavLink to="/profile/edit">
          <Icon name="setting" /> 프로필 설정
        </NavLink>
      </List.Item>
      <List.Item onClick={onLogout}>
        {logoutLoading ? <Loader active inline="centered" /> : '로그아웃'}
      </List.Item>
    </DropDownMenu>
  );
};

export default NavMenu;
