// intro
document.addEventListener("DOMContentLoaded", function() {
  const video = document.getElementById("video");
  const slider = document.getElementById("slider");
  const firstNavButton = slider.querySelector(".fnc-nav__control");

  if (video) {
    video.addEventListener("ended", function() {
      video.style.display = "none";
      slider.style.display = "block";

      firstNavButton.click();
    });
  }
});

// slider
(function() {

  var $$ = function(selector, context) {
    var context = context || document;
    var elements = context.querySelectorAll(selector);
    return [].slice.call(elements);
  };

  function _fncSliderInit($slider, options) {
    var prefix = ".fnc-";

    var $slider = $slider;
    var $slidesCont = $slider.querySelector(prefix + "slider__slides");
    var $slides = $$(prefix + "slide", $slider);
    var $controls = $$(prefix + "nav__control", $slider);
    var $controlsBgs = $$(prefix + "nav__bg", $slider);
    var $progressAS = $$(prefix + "nav__control-progress", $slider);

    var numOfSlides = $slides.length;
    var curSlide = 1;
    var sliding = false;
    var slidingAT = +parseFloat(getComputedStyle($slidesCont)["transition-duration"]) * 1000;
    var slidingDelay = +parseFloat(getComputedStyle($slidesCont)["transition-delay"]) * 1000;

    var autoSlidingActive = false;
    var autoSlidingTO;
    var autoSlidingDelay = 5000; // default autosliding delay value
    var autoSlidingBlocked = false;

    var $activeSlide;
    var $activeControlsBg;
    var $prevControl;

    function setIDs() {
      $slides.forEach(function($slide, index) {
        $slide.classList.add("fnc-slide-" + (index + 1));
      });

      $controls.forEach(function($control, index) {
        $control.setAttribute("data-slide", index + 1);
        $control.classList.add("fnc-nav__control-" + (index + 1));
      });

      $controlsBgs.forEach(function($bg, index) {
        $bg.classList.add("fnc-nav__bg-" + (index + 1));
      });
    };

    setIDs();

    function afterSlidingHandler() {
      $slider.querySelector(".m--previous-slide").classList.remove("m--active-slide", "m--previous-slide");
      $slider.querySelector(".m--previous-nav-bg").classList.remove("m--active-nav-bg", "m--previous-nav-bg");

      $activeSlide.classList.remove("m--before-sliding");
      $activeControlsBg.classList.remove("m--nav-bg-before");
      $prevControl.classList.remove("m--prev-control");
      $prevControl.classList.add("m--reset-progress");
      var triggerLayout = $prevControl.offsetTop;
      $prevControl.classList.remove("m--reset-progress");

      sliding = false;
      var layoutTrigger = $slider.offsetTop;

      if (autoSlidingActive && !autoSlidingBlocked) {
        setAutoslidingTO();
      }
    };

    function performSliding(slideID) {
      if (sliding) return;
      sliding = true;
      window.clearTimeout(autoSlidingTO);
      curSlide = slideID;

      $prevControl = $slider.querySelector(".m--active-control");
      $prevControl.classList.remove("m--active-control");
      $prevControl.classList.add("m--prev-control");
      $slider.querySelector(prefix + "nav__control-" + slideID).classList.add("m--active-control");

      $activeSlide = $slider.querySelector(prefix + "slide-" + slideID);
      $activeControlsBg = $slider.querySelector(prefix + "nav__bg-" + slideID);

      $slider.querySelector(".m--active-slide").classList.add("m--previous-slide");
      $slider.querySelector(".m--active-nav-bg").classList.add("m--previous-nav-bg");

      $activeSlide.classList.add("m--before-sliding");
      $activeControlsBg.classList.add("m--nav-bg-before");

      var layoutTrigger = $activeSlide.offsetTop;

      $activeSlide.classList.add("m--active-slide");
      $activeControlsBg.classList.add("m--active-nav-bg");

      setTimeout(afterSlidingHandler, slidingAT + slidingDelay);
    };



    function controlClickHandler() {
      if (sliding) return;
      if (this.classList.contains("m--active-control")) return;
      if (options.blockASafterClick) {
        autoSlidingBlocked = true;
        $slider.classList.add("m--autosliding-blocked");
      }

      var slideID = +this.getAttribute("data-slide");

      performSliding(slideID);
    };

    $controls.forEach(function($control) {
      $control.addEventListener("click", controlClickHandler);
    });

    function setAutoslidingTO() {
      window.clearTimeout(autoSlidingTO);
      var delay = +options.autoSlidingDelay || autoSlidingDelay;
      curSlide++;
      if (curSlide > numOfSlides) curSlide = 1;

      autoSlidingTO = setTimeout(function() {
        performSliding(curSlide);
      }, delay);
    };

    if (options.autoSliding || +options.autoSlidingDelay > 0) {
      if (options.autoSliding === false) return;
      
      autoSlidingActive = true;
      setAutoslidingTO();
      
      $slider.classList.add("m--with-autosliding");
      var triggerLayout = $slider.offsetTop;
      
      var delay = +options.autoSlidingDelay || autoSlidingDelay;
      delay += slidingDelay + slidingAT;
      
      $progressAS.forEach(function($progress) {
        $progress.style.transition = "transform " + (delay / 1000) + "s";
      });
    }
    
    $slider.querySelector(".fnc-nav__control:first-child").classList.add("m--active-control");

  };

  var fncSlider = function(sliderSelector, options) {
    var $sliders = $$(sliderSelector);

    $sliders.forEach(function($slider) {
      _fncSliderInit($slider, options);
    });
  };

  window.fncSlider = fncSlider;
}());

fncSlider(".example-slider", {autoSlidingDelay: 4000});


// slider ends

