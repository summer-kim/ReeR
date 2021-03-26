# ReeR

ReeR란, Recommandation, Review 를 조합하여 만든 약자입니다.

# Motivation

오늘은 무엇을 볼까하고 고민하고 찾아보는 시간이 아까워  
 **최소한의 시간으로 최대한 취향에 맞는 콘텐츠**를  
 알려주는 플랫폼이 있으면 좋겠다는 생각에 만들었습니다.

# URL

💗ReeR : <https://reer-summer.herokuapp.com/>

# Tech/framework used

💗 FRONT  
 ![ReactJS](https://img.shields.io/badge/-React-61dbfb?style=for-the-badge&logo=React&logoColor=white)
![Redux](http://img.shields.io/badge/-Redux-764ABC?style=for-the-badge&logo=Redux&logoColor=white)
![Sass](http://img.shields.io/badge/-Sass-CC6699?style=for-the-badge&logo=Sass&logoColor=white)

💗 BACK  
 ![Node.js](http://img.shields.io/badge/-Node.js-339933?style=for-the-badge&logo=Node.js&logoColor=white)
![Express](https://img.shields.io/badge/-Express-191919?style=for-the-badge&logo=Node.js&logoColor=white)
![AWS](https://img.shields.io/badge/-Amazon_S3-569A31?style=for-the-badge&logo=Amazon-S3&logoColor=white)
![MongoDB](https://img.shields.io/badge/-MongoDB-47A248?style=for-the-badge&logo=MongoDB&logoColor=white)

💗 DEPLOY  
 ![Heroku](https://img.shields.io/badge/-Heroku-430098?style=for-the-badge&logo=Heroku&logoColor=white)

# Structure

> **Backend** Structure

```
ReeR
├── server
│   ├── middleware
│   │   ├── auth.js
│   │   └── checkObjectId.js(use other's source)
│   ├── model
│   │   ├── postModel.js
│   │   └── userModel.js
│   └── route
│   │   ├── authRouter.js
│   │   ├── postRouter.js
│   │   ├── tagRouter.js
│   │   └── userRouter.js
└── server.js
```

&nbsp;&nbsp;&nbsp;&nbsp; **Frontend** Feature (Structure of React child)  
&nbsp;&nbsp;&nbsp;&nbsp; in <span style='color:#cf7177'>[Movie Tab]</span>

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
        │   │   ├── Contents.js
        │   │   ├── ContentQuickShow.js
        │   │   └── ContentItem.js
        │   ├── home
        │   │   ├── Home.js
        │   │   └── HomeBottom.js
        │   ├── hook
        │   │   ├── useDetectWidth.js
        │   │   └── usePressLike.js
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
            │   ├── postAction.js
            │   ├── tagAction.js
            │   └── types.js
            └── reducer
                ├── alertReducer.js
                ├── authReducer.js
                ├── postReducer.js
                └── index.js

```

# Screenshots

<img src="https://github.com/summer-kim/ReeR/blob/master/client/src/img/ReeR1.png" width="825" height="375">
<img src="https://github.com/summer-kim/ReeR/blob/master/client/src/img/ReeR2.png" width="825" height="375">

# Features

🔴 Upload your own post(Movie or TV series)  
&nbsp;&nbsp;&nbsp;&nbsp; 영화, 드라마에 대한 정보post 올리기  
🟠 Modify your post later  
&nbsp;&nbsp;&nbsp;&nbsp; 추후에 수정 가능  
🟡 Show likes or unlikes to post of others  
&nbsp;&nbsp;&nbsp;&nbsp; post에 대해 좋아요, 싫어요 버튼 눌러 표현 가능  
🟢 Select order of post by gener, number of Likes, Newest  
&nbsp;&nbsp;&nbsp;&nbsp; post들을 장르별로, 좋아요순으로, 최신순으로 선택하여 보기 가능  
🔵 Add the post to your list(called "My Bag")  
&nbsp;&nbsp;&nbsp;&nbsp; post를 따로 리스트에 추가 가능 (My bag)  
🟣 See the what post you liked, posted, added at my page  
&nbsp;&nbsp;&nbsp;&nbsp; 내가 작성하거나, 가방에 추가하거나, 좋아요 누른 post 마이페이지에서 확인 가능  
🟤 Leave comments at the post to show your thoughts(called "Tags")  
&nbsp;&nbsp;&nbsp;&nbsp; 정보post에 한줄평가 가능 (Tag)  
⚫ You can see the TOP 3 comments(Tag) of the post at the outside without clicking it  
&nbsp;&nbsp;&nbsp;&nbsp; 게시물 클릭하지 않아도 작은 미리보기로 상위 3개 한줄평(Tag)확인 가능

# Major Commits

❤ [custom Hook"useDetectWidth"](https://github.com/summer-kim/ReeR/commit/576ee48c8cb26ccc666b6876562206027f69c709)
화면의 width를 탐지하는 Hook  
🧡 [intergrate smilar page as one](https://github.com/summer-kim/ReeR/commit/483c8476080a6e0a23f40e21a54bb6cf82721009)
코드가 비슷한 makePost, editPost 페이지를 하나로 합침  
💛 [custom Hook"usePressLike"](https://github.com/summer-kim/ReeR/commit/068f82aefbeab5daf533ad88ab483679c0a3c256)
Tag나 Post의 좋아요,싫어요의 상태업데이트를 하는 Logic이 비슷하여 Hook으로 만들어 사용  
💚 [Content.js](https://github.com/summer-kim/ReeR/blob/master/client/src/component/content/Contents.js)

```javascript
const [ContentsInit, setContentsInit] = useState([]);
const [FilteredContents, setFilteredContents] = useState([]);
```

&nbsp;&nbsp;&nbsp;&nbsp; <span style="color:orange">ContentsInit</span> = 초기data  
&nbsp;&nbsp;&nbsp;&nbsp; User가 특정 장르를 선택하면  
&nbsp;&nbsp;&nbsp;&nbsp; 그 장르만 filtering해서 <span style="color:red">FilteredContents</span>에 집어넣은 뒤,  
&nbsp;&nbsp;&nbsp;&nbsp; 해제되면 다시 <span style="color:orange">ContentsInit</span>의 초기 데이터를 <span  style="color:red">FilteredContents</span>에 넣는다.  
&nbsp;&nbsp;&nbsp;&nbsp; 화면에는 항상 <span style="color:red">FilteredContents</span>s만 표기

```javascript
useEffect(() => {
  if (UndoSelect) {
    setFilteredContents(ContentsInit);
    setUndoSelect(false);
  }
}, [UndoSelect]);
```
