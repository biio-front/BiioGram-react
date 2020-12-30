import React, { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Button, Form, Input } from 'semantic-ui-react';
import styled from 'styled-components';
import AppLayout from 'components/layout/AppLayout';
import { editProfileRequest } from 'redux/user/userSlice';
import { useInput } from 'hooks/useInput';
import useUploadImages from 'hooks/useUploadImages';
import ProfileHead from 'components/profile/ProfileHead';
import { useHistory } from 'react-router-dom';

const EditProfile = () => {
  const { currentUser, editProfileLoading } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const history = useHistory();

  const [images, onFileChange, imageInput, onImageUpload] = useUploadImages();
  const [nickname, onChangeNickname] = useInput(currentUser.nickname);
  const [desc, onChangeDesc] = useInput(currentUser.desc);

  const onSubmit = useCallback(() => {
    const src = images[0]?.src;
    const userId = currentUser.id;
    dispatch(editProfileRequest({ src, nickname, desc, userId }));
    history.push('/profile');
  }, [images, nickname, desc]);

  return (
    <AppLayout>
      <s.article>
        <ProfileHead avatar={images[0]?.src || currentUser.avatar} nickname={nickname}>
          <input
            type="file"
            accept="image/*"
            hidden
            ref={imageInput}
            onChange={onFileChange}
          />
          <div>
            <p>{currentUser.email}</p>
            <s.changeAvatar onClick={onImageUpload}>프로필 사진 바꾸기</s.changeAvatar>
          </div>
        </ProfileHead>
        <s.Form onSubmit={onSubmit}>
          <div>
            <label htmlFor="nickname">닉네임</label>
            <Input
              id="nickname"
              type="text"
              value={nickname}
              onChange={onChangeNickname}
              size="small"
            />
          </div>
          <div>
            <label htmlFor="user-desc">소개</label>
            <Input
              id="user-desc"
              type="text"
              value={desc}
              onChange={onChangeDesc}
              size="small"
            />
          </div>
          <div>
            <s.Button
              type="submit"
              content="수정사항 저장하기"
              color="teal"
              loading={editProfileLoading}
            />
          </div>
        </s.Form>
      </s.article>
    </AppLayout>
  );
};

const s = {};
s.article = styled.article`
  padding: 10px;
`;
s.changeAvatar = styled.a`
  cursor: pointer;
`;
s.Form = styled(Form)`
  margin-top: 20px;
  padding: 0 20px;
  & > div {
    margin-bottom: 10px;
    & label {
      font-weight: bold;
    }
  }
`;
s.Button = styled(Button)`
  width: 100%;
`;
export default EditProfile;
