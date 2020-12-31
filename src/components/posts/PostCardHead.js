import React, { useCallback, useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Grid, Icon } from 'semantic-ui-react';
import styled from 'styled-components';
import { addFollowRequest } from 'redux/user/userSlice';
import Avatar from 'components/common/Avatar';
import PostMenu from 'components/posts/PostMenu';
import PropTypes from 'prop-types';

const PostCardHead = ({ userId, nickname, avatar, postId }) => {
  const { id, Followings } = useSelector((state) => state.user.currentUser);
  const dispatch = useDispatch();

  const [openMenu, setOpenMenu] = useState(false);
  const onFollow = useCallback(
    () => dispatch(addFollowRequest({ userId, nickname })),
    [],
  );
  const onToggleMenu = useCallback(() => {
    setOpenMenu((prev) => !prev);
  }, []);

  const style = useMemo(() => ({ margin: '0' }), []);
  return (
    <s.Grid style={style}>
      <Grid.Row verticalAlign="middle">
        <Grid.Column width={10}>
          <Avatar
            src={
              avatar
                ? avatar
                : 'https://react.semantic-ui.com/images/wireframe/square-image.png'
            }
            size="31px"
          />
          <span>
            <b>{nickname}</b>
            {userId === id ||
              (!Followings.find((v) => v.id === userId) && (
                <a onClick={onFollow}>팔로우하기</a>
              ))}
          </span>
        </Grid.Column>
        <Grid.Column floated="right" width={2}>
          <Icon name="ellipsis vertical" onClick={onToggleMenu} />
          {openMenu && <PostMenu userId={userId} postId={postId} nickname={nickname} />}
        </Grid.Column>
      </Grid.Row>
    </s.Grid>
  );
};

const s = {};
s.Grid = styled(Grid)`
  width: 100%;
  & span {
    position: relative;
    top: -8px;
    left: 10px;
    & a {
      cursor: pointer;
      margin-left: 5px;
      font-size: 0.9rem;
    }
  }
  & i {
    float: right;
    cursor: pointer;
  }
`;

PostCardHead.propTypes = {
  userId: PropTypes.number.isRequired,
  nickname: PropTypes.string.isRequired,
  avatar: PropTypes.string,
  postId: PropTypes.number.isRequired,
};
export default PostCardHead;
