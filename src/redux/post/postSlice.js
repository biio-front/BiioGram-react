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
        'https://firebasestorage.googleapis.com/v0/b/haggendazs.appspot.com/o/BiioGram%2F_12285646.JPG?alt=media&token=ecad8e06-3d29-4e6e-a169-f582bc25ea66',
    },
    {
      id: 2,
      src:
        'https://firebasestorage.googleapis.com/v0/b/haggendazs.appspot.com/o/BiioGram%2F_12285635.JPG?alt=media&token=740ef7a8-e636-49d0-baf8-8266ffb4ea5e',
    },
  ],
  content: '첫 번째 포스트 #히히',
  Likers: [
    {
      id: 2,
      nickname: '사과맛',
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
  updatePostLoading: false,
  updatePostDone: false,
  updatePostError: null,
  removePostLoading: false,
  removePostDone: false,
  removePostError: null,
  addCommentLoading: false,
  addCommentDone: false,
  addCommentError: null,
  removeCommentLoading: false,
  removeCommentDone: false,
  removeCommentError: null,
  addLikerLoading: false,
  addLikerDone: false,
  addLikerError: null,
  removeLikerLoading: false,
  removeLikerDone: false,
  removeLikerError: null,
  mainPosts: [dummyPost],
  singlePost: null,
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
    updatePost(state, { payload: postId }) {
      const findPost = state.mainPosts.find((v) => v.id === postId);
      state.singlePost = findPost;
    },
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
        Liker: [],
        Comments: [],
      });
    },
    addPostFail(state, { payload: error }) {
      console.log(error);
      state.addPostLoading = false;
      state.addPostError = error;
    },
    updatePostRequest(state) {
      state.updatePostLoading = true;
      state.updatePostDone = false;
      state.updatePostError = null;
    },
    updatePostSuccess(state, { payload: { images, text } }) {
      const updatePost = state.mainPosts.find((v) => v.id === state.singlePost.id);
      state.updatePostLoading = false;
      state.updatePostDone = true;
      updatePost.Images = [...images];
      updatePost.content = text;
      state.singlePost = null;
    },
    updatePostFail(state, { payload: error }) {
      console.log(error);
      state.updatePostLoading = false;
      state.updatePostError = error;
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
    addLikerRequest(state) {
      state.addLikerLoading = true;
      state.addLikerDone = false;
      state.addLikerError = null;
    },
    addLikerSuccess(state, { payload: { postId, currentUser } }) {
      state.addLikerLoading = false;
      state.addLikerDone = true;
      const post = state.mainPosts.find((v) => v.id === postId);
      post.Likers.push({
        id: currentUser.id,
        nickname: currentUser.nickname,
        avatar: currentUser.avatar,
      });
    },
    addLikerFail(state, { payload: error }) {
      console.log(error);
      state.addLikerLoading = false;
      state.addLikerError = error;
    },
    removeLikerRequest(state) {
      state.removeLikerLoading = true;
      state.removeLikerDone = false;
      state.removeLikerError = null;
    },
    removeLikerSuccess(state, { payload: { postId, currentUser } }) {
      state.removeLikerLoading = false;
      state.removeLikerDone = true;
      const post = state.mainPosts.find((v) => v.id === postId);
      post.Likers = post.Likers.filter((v) => v.id !== currentUser.id);
    },
    removeLikerFail(state, { payload: error }) {
      console.log(error);
      state.removeLikerLoading = false;
      state.removeLikerError = error;
    },
    editProfileToPost(state, { payload: { userId, nickname, src } }) {
      const posts = state.mainPosts.filter((v) => v.User.id === userId);
      return posts.forEach((v) => (v.User.avatar = src) && (v.User.nickname = nickname));
    },
  },
});

export default slice.reducer;
export const {
  updatePost,
  addPostRequest,
  addPostSuccess,
  addPostFail,
  updatePostRequest,
  updatePostSuccess,
  updatePostFail,
  removePostRequest,
  removePostSuccess,
  removePostFail,
  addCommentRequest,
  addCommentSuccess,
  addCommentFail,
  removeCommentRequest,
  removeCommentSuccess,
  removeCommentFail,
  addLikerRequest,
  addLikerSuccess,
  addLikerFail,
  removeLikerRequest,
  removeLikerSuccess,
  removeLikerFail,
  editProfileToPost,
} = slice.actions;