gsap.to(".clipper-left", 2, {
  delay: 2,
  clipPath: "inset(0 0 100% 0)",
  ease: "power4.inOut",
});

gsap.to(".clipper-right", 2, {
  delay: 2,
  clipPath: "inset(100% 0 0 0)",
  ease: "power4,inOut",
});

gsap.from(".loader-wrapper", 2, {
  scale: 0.9,
  ease: "power1.inOut",
});

gsap.from(".loader", 2.5, {
  right: "100%",
  ease: "power1.inOut",
});

gsap.to(".loader-wrapper, .pre-loader", 0.2, {
  opacity: 0,
  display: "none",
  ease: "power3.inOut",
  delay: 2.1,
},
"-=1"
);

// ---------------- hero section
TweenMax.from(".navbar-brand", 1,{
  delay:2.8,
  opacity:0,
  y: 20,
  ease: Expo.easeInOut
})

TweenMax.staggerFrom(".navbar-nav .nav-item", 1,{
  delay:3.5,
  opacity:0,
  x: -20,
  ease: Power3.easeInOut
}, 0.12)





// ---------------- second navbar

const tl = gsap.timeline({ paused: true });

const animateOpenNav = () => {
    tl.to("#navtwo-container", {
        duration: 0.2,
        autoAlpha: 1,
        delay: 0.1,
    });

    tl.to(".site-logo", {
        duration: 0.2,
        color: "#fff"
    },
    "-=0.1"
    );
};

const openNav = () => {
    animateOpenNav();
    const navBtn = document.getElementById("menu-toggle-btn");
    navBtn.onclick = function (e) {
        navBtn.classList.toggle("active");
        tl.reversed(!tl.reversed());

    };
};

openNav();

tl.from(".nvtwo > div", {
    duration: 0.4,
    opacity: 0,
    y: 10,
    stagger: {
        amount: 0.04,
    },
});

tl.to(".navtwo-link > a", {
    duration: 0.8,
    top: 0,
    ease: "power2.inOut",
    stagger: {
        amount: 0.1
    },
},
"-=0.4"
);

tl.from(".nav-footer", {
    duration: 0.3,
    opacity: 0
}, "-=0.5").reverse();


// Wait for the document to be fully loaded
let prevScrollPos = 0;

function toggleSecondNavbar() {
  const scrollPosition = scrollContainer.scrollTop;
  const secondNavbar = document.querySelector(".navbartwo");

  if (scrollPosition === 0) {
    secondNavbar.classList.remove("show");
  } else if (scrollPosition > prevScrollPos) {
    secondNavbar.classList.remove("show");
  } else {
    secondNavbar.classList.add("show");
  }

  prevScrollPos = scrollPosition;
}

// Listen for the scroll event on the window object
window.addEventListener("scroll", toggleSecondNavbar);
// Initialize the scrollContainer variable
const scrollContainer = document.querySelector(".scroll-container");

// Listen for the scroll event on the scroll container
scrollContainer.addEventListener("scroll", toggleSecondNavbar);

// ---------------- second navbar ends

// countdown

var countDownDate = new Date("Oct 5, 2023 00:00:00").getTime();
var x = setInterval(function(){
  var now = new Date().getTime();
  var distance = countDownDate - now;

  var days = Math.floor(distance / (1000 * 60 * 60 * 24));
  var hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
  var seconds = Math.floor((distance % (1000 * 60)) / 1000);

  document.getElementById("days").innerHTML = days;
  document.getElementById("hours").innerHTML = hours;
  document.getElementById("minutes").innerHTML = minutes;
  document.getElementById("seconds").innerHTML = seconds;

  if(distance < 0){
    clearInterval(x);
    document.getElementById("days").innerHTML = "00";
    document.getElementById("hours").innerHTML = "00";
    document.getElementById("minutes").innerHTML = "00";
    document.getElementById("seconds").innerHTML = "00";
  }


},1000);

// ---------------- about section
const counterUp = window.counterUp.default

const callback = entries => {
  entries.forEach( entry => {
    const el = entry.target
    if ( entry.isIntersecting && ! el.classList.contains( 'is-visible' ) ) {
      counterUp( el, {
        duration: 2000,
        delay: 16,
      } )
      el.classList.add( 'is-visible' )
    }
  } )
}

const IO = new IntersectionObserver( callback, { threshold: 1 } )

const elements = document.querySelectorAll('.counter');
elements.forEach((el) => {
  IO.observe(el);
});


// ---------------- about section ends
// ---------------- start testimonial
var swiper = new Swiper(".mySwiper", {
  slidesPerView: 1,
  spaceBetween: 30,
  loop: true,
  pagination: {
    el: ".swiper-pagination",
    clickable: true,
  },
  navigation: {
    nextEl: ".swiper-button-next",
    prevEl: ".swiper-button-prev",
  },
});


// ---------------- start services

$(function () {

    'use strict';

    function accordion() {

        $('.accord .accord-item').on('click', function() {
            const timeAnim = 400;
            $('.accord .accord-item').removeClass("active").css({'pointer-events':'auto'});
            $(this).addClass("active").css({'pointer-events':'none'});
            $('.accord .accord-header').next().slideUp(timeAnim);
            $(this).find('.accord-header').next().slideDown(timeAnim);

            $('.accord-img').removeClass("active");
            let id = $(this).data('id');
            $('#' + id + '-img').addClass("active");
        })
    }
    accordion();

})
// ------------------ services ends

// slider


// ------------------ scroll to top starts

const span = document.querySelector(".up");

scrollContainer.addEventListener("scroll", function () {
  this.scrollTop >= 1000
    ? span.classList.add("show")
    : span.classList.remove("show");
});

span.addEventListener("click", function () {
  scrollContainer.scrollTo({
    top: 0,
    behavior: "smooth",
  });
});
