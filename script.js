function locomotiveScrollTrigger(){
    gsap.registerPlugin(ScrollTrigger);

// Using Locomotive Scroll from Locomotive https://github.com/locomotivemtl/locomotive-scroll

const locoScroll = new LocomotiveScroll({
  el: document.querySelector(".mainSection"),
  smooth: true
});
// each time Locomotive Scroll updates, tell ScrollTrigger to update too (sync positioning)
locoScroll.on("scroll", ScrollTrigger.update);

// tell ScrollTrigger to use these proxy methods for the ".mainSection" element since Locomotive Scroll is hijacking things
ScrollTrigger.scrollerProxy(".mainSection", {
  scrollTop(value) {
    return arguments.length ? locoScroll.scrollTo(value, 0, 0) : locoScroll.scroll.instance.scroll.y;
  }, // we don't have to define a scrollLeft because we're only scrolling vertically.
  getBoundingClientRect() {
    return {top: 0, left: 0, width: window.innerWidth, height: window.innerHeight};
  },
  // LocomotiveScroll handles things completely differently on mobile devices - it doesn't even transform the container at all! So to get the correct behavior and avoid jitters, we should pin things with position: fixed on mobile. We sense it by checking to see if there's a transform applied to the container (the LocomotiveScroll-controlled element).
  pinType: document.querySelector(".mainSection").style.transform ? "transform" : "fixed"
});


// each time the window updates, we should refresh ScrollTrigger and then update LocomotiveScroll. 
ScrollTrigger.addEventListener("refresh", () => locoScroll.update());

// after everything is set up, refresh() ScrollTrigger and update LocomotiveScroll because padding may have been added for pinning, etc.
ScrollTrigger.refresh();

}

locomotiveScrollTrigger();


var heading = document.querySelector(".loader h1");
function timeloader(){
    var a = 0;
    setInterval(function(){
        if(a<100){

            a= a + Math.floor(Math.random()*10)
            heading.textContent = a+"%";
        }
        else{
            a=100;
            heading.textContent = a+ "%";
        }
    },200)
}

// timeloader();


var mytime = gsap.timeline()

mytime.to(".loader h1", {
    duration:2,
    // delay:2,
    onStart:timeloader(),
})

mytime.to(".loader" ,{
    top:"-100vh",
    // delay:5,
    duration:2
})

mytime.to(".main h1", {
    transform:"translateX(-320%)",
    fontWeight: "100",
    // duration: 2,
    // delay: 2,
    scrollTrigger: {
        trigger: ".main",
        scroller: ".mainSection",
        markers: true,
        start: "top 0",
        end: "top -150%",
        scrub: 1,
        pin: true,  
    }
})