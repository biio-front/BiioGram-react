import React from 'react';
import { Grid } from 'semantic-ui-react';
import styled from 'styled-components';
import Avatar from 'components/common/Avatar';
import PropTypes from 'prop-types';

const ProfileHead = ({ children, avatar, nickname }) => {
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
            <h1>{nickname}</h1>
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
ProfileHead.propTypes = {
  children: PropTypes.node.isRequired,
  avatar: PropTypes.string,
  nickname: PropTypes.isRequired,
};
export default ProfileHead;
