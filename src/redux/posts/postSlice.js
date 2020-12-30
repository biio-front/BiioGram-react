import { createSlice } from '@reduxjs/toolkit';
import faker from 'faker';
import { dummyUser } from 'redux/user/userSlice';

export const dummyPost = {
  id: 1,
  User: {
    id: dummyUser[0].id,
    nickname: dummyUser[0].nickname,
    avatar: dummyUser[0].avatar,
  },
  Images: [
    {
      id: 1,
      src:
        'https://postfiles.pstatic.net/MjAyMDEyMTNfNzkg/MDAxNjA3ODcwMjE4MzY2.LILZ384xZJf9RMgRQhEM_mIotC-eJXNMGmFCa4MOEn0g.Ee9zgxDFIP0RBmSb6RXQBcdQypVIvJW0PWzycYd8Irkg.JPEG.bohwajung/SE-318a6c4f-6f79-4053-9704-f1a9658d7468.jpg?type=w966',
    },
    {
      id: 2,
      src:
        'https://postfiles.pstatic.net/MjAyMDEyMTNfMjk3/MDAxNjA3ODcwMTkwNTI1.itfkAz6ePBWD8NsVPJQL81J_AYZle-c0E3bA8K3nG54g.8saLG2yEVcR9TRelQQOx2IwRU7WKmGfsI_7fWZDn7NMg.JPEG.bohwajung/SE-057136c4-5ecb-48e6-aa08-d73caf672076.jpg?type=w966',
    },
  ],
  content: '첫 번째 포스트 #히히',
  Likers: [
    {
      id: 0,
      nickname: '더미유저',
      avatar: null,
    },
  ],
  Comments: [
    {
      id: 1,
      User: {
        id: 2,
        nickname: faker.name.findName(),
      },
      content: '😙😙 예쁘다!',
    },
    {
      id: 2,
      User: {
        id: 3,
        nickname: faker.name.findName(),
      },
      content: '우와 운치있어요!!',
    },
  ],
};

export const initialState = {
  addPostLoading: false,
  addPostDone: false,
  addPostError: null,
  removePostLoading: false,
  removePostDone: false,
  removePostError: null,
  addCommentLoading: false,
  addCommentDone: false,
  addCommentError: null,
  removeCommentLoading: false,
  removeCommentDone: false,
  removeCommentError: null,
  addLikersLoading: false,
  addLikersDone: false,
  addLikersError: null,
  removeLikersLoading: false,
  removeLikersDone: false,
  removeLikersError: null,
  mainPosts: [dummyPost],
};

initialState.mainPosts = initialState.mainPosts.concat(
  Array(10)
    .fill()
    .map((v, i) => ({
      id: initialState.mainPosts.length + i + 1,
      User: {
        id: 10 + i,
        nickname: faker.name.findName(),
        avatar: '',
      },
      Images: [
        {
          id: 1,
          src: faker.image.image(),
        },
      ],
      content: faker.lorem.paragraph(),
      Likers: [],
      Comments: [
        {
          id: 1,
          User: {
            id: Math.ceil(Math.random() * 30) + 10,
            nickname: faker.name.findName(),
          },
          content: faker.lorem.sentence(),
        },
        {
          id: 2,
          User: {
            id: Math.ceil(Math.random() * 30) + 10,
            nickname: faker.name.findName(),
          },
          content: faker.lorem.sentence(),
        },
      ],
    })),
);

