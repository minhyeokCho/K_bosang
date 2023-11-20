/* 《 스크립트 》 */
$(document).ready(function(){
	$('#fullpage').length && fullpageWrap(); //fullpage 함수
	$('.main_visual').length && mainSlide(); //메인 슬라이드
	$('.site_wrap').length && siteMenu(); //사이트 메뉴
	$('.tab').length && tab(); //탭 버튼
	$('.map_img').length && imgMap(); //찾아오시는길 지도
	$('.go_top').length && goTop(); //페이지상단이동
	$('.self_chk').length && selfChk(); //자가진단
	$('.tp_li').length && tagSwiper(); //타입슬라이드
	$('.win_slide').length && winSlide(); //성공사례 슬라이드
	$('.qna_li').length && qnaList(); //자주하는 질문
	$('.tag').length && tagNameSwiper(); //태그 슬라이드
	$('.popup').length && alertPop(); //팝업
	$('.report_slide').length && reportSlide(); //언론보도 슬라이드
	$('.btn_next').length && btnDisable(); //미체크시

	$(window).resize(function(){ //반응형 전체메뉴
		var windowW = $('body').width()
		if(windowW > 1200){
			$('.btn_site').removeClass('active')
			$('.site_wrap').fadeOut()
			$('body').css('overflow','')
		}
	})

	$(window).on('resize load',function(){ // 메인 지사 맵 이미지 변경
		var windowW = $('body').width()
		if(windowW < 768){
			$('.loc_sec .map_area img').attr('src','assets/images/main/main_map_mo.png')
		}else {
			$('.loc_sec .map_area img').attr('src','assets/images/main/main_map.png')
		}
	})
});

function fullpageWrap() { //fullpage 함수
	$('#fullpage').fullpage({
		sectionsColor: ['#F3F3F3', '#F3F3F3', '#F3F3F3', '#E3E3E3', '#F3F3F3'],
		anchors: ['firstPage', 'secondPage', '3rdPage', '4thpage','5thpage', 'lastPage'],
		menu: '#anchor_menu',
		navigation:true,
		navigationPosition : 'left',
		navigationTooltips : ['메인', '업무영역', '성공사례', '지사', '무료상담','소개'],
		showActiveTooltip: true,
		responsiveWidth: 768,
		keyboardScrolling: true,
		animateAnchor: true,
		recordHistory: true,
		'afterLoad': function (anchorLink, index) {
			if (index == 1){
				$('#fp-nav').addClass('wh');
			}else {
				$('#fp-nav').removeClass('wh');
			}
			if (index == 6 || index == 7){
				$('#fp-nav').css('display','none');
			}else {
				$('#fp-nav').css('display','block');
			}
		},
		'onLeave': function (anchorLink, index) {
			var ww = $(window).width();
			if (index == 1){
				$('#fp-nav').addClass('wh');
			}else {
				$('#fp-nav').removeClass('wh');
			}
			if (index == 3){
				if(ww > 768) {
					$('.win_sec_02 .num').each(function () { //성공사례 숫자 카운트
						var $this = $(this)
						var regex = /[^0-9]/g;
						var result = $this.text().replace(regex, "");
						$({
							countNum: 0
						}).animate({
							countNum: result
						}, {
							duration: 2000,
							easing: 'linear',
							step: function () {
								$this.text(Math.floor(this.countNum).toString()
								.replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ","));
							},
							complete: function () {
								$this.text((this.countNum).toString()
								.replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ","));
							}
						});
					});
				}
			}
			if (index == 6 || index == 7){
				$('#fp-nav').css('display','none');
			}else {
				$('#fp-nav').css('display','block');
			}
		},
	});
}

function tagNameSwiper() { // 검색 tag swiper 반응형
	var ww = $(window).width();
	var tagSlide = undefined;

	function tagSwiper() {
		if(ww < 1200 && tagSlide == undefined){
			tagSlide = new Swiper('.tag', {
				slidesPerView : 'auto',
			});
		}else if (ww >= 1200 && tagSlide != undefined){
			tagSlide.destroy();
			tagSlide = undefined;
		}
	}

	tagSwiper();

	$(window).on('resize', function () {
		ww = $(window).width();
		tagSwiper();
	});
}

function mainSlide() {//메인 슬라이드
	const mainSlide = new Swiper('.main_visual', {
		effect : 'fade',
		slidesPerView : 1,
		speed : 700,
		loop:true,
		loopAdditionalSlides : 1,
		autoplay: {
			delay: 4000,
			disableOnInteraction: false,
		},
	});
}


