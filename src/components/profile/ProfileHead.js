import React from 'react';
import { Grid, Icon } from 'semantic-ui-react';
import styled from 'styled-components';
import Avatar from 'components/common/Avatar';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

const ProfileHead = ({ children, avatar, nickname, edit }) => {
  return (
    <>
      <Grid columns={2}>
        <Grid.Row verticalAlign="middle">
          {/* 프로필 상단 왼쪽 */}
          <s.Avatar>
            <Avatar src={avatar} size="150px" />
          </s.Avatar>

          {/* 프로필 상단 오른쪽 */}
          <Grid.Column>
            <h1>
              {nickname}
              {edit && (
                <Link to="/profile/edit">
                  <s.Icon name="cog" />
                </Link>
              )}
            </h1>
            {children}
          </Grid.Column>
        </Grid.Row>
      </Grid>
    </>
  );
};

const s = {};
s.Avatar = styled(Grid.Column)`
  text-align: center;
`;
s.Icon = styled(Icon)`
  padding-left: 20px;
`;

ProfileHead.propTypes = {
  children: PropTypes.node.isRequired,
  avatar: PropTypes.string,
  nickname: PropTypes.string.isRequired,
  edit: PropTypes.string,
};
export default ProfileHead;
