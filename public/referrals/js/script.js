
let nav = document.querySelector('.header');

// Fixed Header
window.onscroll = function showHeader() {
	if (window.pageYOffset > 700) {
		nav.classList.add('header-fixed');
	} else {
		nav.classList.remove('header-fixed');
	}
}

$(document).ready(function () {

	// Animation preloader
	class WriterLogo {
		constructor(node) {
			this.node = node;
			if (!this.node) return;
			this.timer = 120;
			this.timerPreloader = 1620;
			this.broken = this.node.textContent.split('');
			this._init();
		}
		_init() {
			this.node.textContent = '';
			let i = 0;
			let interval = setInterval(() => {
				this.node.textContent += this.broken[i];
				i++;
				if (i >= this.broken.length) clearInterval(interval);
				if (i >= this.broken.length) {
					$('.preloader__logo').css('border-color', 'transparent');
				}
			}, this.timer);
			setInterval(() => {
				if (i >= this.broken.length) {
					$('.preloader').css('opacity', '0');
				}
			}, this.timer);
			setInterval(() => {
				if (i >= this.broken.length) {
					$('.preloader').css('z-index', '-10');
					$('body').css('overflow', 'overlay', '-ms-overflow-style', '-ms-autohiding-scrollbar');
					// Animation
					AOS.init({
						disable: false,
					});
				}
			}, this.timerPreloader);
		}
	}
	const preloaderLogo = document.querySelector('.preloader__logo');
	new WriterLogo(preloaderLogo);

	// SmoothScroll
	SmoothScroll({
		// Время скролла 400 = 0.4 секунды
		animationTime: 700,
		// Размер шага в пикселях 
		stepSize: 100,
		// Ускорение 
		accelerationDelta: 30,  
		// Максимальное ускорение
		accelerationMax: 2,   
		// Поддержка клавиатуры
		keyboardSupport: true,  
		// Шаг скролла стрелками на клавиатуре в пикселях
		arrowScroll: 50,
		// Pulse (less tweakable)
		// ratio of "tail" to "acceleration"
		pulseAlgorithm: true,
		pulseScale: 4,
		pulseNormalize: 1,
		// Поддержка тачпада
		touchpadSupport: true,
	})

	// Animation burger
	document.querySelector('.nav-button').addEventListener('click', function () {
		document.querySelector('.nav-anim').classList.toggle('open-nav');
	});

	// Nav-button active
	$(function() {
		$('.nav-button').click(function (event) {
			$('.header').toggleClass('burger-active');
		})
	});

	// Smooth scroll to element
	$("[data-scroll]").on("click", function (event) {
		event.preventDefault();

		let elementID = $(this).data('scroll');
		let elementOffset = $(elementID).offset().top-65;

		$("html, body").animate({
			scrollTop: elementOffset + 1
		}, 300);
	});

	// Swiper
	const breakpointMd = window.matchMedia('(min-width: 768px)');
	let aboutSwiper;
	const breakpointCheckerMd = function() {
		if (breakpointMd.matches === true) {
			if (aboutSwiper !== undefined) aboutSwiper.destroy(true, true);
			return;
		} else if (breakpointMd.matches === false) {
			return enableSwiperAbout();
		}
	};
	const enableSwiperAbout = function() {
		if ($('.about-slider').length) {
			aboutSwiper = new Swiper ('.about-slider', {
				slidesPerView: 1,
				simulateTouch: true,
				spaceBetween: 16,
				navigation: {
					nextEl: '.swiper-button-next',
					prevEl: '.swiper-button-prev'
				},
				breakpoints: {
					576: {
						slidesPerView: 1.4,
					},
				},
			});
		}
	};
	breakpointMd.addListener(breakpointCheckerMd);
	breakpointCheckerMd();

});