const slice = createSlice({
  name: 'post',
  initialState,
  reducers: {
    addPostRequest(state) {
      state.addPostLoading = true;
      state.addPostDone = false;
      state.addPostError = null;
    },
    addPostSuccess(state, { payload: { images, text, currentUser, newId } }) {
      state.addPostLoading = false;
      state.addPostDone = true;
      state.mainPosts.unshift({
        id: newId,
        User: {
          id: currentUser.id,
          nickname: currentUser.nickname,
          avatar: currentUser.avatar,
        },
        Images: [...images],
        content: text,
        Likers: [],
        Comments: [],
      });
    },
    addPostFail(state, { payload: error }) {
      console.log(error);
      state.addPostLoading = false;
      state.addPostError = error;
    },
    removePostRequest(state) {
      state.removePostLoading = true;
      state.removePostDone = false;
      state.removePostError = null;
    },
    removePostSuccess(state, { payload }) {
      state.removePostLoading = false;
      state.removePostDone = true;
      state.mainPosts = state.mainPosts.filter((v) => v.id !== payload);
    },
    removePostFail(state, { payload: error }) {
      console.log(error);
      state.removePostLoading = false;
      state.removePostError = error;
    },
    addCommentRequest(state) {
      state.addCommentLoading = true;
      state.addCommentDone = false;
      state.addCommentError = null;
    },
    addCommentSuccess(state, { payload: { postId, currentUser, text } }) {
      state.addCommentLoading = false;
      state.addCommentDone = true;
      const post = state.mainPosts.find((v) => v.id === postId);
      post.Comments.push({
        id: post.Comments.length + 1,
        User: {
          id: currentUser.id,
          nickname: currentUser.nickname,
          avatar: currentUser.avatar,
        },
        content: text,
      });
    },
    addCommentFail(state, { payload: error }) {
      console.log(error);
      state.addCommentLoading = false;
      state.addCommentError = error;
    },
    removeCommentRequest(state) {
      state.removeCommentLoading = true;
      state.removeCommentDone = false;
      state.removeCommentError = null;
    },
    removeCommentSuccess(state, { payload: { postId, commentId } }) {
      state.removeCommentLoading = false;
      state.removeCommentDone = true;
      const post = state.mainPosts.find((v) => v.id === postId);
      post.Comments = post.Comments.filter((v) => v.id !== commentId);
    },
    removeCommentFail(state, { payload: error }) {
      console.log(error);
      state.removeCommentLoading = false;
      state.removeCommentError = error;
    },
    addLikersRequest(state) {
      state.addLikersLoading = true;
      state.addLikersDone = false;
      state.addLikersError = null;
    },
    addLikersSuccess(state, { payload: { postId, currentUser } }) {
      state.addLikersLoading = false;
      state.addLikersDone = true;
      const post = state.mainPosts.find((v) => v.id === postId);
      post.Likers.push({
        id: currentUser.id,
        nickname: currentUser.nickname,
        avatar: currentUser.avatar,
      });
    },
    addLikersFail(state, { payload: error }) {
      console.log(error);
      state.addLikersLoading = false;
      state.addLikersError = error;
    },
    removeLikersRequest(state) {
      state.removeLikersLoading = true;
      state.removeLikersDone = false;
      state.removeLikersError = null;
    },
    removeLikersSuccess(state, { payload: { postId, currentUser } }) {
      state.removeLikersLoading = false;
      state.removeLikersDone = true;
      const post = state.mainPosts.find((v) => v.id === postId);
      post.Likers = post.Likers.filter((v) => v.id !== currentUser.id);
    },
    removeLikersFail(state, { payload: error }) {
      console.log(error);
      state.removeLikersLoading = false;
      state.removeLikersError = error;
    },
    editProfileToPost(state, { payload: { userId, nickname, src } }) {
      const posts = state.mainPosts.filter((v) => v.User.id === userId);
      return posts.forEach((v) => (v.User.avatar = src) && (v.User.nickname = nickname));
    },
  },
});

export default slice.reducer;
export const {
  addPostRequest,
  addPostSuccess,
  addPostFail,
  removePostRequest,
  removePostSuccess,
  removePostFail,
  addCommentRequest,
  addCommentSuccess,
  addCommentFail,
  removeCommentRequest,
  removeCommentSuccess,
  removeCommentFail,
  addLikersRequest,
  addLikersSuccess,
  addLikersFail,
  removeLikersRequest,
  removeLikersSuccess,
  removeLikersFail,
  editProfileToPost,
} = slice.actions;
