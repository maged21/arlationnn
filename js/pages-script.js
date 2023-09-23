// header animation 
const bg = document.getElementById('header');
window.addEventListener('scroll', function(){
    bg.style.backgroundSize = 160 - +window.pageYOffset/12+ '%';
    bg.style.opacity = 1.3 - +window.pageYOffset/700+ '';
})
// Function to check if screen width is less than 600 pixels
function isScreenLessThan600() {
  return window.innerWidth < 600;
}

// Only run the animations if the screen width is greater than or equal to 600
if (!isScreenLessThan600()) {
  TweenMax.from("#header", 1, {
    delay: 2,
    opacity: 0,
    y: 20,
    ease: Expo.easeInOut
  });

  TweenMax.from(".navbar-brand", 1, {
    delay: 2.5,
    opacity: 0,
    y: 20,
    ease: Expo.easeInOut
  });

  TweenMax.staggerFrom(".navbar-nav .nav-item", 1, {
    delay: 2.6,
    opacity: 0,
    x: -20,
    ease: Power3.easeInOut
  }, 0.12);

  TweenMax.from(".head-text", 1, {
    delay: 2.8,
    opacity: 0,
    y: 20,
    ease: Expo.easeInOut
  });
}

let span = document.querySelector(".up");

window.onscroll = function () {
    this.scrollY >= 1000 ? span.classList.add("show") : span.classList.remove("show");
};

span.onclick = function () {
    window.scrollTo({
        top: 0,
        behavior: "smooth",
    })
}


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

// page transition
// Function to disable scrolling
function disableScroll() {
  document.body.style.overflow = 'hidden';
}

// Function to enable scrolling
function enableScroll() {
  document.body.style.overflow = 'auto';
}

document.addEventListener("DOMContentLoaded", function() {
  const urlParams = new URLSearchParams(window.location.search);
  if (urlParams.get('transition') === 'true') {
    if (window.innerWidth >= 600) {
      transition();
      // Remove the query parameter from the URL
      history.replaceState({}, document.title, window.location.pathname);
    }
  }
});

function transition(callback) {
  if (window.innerWidth < 600) {
    if (callback) {
      callback(); // If callback is provided, execute it immediately
    }
    return; // Exit the function if screen width is less than 600px
  }

  var tl = new TimelineMax({
    onComplete: function() {
      setTimeout(callback, 50); // Delay navigation by a small amount
    }
  });

  // Disable scrolling when the loader is displayed
  disableScroll();

  // Close Animation
  tl.to('.before', 0.2, { top: '50%', ease: Power2.easeOut }, 'close')
    .to('.after', 0.2, { bottom: '50%', ease: Power2.easeOut }, 'close')
    .to('.loader', 0.2, { opacity: 1 });

  // Open Animation
  tl.to('.before', 0.2, { top: '0%', ease: Power2.easeOut }, '+=1.5')
    .to('.after', 0.2, { bottom: '0%', ease: Power2.easeOut }, '-=0.2')
    .to('.loader', 0.2, { opacity: 0 }, '-=0.2')
    .call(enableScroll); // Re-enable scrolling when the loader is hidden

  // Play the timeline
  tl.play();
}