function siteMenu() {//사이트 메뉴
	$('.btn_site').on('click', function() {
		if($(this).hasClass('active')){
			$(this).removeClass('active')
			$('.site_wrap').fadeOut()
			$('body').css('overflow','visible')
			$('.main_head').css('background-color','#F3F3F3')
		}else{
			$(this).addClass('active')
			$('.site_wrap').fadeIn()
			$('body').css('overflow','hidden')
			$('.main_head').css('background-color','#fff')
		}
	})
}

function tab() { //탭 버튼
	$('.sub_tab .tab').on('click', function(e){
		if(!$(this).parent().hasClass('tab_disable')){
			e.preventDefault();
			$(this).addClass('on').siblings().removeClass('on')
		}
	})
	$('.sub_tab.tab_disable .tab').on('click', function(e){ //구성원 소개 2depth 이동
		$('html, body').animate({scrollTop: $(this.hash).offset().top - 100}, 800);
		return false;
	})

	$('.select_box > a').on('click', function(e){ //구성원 소개 셀렉트 박스 on/off
		e.preventDefault();
		$(this).parent().toggleClass('on')
	})
	$('.select_box ul a').on('click', function(e){ //구성원 소개 1depth 이동
		$('.select_box').removeClass('on')
		$('html, body').animate({scrollTop: $(this.hash).offset().top - 100}, 800);
		return false;
	})

	$(document).mouseup(function (e){ /* 닫기 */
		var popArea = $('.select_box');
		if(popArea.has(e.target).length === 0){
			$('.select_box').removeClass('on')
		}
	});
}

function imgMap() { //찾아오시는길 지도
	$('.target_map area').on('click' ,function(e){//지도영역 클릭
		e.preventDefault();
		var name_data = $(this).attr('data');
		$('.map_li li').removeClass('on');//지사영역
		$(".map_li").find("[data='" + name_data + "']").addClass('on')
		$('.map_wrap .main_tab .tab').removeClass('on')
		$('.map_wrap .main_tab').find("[data='" + name_data + "']").addClass('on')
		$('.center_info .ct_li').removeClass('on')
		$('.center_info').find("[data='" + name_data + "']").addClass('on')
		$('.ct_li .sub_tab .tab').removeClass('on');
		$('.ct_li .sub_tab').find("[data='" + name_data + "']").addClass('on')
		$('.map_wrap .main_tab .tab.bd_tab').removeClass('on')
	});

	$('.map_wrap .main_tab .tab').on('click' ,function(e){ //메인 탭 클릭
		e.preventDefault();
		var name_data = $(this).attr('data');
		$(this).addClass('on').siblings().removeClass('on')
		$('.map_li li').removeClass('on');//지사영역
		$(".map_li").find("[data='" + name_data + "']").addClass('on')
		$('.center_info .ct_li').removeClass('on')
		$('.center_info').find("[data='" + name_data + "']").addClass('on')
		$('.ct_li .sub_tab .tab').removeClass('on');
		$('.ct_li .sub_tab').find("[data='" + name_data + "']").addClass('on')
	});

	$('.map_wrap .main_tab .tab.bd_tab').on('click', function(e){
		e.preventDefault();
		$('.ct_li .sub_tab .tab').removeClass('on');
		$('.ct_li .sub_tab .tab.bd_tab').addClass('on');
		$('.ct_li.on .sub_info > li').removeClass('on')
		$('.ct_li.on .sub_info > li:nth-child(3)').addClass('on')
		$('.map_li li').removeClass('on');//지사영역
		$(".map_li").find("[data='" + '서울지사-03' + "']").addClass('on')
	})

	$('.map_wrap .sub_tab .tab').on('click' ,function(e){ //메인 탭 클릭
		e.preventDefault();
		var name_data = $(this).attr('data');
		$('.map_li li').removeClass('on');//지사영역
		$(".map_li").find("[data='" + name_data + "']").addClass('on')
	});

	$('.ct_li .sub_tab .tab').on('click' ,function(e){ //서브 탭 클릭
		var number = $(this).index()
		$(this).parent().siblings().find('li').removeClass('on').eq(number).addClass('on')
	});
}

function goTop(){ //페이지상단이동
	$(window).scroll(function(){
		var scrollTop = $(window).scrollTop();
		if(scrollTop > 0){
			$('.go_top').addClass('active')
		}else{
			$('.go_top').removeClass('active')
		}
	});

	$('.go_top').on('click', function() {
		$('html, body').animate({
			scrollTop: 0
		}, 400);
		return false;
	});
}

