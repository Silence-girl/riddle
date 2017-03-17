window.onload = function() {
	$(".loading_wrap").hide();

	//播放背景音乐
	$("#music_bg")[0].play();
	$(".bg_music .note").click(function() {
		if($(".bg_music").hasClass("play") == true) {
			$("#music_bg")[0].pause();
			$(".bg_music").removeClass("play");
			$(this).removeClass("rotate_doing");
		} else {
			$("#music_bg")[0].play();
			$(".bg_music").addClass("play");
			$(this).addClass("rotate_doing");
		}
	});
	//jquery扩展方法:随机排序
	$.fn.reorder = function() {
		function randOrd() {
			return(Math.round(Math.random()) - 0.5);
		}

		return($(this).each(function() {
			var $this = $(this);
			var $children = $this.children();
			var childCount = $children.length;

			if(childCount > 1) {
				$children.remove();

				var indices = new Array();
				for(i = 0; i < childCount; i++) {
					indices[indices.length] = i;
				}
				indices = indices.sort(randOrd);
				$.each(indices, function(j, k) {
					$this.append($children.eq(k));
				});
			}
		}));
	}
	$(".ques_store").reorder();
	//设置page的高度
	var window_width = $(window).width();
	$(".page").height($(window).height());
	$(".inner").height(window_width / 0.77);

	$(".game_start .arc_white").click(function() {
		$(".game_start").hide();
		$(".game_roll").fadeIn();
		$(".game_roll").css("display", "table-cell");
	});
	$(".game_roll .btn_pop").click(function() {
		$(".game_roll .mask").fadeIn();
		$(".game_roll .page_pop").fadeIn();
	});
	$(".game_roll .btn_start").click(function() {
		$(".game_roll").hide();
		$(".game_roll .mask").hide();
		$(".game_roll .page_pop").hide();
		$(".riddle_choice").fadeIn();
		$(".riddle_choice").css("display", "table-cell");
	});
	//选择谜语
	var lantern_head = window_width * 0.53;
	var lantern_foot = window_width * 0.16;
	var lantern_space = window_width * 1.06;;
	$(".riddle_choice .lantern_head").height(lantern_head);
	$(".riddle_choice .lantern_foot").height(lantern_foot);
	$(".riddle_choice .lantern_foot").css("top", lantern_space);
	var box_width = window_width * 0.39;
	var box_height = window_width * 0.6625;
	var spinner_top = window_width * 0.45;
	var spinner_left = window_width / 2 - box_width / 2;
	$("#spinner").css({
		top: spinner_top,
		left: spinner_left
	});
	$("#spinner,#spinner .box").width(box_width);
	$("#spinner,#spinner .box").height(box_height);
	var r = box_width / 2 / Math.tan(30 / 180 * Math.PI);
	$("#spinner .box1").css({
		'transform': 'translatez(' + r + 'px)',
		'-moz-transform': 'translatez(' + r + 'px)',
		'-o-transform': 'translatez(' + r + 'px)'
	});
	$("#spinner .box2").css({
		'transform': 'rotatey(60deg) translatez(' + r + 'px)',
		'-moz-transform': 'rotatey(60deg) translatez(' + r + 'px)',
		'-o-transform': 'rotatey(60deg) translatez(' + r + 'px)'
	});
	$("#spinner .box3").css({
		'transform': 'rotatey(120deg) translatez(' + r + 'px)',
		'-moz-transform': 'rotatey(120deg) translatez(' + r + 'px)',
		'-o-transform': 'rotatey(120deg) translatez(' + r + 'px)'
	});
	$("#spinner .box4").css({
		'transform': 'rotatey(180deg) translatez(' + r + 'px)',
		'-moz-transform': 'rotatey(180deg) translatez(' + r + 'px)',
		'-o-transform': 'rotatey(180deg) translatez(' + r + 'px)'
	});
	$("#spinner .box5").css({
		'transform': 'rotatey(240deg) translatez(' + r + 'px)',
		'-moz-transform': 'rotatey(240deg) translatez(' + r + 'px)',
		'-o-transform': 'rotatey(240deg) translatez(' + r + 'px)'
	});
	$("#spinner .box6").css({
		'transform': 'rotatey(300deg) translatez(' + r + 'px)',
		'-moz-transform': 'rotatey(300deg) translatez(' + r + 'px)',
		'-o-transform': 'rotatey(300deg) translatez(' + r + 'px)'
	});
	var angle = 0;
	$(".riddle_choice .inner").swipe({
		swipeLeft: function(event, distance, duration, fingerCount, fingerData) {
			angle = angle - 60;
			$("#spinner").css({
				'transform': 'rotateY(' + angle + 'deg)',
				'-moz-transform': 'rotateY(' + angle + 'deg)',
				'-o-transform': 'rotateY(' + angle + 'deg)'
			});
		},
		swipeRight: function(event, distance, duration, fingerCount, fingerData) {
			angle = angle + 60;
			$("#spinner").css({
				'transform': 'rotateY(' + angle + 'deg)',
				'-moz-transform': 'rotateY(' + angle + 'deg)',
				'-o-transform': 'rotateY(' + angle + 'deg)'
			});

		}
	});
	//选择谜语
	$(".riddle_choice .box").each(function() {
		var category_num = 0;
		$(this).click(function() {
			if($(this).hasClass("box6") == true) {
				category_num = 6;
			} else if($(this).hasClass("box5") == true) {
				category_num = 5;
			} else if($(this).hasClass("box4") == true) {
				category_num = 4;
			} else if($(this).hasClass("box3") == true) {
				category_num = 3;
			} else if($(this).hasClass("box2") == true) {
				category_num = 2;
			} else {
				category_num = 1;
			}
			$('.ques_store' + category_num).fadeIn();
			$('.ques_store' + category_num).css({
				"display": "table"
			});
			$(".riddle_choice").hide();
			$(".ques_store" + category_num).children("li").eq(0).animo({
				animation: 'pulse',
				duration: 1
			}, function() {
				$(".ques_store" + category_num).children("li").eq(0).animo({
					animation: 'zoomIn',
					duration: 1
				});
			});
			$(".ques_store" + category_num).children("li").eq(0).css({
				"display": "table-cell"
			});
			$(".ques_store" + category_num).children("li").each(function(index) {
				new_index = index + 1;
				$(this).find(".ques_index").text(new_index);
			});

		});
	});
	//答题
	var num_correct = 0;
	var num_error = 0;
	var ico_correct = "<div class='ico_correct'></div>";
	var ico_error = "<div class='ico_error'></div>";
	$(".ques_list li").click(function() {
		var li_wrap = $(this).parent(".ques_list").parents("li");
		if($(this).hasClass("correct")) {
			//答对
			num_correct++;
			$(".ques_store li").find(".num_correct").text(num_correct);
			if(num_correct == 5) {
				//通关
				$(this).find(".serial").addClass("ico_correct");
				setTimeout(function() {
					li_wrap.hide();
					$(".clear_all").fadeIn().css({
						"display": "table-cell"
					});
				}, 800);
			} else {
				$(this).find(".serial").addClass("ico_correct");
				setTimeout(function() {
					li_wrap.hide();
					li_wrap.next("li").fadeIn().css({
						"display": "table-cell"
					});
				}, 800);
			}
		} else {
			//答错
			num_error++;
			if(num_error == 5) {
				//未通关
				$(this).find(".serial").addClass("ico_error");
				$(this).parent(".ques_list").find(".correct").find(".serial").addClass("ico_correct");
				setTimeout(function() {
					li_wrap.hide();
					$(".game_over").fadeIn().css({
						"display": "table-cell"
					});
				}, 800);
			} else {
				$(this).find(".serial").addClass("ico_error");
				$(this).parent(".ques_list").find(".correct").find(".serial").addClass("ico_correct");
				setTimeout(function() {
					li_wrap.hide();
					li_wrap.next("li").fadeIn().css({
						"display": "table-cell"
					});
				}, 800);
			}
		}
	});
	//返回选关
	$(".ques_store li").find(".btn_pink").click(function() {
		$(this).parents("li").hide();
		$(".riddle_choice").fadeIn().css({
			"display": "table-cell"
		});
		num_correct = 0;
		num_error = 0;
		$(".ques_list").find(".serial").removeClass("ico_correct").removeClass("ico_error");
	});
	//再来一次
	$(".replay").click(function() {
		window.location.reload();
	});
	//祝福
	$(".btn-blessing").click(function() {
		$(".pop_blessing").fadeIn();
	});
	var scene = document.getElementById('scene');
	var parallax = new Parallax(scene, {
		scalarX: 10
	});
};