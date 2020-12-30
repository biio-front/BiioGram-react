import React, { useCallback, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Button, Form, Icon, TextArea } from 'semantic-ui-react';
import styled from 'styled-components';
import AppLayout from 'components/layout/AppLayout';
import { addPostRequest } from 'redux/posts/postSlice';
import { useInput } from 'hooks/useInput';
import useUploadImages from 'hooks/useUploadImages';
import { useHistory } from 'react-router-dom';

const Posting = () => {
  const { addPostLoading, addPostDone } = useSelector((state) => state.post);
  const { currentUser } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const history = useHistory();

  const [images, onFileChange, imageInput, onImageUpload] = useUploadImages();
  const [text, onChangeText, setText] = useInput('');

  useEffect(() => {
    addPostDone && setText('');
  }, [addPostDone]);

  const onSubmit = useCallback(() => {
    dispatch(addPostRequest({ images, text, currentUser }));
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
            <s.imageUpload onClick={onImageUpload}>
              {images ? (
                images.map((v, i) => <img src={v.src} alt={v.src} key={i} />)
              ) : (
                <div>
                  <Icon name="plus" size="huge" />
                  <p>사진을 추가하세요.</p>
                </div>
              )}
            </s.imageUpload>
            <TextArea rows="5" placeholder="포스트 작성" onChange={onChangeText} />
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
  cursor: pointer;
  & img {
    width: 100%;
  }
  & div {
    color: #999;
    padding: 40px;
  }
`;
s.Button = styled(Button)`
  width: 100%;
`;
export default Posting;
