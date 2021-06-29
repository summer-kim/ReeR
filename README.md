<h1 align="center"> 📌<em>ReeR 2.0</em></h1>

<p align="center"><em>ReeR</em>란,        <em>Recommandation, Review</em>를 조합하여 만든 약자입니다.<br/>
오늘은 무엇을 볼까 찾아보는 수고를 덜어주는,<br/>
<strong>최소한의 시간으로 최대한 취향에 맞는 콘텐츠</strong>를  
알려주는 <br/>
플랫폼이 있으면 좋겠다는 생각에 만들었습니다.
 </p>
<br/>
<h1 align="center">ReeR => ReeR2.0 변경사항 <Backend Refactoring></h1>
<p align="center"><em>💗 understand and apply Middleware Chain</em></p>

```
    express는 middleware를 여러개를 끼울 수 있는 Chain이라는 개념을 이해하기 전에는
    각 router마다 중복되는 코드를 반복해서 사용하였는데 이제는 middleware로 깔끔하게 통일하여 사용할 수 있습니다.
```
<p align="center"><em>🧡 API design</em></p>
 
 ```
     요청이 성공하면 전부 200 status, 에러가 발생하면 400 status를 전송했던 코드들을
     작업의 수행 상태를 잘 알려주는 201, 204, 403등 적절한 HTTP 상태 코드로 대체하였습니다.
 ```
<p align="center"><em>💛 MVC pattern</em></p>
  
 ```
     Model, View, Contorller로 나뉘게 하여 중복코드를 피하고 좀더 효율적으로 유지보수가 가능하게 리팩토링하였습니다.
 ```
<p align="center"><em>💚 change Database from mongoDB to PostgreSQL</em></p>
  
 ```
     기존의 ReeR에는 noSQL인 mongoDB를 사용하였었지만 
     과거 SQL쿼리를 공부한 경험이 있고, 관계형 데이터베이스에 대해 경험해보고 싶어 mySQL를 처음에 적용하였습니다.
     하지만 dataType으로 array가 가능하고 update할때 등 여러모로 PostgreSQL이 더 편리하다 느껴 
     최종적으로 postgreSQL을 적용하게 되었습니다.
 ```
<br/>
<h1 align="center">📌<em>Comparing Codes before and after </em></h1>
<p align="center"><em>
<br/>
<a href="https://github.com/summer-kim/ReeR/tree/8ecbc90fc64ea4f9dbe2983355a59da66099430f/server">BEFORE</a>&nbsp&nbsp&nbsp | &nbsp&nbsp&nbsp<a href="https://github.com/summer-kim/ReeR/tree/master/server">AFTER</a>
</em></p>
<br/>
<h1 align="center"> 🌎<em>URL</em></h1>
<p align="center"><em>💗ReeR : <a href="https://reer-summer.herokuapp.com/">Link</a></em></p>
<br/>

<img src="https://github.com/summer-kim/ReeR/blob/master/client/src/img/ReeR1.png" width="825" height="375">
<img src="https://github.com/summer-kim/ReeR/blob/master/client/src/img/ReeR2.png" width="825" height="375">

<h1 align="center"> 🌼<em>Improvement</em><br/>(배운것들)</h1>
<br/>
<p align="center"><em>❤️ Understood the general structure of MERN stack</em></p>

```
    이 포트폴리오를 만들면서 프론트, 서버, DB의 전체적인 흐름을 파악하게 되었습니다.
    Express로 서버를 만들어 놓고, Postman으로 서버의 response가 예정대로인지 체크한 뒤,
    React로 웹의 컴포넌트를 구현해 놓은 뒤 ,
    필요한 곳에서 서버로 request를 보내 DB의 data를 받아오는 것입니다.
```

<p align="center"><em>💗 Upgraded React Skill</em></p>

```
    React가 Javacript에 비해 얼마나 편리한지 알게되었습니다.
    Javacript는 일일이 DOM을 특정해서 새로 받은 data값을 넣어주어야 하는데 React는 Hook으로 간편하게
    넣어줄 수 있고 Javacript는 NPM module을 사용하려면 bundle.js나 webpack혹은 cdn으로 따로 전처리할 것이 있지만
    React는 cra로 간편하게 NPM module사용할 수 있습니다.

    또한 useEffect에서 dependency변수를 잘못사용했을 때,
     useEffect가 무한호출되서 콜스택이 차버리거나
    페이지를 이동해도 업데이트된 data가 화면에 적용이 안되는 error를 많이 경험하여
    dependency 설정에 대한 감을 많이 쌓았습니다.
```

