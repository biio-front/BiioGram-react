# BiioGram
바닐라 자바스크립트로 React를 사용하여 만든 인스타그램 클론 코딩.  
로그인, 게시글, 덧글, 좋아요, 팔로우, 사진업로드, 이미지 슬라이드 기능을 프론트서버에서 구현.

## 주요 기술
React, Redux, Redux-saga

## 주요 기능

### 이메일을 사용한 로그인 및 회원가입
<img src="https://postfiles.pstatic.net/MjAyMDEyMzFfMTUw/MDAxNjA5MzgwNDEwODM3.5elD9PAVc8O5KmW7XV41szzDR00Lo3oOhMKcCgQ3gtMg.XBMYVc9m9ezeZ_V9wC_cRl0Bf5GDe4jPtFRhSk3TvPog.JPEG.bohwajung/12.jpg?type=w966" width=600>

회원가입 시, 비밀번호 확인 란이 있어 비밀번호를 올바르게 입력했는지 체크하여  
올바른 이메일, 비밀번호, 약관에 동의 시에만 가입 진행 
  
  
### 게시글/이미지슬라이드, 좋아요, 덧글, 팔로우 기능
<img src="https://postfiles.pstatic.net/MjAyMDEyMzFfMTYx/MDAxNjA5Mzc4ODUwOTc3.wjv8epAZuMp9tav465F9zOXpGgMXqa7kn-PWcMAoNCkg.bDiH0P_ETli1pGioH8dIamZpSLhO_xiwWm2nJdFXyHMg.GIF.bohwajung/ezgif.com-gif-maker.gif?type=w966">  

게시글 이미지가 2개이상 시, 슬라이드 기능 사용 및 좋아요, 덧글 기능 구현  
팔로우하기 클릭 시 팔로우 기능 구현  

```js
const prevSlide = useCallback(
    () => (currentSlider === 1 ? null : setCurrentSlider((prev) => prev - 1)),
    [currentSlider],
  );
  const nextSlide = useCallback(() => {
    currentSlider >= LEN ? null : setCurrentSlider((prev) => prev + 1);
  }, [currentSlider]);

  useEffect(() => {
    const moveSliderSize = ((currentSlider - 1) * 100) / LEN;
    slideRef.current.style.transition = 'all 0.5s ease-in-out';
    slideRef.current.style.transform = `translateX(-${moveSliderSize}%)`;
    slideRef.current.style.width = `${LEN * 100}%`;
  }, [currentSlider]);
  ```
  바닐라자바스크립트를 사용하여 슬라이드 기능 구현  

### 프로필 페이지  
<img src="https://postfiles.pstatic.net/MjAyMDEyMzFfMTk2/MDAxNjA5Mzc4ODM4MjI3.ubDeYZqok0VIi7Na3smJ-CplFFHuYDcmfO1LD9CEfqUg.fed7NeWsd0VYMt7Ix_6a7n5rSEyBT5Pxj06TMQZo77Mg.GIF.bohwajung/ezgif.com-gif-maker_(1).gif?type=w966">  

작성한 게시글 확인 가능, 마우스 오버 시 덧글 및 좋아요 갯수 확인 가능  
팔로워와 내가 팔로우하는 유저 확인 가능  


### 게시글 작성 및 프로필 수정/ 이미지 업로드
<img src = "https://postfiles.pstatic.net/MjAyMDEyMzFfMTc2/MDAxNjA5MzgwNDEwODI5.05VFb8TVeCCiUCZdNKyfYoHih40cS0eYd1yi_OmWSgAg.96EnIjxyPKTTqxmLk0ZEfJ8ZFmfms1mndHZ0Y1wCfzwg.JPEG.bohwajung/13.jpg?type=w966" width=700>  

## 사용 기술

### saga를 사용하여 주요기능 구현
```js
//redux
const slice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    loginRequest(state) {
      state.loginLoading = true;
      state.loginDone = false;
      state.loginError = null;
    },
    loginSuccess(state, { payload: email }) {
      state.loginLoading = false;
      state.loginDone = true;
      state.currentUser = dummyUser.find((v) => v.email === email);
    },
    loginFail(state, { payload: error }) {
      console.log(error);
      state.loginLoading = false;
      state.loginError = error;
    },
```
```js
// redux-saga
// function loginAPI(data){
//   return axios.post('/user/login', data);
// }
function* login({ payload }) {
  // const result = yield call(loginAPI, payload);
  try {
    yield delay(1000);
    yield put(loginSuccess(payload));
  } catch (err) {
    console.log(err);
    yield put(loginFail(err));
  }
}
```
saga를 사용하여, 추후 서버와 연결했을 때 데이터를 가져오는 비즈니스로직을 분리하여 비동기 작업을 관리하기 쉽도록 구현

### CSS
#### **styled-components**
```js
const s = {};
s.profile = styled.div`
  max-width: 800px;
  margin: 0 auto;
`;
s.List = styled(List)`
  & .item {
    cursor: pointer;
  }
  & .item:first-child {
    cursor: auto;
  }
  & span {
    font-weight: bold;
  }
`;
s.article = styled.article`
  min-height: calc(100vh - 74px - 190px - 65px);
  margin-top: 20px;
`;
```

#### **semantic-ui**
semantic-ui를 사용하여 크로스브라우징 이슈에 대응

#### **inline-style**
```js
const cardStyle = useMemo(() => ({ width: 348, padding: 15, textAlign: 'center' }), []);
```
semantic-ui 사용 중 styled-components나 css파일로는 호환이 안되는 문제 발생  
inline-style을 사용해 문제 해결, useMemo를 사용하여 최적화