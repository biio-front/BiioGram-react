import { all, delay, fork, put, takeLatest } from 'redux-saga/effects';
import {
  addCommentFail,
  addCommentRequest,
  addCommentSuccess,
  addLikersFail,
  addLikersRequest,
  addLikersSuccess,
  addPostFail,
  addPostRequest,
  addPostSuccess,
  removeCommentFail,
  removeCommentRequest,
  removeCommentSuccess,
  removeLikersFail,
  removeLikersRequest,
  removeLikersSuccess,
  removePostFail,
  removePostRequest,
  removePostSuccess,
} from 'redux/posts/postSlice';
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

function* addLikers({ payload }) {
  try {
    yield put(addLikersSuccess(payload));
  } catch (err) {
    console.log(err);
    yield put(addLikersFail(err));
  }
}

function* removeLikers({ payload }) {
  try {
    yield put(removeLikersSuccess(payload));
  } catch (err) {
    console.log(err);
    yield put(removeLikersFail(err));
  }
}

export function* watchAddPost() {
  yield takeLatest(addPostRequest, addPost);
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
export function* watchAddLikers() {
  yield takeLatest(addLikersRequest, addLikers);
}
export function* watchRemoveLikers() {
  yield takeLatest(removeLikersRequest, removeLikers);
}

export default function* postSaga() {
  yield all([
    fork(watchAddPost),
    fork(watchremovePost),
    fork(watchAddComment),
    fork(watchRemoveComment),
    fork(watchAddLikers),
    fork(watchRemoveLikers),
  ]);
}