function selfChk() {//자가진단
	$('.self_chk .btn_page').css('display','flex')
	const selfChks = new Swiper('.active .self_slide', {
		autoHeight : true,
		touchRatio: 0,
		observer: true,
		observeParents: true,
		navigation: {
			prevEl: ".btn_prev",
			nextEl: ".btn_next",
		},
		on: {
			slideChangeTransitionStart() {
				var isLastSlide = selfChks.slides.length === (selfChks.activeIndex + 1 ); // 마지막 슬라이드인지 체크
				if(isLastSlide){ // 마지막 슬라이드면
					$('.self_chk .btn_page').css('display','none')
				}
			}
		},
	});
}

function tagSwiper() {//타입선택
	const tagSlide = new Swiper('.tp_li', {//타입 슬라이드
		slidesPerView : 'auto',
	});

	const selfChks = new Swiper('.active .self_slide', {
		autoHeight : true,
		touchRatio: 0,
		observer: true,
		observeParents: true,
		navigation: {
			prevEl: ".btn_prev",
			nextEl: ".btn_next",
		},
		on: {
			slideChangeTransitionStart() {
				var isLastSlide = selfChks.slides.length === (selfChks.activeIndex + 1 ); // 마지막 슬라이드인지 체크
				if(isLastSlide){ // 마지막 슬라이드면
					$('.self_chk .btn_page').css('display','none')
				}
			}
		},
	});

	$('.tp_li .item a').on('click' ,function(e){ //업무영역 메인 탭 클릭
		e.preventDefault();
		var tp_name = $(this).attr('type-name');
		$('.tp_li .item').removeClass('active');
		$(this).parent().addClass('active')
		$(".ill_tab > li").removeClass('active');
		$(".ill_tab").find("[type-name='" + tp_name + "']").addClass('active')
		selfChk()
		selfChks.slideTo(0)
	});


}

function winSlide() {//성공사례 슬라이드
	const winSlide = new Swiper('.win_slide', {
		slidesPerView : 'auto',
	});
}

function qnaList() {//자주하는 질문
	var question = $('.qna_li a'),
		answer = $('.ans_wrap')

		question.on('click', function(e){
		e.preventDefault()
		if(!$(this).hasClass('on')){
			question.removeClass('on')
			answer.slideUp()
			$(this).addClass('on').siblings().slideDown()
		}else{
			question.removeClass('on')
			answer.slideUp()
		}
	})
}

function dimShow(){ /* 딤드 show */
	$('body').addClass('dim');
}
function dimHide(){ /* 딤드 hide */
	$('body').removeClass('dim');
}

function alertPop(){ //알럿팝업
	var init = 0;
	$('.btn_alert').on('click', function(e){ /* 팝업열기 */

		e.preventDefault();
		$('.profile_pop').fadeIn(500);
		dimShow();

		init = $(this).attr('data-init');
		profileSlide.slideTo(init)
	});

	$('.btn_close').on('click', function(e){ /* 팝업닫기 */
		e.preventDefault();
		var target= $(this).closest('.popup');
		target.fadeOut(200);
		setTimeout(dimHide, 150);
	});

	$(document).mouseup(function (e){ /* 닫기 */
		var popArea = $('.popup');
		if(popArea.has(e.target).length === 0 && $('body').hasClass('dim')){
			$('.pop_wrap').animate({
				scrollTop: 0
			}, 0);
			popArea.fadeOut(0);
			setTimeout(dimHide, 0);
		}
	});

	const profileSlide = new Swiper('.pf_slide', {//프로필 슬라이드
		slidesPerView : 1,
		spaceBetween : 30,
		autoHeight : true,
		initialSlide : init,
		touchRatio: 0,
		navigation: {
			prevEl: ".btn_prev",
			nextEl: ".btn_next",
		},
	});
}

function reportSlide() {//언론보도 슬라이드
	var paging = $('.slide_paging');
	const reportSlide = new Swiper('.report_slide', {
		slidesPerView : 'auto',
		loopedSlides: 1,
		scrollbar: {
			el: '.report_slide_wrap .swiper-scrollbar',
			draggable: true,
		},
		pagination: {
			el: '.report_slide_wrap .swiper-pagination',
			type : 'fraction',
		},
	});
}

/* 23.11.01 추가 */
function btnDisable(){ //미체크시 오류
	$('.self_slide .btn_next').on('mousedown touchstart', function(e){
		if(!$('.active .self_slide .swiper-slide-active input').is(":checked")){
			e.preventDefault()
			alert('체크안됨')
		}
	})
}