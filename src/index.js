let main = document.getElementById("main");
let sectionHero = document.getElementById("section_hero");
let section1 = document.getElementById("section_1");
let section2 = document.getElementById("section_2");
let section3 = document.getElementById("section_3");
let section4 = document.getElementById("section_4");
let images = document.querySelectorAll("img");
let imageCaption = document.getElementById("img_caption");
let body = document.body;
let parallaxElements = document.querySelectorAll(".parallax");
let fadeElements = document.querySelectorAll(".fade");
let wrapperY = 0;
let cursorX = 0;
let cursorY = 0;
let scrollY = 0;

const initPage = () => {
  main.style.position = "fixed";
  body = document.body;

  window.addEventListener("scroll", scroll);
  window.addEventListener("mousemove", findPointerPosition);
  images.forEach((image) => {
    image.addEventListener("mouseover", handleMouseEnter);
    image.addEventListener("mouseleave", handleMouseLeave);
  });
  fdr.addEventListener("mouseover", handleMouseEnter);
  fdr.addEventListener("mouseleave", handleMouseLeave);
  window.requestAnimationFrame(render);
};

const scroll = () => {
  scrollY = window.scrollY;
  fadeElements.forEach((element) => {
    if (checkInView(element)) {
      fadeIn(element);
    }
  });
};

const scrollTo = (section) => {
  window.scrollBy(0, section.getBoundingClientRect().top);
};

const scrollToTop = () => scrollTo(sectionHero);
const scrollToSection1 = () => {
  window.scrollBy(0, section2.getBoundingClientRect().top - 128);
};
const scrollToSection2 = () => {
  window.scrollBy(0, section3.getBoundingClientRect().top - 128);
};
const scrollToSection3 = () => {
  window.scrollBy(0, section4.getBoundingClientRect().top - 128);
};

const handleMouseEnter = (e) => {
  imageCaption.textContent = e.target.alt;
  imageCaption.style.opacity = "1";
};

const handleMouseLeave = (e) => {
  imageCaption.style.opacity = "0";
};

const checkInView = (element) => {
  let bounding = element.getBoundingClientRect();

  return bounding.top >= 0;
};

const fadeIn = (element) => {
  element.style.opacity = 1;
};

const lerp = (a, b, n) => {
  return (1 - n) * a + n * b;
};

const findPointerPosition = (e) => {
  try {
    imageCaption.style.top = e.clientY - imageCaption.clientHeight / 2 + "px";
    imageCaption.style.left = e.clientX - imageCaption.clientWidth / 2 + "px";
  } catch (error) {
    console.log(error);
  }
};

const parallax = () => {
  parallaxElements.forEach((element) => {
    element.style.transform = `translate(0px, ${
      element.getBoundingClientRect().y * element.dataset.parallax -
      element.getBoundingClientRect().y
    }px)`;
  });
};

const render = () => {
  try {
    scroll();
    body.style.height = main.clientHeight + "px";
    wrapperY = lerp(wrapperY, scrollY, 0.1);
    wrapperY = Math.floor(wrapperY * 100) / 100;
    main.style.transform = `translate(0px, -${wrapperY}px)`;

    parallax();

    window.requestAnimationFrame(render);
  } catch (error) {
    console.log(
      "Failed to cleanup before next animation frame render.\n" + error
    );
  }
};

initPage();
