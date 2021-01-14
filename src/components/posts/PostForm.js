import React, { useCallback, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Button, Form, Icon, TextArea } from 'semantic-ui-react';
import styled from 'styled-components';
import AppLayout from 'components/layout/AppLayout';
import { addPostRequest, updatePostRequest } from 'redux/post/postSlice';
import { useInput } from 'hooks/useInput';
import useUploadImages from 'hooks/useUploadImages';
import { useHistory } from 'react-router-dom';
import PropTypes from 'prop-types';
import Slider from './Slider';

const PostForm = ({ post }) => {
  const { addPostLoading, addPostDone } = useSelector((state) => state.post);
  const { currentUser } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const history = useHistory();

  const [images, onFileChange, imageInput, onImageUpload] = useUploadImages(post?.Images);
  const [text, onChangeText, setText] = useInput(post?.content ? post.content : '');

  useEffect(() => {
    addPostDone && setText('');
  }, [addPostDone]);

  const onSubmit = useCallback(() => {
    post
      ? dispatch(updatePostRequest({ images, text, postId: post.id }))
      : dispatch(addPostRequest({ images, text, currentUser }));
    history.push('/');
  }, [text]);

  return (
    <>
      <AppLayout>
        <s.div>
          <Form onSubmit={onSubmit}>
            <input
              type="file"
              accept="image/*"
              multiple
              hidden
              ref={imageInput}
              onChange={onFileChange}
            />
            <s.imageUpload>
              {images ? (
                <>
                  <p className="changeImg" onClick={onImageUpload}>
                    사진 바꾸기
                  </p>
                  <Slider Images={images} />
                </>
              ) : (
                <div className="addImg" onClick={onImageUpload}>
                  <Icon name="plus" size="huge" />
                  <p>사진을 추가하세요.</p>
                </div>
              )}
            </s.imageUpload>
            <TextArea
              rows="5"
              value={text}
              placeholder="포스트 작성"
              onChange={onChangeText}
            />
            <s.Button
              color="teal"
              type="submit"
              content="작성하기"
              loading={addPostLoading}
            />
          </Form>
        </s.div>
      </AppLayout>
    </>
  );
};

const s = {};
s.div = styled.div`
  max-width: 640px;
  margin: 0 auto;
`;
s.imageUpload = styled.div`
  width: 100%;
  border: 1px solid #eee;
  margin: 0 auto;
  text-align: center;
  & p.changeImg {
    cursor: pointer;
    text-align: right;
    padding-right: 5px;
    font-size: 0.95rem;
  }
  & img {
    width: 100%;
  }
  & div.addImg {
    color: #999;
    padding: 40px;
    cursor: pointer;
  }
`;
s.Button = styled(Button)`
  width: 100%;
`;

PostForm.propTypes = {
  post: PropTypes.shape({
    id: PropTypes.number.isRequired,
    User: PropTypes.shape({
      id: PropTypes.number.isRequired,
      nickname: PropTypes.string.isRequired,
      avatar: PropTypes.string,
    }).isRequired,
    Images: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.number.isRequired,
        src: PropTypes.string.isRequired,
      }),
    ).isRequired,
    content: PropTypes.string.isRequired,
  }),
};
export default PostForm;
