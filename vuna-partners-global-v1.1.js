/////-----Init GSAP-----/////
gsap.registerPlugin(ScrollTrigger, SplitText);
let mm = gsap.matchMedia();

/////-----Lenis Smooth Scroll-----/////
const lenis = new Lenis();

lenis.on("scroll", ScrollTrigger.update);

gsap.ticker.add((time) => {
  lenis.raf(time * 1000);
});

document.querySelectorAll("[data-lenis-start]").forEach((el) => {
  el.addEventListener("click", () => {
    lenis.start();
  });
});

document.querySelectorAll("[data-lenis-stop]").forEach((el) => {
  el.addEventListener("click", () => {
    lenis.stop();
  });
});

function updateLottie() {
  const dotLottieElements = document.querySelectorAll("dotlottie-wc");
  //console.log("Number of dotlottie elements:", dotLottieElements.length);

  dotLottieElements.forEach((dotLottieElement, index) => {
    const setup = () => {
      const dotLottie = dotLottieElement.dotLottie;

      console.log(`setup ${index + 1}`, {
        element: dotLottieElement,
        dotLottie,
      });

      if (!dotLottie) {
        //console.warn(`No dotLottie instance for element ${index + 1}`);
        return;
      }

      //dotLottie.pause();

      ScrollTrigger.create({
        trigger: dotLottieElement,
        start: "top 80%",
        end: "bottom 30%",
        markers: true,
        onEnter: () => {
          //console.log(`onEnter ${index + 1}`);
          dotLottie.play();
        },
        onEnterBack: () => {
          //console.log(`onEnterBack ${index + 1}`);
          dotLottie.play();
        },
        onLeave: () => {
          //console.log(`onLeave ${index + 1}`);
          dotLottie.pause();
        },
        onLeaveBack: () => {
          //console.log(`onLeaveBack ${index + 1}`);
          dotLottie.pause();
        },
      });

      ScrollTrigger.refresh();
    };

    if (dotLottieElement.dotLottie) {
      setup();
    } else {
      dotLottieElement.addEventListener("ready", setup, { once: true });
    }
  });
}
updateLottie();

/*
function updateLottie(container = document) {
  const dotLottieElements = container.querySelectorAll("dotlottie-wc");
  //console.log("Number of dotlottie elements:", dotLottieElements.length);

  dotLottieElements.forEach((dotLottieElement, index) => {
    const setup = () => {
      const dotLottie = dotLottieElement.dotLottie;

      console.log(`setup ${index + 1}`, {
        element: dotLottieElement,
        dotLottie,
      });

      if (!dotLottie) {
        //console.warn(`No dotLottie instance for element ${index + 1}`);
        return;
      }

      //dotLottie.pause();

      ScrollTrigger.create({
        trigger: dotLottieElement,
        start: "top 80%",
        end: "bottom 30%",
        markers: true,
        onEnter: () => {
          //console.log(`onEnter ${index + 1}`);
          dotLottie.play();
        },
        onEnterBack: () => {
          //console.log(`onEnterBack ${index + 1}`);
          dotLottie.play();
        },
        onLeave: () => {
          //console.log(`onLeave ${index + 1}`);
          dotLottie.pause();
        },
        onLeaveBack: () => {
          //console.log(`onLeaveBack ${index + 1}`);
          dotLottie.pause();
        },
      });

      ScrollTrigger.refresh();
    };

    if (dotLottieElement.dotLottie) {
      setup();
    } else {
      dotLottieElement.addEventListener("ready", setup, { once: true });
    }
  });
}
updateLottie();
*/

function updateUnicorn(container) {
  const prevUnicorn = document.querySelector(".unicorn");
  const src = container?.getAttribute("data-unicorn-src");

  if (!prevUnicorn || !src) return;

  const nextUnicorn = document.createElement("div");
  nextUnicorn.className = "unicorn";
  nextUnicorn.setAttribute("data-us-project-src", src);
  nextUnicorn.setAttribute(
    "data-us-scale",
    prevUnicorn.getAttribute("data-us-scale") || "1"
  );
  nextUnicorn.setAttribute(
    "data-us-dpi",
    prevUnicorn.getAttribute("data-us-dpi") || "1.25"
  );
  nextUnicorn.setAttribute(
    "data-us-fps",
    prevUnicorn.getAttribute("data-us-fps") || "30"
  );
  nextUnicorn.setAttribute(
    "data-us-lazyload",
    prevUnicorn.getAttribute("data-us-lazyload") || "true"
  );
  nextUnicorn.setAttribute(
    "data-us-production",
    prevUnicorn.getAttribute("data-us-production") || "true"
  );
  nextUnicorn.innerHTML = "";
  prevUnicorn.replaceWith(nextUnicorn);
  window.UnicornStudio.init()
    .then((scenes) => {})
    .catch((err) => {
      console.error(err);
    });
}