<p align="center"><em>🧡 Learned about Redux</em></p>

```
    각 action의 설정하고 필요한 action함수를 실행시켜
    Reducer로 TYPE과 함께 data를 dispatch 시킬 수 있습니다.
    react-redux 툴로 component를 connect시켜 useEffect를 통해
    Reducer의 state를 실시간으로 화면에 구현시킬 수 있습니다.
```

<p align="center"><em>💛 Authentication</em></p>

```
    jsonwebtoken를 사용하여 token을 생성한 뒤, front로 token을 보내면
    axios의 default header로 token을 붙여서 request마다 token을 같이 전송하고,
    Server에서는 token을 검사하여 유효한 token이면 next()로 통과시키고
    그렇지 않으면 login페이지로 redirect시키는 전체적인 구조에 대해 알게 되었습니다.
```

<p align="center"><em>💚 Importance of Clean Coding</em></p>

```
    개발자커뮤니티에 이 포트폴리오의 코드를 올리고 평가를 받으며
    깔끔하고 정리된 코딩의 중요성을 깨닫았습니다.
    그래서 비슷한 코드가 반복되는 페이지들은 합친다거나 폴더들을 다시 새로 재배치하고
    child component가 반복되면 정보key들 담은 Object를 만들어 map()으로 할당하였습니다.
```

 <br/>
 <h1 align="center"> 🛠<em>Tech/framework used</em></h1>
<br/>
<p align="center"> 💗 <em>FRONT</em> 💗<br/>
  <img src="https://img.shields.io/badge/-React-61dbfb?style=for-the-badge&logo=React&logoColor=white"/>&nbsp
  <img src="http://img.shields.io/badge/-Redux-764ABC?style=for-the-badge&logo=Redux&logoColor=white"/>&nbsp
    <img src="http://img.shields.io/badge/-Sass-CC6699?style=for-the-badge&logo=Sass&logoColor=white"/>&nbsp
</p>
 <br/>
<p align="center"> 💗 <em>SERVER & DB</em> 💗 <br/>
   <img src="http://img.shields.io/badge/-Node.js-339933?style=for-the-badge&logo=Node.js&logoColor=white"/><br/>
  <img src="https://img.shields.io/badge/-Express-191919?style=for-the-badge&logo=Node.js&logoColor=white"/>&nbsp
  <img src="https://img.shields.io/badge/-Amazon_S3-569A31?style=for-the-badge&logo=Amazon-S3&logoColor=white"/>&nbsp
  <img src="https://img.shields.io/badge/-MongoDB-47A248?style=for-the-badge&logo=MongoDB&logoColor=white"/>&nbsp
</p>

<p align="center"> 💗 <em>DEPLOY</em> 💗<br/>
  <img src="https://img.shields.io/badge/-Heroku-430098?style=for-the-badge&logo=Heroku&logoColor=white"/>&nbsp
 </p>
 <br/>

<h1 align="center"> 🎯<em>Major Features</em></h1>
<br/>
<p align="center"><em>❤️ CREATE, READ, UPDATE, DELETE your own post(Movie or TV series)</em>
</br>영화, 드라마에 대한 <em>post</em>의 <em>CRUD</em>기능</p>
<p align="center"><em>🧡 Leave Comments to the posts(called "tag")</em>
</br><em>post</em>에 한줄평가 가능 <em>(Tag)</em></p>
<p align="center"><em>💛 express LIKES or UNLIKES to the post or tag</em>
</br><em>post, tag</em>의 좋아요, 싫어요 표현가능</p>
<p align="center"><em>💚 see post by CATEGORY,ORDER (genre, number of Likes, Newest)</em>
</br>장르별, 좋아요순, 최신순으로 선택하여 보기 가능</p>
<p align="center"><em>💙 MYPAGE : check the post you liked, created, added</em>
</br>내가 작성하거나, 추가하거나, 좋아요 누른 <em>post</em>마이페이지에서 확인 가능</p>
<p align="center"><em>💜 TOP3 tag or post</em>
</br>상위 3개 <em>post, tag</em> 확인 가능</p>
<br/>

