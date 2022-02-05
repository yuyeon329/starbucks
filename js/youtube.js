var tag = document.createElement('script');

tag.src = "https://www.youtube.com/iframe_api";
// 제일 첫번째 script 요소로 삽입.그래야 동작함
var firstScriptTag = document.getElementsByTagName('script')[0];
firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

// 3. This function creates an <iframe> (and YouTube player)
//    after the API code downloads.
// 함수이름 onYouTubeIframeAPIReady로 써야 api가 잘 작동함 
function onYouTubeIframeAPIReady() {
  // <div id="player"></div>
  // #plyer라고 안해도 얘가 알아서 찾음
  new YT.Player('player', {
    // youtube우클릭해서 소스코드 복사하면 출력만 되므로, 주소창 v= 이후의 id값 쓰기
    videoId: 'An6LvWQuj_8', //최초 재생할 유튜브 영상 ID
    playerVars:{
      autoplay: true, //자동 재생 유무
      loop: true, //반복 재생 유무
      // loop가 true면 다시 반복해서 재생할 영상 id목록 제공해야함.
      playlist: 'An6LvWQuj_8'
    }, 
    events: {
      // player가 준비되면 함수 실행하는데, 동영상 플레이 상황을 인수로 넘겨줌
      onReady: function(event){
        // event.target: 재생되고 있는 영상 자체
        event.target.mute() //음소거
      }
    }
    
  })
}