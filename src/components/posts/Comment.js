import React, { useCallback, useEffect, useState } from 'react';
import { Form, Input, List } from 'semantic-ui-react';
import CommentList from 'components/posts/CommentList';
import styled from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';
import { addCommentRequest } from 'redux/posts/postSlice';
import { useInput } from 'hooks/useInput';
import PropTypes from 'prop-types';

const Comment = ({ postId, comments, toggleComment, onToggleComment }) => {
  const { currentUser } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const [newComment, setNewComment] = useState(null);
  const [open, setOpen] = useState(false);
  const [text, onChangeText, setText] = useInput('');

  // 덧글아이콘(at PostCard)을 눌렀을 때 덧글창이 열리거나 닫힘
  useEffect(() => {
    setOpen(toggleComment);
    setNewComment(null);
  }, [toggleComment]);

  const onToggle = useCallback(() => {
    // 덧글아이콘(at PostCard)을 눌렀을 때 덧글창이 열리거나 닫힘
    onToggleComment(!open);
    // 덧글 닫기/모두보기 클릭시 토글
    setOpen((prev) => !prev);
    setNewComment(null);
  }, []);

  const onSubmit = useCallback(() => {
    dispatch(addCommentRequest({ postId, currentUser, text }));
    setNewComment(text);
    setText('');
  }, [text]);
  return (
    <s.comment>
      <p onClick={onToggle}>
        {open ? '덧글 닫기' : `${comments?.length}개의 덧글 모두 보기`}
      </p>
      {open && (
        <List>
          {comments.map((v) => (
            <CommentList
              key={v.id}
              postId={postId}
              commentId={v.id}
              userId={v.User.id}
              nickname={v.User.nickname}
              content={v.content}
            />
          ))}
        </List>
      )}
      {newComment && !open && (
        <List>
          <CommentList
            postId={postId}
            commentId={comments.length + 1}
            userId={currentUser.id}
            nickname={currentUser.nickname}
            content={newComment}
          />
        </List>
      )}
      <Form onSubmit={onSubmit}>
        <Input
          transparent
          placeholder="덧글을 입력하세요."
          value={text}
          onChange={onChangeText}
        />
      </Form>
    </s.comment>
  );
};
const s = {};
s.comment = styled.div`
  padding: 0 10px;
  & > p {
    margin: 0;
    color: gray;
    cursor: pointer;
    font-size: 0.95rem;
  }
  & > .list {
    margin-top: 10px;
  }
  & .item {
    margin-bottom: 5px;
  }
  & form {
    margin-top: 10px;
  }
`;
Comment.propTypes = {
  postId: PropTypes.number.isRequired,
  comments: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      content: PropTypes.string.isRequired,
      User: PropTypes.shape({
        id: PropTypes.number.isRequired,
        nickname: PropTypes.string.isRequired,
      }).isRequired,
    }),
  ).isRequired,
  toggleComment: PropTypes.bool.isRequired,
  onToggleComment: PropTypes.func.isRequired,
};
export default Comment;
