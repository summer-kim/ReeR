# ReeR
ReeR란, Recommandation, Review 를 조합하여 만든 약자입니다.  
## Motivation
오늘은 무엇을 볼까하고 고민하고 찾아보는 시간이 아까워 최소한의 시간으로 최대한 취향에 맞는 콘텐츠를 알려주는 플랫폼이 있으면 좋겠다는 생각에 만들었습니다.

## Tech/framework used
* Node JS, Express
* MongoDB, AWS S3
* React, Redux
* Sass
* Heroku

## Screenshots
<img src="https://github.com/summer-kim/ReeR/blob/master/ReeR1.png" width="550" height="250">
<img src="https://github.com/summer-kim/ReeR/blob/master/ReeR2.png" width="550" height="250">

## How to use?
Post 또는 Post에 달려있는 Tag에 좋아요, 싫어요를 누를 수있고, +버튼을 눌러 Post를 담을 수도 있습니다.  
자신이 올린 Post를 수정, 삭제는 해당 Post페이지에서 가능합니다.  
Post가 모아져 있는 Tags페이지에서 해당 Post에 좋아요가 많은 상위 Tag 3개와 좋아요, 싫어요 수를 겉에서 간단히 볼수있습니다.

## Error
Post를 업로한 후 Post의 img가 바로 나타나지 않고 새로고침해야 나타나는 error가 있습니다.  
AWS S3에 img 업로드가 완료되기 전에 img를 url로 불러오기 때문에 시간차로 발생한 문제라 추정됩니다.  
추후 업데이트 예정입니다.  
