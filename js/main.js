const searchEl = document.querySelector('.search');
const searchInputEl = searchEl.querySelector('input')

searchEl.addEventListener('click', function () {
  //js를 통해 focus가 가능한 input요소에 강제로 focus적용
  searchInputEl.focus();
});

// 클릭하면 
searchInputEl.addEventListener('focus', function() {
  searchEl.classList.add('focused');
  searchInputEl.setAttribute('placeholder', '통합검색');
});

// 언클릭
searchInputEl.addEventListener('blur', function() {
  searchEl.classList.remove('focused');
  searchInputEl.setAttribute('placeholder', '');
});

const badgeEl = document.querySelector('header .badges');


const toTopEl = document.querySelector('#to-top');
// window 객체 : 화면 자체
//0.3초씩 부하를 줘서 스크롤 한 번 할 때마다 함수가 우르르 실행되는 걸 방지
//throttle : lodash에서 제공
// _.throttle(함수, 시간)
window.addEventListener('scroll', _.throttle(function (){
  console.log(window.scrollY);
  if(window.scrollY > 500){
    //뱃지 숨기기
    //gsap.to(요소, 지속시간, 옵션);
    gsap.to(badgeEl, .6, {
      //0.6초 동안 opacity가 0이 되고, 0이 되면 display: 'none'해서 요소가 화면에서 제거됨.
      opacity : 0,
      //gsap에선 문자열은 꼭 ''로 감싸줘야함
      display : 'none'
    });
    //버튼 보이기
    gsap.to(toTopEl, .2, {
      //오른쪽 100px 이동
      x: 0
    })
  }else{
    //배지 보이기
    gsap.to(badgeEl, .6, {
      opacity : 1,
      display : 'block'
    });
    //버튼 숨기기
    gsap.to(toTopEl, .2, {
      //오른쪽 100px 이동
      x: 100
    })
  }
}, 300));

toTopEl.addEventListener('click', function(){
  gsap.to(window, .7, {
    // 화면 위치를 0px로 옮겨줌
    scrollTo: 0
  });
})


const fadeEls = document.querySelectorAll('.visual .fade-in');
fadeEls.forEach(function (fadeEl, index) {
   //gsap.to(요소, 지속시간, 옵션);
  gsap.to(fadeEl, 1, {
    // index를 이용해서 순차적 delay가 일어나게 함
    delay: (index+1)*.7, // 0.7, 1.4, 2.1, 2.8
    opacity: 1
  });
});
// 후손 선택자
// new Swiper(선택자, 옵션)

new Swiper('.notice-line .swiper', {
  direction: 'vertical',
  autoplay: true,
  loop:true
})

new Swiper('.promotion .swiper', {
  //default가 horizontal
  slidesPerView: 3, //한 번ㄴ에 보여줄 슬라이드 개수
  spaceBetween: 10,
  centeredSlides: true, //1번 슬라이드가 가운데 보이기
  loop : true,
  autoplay: { //객체 데이터로 다양한 옵션 부여 가능
    delay: 5000
  },
  pagination: {
    el: '.promotion .swiper-pagination', //페이지 번호 요소 선택자
    clickable: true // 사용자의 페이지 번호 요소 제어 가능 여부
  },
  navigation: {
    prevEl : '.promotion .swiper-prev',
    nextEl: '.promotion .swiper-next',
  }
})

new Swiper('.awards .swiper', {
  //direction: horizontal default
  autoplay: true,
  loop : true,
  spaceBetween: 30,
  slidesPerView: 5,
  navigation: {
    prevEl: '.awards .swiper-prev',
    nextEl: '.awards .swiper-next'
  }
});

const promotionEl = document.querySelector('.promotion');
const promotionToggleBtn = document.querySelector('.toggle-promotion');

//let으로 할당해서 값이 변경될 수 있음
let isHidePromotion = false;

promotionToggleBtn.addEventListener('click', function(){
  isHidePromotion = !isHidePromotion;
  if(isHidePromotion){
    //숨김 처리
    //hide class 추가
    promotionEl.classList.add('hide');
  }else{
    //보임 처리
    promotionEl.classList.remove('hide');
  }
});

// 범위 랜덤 함수(소수점 2자리까지)
function random(min, max) {
  // `.toFixed()`를 통해 반환된 문자 데이터를,
  // `parseFloat()`을 통해 소수점을 가지는 숫자 데이터로 변환
  return parseFloat((Math.random() * (max - min) + min).toFixed(2))
}

function floatingObject(selector, delay, size) {
  // gsap.to(요소, 지속시간, 옵션);
  // gsap에 css 선택자만 넣어도 직접 찾을 수 있음
  gsap.to(
    selector, //선택자
    random(1.5, 2.5), //애니메이션 동작 시간
    { //옵션
    y: size,
    // 무한 반복 (-1은 여기서만 무한으로 쓰이는 거임)
    repeat: -1,
    // 한번 재생된 애니메이션을 다시 뒤로 재생
    yoyo: true,
    // gsap easing을 통해 조금 더 부드러운 애니메이션 효과 부여
    ease: Power1.easeInOut,
    //n초 뒤에 애니메이션 실행하는 지연 시간
    delay: random(0, delay)
  });
}

floatingObject('.floating1', 1, 15);
floatingObject('.floating2', .5, 15);
floatingObject('.floating3', 1.5, 20);

const spyEls = document.querySelectorAll('section.scroll-spy')
spyEls.forEach(function(spyEl){
  // Scene: 특정 요소 감시 옵션 지정 메소드
  //setClassToggle() : html class를 넣었다 뺐다 제어
  //addTo() : controller 사용하기 위해 씀

  // scroll-spy가 붙은 섹션들이 spyEls에 담기는데, 각각을 spyEl이라 칭함 spyEl을 통해 반복적으로 처리
  // spyEl은 내가 감시하고 있는 하나의 section이 되는 거임
  // ScrollMacig이라는 js library가 .scroll-spy 요소를 지속적으로 감시하다가 지정해놓은 해당 지점을 넘어서면 show class 추가
  new ScrollMagic
    .Scene({
      // ScrollMagic을 통해 감시하는 요소는 spyEl
      triggerElement: spyEl, //보여짐 여부를 감시할 요소를 지정
      //뷰포트가 시작하는 최상단이 0, 최하단이 1인데, .8이라는 것은 내가 감시할 요소가 밑에서 올라오다가 .8지점에 걸리면 어떠한 동작이 실행이 된다. 
      triggerHook: .8 //감시 판단 지점
    })
    //.Scene()을 통해 보인다는게 판단되면 setClassToggle() 실행해서 보이는 spyEl에 show class 추가
    .setClassToggle(spyEl, 'show')
    //우리가 지정한 내용을 내부 Controller에 탑재해서 실행되게 도와줌
    .addTo(new ScrollMagic.Controller())
})

const thisYear = document.querySelector('.this-year');
thisYear.textContent = new Date().getFullYear();