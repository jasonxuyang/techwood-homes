let main = document.getElementById("main");
let body = document.body;
let parallaxElements = document.querySelectorAll(".parallax");
let wrapperY = 0;
let pointerPosX = 0;
let pointerPosY = 0;
let cursorX = 0;
let cursorY = 0;
let scrollY = 0;

const initPage = () => {
  main.style.position = "fixed";
  body = document.body;

  window.addEventListener("scroll", scroll);
  //   window.addEventListener("mousemove", findPointerPosition);
  window.requestAnimationFrame(render);
};

const scroll = () => {
  scrollY = window.scrollY;
};

const lerp = (a, b, n) => {
  return (1 - n) * a + n * b;
};

// const findPointerPosition = (e) => {
//   try {
//     pointerPosX = e.clientX - cursor.clientWidth / 2;
//     pointerPosY = e.clientY - cursor.clientHeight / 2;
//   } catch (error) {
//     console.log(error);
//   }
// };

// const updatePointerPosition = () => {
//   cursorX = lerp(cursorX, pointerPosX, 0.2);
//   cursorY = lerp(cursorY, pointerPosY, 0.2);
//   cursorX = Math.floor(cursorX * 100) / 100;
//   cursorY = Math.floor(cursorY * 100) / 100;

//   cursor.style.transform = `translate(${cursorX}px, ${cursorY}px)`;
// };

// const scrollTo = (section) => {
//   window.scrollBy(0, section.current.getBoundingClientRect().top);
// };

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

    // updatePointerPosition();
    parallax();

    window.requestAnimationFrame(render);
  } catch (error) {
    console.log(
      "Failed to cleanup before next animation frame render.\n" + error
    );
  }
};

initPage();