/////-----Init-----//////
function init() {
  const container = document.querySelector('[data-barba="container"]');
  const navLink = gsap.utils.toArray("[nav-link]");
  const menuButton = document.querySelector("[menu-button='open']");
  let content = document.querySelector(".content-wrapper");
  let elementLoad = document.querySelectorAll("[element-load]");
  let elementFade = document.querySelectorAll("[element-fade]");
  let maskOverlay = document.querySelector(".mask-overlay");
  let pageLoadTl;
  let splitA;

  //updateUnicorn();

  function splitAnimationA() {
    SplitText.create("[hero-text]", {
      type: "lines",
      autoSplit: true,
      onSplit: (self) => {
        splitA = gsap.from(self.lines, {
          y: 30,
          autoAlpha: 0,
          stagger: 0.1,
          duration: 1.5,
          clearProps: "transform",
        });
      },
    });
  }
  splitAnimationA();

  function splitAnimationB() {
    const splitB = gsap.utils.toArray("[word-split]");

    if (splitB.length) {
      splitB.forEach((el) => {
        const split = SplitText.create(el, {
          type: "words",
          wordsClass: "word",
        });

        gsap.from(split.words, {
          duration: 1.5,
          autoAlpha: 0.2,
          stagger: 0.1,
          scrollTrigger: {
            trigger: el,
            start: "top 80%",
            end: "top 60%",
            scrub: 1,
          },
        });
      });
    }
  }
  splitAnimationB();

  function splitAnimationC() {
    const splitC = gsap.utils.toArray("[text-fade]");

    if (splitC.length) {
      splitC.forEach((el) => {
        const split = SplitText.create(el, { type: "lines" });

        gsap.from(split.lines, {
          duration: 1.5,
          autoAlpha: 0,
          stagger: 0.1,
          ease: "power2.out",
          scrollTrigger: {
            trigger: el,
            start: "top 80%",
          },
        });
      });
    }
  }
  splitAnimationC();

  function initPageLoader() {
    const isScrolled = window.scrollY > 0;

    pageLoadTl = gsap.timeline({
      defaults: { ease: "power2.out" },
      paused: true,
    });

    pageLoadTl.add("loadStart");

    if (!isScrolled) {
      pageLoadTl
        .set(navLink, { visibility: "visible", y: 30 }, "loadStart")
        .from(".content-overlay", { opacity: 1, duration: 0.5 }, "loadStart")
        .add(splitA, "loadStart+=0.5")
        .to(navLink, { y: 0, stagger: 0.1 }, "loadStart+=0.75");

      if (elementLoad.length) {
        pageLoadTl
          .set(elementLoad, { y: 30 }, "loadStart")
          .to(
            elementLoad,
            { opacity: 1, y: 0, stagger: 0.25, duration: 2 },
            "loadStart+=1"
          );
      }

      if (elementFade.length) {
        pageLoadTl.to(elementFade, { opacity: 1, duration: 3 }, "loadStart+=1");
      }

      if (maskOverlay) {
        pageLoadTl.to(
          maskOverlay,
          { height: "0%", duration: 1.5 },
          "loadStart+=1"
        );
      }
    } else {
      pageLoadTl.set(navLink, { visibility: "visible" });

      if (maskOverlay) {
        pageLoadTl.to(
          maskOverlay,
          { height: "0%", duration: 1.5 },
          "loadStart+=1"
        );
      }
    }
  }
  initPageLoader();

  function initPreLoader() {
    let preLoaderTl = gsap.timeline({
      defaults: {
        ease: "power2.inOut",
      },
      onStart: () => {
        lenis.stop();
      },
      onComplete: () => {
        sessionStorage.setItem("visited", "true");
        lenis.start();
        content.style.opacity = "1";
        document.documentElement.classList.remove("show-preloader");
        pageLoadTl.play();
      },
    });

    preLoaderTl
      .to(".load-bar", { yPercent: -80, duration: 2 }, 0.25)
      .to(".load-text-wrapper", { opacity: 0 }, 2.25)
      .to(".load-line", { height: "100%" }, 2.5)
      .to(".load-line", { opacity: 1, width: "100%", duration: 0.75 }, ">");
  }

  function checkPreloader() {
    if (!sessionStorage.getItem("visited")) {
      initPreLoader();
    } else {
      document.documentElement.classList.remove("show-preloader");
      content.style.opacity = "1";
      pageLoadTl.play();
    }
  }
  checkPreloader();

  /*
  function updateClock() {
    const now = new Date();
    const options = {
      timeZone: "Africa/Johannesburg",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      hour12: false,
    };
    const formatter = new Intl.DateTimeFormat([], options);
    document.querySelectorAll("[clock]").forEach((el) => {
      el.textContent = formatter.format(now);
    });
  }
  updateClock();
  setInterval(updateClock, 1000);
  */

  function copyright() {
    const currentYear = new Date().getFullYear();
    document.querySelector('[data="year"]').innerHTML = currentYear;
  }
  copyright();

  function contactForms() {
    const fundingForm = document.querySelector("[form-type='funding']");
    const generalForm = document.querySelector("[form-type='general']");

    let formFunding = null;
    let formGeneral = null;

    if (fundingForm) {
      formFunding = gsap.timeline({
        paused: true,
        reversed: true,
        defaults: { ease: "power2.out" },
      });

      formFunding
        .set(".forms", { visibility: "visible" }, 0)
        .to("[form-type='funding']", { x: 0, duration: 1 }, 0)
        .fromTo(
          "[form-item='funding']",
          { y: 30, opacity: 0 },
          { y: 0, opacity: 1, stagger: 0.075 },
          0.1
        )
        .to(
          "[form-type='funding']",
          { backdropFilter: "blur(5px)", duration: 0.25 },
          ">"
        );

      $("[funding-enquiry]").on("click", function () {
        formFunding.reversed()
          ? formFunding.play()
          : formFunding.timeScale(1).reverse(0);
        lenis.stop();
      });
    }

    if (generalForm) {
      formGeneral = gsap.timeline({
        paused: true,
        reversed: true,
        defaults: { ease: "power2.out" },
      });

      formGeneral
        .set(".forms", { visibility: "visible" }, 0)
        .to("[form-type='general']", { x: 0, duration: 1 }, 0)
        .fromTo(
          "[form-item='general']",
          { y: 30, opacity: 0 },
          { y: 0, opacity: 1, stagger: 0.075 },
          0.1
        )
        .to(
          "[form-type='general']",
          { backdropFilter: "blur(5px)", duration: 0.25 },
          ">"
        );

      $("[general-enquiry]").on("click", function () {
        formGeneral.reversed()
          ? formGeneral.play()
          : formGeneral.timeScale(1).reverse(0);
        lenis.stop();
      });
    }

    $("[form-close]").on("click", function () {
      if (formFunding && !formFunding.reversed()) {
        formFunding.timeScale(1).reverse(0);
        lenis.start();
      }

      if (formGeneral && !formGeneral.reversed()) {
        formGeneral.timeScale(1).reverse(0);
        lenis.start();
      }
    });
  }
  contactForms();

  function gridAnimation() {
    const gridTriggers = gsap.utils.toArray("[grid-trigger]");

    gridTriggers.forEach((item) => {
      const gridText = item.querySelectorAll("[grid-text]");
      const gridImage = item.querySelectorAll("[grid-image]");
      const gridLink = item.querySelector("[grid-link]");

      if (gridText.length) gsap.set(gridText, { autoAlpha: 0, y: 15 });
      if (gridImage.length) gsap.set(gridImage, { autoAlpha: 0 });
      if (gridLink) gsap.set(gridLink, { autoAlpha: 0, y: 15 });

      if (!gridText.length && !gridImage.length && !gridLink) return;

      const gridTL = gsap.timeline({
        defaults: { ease: "power2.inOut", duration: 1 },
        scrollTrigger: {
          trigger: item,
          stagger: 0.1,
          start: "top 70%",
        },
      });

      if (gridText.length)
        gridTL.to(gridText, { autoAlpha: 1, y: 0, stagger: 0.1 }, 0.25);
      if (gridImage.length) gridTL.to(gridImage, { autoAlpha: 1 }, 0.5);
      if (gridLink) gridTL.to(gridLink, { autoAlpha: 1, y: 0 }, 1);
    });
  }
  gridAnimation();

  function shareAnimation() {
    const shares = gsap.utils.toArray("[share-fade]");
    const sharesTrigger = document.querySelector(".overview-col_right");

    if (shares.length && sharesTrigger) {
      gsap.set(shares, { opacity: 0, y: 15 });

      gsap.to(shares, {
        opacity: 1,
        y: 0,
        duration: 1,
        ease: "power2.out",
        stagger: 0.1,
        scrollTrigger: {
          trigger: sharesTrigger,
          start: "top 50%",
        },
      });
    }
  }
  shareAnimation();

  function historyAnimation() {
    const history = gsap.utils.toArray("[history-fade]");
    const historyTrigger = document.querySelector(".history-wrapper");

    if (history && historyTrigger) {
      gsap.set(history, { opacity: 0, y: 15 });

      gsap.to(history, {
        opacity: 1,
        y: 0,
        duration: 1,
        ease: "power2.out",
        stagger: 0.1,
        scrollTrigger: {
          trigger: historyTrigger,
          start: "top 70%",
        },
      });
    }
  }
  historyAnimation();

  function statAnimation() {
    const stats = gsap.utils.toArray("[stat-fade]");
    const statsTrigger = document.querySelector("[stat-trigger]");

    if (stats && statsTrigger) {
      gsap.set(stats, { opacity: 0, y: 15 });

      gsap.to(stats, {
        opacity: 1,
        y: 0,
        duration: 1,
        ease: "power2.out",
        stagger: 0.1,
        scrollTrigger: {
          trigger: statsTrigger,
          start: "top 70%",
        },
      });
    }
  }
  statAnimation();

  function cultureAnimation() {
    const cult = gsap.utils.toArray("[cult-fade]");
    const cultTrigger = document.querySelector("[cult-trigger]");

    if (cult && cultTrigger) {
      let cultTL = gsap.timeline({
        defaults: {
          ease: "power2.inOut",
        },
        scrollTrigger: {
          trigger: cultTrigger,
          start: "top 70%",
        },
      });

      gsap.set(cult, { opacity: 0, y: 15 });

      cultTL.to(
        cult,
        {
          opacity: 1,
          y: 0,
          duration: 1,
          stagger: 0.1,
        },
        0
      );
    }
  }
  cultureAnimation();

  function quoteAnimation() {
    const quoteWrapper = document.querySelector(".quotation-wrapper");
    const quoteImage = document.querySelector(".quotation-image");
    const quoteText = gsap.utils.toArray("[quote-text]");

    if (quoteWrapper && (quoteImage || quoteText.length)) {
      const quoteTL = gsap.timeline({
        defaults: { ease: "power2.inOut" },
        scrollTrigger: {
          trigger: quoteWrapper,
          start: "top 70%",
        },
      });

      if (quoteImage) {
        quoteTL.fromTo(
          quoteImage,
          { autoAlpha: 0 },
          { autoAlpha: 1, duration: 1 }
        );
      }

      if (quoteText.length) {
        quoteTL.fromTo(
          quoteText,
          { autoAlpha: 0 },
          { autoAlpha: 1, duration: 0.6, stagger: 0.1 },
          quoteImage ? 0.5 : 0
        );
      }
    }
  }
  quoteAnimation();

  function newsAnimation() {
    const newsRoom = document.querySelector("[newsroom-animate]");
    const newsRoomTitle = gsap.utils.toArray("[newsroom-title-animate]");
    const newsItemText = gsap.utils.toArray("[news-item-text]");
    const newsItemImage = gsap.utils.toArray("[news-item-image]");
    const newsRoomLink = document.querySelector("[newsroom-link]");

    if (newsRoom) {
      let newsTL = gsap.timeline({
        defaults: {
          ease: "power2.inOut",
          duration: 1,
        },
        scrollTrigger: {
          trigger: newsRoom,
          start: "top 70%",
        },
      });

      gsap.set(newsRoomTitle, { autoAlpha: 0, y: 15 });
      gsap.set(newsItemText, { autoAlpha: 0, y: 15 });
      gsap.set(newsRoomLink, { autoAlpha: 0, y: 15 });
      gsap.set(newsItemImage, { autoAlpha: 0 });

      newsTL
        .to(newsRoomTitle, { autoAlpha: 1, y: 0, stagger: 0.1 }, 0)
        .to(newsItemText, { autoAlpha: 1, y: 0, stagger: 0.1 }, 0.25)
        .to(newsItemImage, { autoAlpha: 1 }, 0.25)
        .to(newsRoomLink, { autoAlpha: 1, y: 0 }, 1);
    }
  }
  newsAnimation();

  function socialAnimation() {
    const social = gsap.utils.toArray("[social-fade]");
    const socialTrigger = document.querySelector(".social-share-wrapper");

    if (social && socialTrigger) {
      gsap.set(social, { autoAlpha: 0, y: 15 });

      gsap.to(social, {
        autoAlpha: 1,
        y: 0,
        duration: 1,
        ease: "power2.out",
        stagger: 0.1,
        scrollTrigger: {
          trigger: socialTrigger,
          start: "top 50%",
        },
      });
    }
  }
  socialAnimation();

  function criteriaAnimation() {
    const criteria = gsap.utils.toArray("[criteria-fade]");
    const criteriaTrigger = document.querySelector("[criteria-trigger]");

    if (criteria && criteriaTrigger) {
      gsap.set(criteria, { opacity: 0, y: 15 });

      gsap.to(criteria, {
        opacity: 1,
        y: 0,
        duration: 1,
        ease: "power2.out",
        stagger: 0.1,
        scrollTrigger: {
          trigger: criteriaTrigger,
          start: "top 70%",
        },
      });
    }
  }
  criteriaAnimation();

  function solutionsAnimation() {
    const solutions = gsap.utils.toArray("[solution-item]");

    solutions.forEach((item) => {
      const texts = item.querySelectorAll("[solution-text]");

      gsap.set(texts, { autoAlpha: 0, y: 15 });

      gsap.to(texts, {
        autoAlpha: 1,
        y: 0,
        duration: 1,
        stagger: 0.1,
        scrollTrigger: {
          trigger: item,
          start: "top 70%",
        },
      });
    });
  }
  solutionsAnimation();

  function approachAnimation() {
    const approachHeadingMain = document.querySelector(
      "[approach-heading-main]"
    );

    if (!approachHeadingMain) return;

    gsap.set(approachHeadingMain, { autoAlpha: 0 });

    gsap.to(approachHeadingMain, {
      autoAlpha: 1,
      duration: 1,
      scrollTrigger: {
        trigger: approachHeadingMain,
        start: "top 70%",
      },
    });

    const approachTriggers = gsap.utils.toArray("[approach-trigger]");

    approachTriggers.forEach((trigger) => {
      const approachHeadingOne = trigger.querySelectorAll(
        "[approach-heading-one]"
      );
      const approachHeadingTwo = trigger.querySelectorAll(
        "[approach-heading-two]"
      );

      gsap.set(approachHeadingOne, { autoAlpha: 0 });
      gsap.set(approachHeadingTwo, { autoAlpha: 0 });

      const approachTL = gsap.timeline({
        defaults: {
          ease: "power2.inOut",
          duration: 1,
        },
        scrollTrigger: {
          trigger: trigger,
          start: "top 50%",
          end: "bottom bottom",
        },
      });

      approachTL
        .to(approachHeadingOne, { autoAlpha: 1 }, 0)
        .to(approachHeadingTwo, { autoAlpha: 1 }, "<");
      //.add(splitAnimationB(approachHeadingTwo), 1);
    });
  }
  approachAnimation();

  function desktopAnimations() {
    mm.add("(min-width: 992px)", () => {
      function navAnimation() {
        lenis.on("scroll", ({ scroll }) => {
          if (scroll > 0) {
            hideNavLinks();
          } else {
            showNavLinks();
          }
        });

        let navTimeline = gsap.timeline({
          paused: true,
          defaults: {
            ease: "power2.out",
          },
        });

        navTimeline
          .to(navLink, { y: -30, opacity: 0, stagger: 0.075 }, 0)
          .set(navLink, { display: "none" }, ">")
          .set(menuButton, { display: "flex" }, ">")
          .fromTo(
            menuButton,
            { y: 30, opacity: 0 },
            { y: 0, opacity: 1, duration: 0.075 },
            ">+=0.05"
          );

        let navTimelineBG = gsap.timeline({
          paused: true,
          defaults: {
            ease: "power2.out",
          },
        });

        navTimelineBG
          .to(
            ".nav",
            { backgroundColor: "rgba(244, 238, 228, 1)", color: "#000000" },
            0
          )
          .to(".nav-border", { backgroundColor: "#000000" }, 0)
          .to(
            ".logo-svg .wordmark",
            { x: -10, opacity: 0, duration: 0.5 },
            0.5
          );

        if (document.querySelector(".dark-theme")) {
          navTimelineBG.to(
            ".dark-theme",
            { "--hover-underline-color": "#000000" },
            0
          );
        }

        function hideNavLinks() {
          navTimeline.play();
          navTimelineBG.play();
        }

        function showNavLinks() {
          navTimeline.timeScale(1.25).reverse();
          navTimelineBG.reverse();
        }

        menuButton.addEventListener("click", () => {
          navTimeline.timeScale(1.25).reverse();
        });
      }
      navAnimation();

      function buttonAnimation() {
        const buttons = gsap.utils.toArray("[buttonhover]");

        buttons.forEach((buttonItem) => {
          let button = buttonItem.querySelector("[buttonhovertarget]");
          let buttonHover = gsap.timeline({
            paused: true,
          });

          buttonHover
            .to(button, { duration: 0.3, xPercent: 101, ease: "power2.inOut" })
            .set(button, { xPercent: -101 })
            .to(button, { duration: 0.5, xPercent: 0 });

          buttonItem.addEventListener("mouseenter", () => buttonHover.play(0));
        });
      }
      buttonAnimation();

      function cardAnimationA() {
        const approachTrigger = document.querySelector(".approach-wrapper");
        const approachPin = document.querySelector(".approach-row_top");

        if (approachTrigger && approachPin) {
          ScrollTrigger.create({
            trigger: approachTrigger,
            pin: approachPin,
            start: "top top",
            end: "bottom bottom",
          });
        }

        const panels = gsap.utils.toArray(".approach-item");

        panels.forEach((panel, i) => {
          if (i === panels.length - 1) return;

          gsap
            .timeline({
              scrollTrigger: {
                trigger: panel,
                start: "top +=112",
                end: "bottom +=112",
                scrub: true,
                pin: true,
                pinSpacing: false,
              },
            })
            .to(panel, { opacity: 0 });
        });
      }
      cardAnimationA();

      function cardAnimationB() {
        const items = gsap.utils.toArray("[stacked-item]");
        const stickyWrapper = document.querySelector("[sticky-wrapper]");
        const stickyItem = document.querySelector("[sticky-item]");

        items.forEach((container, index) => {
          const isLast = index === items.length - 1;

          gsap.to(container, {
            opacity: 0,
            ease: "none",
            duration: 0.25,
            scrollTrigger: {
              trigger: container,
              start: "top +=64",
              end: "bottom 25%",
              scrub: true,
              anticipatePin: true,
            },
          });

          gsap.to(container, {
            yPercent: isLast ? 0 : -30,
            ease: "none",
            scrollTrigger: {
              trigger: container,
              start: "top +=64",
              end: "bottom top",
              scrub: true,
              pin: !isLast,
            },
          });
        });
      }
      cardAnimationB();

      function footerAnimation() {
        const footerReveal = document.querySelector("[footer-reveal]");

        gsap.set("[footer-wrapper]", { yPercent: -50 });

        const uncover = gsap.timeline({ paused: true });
        const footerElementOne = gsap.utils.toArray("[footer-element='one']");
        const footerElementTwo = gsap.utils.toArray("[footer-element='two']");
        const footerElementThree = gsap.utils.toArray(
          "[footer-element='three']"
        );
        const footerElementFour = gsap.utils.toArray("[footer-element='four']");
        const footerElementFive = gsap.utils.toArray("[footer-element='five']");

        gsap.set(footerElementOne, { autoAlpha: 0, y: 15 });
        gsap.set(footerElementTwo, { autoAlpha: 0, y: 15 });
        gsap.set(footerElementThree, { autoAlpha: 0, y: 15 });
        gsap.set(footerElementFour, { autoAlpha: 0, y: 15 });
        gsap.set(footerElementFive, { autoAlpha: 0, y: 15 });

        uncover.to("[footer-wrapper]", {
          yPercent: 0,
          ease: "none",
        });

        ScrollTrigger.create({
          trigger: footerReveal,
          start: "bottom bottom",
          end: "+=70%",
          animation: uncover,
          scrub: true,
        });

        const footerTL = gsap.timeline({
          scrollTrigger: {
            trigger: ".footer-container",
            start: "top 70%",
            end: "bottom bottom",
            defaults: {
              ease: "power2.inOut",
              duration: 1,
            },
          },
        });

        footerTL
          .to(
            footerElementOne,
            {
              autoAlpha: 1,
              y: 0,
              stagger: 0.05,
            },
            0
          )
          .to(
            footerElementTwo,
            {
              autoAlpha: 1,
              y: 0,
              stagger: 0.05,
            },
            "<0.25"
          )
          .to(
            footerElementThree,
            {
              autoAlpha: 1,
              y: 0,
              stagger: 0.05,
            },
            "<0.25"
          )
          .to(
            footerElementFour,
            {
              autoAlpha: 1,
              y: 0,
            },
            "<0.05"
          )
          .to(
            footerElementFive,
            {
              autoAlpha: 1,
              y: 0,
            },
            "<0.25"
          );
      }
      footerAnimation();
    });
  }
  desktopAnimations();

  function tabletAnimations() {
    mm.add("(min-width: 768px) and (max-width: 991px)", () => {
      function lottieScrollTrigger() {
        if (!customElements.get("dotlottie-wc")) return;

        const players = document.querySelectorAll("dotlottie-wc");
        if (!players.length) return;

        players.forEach((player, index) => {
          ScrollTrigger.create({
            trigger: player,
            start: "top bottom+=150",
            end: "bottom top-=150",

            onEnter: () => {
              if (typeof player.play === "function") player.play();
            },

            onEnterBack: () => {
              if (typeof player.play === "function") player.play();
            },

            onLeave: () => {
              if (typeof player.pause === "function") player.pause();
            },

            onLeaveBack: () => {
              if (typeof player.pause === "function") player.pause();
            },
          });
        });
      }

      lottieScrollTrigger();

      function navAnimationMobile() {
        lenis.on("scroll", ({ scroll }) => {
          // `scroll` is the current scroll position from Lenis
          if (scroll > 50) {
            hideNavLinks();
          } else {
            showNavLinks();
          }
        });

        //Timeline for nav border
        let navTimelineBG = gsap.timeline({
          paused: true,
          defaults: {
            ease: "power2.out",
          },
        });

        navTimelineBG
          .to(
            ".nav",
            { backgroundColor: "rgba(244, 238, 228, 1)", color: "#000000" },
            0
          )
          .to(".nav-border", { backgroundColor: "#000000" }, 0)
          .to(".logo-svg .wordmark", { x: -10, opacity: 0, duration: 0.5 }, 0.5)
          .to(
            ".logo-svg_menu .wordmark",
            { x: -10, opacity: 0, duration: 0.5 },
            0.5
          );

        //Hide nav links (play timeline)
        function hideNavLinks() {
          navTimelineBG.play();
        }

        //Show nav links (reverse timeline)
        function showNavLinks() {
          navTimelineBG.reverse();
        }
      }
      navAnimationMobile();

      function menuAnimation() {
        let menuAnimation = gsap.timeline({
          paused: true,
          reversed: true,
          ease: "power2.inOut",
        });

        menuAnimation
          .set(".menu-wrapper", { opacity: 0, yPercent: -101 }, 0)
          .set("[menu-item]", { opacity: 0, y: -30 }, 0)
          .set(".logo-svg", { display: "none" }, 0)
          .set(".logo-svg_menu", { display: "block" }, 0)
          .to(".nav", { backgroundColor: "rgba(250, 247, 241, 0)" }, 0)
          .to(".menu", { display: "block" }, 0)
          .to("[menu-button='open']", { y: 14, duration: 0.15 }, 0)
          .to("[menu-button='close']", { y: 14 }, ">")
          .to(".menu-wrapper", { opacity: 1, yPercent: 0, duration: 0.25 }, 0)
          .to(
            "[menu-item='primary']",
            { opacity: 1, y: 0, stagger: 0.075, duration: 0.5 },
            0.15
          )
          .to(
            "[menu-item='secondary']",
            { opacity: 1, y: 0, stagger: 0.075, duration: 0.5 },
            0.15
          );

        $(".menu-button").on("click", function () {
          if (menuAnimation.reversed()) {
            menuAnimation.play();
            lenis.stop();
          } else {
            menuAnimation.timeScale(1).reverse();

            menuAnimation.eventCallback("onReverseComplete", () => {
              if (window.scrollY > 0) {
                gsap.set(".nav", { backgroundColor: "rgba(250, 247, 241, 1)" });
              }

              handleScroll();
              lenis.start();
            });
          }
        });
      }
      menuAnimation();

      function cardAnimationA() {
        const approachTrigger = document.querySelector(".approach-wrapper");
        const approachPin = document.querySelector(".approach-row_top");

        if (approachTrigger && approachPin) {
          ScrollTrigger.create({
            trigger: approachTrigger,
            pin: approachPin,
            start: "top top",
            end: "bottom bottom",
          });
        }

        const panels = gsap.utils.toArray(".approach-item");

        panels.forEach((panel, i) => {
          if (i === panels.length - 1) return;

          gsap
            .timeline({
              scrollTrigger: {
                trigger: panel,
                start: "top +=112",
                end: "bottom +=112",
                scrub: true,
                pin: true,
                pinSpacing: false,
              },
            })
            .to(panel, { opacity: 0 });
        });
      }
      cardAnimationA();

      function cardAnimationB() {
        const items = gsap.utils.toArray("[stacked-item]");

        items.forEach((container, index) => {
          const isLast = index === items.length - 1;

          gsap.to(container, {
            opacity: 0,
            ease: "none",
            duration: 0.25,
            scrollTrigger: {
              trigger: container,
              start: "top +=64",
              end: "bottom 25%",
              scrub: true,
              anticipatePin: true,
            },
          });

          gsap.to(container, {
            yPercent: isLast ? 0 : -30,
            ease: "none",
            scrollTrigger: {
              trigger: container,
              start: "top +=64",
              end: "bottom top",
              scrub: true,
              pin: !isLast,
            },
          });
        });
      }
      cardAnimationB();

      function footerAnimation() {
        const footerReveal = document.querySelector("[footer-reveal]");

        gsap.set("[footer-wrapper]", { yPercent: -50 });

        const uncover = gsap.timeline({ paused: true });
        const footerElementOne = gsap.utils.toArray("[footer-element='one']");
        const footerElementTwo = gsap.utils.toArray("[footer-element='two']");
        const footerElementThree = gsap.utils.toArray(
          "[footer-element='three']"
        );
        const footerElementFour = gsap.utils.toArray("[footer-element='four']");
        const footerElementFive = gsap.utils.toArray("[footer-element='five']");

        gsap.set(footerElementOne, { autoAlpha: 0, y: 15 });
        gsap.set(footerElementTwo, { autoAlpha: 0, y: 15 });
        gsap.set(footerElementThree, { autoAlpha: 0, y: 15 });
        gsap.set(footerElementFour, { autoAlpha: 0, y: 15 });
        gsap.set(footerElementFive, { autoAlpha: 0, y: 15 });

        uncover.to("[footer-wrapper]", {
          yPercent: 0,
          ease: "none",
        });

        ScrollTrigger.create({
          trigger: footerReveal,
          start: "bottom bottom",
          end: "+=70%",
          animation: uncover,
          scrub: true,
        });

        const footerTL = gsap.timeline({
          scrollTrigger: {
            trigger: ".footer-container",
            start: "top 70%",
            end: "bottom bottom",
            defaults: {
              ease: "power2.inOut",
              duration: 1,
            },
          },
        });

        footerTL
          .to(
            footerElementOne,
            {
              autoAlpha: 1,
              y: 0,
              stagger: 0.05,
            },
            0
          )
          .to(
            footerElementTwo,
            {
              autoAlpha: 1,
              y: 0,
              stagger: 0.05,
            },
            "<0.25"
          )
          .to(
            footerElementThree,
            {
              autoAlpha: 1,
              y: 0,
              stagger: 0.05,
            },
            "<0.25"
          )
          .to(
            footerElementFour,
            {
              autoAlpha: 1,
              y: 0,
            },
            "<0.25"
          )
          .to(
            footerElementFive,
            {
              autoAlpha: 1,
              y: 0,
            },
            "<0.25"
          );
      }
      footerAnimation();
    });
  }
  tabletAnimations();

  function mobileLAnimations() {
    mm.add("(min-width: 480px) and (max-width: 767px)", () => {
      function lottieScrollTrigger() {
        if (!customElements.get("dotlottie-wc")) return;

        const players = document.querySelectorAll("dotlottie-wc");
        if (!players.length) return;

        players.forEach((player, index) => {
          ScrollTrigger.create({
            trigger: player,
            start: "top bottom+=150",
            end: "bottom top-=150",

            onEnter: () => {
              if (typeof player.play === "function") player.play();
            },

            onEnterBack: () => {
              if (typeof player.play === "function") player.play();
            },

            onLeave: () => {
              if (typeof player.pause === "function") player.pause();
            },

            onLeaveBack: () => {
              if (typeof player.pause === "function") player.pause();
            },
          });
        });
      }

      lottieScrollTrigger();

      function navAnimationMobile() {
        lenis.on("scroll", ({ scroll }) => {
          if (scroll > 50) {
            hideNavLinks();
          } else {
            showNavLinks();
          }
        });

        let navTimelineBG = gsap.timeline({
          paused: true,
          defaults: {
            ease: "power2.out",
          },
        });

        navTimelineBG
          .to(
            ".nav",
            { backgroundColor: "rgba(244, 238, 228, 1)", color: "#000000" },
            0
          )
          .to(".nav-border", { backgroundColor: "#000000" }, 0)
          .to(".logo-svg .wordmark", { x: -10, opacity: 0, duration: 0.5 }, 0.5)
          .to(
            ".logo-svg_menu .wordmark",
            { x: -10, opacity: 0, duration: 0.5 },
            0.5
          );

        function hideNavLinks() {
          navTimelineBG.play();
        }

        function showNavLinks() {
          navTimelineBG.reverse();
        }
      }
      navAnimationMobile();

      function menuAnimation() {
        let menuAnimation = gsap.timeline({
          paused: true,
          reversed: true,
          ease: "power2.inOut",
        });

        menuAnimation
          .set(".menu-wrapper", { opacity: 0, yPercent: -101 }, 0)
          .set("[menu-item]", { opacity: 0, y: -30 }, 0)
          .set(".logo-svg", { display: "none" }, 0)
          .set(".logo-svg_menu", { display: "block" }, 0)
          .to(".nav", { backgroundColor: "rgba(250, 247, 241, 0)" }, 0)
          .to(".menu", { display: "block" }, 0)
          .to("[menu-button='open']", { y: 14, duration: 0.15 }, 0)
          .to("[menu-button='close']", { y: 14 }, ">")
          .to(".menu-wrapper", { opacity: 1, yPercent: 0, duration: 0.25 }, 0)
          .to(
            "[menu-item='primary']",
            { opacity: 1, y: 0, stagger: 0.075, duration: 0.5 },
            0.15
          )
          .to(
            "[menu-item='secondary']",
            { opacity: 1, y: 0, stagger: 0.075, duration: 0.5 },
            0.15
          );

        $(".menu-button").on("click", function () {
          if (menuAnimation.reversed()) {
            menuAnimation.play();
            lenis.stop();
          } else {
            menuAnimation.timeScale(1).reverse();

            menuAnimation.eventCallback("onReverseComplete", () => {
              const currentScroll = lenis.scroll ?? lenis.animatedScroll ?? 0;

              if (currentScroll > 0) {
                gsap.set(".nav", { backgroundColor: "rgba(250, 247, 241, 1)" });
              } else {
                gsap.set(".nav", { backgroundColor: "rgba(250, 247, 241, 0)" });
              }

              lenis.start();
            });
          }
        });
      }
      menuAnimation();

      function cardAnimationA() {
        const approachTrigger = document.querySelector(".approach-wrapper");
        const approachPin = document.querySelector(".approach-row_top");

        if (approachTrigger && approachPin) {
          ScrollTrigger.create({
            trigger: approachTrigger,
            pin: approachPin,
            start: "top top",
            end: "bottom bottom",
          });
        }

        const panels = gsap.utils.toArray(".approach-item");

        panels.forEach((panel, i) => {
          if (i === panels.length - 1) return;

          gsap
            .timeline({
              scrollTrigger: {
                trigger: panel,
                start: "top +=112",
                end: "bottom +=112",
                scrub: true,
                pin: true,
                pinSpacing: false,
              },
            })
            .to(panel, { opacity: 0 });
        });
      }
      cardAnimationA();

      function cardAnimationB() {
        const items = gsap.utils.toArray("[stacked-item]");

        items.forEach((container, index) => {
          const isLast = index === items.length - 1;

          gsap.to(container, {
            opacity: 0,
            ease: "none",
            duration: 0.25,
            scrollTrigger: {
              trigger: container,
              start: "top +=64",
              end: "bottom 25%",
              scrub: true,
              anticipatePin: true,
            },
          });

          gsap.to(container, {
            yPercent: isLast ? 0 : -30,
            ease: "none",
            scrollTrigger: {
              trigger: container,
              start: "top +=64",
              end: "bottom top",
              scrub: true,
              pin: !isLast,
            },
          });
        });
      }
      cardAnimationB();

      function footerAnimation() {
        const footerReveal = document.querySelector("[footer-reveal]");

        gsap.set("[footer-wrapper]", { yPercent: -50 });

        const uncover = gsap.timeline({ paused: true });
        const footerElementOne = gsap.utils.toArray("[footer-element='one']");
        const footerElementTwo = gsap.utils.toArray("[footer-element='two']");
        const footerElementThree = gsap.utils.toArray(
          "[footer-element='three']"
        );
        const footerElementFour = gsap.utils.toArray("[footer-element='four']");
        const footerElementFive = gsap.utils.toArray("[footer-element='five']");

        gsap.set(footerElementOne, { autoAlpha: 0, y: 15 });
        gsap.set(footerElementTwo, { autoAlpha: 0, y: 15 });
        gsap.set(footerElementThree, { autoAlpha: 0, y: 15 });
        gsap.set(footerElementFour, { autoAlpha: 0, y: 15 });
        gsap.set(footerElementFive, { autoAlpha: 0, y: 15 });

        uncover.to("[footer-wrapper]", {
          yPercent: 0,
          ease: "none",
        });

        ScrollTrigger.create({
          trigger: footerReveal,
          start: "bottom bottom",
          end: "+=100%",
          animation: uncover,
          scrub: true,
        });

        const footerTL = gsap.timeline({
          scrollTrigger: {
            trigger: ".footer-container",
            start: "top 80%",
            end: "bottom bottom",
            defaults: {
              ease: "power2.inOut",
              duration: 1,
            },
          },
        });

        footerTL
          .to(
            footerElementOne,
            {
              autoAlpha: 1,
              y: 0,
              stagger: 0.05,
            },
            0
          )
          .to(
            footerElementTwo,
            {
              autoAlpha: 1,
              y: 0,
              stagger: 0.05,
            },
            "<0.25"
          )
          .to(
            footerElementThree,
            {
              autoAlpha: 1,
              y: 0,
              stagger: 0.05,
            },
            "<0.25"
          )
          .to(
            footerElementFour,
            {
              autoAlpha: 1,
              y: 0,
            },
            "<0.05"
          )
          .to(
            footerElementFive,
            {
              autoAlpha: 1,
              y: 0,
            },
            "<0.25"
          );
      }
      footerAnimation();
    });
  }
  mobileLAnimations();

  function mobilePAnimations() {
    mm.add("(max-width: 479px)", () => {
      function lottieScrollTrigger() {
        if (!customElements.get("dotlottie-wc")) return;

        const players = document.querySelectorAll("dotlottie-wc");
        if (!players.length) return;

        players.forEach((player, index) => {
          ScrollTrigger.create({
            trigger: player,
            start: "top bottom+=150",
            end: "bottom top-=150",

            onEnter: () => {
              if (typeof player.play === "function") player.play();
            },

            onEnterBack: () => {
              if (typeof player.play === "function") player.play();
            },

            onLeave: () => {
              if (typeof player.pause === "function") player.pause();
            },

            onLeaveBack: () => {
              if (typeof player.pause === "function") player.pause();
            },
          });
        });
      }
      lottieScrollTrigger();

      function navAnimationMobile() {
        lenis.on("scroll", ({ scroll }) => {
          if (scroll > 50) {
            hideNavLinks();
          } else {
            showNavLinks();
          }
        });

        let navTimelineBG = gsap.timeline({
          paused: true,
          defaults: {
            ease: "power2.out",
          },
        });

        navTimelineBG
          .to(
            ".nav",
            { backgroundColor: "rgba(244, 238, 228, 1)", color: "#000000" },
            0
          )
          .to(".nav-border", { backgroundColor: "#000000" }, 0)
          .to(".logo-svg .wordmark", { x: -10, opacity: 0, duration: 0.5 }, 0.5)
          .to(
            ".logo-svg_menu .wordmark",
            { x: -10, opacity: 0, duration: 0.5 },
            0.5
          );

        function hideNavLinks() {
          navTimelineBG.play();
        }

        function showNavLinks() {
          navTimelineBG.reverse();
        }
      }
      navAnimationMobile();

      function menuAnimation() {
        let menuAnimation = gsap.timeline({
          paused: true,
          reversed: true,
          ease: "power2.inOut",
        });

        menuAnimation
          .set(".menu-wrapper", { opacity: 0, yPercent: -101 }, 0)
          .set("[menu-item]", { opacity: 0, y: -30 }, 0)
          .set(".logo-svg", { display: "none" }, 0)
          .set(".logo-svg_menu", { display: "block" }, 0)
          .to(".nav", { backgroundColor: "rgba(250, 247, 241, 0)" }, 0)
          .to(".menu", { display: "block" }, 0)
          .to("[menu-button='open']", { y: 14, duration: 0.15 }, 0)
          .to("[menu-button='close']", { y: 14 }, ">")
          .to(".menu-wrapper", { opacity: 1, yPercent: 0, duration: 0.25 }, 0)
          .to(
            "[menu-item='primary']",
            { opacity: 1, y: 0, stagger: 0.075, duration: 0.5 },
            0.15
          )
          .to(
            "[menu-item='secondary']",
            { opacity: 1, y: 0, stagger: 0.075, duration: 0.5 },
            0.15
          );

        $(".menu-button").on("click", function () {
          if (menuAnimation.reversed()) {
            menuAnimation.play();
            lenis.stop();
          } else {
            menuAnimation.timeScale(1).reverse();

            menuAnimation.eventCallback("onReverseComplete", () => {
              const currentScroll = lenis.scroll ?? lenis.animatedScroll ?? 0;

              if (currentScroll > 0) {
                gsap.set(".nav", { backgroundColor: "rgba(250, 247, 241, 1)" });
              } else {
                gsap.set(".nav", { backgroundColor: "rgba(250, 247, 241, 0)" });
              }

              lenis.start();
            });
          }
        });
      }
      menuAnimation();

      function cardAnimationA() {
        const approachTrigger = document.querySelector(".approach-wrapper");
        const approachPin = document.querySelector(".approach-row_top");

        if (approachTrigger && approachPin) {
          ScrollTrigger.create({
            trigger: approachTrigger,
            pin: approachPin,
            start: "top top",
            end: "bottom bottom",
          });
        }

        const panels = gsap.utils.toArray(".approach-item");

        panels.forEach((panel, i) => {
          if (i === panels.length - 1) return;

          gsap
            .timeline({
              scrollTrigger: {
                trigger: panel,
                start: "top +=112",
                end: "bottom +=112",
                scrub: true,
                pin: true,
                pinSpacing: false,
              },
            })
            .to(panel, { opacity: 0 });
        });
      }
      cardAnimationA();

      function cardAnimationB() {
        const items = gsap.utils.toArray("[stacked-item]");

        items.forEach((container, index) => {
          const isLast = index === items.length - 1;

          gsap.to(container, {
            opacity: 0,
            ease: "none",
            duration: 0.25,
            scrollTrigger: {
              trigger: container,
              start: "top +=64",
              end: "bottom 25%",
              scrub: true,
              anticipatePin: true,
            },
          });

          gsap.to(container, {
            yPercent: isLast ? 0 : -30,
            ease: "none",
            scrollTrigger: {
              trigger: container,
              start: "top +=64",
              end: "bottom top",
              scrub: true,
              pin: !isLast,
            },
          });
        });
      }
      cardAnimationB();

      function footerAnimation() {
        const footerReveal = document.querySelector("[footer-reveal]");

        gsap.set("[footer-wrapper]", { yPercent: -50 });

        const uncover = gsap.timeline({ paused: true });
        const footerElementOne = gsap.utils.toArray("[footer-element='one']");
        const footerElementTwo = gsap.utils.toArray("[footer-element='two']");
        const footerElementThree = gsap.utils.toArray(
          "[footer-element='three']"
        );
        const footerElementFour = gsap.utils.toArray("[footer-element='four']");
        const footerElementFive = gsap.utils.toArray("[footer-element='five']");

        gsap.set(footerElementOne, { autoAlpha: 0, y: 15 });
        gsap.set(footerElementTwo, { autoAlpha: 0, y: 15 });
        gsap.set(footerElementThree, { autoAlpha: 0, y: 15 });
        gsap.set(footerElementFour, { autoAlpha: 0, y: 15 });
        gsap.set(footerElementFive, { autoAlpha: 0, y: 15 });

        uncover.to("[footer-wrapper]", {
          yPercent: 0,
          ease: "none",
        });

        ScrollTrigger.create({
          trigger: footerReveal,
          start: "bottom bottom",
          end: "+=100%",
          animation: uncover,
          scrub: true,
        });

        const footerTL = gsap.timeline({
          scrollTrigger: {
            trigger: ".footer-container",
            start: "top 80%",
            end: "bottom bottom",
            defaults: {
              ease: "power2.inOut",
              duration: 1,
            },
          },
        });

        footerTL
          .to(
            footerElementOne,
            {
              autoAlpha: 1,
              y: 0,
              stagger: 0.05,
            },
            0
          )
          .to(
            footerElementTwo,
            {
              autoAlpha: 1,
              y: 0,
              stagger: 0.05,
            },
            "<0.25"
          )
          .to(
            footerElementThree,
            {
              autoAlpha: 1,
              y: 0,
              stagger: 0.05,
            },
            "<0.25"
          )
          .to(
            footerElementFour,
            {
              autoAlpha: 1,
              y: 0,
            },
            "<0.25"
          )
          .to(
            footerElementFive,
            {
              autoAlpha: 1,
              y: 0,
            },
            "<0.25"
          );
      }
      footerAnimation();
    });
  }
  mobilePAnimations();
}