<h1 align="center"> 🎯<em>Major Commits & JS</em></h1>
<br/>

<p align="center"><a href="https://github.com/summer-kim/ReeR/blob/master/client/src/component/content/Contents.js">❤️ <em>MAIN : Content.js</em></a></p>

```javascript
const [ContentsInit, setContentsInit] = useState([]);
const [FilteredContents, setFilteredContents] = useState([]);

get Movie data and put to  🡲  ContentsInit 🡲🡲 FilteredContents (=final state to be shown)
                                    🡱                  🡳
                                    🡱          if(User Select Genre)
                                    🡱                  🡳
                    if(Cancel genre-Select) 🡰🡰 FilteredContents.filter()
```

<p align="center"><a href="https://github.com/summer-kim/ReeR/blob/master/client/src/component/hook/useDetectWidth.js">🧡 <em>custom Hook"useDetectWidth"</em></a><br/>
화면의 <em>width</em>를 탐지하는 <em>Hook</em>
</p>

<p align="center"><a href="https://github.com/summer-kim/ReeR/commit/068f82aefbeab5daf533ad88ab483679c0a3c256">💛 <em>custom Hook"usePressLike"</em></a><br/>
<em>Post,Tag</em>의 좋아요,싫어요의 상태업데이트를 하는 <em>Logic</em>이 비슷하여<em> Hook</em>으로 만들어 사용
</p>

<p align="center"><a href="https://github.com/summer-kim/ReeR/commit/483c8476080a6e0a23f40e21a54bb6cf82721009">💚 <em>intergrate smilar page as one"</em></a><br/>
코드가 비슷한<em> makePost, editPost</em> 페이지를 하나로 합침</p>
<br/>

<h1 align="center"> ☔️<em>Structure</em></h1>

> **Backend** Structure

```
ReeR
├── server
│   ├── middleware
│   │   ├── auth.js ⭐️
│   │   └── checkObjectId.js(use other's source)
│   ├── model
│   │   ├── postModel.js
│   │   └── userModel.js
│   └── route
│   │   ├── authRouter.js
│   │   ├── postRouter.js ⭐️
│   │   ├── tagRouter.js
│   │   └── userRouter.js
└── server.js
```

> **Structure of React child** in [Movie Tab]

```
[ 영화(post) 목록 페이지]    Contents.js (parent)
[    작은 화면의 post   ]     └── ContentQuickShow.js (child)

[   각각의 영화 페이지  ]    ContentItem.js (parent)
[해당 영화의 한줄평(Tag)]     └── TagSection.js (child)
[      각각의 Tag      ]         └── Tagbox.js (child child)
```

> **Frontend** Structure

```
├── config
│   ── db.js
│   ├── production.js
│   └── default.js
├── scss files
└── client
    ├── public
    │   └── index.html
    └── src
        ├── App.js
        ├── index.js
        ├── RoutesBundle.js
        ├── css folder
        ├── img folder
        ├── util
        │   ├── setAuthToken.js
        │   └── sortAndLimitTag.js
        ├── component
        │   ├── auth
        │   │   ├── Login.js
        │   │   └── Mypage.js
        │   ├── content
        │   │   ├── Contents.js ⭐️⭐️
        │   │   ├── ContentQuickShow.js
        │   │   └── ContentItem.js
        │   ├── home
        │   │   ├── Home.js
        │   │   └── HomeBottom.js
        │   ├── hook
        │   │   ├── useDetectWidth.js ⭐️
        │   │   └── usePressLike.js ⭐️⭐️
        │   ├── layout
        │   │   ├── About.js
        │   │   ├── Footer.js
        │   │   └── Navbar.js
        │   ├── posting
        │   │   └── Makepost.js
        │   ├── tag
        │   │   ├── Tagbox.js
        │   │   └── TabSection.js
        │   ├── template(use other's source)
        │   │   ├── Alert.js
        │   │   ├── spinner.js
        │   │   └── typewritter.js
        └── redux
            ├── store.js
            ├── action
            │   ├── alertAction.js
            │   ├── authAction.js
            │   ├── postAction.js ⭐️
            │   ├── tagAction.js
            │   └── types.js
            └── reducer
                ├── alertReducer.js
                ├── authReducer.js
                ├── postReducer.js ⭐️
                └── index.js

```
