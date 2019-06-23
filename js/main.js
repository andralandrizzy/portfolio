$(document).ready(function() {
	$('.sidenav').sidenav();
	M.updateTextFields();
	//SrolllFire
	const options = [
		{
			selector: '.main-text',
			offset: 0,
			callback: function(el) {
				M.fadeInImage($(el));
			}
		},
		{
			selector: '.navbar-fixed',
			offset: 1500,
			callback: function() {
				M.toast('hello Andrizzy', 3000);
				$(nav).removeClass('transparent').addClass('green darken-2');
			}
		}
	];
	M.scrollFire(options);
});

//Progress bar
$(document).ready(function() {
	$('.progress-bar').each(function() {
		$(this).find('.progress-content').animate(
			{
				width: $(this).attr('data-percentage')
			},
			2000
		);

		$(this).find('.progress-number-mark').animate(
			{ left: $(this).attr('data-percentage') },
			{
				duration: 2000,
				step: function(now, fx) {
					var data = Math.round(now);
					$(this).find('.percent').html(data + '%');
				}
			}
		);
	});
});

// Client Slider
$(document).ready(function() {
	$slides = $('.client-testimonial').children('.client-testimonial-content');
	for (var i = 0; i < $slides.length; i++) {
		$('#nav-points').width($slides.length * 20);
		$('#nav-points').append('<li id="point-' + i + '"></li>');
	}

	var displayTime = 8000;
	var transitionSpeed = 1000;
	var i = 0;
	var slideLen = $slides.length;
	var prev_index = slideLen - 1;
	$previous = $slides[slideLen - 1];
	$background = $('.client-testimonial-content');

	//Change picture every "displayTime" ms
	window.setInterval(changeSlide, displayTime);

	function changeSlide() {
		//slide to be shown
		$current = $slides[i];
		//change current nav-point and reset previous
		$('#nav-points li:nth-child(' + (i + 1) + ')').css('opacity', '0.6');
		$('#nav-points li:nth-child(' + prev_index + ')').css('opacity', '0.2');

		//Change+animation for slide
		$($previous).hide().css('opacity', 1).animate({ opacity: 0 }, transitionSpeed);
		$($current).show().css('opacity', 0).animate({ opacity: 1 }, transitionSpeed);
		//change background to current slide-source
		$($background).css('opacity', 0).attr('src', $($current).attr('src')).animate({ opacity: 1 }, transitionSpeed);

		//store old slide and index for animation and nav-points
		$previous = $slides[i];
		prev_index = i + 1;

		//increase until we're out of pictures
		if (++i == slideLen) {
			i = 0;
		}
	}

	//Go to index clicked on point-nav
	$('#nav-points li').on('click', function(e) {
		var id = $(this).attr('id');
		prev_index = i;
		if (prev_index == 0) prev_index = slideLen;
		i = parseInt(id.substring(6, 7));
	});
});
