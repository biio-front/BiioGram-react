import { all, delay, fork, put, takeLatest } from 'redux-saga/effects';
import {
  addCommentFail,
  addCommentRequest,
  addCommentSuccess,
  addLikerFail,
  addLikerRequest,
  addLikerSuccess,
  addPostFail,
  addPostRequest,
  addPostSuccess,
  removeCommentFail,
  removeCommentRequest,
  removeCommentSuccess,
  removeLikerFail,
  removeLikerRequest,
  removeLikerSuccess,
  removePostFail,
  removePostRequest,
  removePostSuccess,
  updatePostFail,
  updatePostRequest,
  updatePostSuccess,
} from 'redux/post/postSlice';
import {
  addCommentToMe,
  addPostToMe,
  removeCommentToMe,
  removePostToMe,
} from 'redux/user/userSlice';

// function addPostAPI(data){
//   return axios.post('/post/add', data);
// }
function* addPost({ payload }) {
  // const result = yield call(addPostAPI, payload);
  try {
    yield delay(1000);
    const newId = Date.now();
    yield put(addPostSuccess({ ...payload, newId }));
    yield put(addPostToMe({ ...payload, newId }));
  } catch (err) {
    console.log(err);
    yield put(addPostFail(err));
  }
}

function* updatePost({ payload }) {
  try {
    yield delay(1000);
    yield put(updatePostSuccess({ ...payload }));
    yield put(addPostToMe({ ...payload }));
  } catch (err) {
    console.log(err);
    yield put(updatePostFail(err));
  }
}

function* removePost({ payload }) {
  try {
    yield delay(1000);
    yield put(removePostSuccess(payload));
    yield put(removePostToMe(payload));
  } catch (err) {
    console.log(err);
    yield put(removePostFail(err));
  }
}

function* addComment({ payload }) {
  try {
    yield delay(1000);
    yield put(addCommentSuccess(payload));
    yield put(addCommentToMe(payload));
  } catch (err) {
    console.log(err);
    yield put(addCommentFail(err));
  }
}

function* removeComment({ payload }) {
  try {
    yield delay(1000);
    yield put(removeCommentSuccess(payload));
    yield put(removeCommentToMe(payload));
  } catch (err) {
    console.log(err);
    yield put(removeCommentFail(err));
  }
}

function* addLiker({ payload }) {
  try {
    yield put(addLikerSuccess(payload));
  } catch (err) {
    console.log(err);
    yield put(addLikerFail(err));
  }
}

function* removeLiker({ payload }) {
  try {
    yield put(removeLikerSuccess(payload));
  } catch (err) {
    console.log(err);
    yield put(removeLikerFail(err));
  }
}

export function* watchAddPost() {
  yield takeLatest(addPostRequest, addPost);
}
export function* watchUpdatePost() {
  yield takeLatest(updatePostRequest, updatePost);
}
export function* watchremovePost() {
  yield takeLatest(removePostRequest, removePost);
}
export function* watchAddComment() {
  yield takeLatest(addCommentRequest, addComment);
}
export function* watchRemoveComment() {
  yield takeLatest(removeCommentRequest, removeComment);
}
export function* watchAddLiker() {
  yield takeLatest(addLikerRequest, addLiker);
}
export function* watchRemoveLiker() {
  yield takeLatest(removeLikerRequest, removeLiker);
}

export default function* postSaga() {
  yield all([
    fork(watchAddPost),
    fork(watchUpdatePost),
    fork(watchremovePost),
    fork(watchAddComment),
    fork(watchRemoveComment),
    fork(watchAddLiker),
    fork(watchRemoveLiker),
  ]);
}
