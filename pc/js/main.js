$(function(){
	/* POPUP */
	if(GetCookie("todayClose") == "yes") {
	}
	else {
		$("body").addClass("static");
 	 	$(".dim").addClass("active");
		$(".popup").addClass("active");
	}

	$(".btn_wrap a.close").click(function(e){
		e.preventDefault();

		if($("input[name=todayClose]").is(":checked")) {
			setCookie("todayClose", "yes", 1);
		}

		$("body").removeClass("static");
		$(".dim").removeClass("active");
		$(".popup").removeClass("active");
	});

		// GetCookie
	function GetCookie(name){
		var value=null, search=name+"=";
		if(document.cookie.length > 0){
			var offset=document.cookie.indexOf(search);
			if(offset != -1){
				offset+=search.length;
				var end=document.cookie.indexOf(";", offset);
				if(end == -1) end=document.cookie.length;
				value=unescape(document.cookie.substring(offset, end));
			}
		} return value;
	}

	// SetCookie
	function setCookie(name, value, expiredays){
		var days=10;
		if(days){
			var date=new Date();
			date.setTime(date.getTime()+(days*24*60*60*1000));
			var expires="; expires="+date.toGMTString();
		}else{
			var expires="";
		}
		document.cookie=name+"="+value+expires+"; path=/";
	}

	/* HEADER */
	var n;
	var listName;

	$(".lang_select dt a").click(function(e){
		e.preventDefault();
		$(this).toggleClass("active");
		$(".lang_select dd").slideToggle(300);
	});

	$(".lang_select dd a").click(function(e){
		e.preventDefault();
		$(".lang_select dd a").removeClass("active");
		$(this).addClass("active");

		$(".lang_select dd").slideUp(300);
		$(".lang_select dt a").removeClass("active");

		listName=$(this).text();
		$(".lang_select dt a").html(listName+ "<span></span>");

		n=$(this).parent().index();
		$(".lang_select select option").prop({selected:false});
		$(".lang_select select option").eq(n+1).prop({selected:true});
	});

	/* GNB */
	$("#GNB > ul > li").hover(
		function(){
			$("#GNB > ul").addClass("active");
		},
		function(){
			$("#GNB > ul").removeClass("active");
		}
	);
	$("#GNB > ul > li:first-child a").focusin(function(){
		$("#GNB > ul").addClass("active");
	});
	$("#GNB li:last-child li:last-child").focusout(function(){
		$("#GNB > ul").removeClass("active");
	});
	$("#GNB > ul > li > a").focusin(function(){
		$(this).addClass("active");
	});
	$("#GNB li li:last-child").focusout(function(){
		$(this).parent().prev("a").removeClass("active");
	});

	/* KEYVISUAL */
	var front=document.getElementById("front");
	front.muted=true;
	front.currentTime=5;

	setTimeout(function(){
		front.play();
	}, 50);

	front.onended=function(){
		front.muted=true;
		front.currentTime=5;
		front.play();
	};

	/* CONTENTS */
	// cont_notice
	$(".cont_notice .title a").eq(0).addClass("active");
	$(".cont_notice .desc_group div").eq(0).addClass("active");

	var n2=0;

	$(".cont_notice .title a").click(function(e){
		e.preventDefault();
		n2=$(this).index();
		$(".cont_notice .title a").removeClass("active");
		$(this).addClass("active");
		$(".cont_notice .desc_group div").removeClass("active");
		$(".cont_notice .desc_group div").eq(n2).addClass("active");
	});

	// cont_campus
	var n3;
	var listName2;

	$("div[class^=cam_select] dt a").click(function(e){
		e.preventDefault();
		if($(this).parent().next("dd").is(":visible") == false) {
			$("div[class^=cam_select] dd").slideUp(300);
			$(this).parent().next("dd").slideDown(300);
			$(this).addClass("active");
		}
		else {
			$(this).parent().next("dd").slideUp(300);
			$(this).removeClass("active");
		}
	});

	$("div[class^=cam_select] dd a").click(function(e){
		e.preventDefault();
		$("div[class^=cam_select] dd a").removeClass("active");
		$(this).children("a").addClass("active");

		$("div[class^=cam_select] dd").slideUp(300);
		$("div[class^=cam_select] dt a").removeClass("active");

		listName2=$(this).text();
		$(this).parents("div[class^=cam_select]").find("dt a").html(listName2+ "<span></span>");
	});

	// cont_brand
	var n4=0;
	var pos=0;

	$(".cont_brand .controller li").eq(n4).addClass("active");

	$(".cont_brand .controller li").click(function(e){
		e.preventDefault();
		n4=$(this).index();
		pos=-1*n4*552;
		$(".cont_brand .controller li").removeClass("active");
		$(this).addClass("active");
		$(".cont_brand .brand_list ul").animate({left:pos}, 400);
	});

	/* FOOTER */
	var w=180;
	var amount=0;

	$(".prev").click(function(e){
		e.preventDefault();
		rightMoving();
	});
	$(".next").click(function(e){
		e.preventDefault();
		leftMoving();
	});

	function leftMoving(){
		amount-=w;
		$(".ft_site_list ul").animate({left:amount}, 500, function(){
			$(this).append($(".ft_site_list ul li:first-child"));
			amount+=w;
			$(this).css({left:amount});
		});
	}
	function rightMoving(){
		$(".ft_site_list ul").prepend($(".ft_site_list ul li:last-child"));
		amount-=w;
		$(".ft_site_list ul").css({left:amount});
		amount+=w;
		$(".ft_site_list ul").animate({left:amount}, 500);
	}
});