/////-----Reset footer after filter-----/////
const resizeObserver = new ResizeObserver(() => {
  ScrollTrigger.refresh();
});
resizeObserver.observe(document.body);

function destroyPage() {
  ScrollTrigger.getAll().forEach((st) => st.kill());
}

/////-----Entry point-----/////
if (document.readyState === "complete") {
  init();
} else {
  document.addEventListener("DOMContentLoaded", () => init());
}

/////-----Barba-----/////
barba.hooks.enter((data) => {});
barba.hooks.afterLeave((data) => {
  //destroyPage();
});
barba.hooks.afterEnter((data) => {
  updateUnicorn(data.next.container);
  //updateLottie(data.next.container);
  window.FinsweetAttributes.modules.list.restart();
});
barba.hooks.after((data) => {
  $(window).scrollTop(0);
  init();
  lenis.start();
});

barba.init({
  preventRunning: true,
  transitions: [
    {
      name: "default-transition",

      leave(data) {
        return gsap
          .timeline({ defaults: { ease: "power2.out" } })
          .to("[nav-link]", { y: -30, stagger: 0.075 })
          .to(".content-overlay", { opacity: 1, duration: 1 });
      },

      beforeEnter(data) {
        gsap.set(data.next.container, {
          visibility: "hidden",
        });
      },

      enter(data) {
        gsap.set(data.next.container, { visibility: "visible" });
      },

      afterEnter(data) {
        gsap.set("[nav-link]", { clearProps: "all" });
        gsap.set(data.next.container, {
          clearProps: "opacity,visibility",
        });
        updateLottie();
      },
    },
  ],
});
