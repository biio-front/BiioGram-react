import React, { useCallback, useEffect, useState } from 'react';
import { List, Loader } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import DropDownMenu from 'components/common/DropDownMenu';
import { removePostRequest } from 'redux/posts/postSlice';
import { addFollowRequest, removeFollowRequest } from 'redux/user/userSlice';

const PostMenu = ({ userId, postId, nickname }) => {
  const {
    addFollowLoading,
    removeFollowLoading,
    currentUser: { id, Followings },
  } = useSelector((state) => state.user);
  const { removePostLoading } = useSelector((state) => state.post);
  const dispatch = useDispatch();

  const [follow, setFollow] = useState(false);

  useEffect(() => {
    const isFollowed = Followings.find((v) => v.id === userId);
    isFollowed && setFollow(true);
  }, [follow]);

  const onRemove = useCallback(() => {
    dispatch(removePostRequest(postId));
  }, []);

  const onToggleFollow = useCallback(() => {
    dispatch(
      follow ? removeFollowRequest(userId) : addFollowRequest({ userId, nickname }),
    );
    setFollow((prev) => !prev);
  }, [follow]);

  return (
    <DropDownMenu top="30px">
      {userId === id ? (
        <List.Item onClick={onRemove}>
          {removePostLoading ? <Loader active inline="centered" /> : '삭제'}
        </List.Item>
      ) : (
        <>
          <List.Item onClick={onToggleFollow}>
            {addFollowLoading || removeFollowLoading ? (
              <Loader active inline="centered" />
            ) : follow ? (
              '언팔로우'
            ) : (
              '팔로우'
            )}
          </List.Item>
        </>
      )}
    </DropDownMenu>
  );
};

const s = {};
s.div = styled.div`
  text-align: center;
  & i {
    margin: 0;
  }
`;

PostMenu.propTypes = {
  userId: PropTypes.number.isRequired,
  postId: PropTypes.number.isRequired,
  nickname: PropTypes.string.isRequired,
};
export default PostMenu;
