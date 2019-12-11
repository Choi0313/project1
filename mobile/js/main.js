$(function(){

	/* 스타트 페이지 */
	// 키비주얼
		var w;
		var total=4;
		var amount=0;
		var moving=false;
		var xDown=null;
		var yDown=null;
		var direction="";
		var n=0;

		$(".controller li").eq(n).addClass("active");
		$(".keyvisual .text").addClass("active");

		var vidW;

		$(window).resize(function(){
			w=$(window).width();
			$(".gallery").css({left:0, width:w*total});
			$(".gallery li").css({width:w});

			$(".gallery li.video, .gallery li.video video").css({height:$(window).height()});
			vidW=$(".gallery li.video video").width();
			$(".gallery li.video video").css({marginLeft:(w-vidW)/2});
		});
		$(window).trigger("resize");

		$(".left").click(function(e){
			e.preventDefault();
			w=$(window).width();

			if(moving){
				return false;
			}
			moving=true;
			amount-=w;

			if(n < (total-1)){
				n++;
			}
			else{
				n=0;
			}
			$(".controller li").removeClass("active");
			$(".controller li").eq(n).addClass("active");

			$(".gallery").animate({left:amount}, 500, function(){
				moving=false;
				$(this).append($(".gallery li:first-child"));
				amount+=w;
				$(this).css({left:amount});

				if($(".gallery li").first().attr("class") == "video"){
					videoStart();
				}
				else{
					videoPause();
				}
			});
		});
		$(".right").click(function(e){
			e.preventDefault();
			w=$(window).width();

			if(moving){
				return false;
			}
			moving=true;

			if(n > 0){
				n--;
			}
			else{
				n=total-1;
			}
			$(".controller li").removeClass("active");
			$(".controller li").eq(n).addClass("active");

			$(".gallery").prepend($(".gallery > li:last-child"));
			amount-=w;
			$(".gallery").css({left:amount});

			amount+=w;
			$(".gallery").animate({left:amount}, 500, function(){
				moving=false;
			});

			if($(".gallery li").first().attr("class") == "video"){
				videoStart();
			}
			else{
				videoPause();
			}
		});
		$(".keyvisual").on("touchstart", function(e){
			var evt=e.originalEvent;
			xDown=evt.touches[0].clientX;
			yDown=evt.touches[0].clientY;
			clearInterval(id);
		});
		$(".keyvisual").on("touchmove", function(e){
			var evt=e.originalEvent;
			direction=swipeAPI(evt, xDown, yDown);

			if(direction == "left"){
				$(".left").trigger("click");
			}
			else{
				$(".right").trigger("click");
			}
		});
		$(".keyvisual").on("touchend", function(e){
			// id=setInterval(function(){
			// 	$(".left").trigger("click");
			// }, 6000);
		});

		var id=setInterval(function(){
			// $(".left").trigger("click");
		}, 6000);

		function swipeAPI(evt, xd, yd){
			var moveDirection="";
			var xUp=evt.touches[0].clientX;
			var yUp=evt.touches[0].clientY;
			// var xDiff=xDown-xUp;
			var xDiff=xd-xUp;
			// var yDiff=yDown-yUp;
			var yDiff=yd-yUp;

			if(Math.abs(xDiff) > Math.abs(yDiff)){
				if(xDiff > 0){
					moveDirection="left";
				}
				else{
					moveDirection="right";
				}
			}
			else{
				if(yDiff > 0){
					moveDirection="up"
				}
				else{
					moveDirection="down";
				}
			}
			return moveDirection;
		}

	// 비디오
	var n2;
	var h;
	var vidW, vidH;
	var video=document.getElementById("my_video");
	video.muted=true;

	function videoStart(){
		video.play();
	}
	function videoPause(){
		video.pause();
		video.currentTime=0;
	}
	$(window).resize(function(){
		h=$(window).height();
		vidH=h;
		$("#my_video").css({height:vidH});
		vidW=$("#my_video").width();

		$("#my_video").css({left:"50%", marginLeft:(-1)*(vidW/2)});
	});

	// 탭 메뉴, gnb
	$("#header .tab").click(function(e){
		e.preventDefault();
		$("body").addClass("static");
		$("#start .gnb").addClass("active");
		$(".dim").addClass("active");
	});
	$(".dim, #start .gnb .top_icon a:first-child").click(function(e){
		e.preventDefault();
		$("body").removeClass("static");
		$("#start .gnb").removeClass("active");
		$(".dim").removeClass("active");
		n2=undefined;
		$("#GNB .menu").removeClass("active");
		$("#GNB .menu").find(".sub").hide();
		$(".search_box").slideUp();
	});

	$(".top_icon a:last-child").click(function(e){
		e.preventDefault();
		if($(".search_box").is(":visible")) {
			$(".search_box").slideUp(300);
		}
		else {
			$(".search_box").slideDown(300);
		}
	});

	$("#GNB .menu").click(function(e){
		e.preventDefault();
		if(n != $(this).index()) {
			n=$(this).index();
		}
		else {
			n=undefined;
		}
		myfn1();
	});
	function myfn1() {
		$("#GNB .menu").removeClass("active");
		$("#GNB .menu").find(".sub").slideUp(300);
		$("#GNB .menu").eq(n).addClass("active");
		$("#GNB .menu").eq(n).find(".sub").slideDown(300);
	}

	/* 배너 */
	// 캠퍼스 선택
	var campusTxt="";
	var campusNum;

	$(".campus dt").click(function(e){
		e.preventDefault();
		campusNum=$(this).parents(".select").index();
		// console.log("campusNum : "+campusNum);

		$(".campus .select").each(function(i){
			if(i == campusNum){
				if($(this).find("dd").is(":visible")){
					$(this).find("dd").slideUp(300);
					$(".cam_select .select").removeClass("active");
				}
				else{
					$(this).find("dd").slideDown(300);
					$(".cam_select .select").eq(campusNum).addClass("active");
				}
			}
			else{
				$(this).find("dd").slideUp(300);
			}
		});
	});
	$(".campus dd li").click(function(e){
		e.preventDefault();
		campusTxt=$(this).find("a").text();
		// console.log("campusTxt : "+campusTxt);
		$(this).parents("dl").find("dt a").text(campusTxt);
		$(this).parent().parent().slideUp(300);
	});
});
