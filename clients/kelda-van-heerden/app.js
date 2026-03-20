(() => {
  function init() {
    // Your Webflow custom code here
    console.log("Yo! Kelda script loaded.");
	
	gsap.registerPlugin(ScrollTrigger);
  
  /////-----Lenis Smooth Scroll-----/////    
  const lenis = new Lenis(); 

  lenis.on('scroll', ScrollTrigger.update); 

  gsap.ticker.add((time) => {
    lenis.raf(time * 1000); 
  });
  

  /////-----Panel animation v1-----/////  
  /*
  const panels = document.querySelectorAll('.panel');
  const segments = panels.length - 1; // 3 panels => 2 transitions


  const tl = gsap.timeline({
    scrollTrigger: {
      trigger: '.hero-wrapper',
      start: 'top top',
      end: '+=' + (segments * 100) + '%',
      scrub: 0.1,
      pin: true,
      anticipatePin: 1,
    }
  });
  
  tl.to('.panel.one', {
    clipPath: 'inset(0% 0% 100% 0%)',
    ease: 'none',
    duration: 1
  }, 0);
  
    tl.to('.panel.two', {
    clipPath: 'inset(0% 0% 100% 0%)',
    ease: 'none',
    duration: 1
  }, 1);
  */
  
  
  /////-----Panel animation v2-----/////
  /*
  const panels = gsap.utils.toArray('.panel');
  const segments = panels.length - 1;

  const tl = gsap.timeline({
    scrollTrigger: {
      trigger: '.hero-wrapper',
      start: 'top top',
      end: '+=' + (segments * 100) + '%',
      scrub: 0.1,
      pin: true,
      anticipatePin: 1,
      invalidateOnRefresh: true
    }
  });

  //Ensure stacking is predictable: first panel on top initially
  panels.forEach((panel, i) => {
    gsap.set(panel, { zIndex: panels.length - i });
  });

  panels.slice(0, -1).forEach((panel, i) => {
    tl.to(panel, {
      yPercent: -100,
      ease: 'none',
      duration: 1
    }, i);
  });
  */

  
  /////-----Panel animation v3-----/////  
  /*
  const panels = gsap.utils.toArray('.panel');
  const segments = panels.length - 1; // 3 panels => 2 transitions


  const tl = gsap.timeline({
    scrollTrigger: {
      trigger: '.hero-wrapper',
      start: 'top top',
      end: '+=' + (segments * 100) + '%',
      scrub: 0.1,
      pin: true,
      anticipatePin: 1,
    }
  });
  
  // Ensure stacking is predictable: first panel on top initially
  panels.forEach((panel, i) => {
    gsap.set(panel, { zIndex: panels.length - i });
  });

  //Wipe transitions
  panels.slice(0, -1).forEach((panel, i) => {
    tl.to(panel, {
      clipPath: 'inset(0% 0% 100% 0%)',
      ease: 'none',
      duration: 1
    }, i);
  });

  //Continuous parallax
  const PARALLAX = -5; // tweak
  panels.forEach((panel) => {
    const inner = panel.querySelector('.panel-inner');
    if (!inner) return;

    tl.fromTo(inner,
      { yPercent: 0 },
      { yPercent: PARALLAX, ease: 'none', duration: segments },
      0
    );
  });
  */

  /////-----Page animation V4-----/////
  let homeCtx = null;

function initHomePanels(container) {
  // revert any previous home instance (in case of double-init)
  if (homeCtx) homeCtx.revert();

  homeCtx = gsap.context(() => {
    const q = gsap.utils.selector(container);

    const heroWrapper = q(".hero-wrapper")[0];
    const panels = gsap.utils.toArray(q(".panel"));

    // If we're not on home / markup not present, do nothing
    if (!heroWrapper || panels.length < 2) return;

    const segments = panels.length - 1;

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: heroWrapper,
        start: "top top",
        end: "+=" + segments * 100 + "%",
        scrub: 0.1,
        pin: true,
        anticipatePin: 1,
        invalidateOnRefresh: true,
      },
    });

    panels.forEach((panel, i) => {
      gsap.set(panel, { zIndex: panels.length - i });
    });

    panels.slice(0, -1).forEach((panel, i) => {
      tl.to(
        panel,
        {
          clipPath: "inset(0% 0% 100% 0%)",
          ease: "none",
          duration: 1,
        },
        i
      );
    });

    const PARALLAX = -5;
    panels.forEach((panel) => {
      const inner = panel.querySelector(".panel-inner");
      if (!inner) return;

      tl.fromTo(
        inner,
        { yPercent: 0 },
        { yPercent: PARALLAX, ease: "none", duration: segments },
        0
      );
    });
  }, container);
}

function destroyHomePanels() {
  if (homeCtx) {
    homeCtx.revert(); // kills the timeline + its ScrollTrigger(s)
    homeCtx = null;
  }
}
  
  
  
  
 



  /////-----Barba JS-----///// 
  /*
  barba.init({
  transitions: [{
    name: 'opacity-transition',
    leave(data) {
      return gsap.to(data.current.container, {
        opacity: 0
      });
    },
    enter(data) {
      return gsap.from(data.next.container, {
        opacity: 0
      });
    }
  }]
  })*/

  barba.init({
  transitions: [
    {
      name: "opacity-transition",

      leave(data) {
        return gsap.to(data.current.container, { opacity: 0, duration: 0.25 });
      },

      // runs AFTER leave() finishes and Barba is about to/has removed the old container
      afterLeave(data) {
        // only destroy if the page we just left was home
        if (data.current.namespace === "home") {
          destroyHomePanels();
        }
      },

      enter(data) {
        return gsap.from(data.next.container, { opacity: 0, duration: 0.25 });
      },

      afterEnter(data) {
        // init home after we entered home
        if (data.next.namespace === "home") {
          initHomePanels(data.next.container);
          if (window.ScrollTrigger) ScrollTrigger.refresh(true);
        }
      },
    },
  ],
});
  

  /*
  barba.init({
  views: [{
    namespace: 'home',
    beforeLeave(data) {
      return gsap.to(data.current.container, {
          opacity: 0
        });
    }
  }, {
    namespace: 'work',
    beforeEnter(data) {
      return gsap.from(data.next.container, {
          opacity: 0
        });
    }
  }]
});
*/
  

  //Reset scroll position to top
  barba.hooks.afterEnter(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "auto" });
  });
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();