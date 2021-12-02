const page = window.location.pathname;

const slides = document.querySelectorAll(".slide"); /**.children */

const prev = document.querySelector(".prev");

const next = document.querySelector(".next");
const indicator = document.querySelector(".indicator");
const botonSlide = document.querySelectorAll(".btnSlide");

/** SLIDER */
if (slides.length !== 0) {
  let index = 0;
  if (prev !== null) {
    prev.addEventListener("click", function () {
      prevSlide();
      updateCircleIndicator();
      resetTimer();
    });
  }

  if (next !== null) {
    next.addEventListener("click", function () {
      nextSlide();
      updateCircleIndicator();
      resetTimer();
    });
  }

  // Crear circulos indicadores

  function circleIndicator() {
    for (let i = 0; i < slides.length; i++) {
      const div = document.createElement("DIV");

      div.setAttribute("onclick", "indicateSlide(this)");
      div.id = i;
      if (i == 0) {
        div.className = "active";
      }
      indicator.appendChild(div);
    }
  }

  circleIndicator();

  btnSlide();

  function btnSlide() {
    for (let i = 0; i < botonSlide.length; i++) {
      botonSlide[i].addEventListener("mouseenter", function (e) {
        clearInterval(timer);
      });

      botonSlide[i].addEventListener("mouseleave", function (e) {
        resetTimer();
      });
    }
  }

  function indicateSlide(element) {
    index = element.id;
    changeSlide();
    updateCircleIndicator();
    resetTimer();
  }

  function updateCircleIndicator() {
    for (let i = 0; i < indicator.children.length; i++) {
      indicator.children[i].classList.remove("active");
    }
    indicator.children[index].classList.add("active");
  }

  function prevSlide() {
    if (index == 0) {
      index = slides.length - 1;
    } else {
      index--;
    }
    changeSlide();
  }

  function nextSlide() {
    if (index == slides.length - 1) {
      index = 0;
    } else {
      index++;
    }

    changeSlide();
  }

  function changeSlide() {
    for (let i = 0; i < slides.length; i++) {
      slides[i].classList.remove("active");
    }
    slides[index].classList.add("active");
  }

  function resetTimer() {
    clearInterval(timer);
    timer = setInterval(autoPlay, 4000);
  }

  function resetTimer2() {
    clearInterval(timer);
    timer = clearInterval(autoPlay);
  }

  function autoPlay() {
    nextSlide();
    updateCircleIndicator();
  }

  let timer = setInterval(autoPlay, 4000);
}
/** TEXO CAMBIANTE */

let indexN = 0;
const text = document.querySelectorAll(".textoCambiante p");

if (text.length !== 0) {
  function changeText() {
    for (let i = 0; i < text.length; i++) {
      text[i].classList.remove("activeText");
    }
    text[indexN].classList.add("activeText");
  }

  function nextText() {
    if (indexN == text.length - 1) {
      indexN = 0;
    } else {
      indexN++;
    }

    changeText();
  }

  function autoPlay() {
    nextText();
  }

  setInterval(autoPlay, 2000);
}

/** BARRA NAVEGACION */
const nav = document.querySelector(".barra");

window.addEventListener("scroll", function () {
  nav.classList.toggle("active", window.scrollY > 0);
});

/**  Menu hamburguesa */

const navH = document.querySelector(".hamburguer .button");
const menu = document.querySelector(".navegacion");
const body = document.body;
const indicators = document.querySelector(".indicator");

navH.addEventListener("click", (e) => {
  const navH2 = document.querySelector(".hamburguer .open");
  // navH.classList.toggle('open');
  if (navH2 == null) {
    navH.classList.add("open");

    if (indicators !== null) {
      indicators.classList.add("display-none");
    }
  } else {
    navH.classList.remove("open");
    if (indicators !== null) {
      indicators.classList.remove("display-none");
    }
  }

  // menu.classList.toggle('menu');
  const menu2 = document.querySelector(".menu");

  if (menu2 == null) {
    menu.classList.add("menu");
  } else {
    menu.classList.remove("menu");
  }
  // body.classList.toggle('scroll');
  const body2 = document.querySelector(".scroll");

  if (body2 == null) {
    body.classList.add("scroll");
  } else {
    body.classList.remove("scroll");
  }
});

navH.addEventListener("ontouchstart", (e) => {
  const navH2 = document.querySelector(".hamburguer .open");
  // navH.classList.toggle('open')onTouchEnd;
  if (navH2 == null) {
    navH.classList.add("open");
  } else {
    navH.classList.remove("open");
  }

  // menu.classList.toggle('menu');
  const menu2 = document.querySelector(".menu");

  if (menu2 == null) {
    menu.classList.add("menu");
  } else {
    menu.classList.remove("menu");
  }
  // body.classList.toggle('scroll');
  const body2 = document.querySelector(".scroll");

  if (body2 == null) {
    body.classList.add("scroll");
  } else {
    body.classList.remove("scroll");
  }
});

addEventListener("resize", function () {
  let ancho = screen.width;

  if (ancho > 768) {
    menu.classList.remove("menu");
    navH.classList.remove("open");
    body.classList.remove("scroll");
    indicators.classList.remove("display-none");
  }
});

/** ANIMACION FOOTER */

const sumas1 = document.querySelector(".sumas1");

function sumaClick(sumas) {
  sumas.addEventListener("click", (e) => {
    sumas.classList.toggle("equis");

    sumas.parentElement.parentElement.classList.toggle("showLi");
  });
}

function removeSuma(sumas) {
  addEventListener("resize", function () {
    let ancho = screen.width;

    if (ancho > 768) {
      sumas.classList.remove("equis");

      sumas.parentElement.parentElement.classList.remove("showLi");
    }
  });
}

sumaClick(sumas1);

removeSuma(sumas1);

/** SLIDER PANEL */

const slideP = document.querySelector(".paneles1"),
  slidePanel = Array.from(document.querySelectorAll(".slidePanel"));

let isDragging = false,
  startPos = 0,
  currentTranslate = 0,
  prevTranslate = 0,
  animationID = 0,
  currentIndex = 0;

/**flechas panel */
let moveD = 0;
let moveI = 2;

slidePanel.forEach((slideP, indexP) => {
  const slideImage = slideP.querySelector("img");

  slideImage.addEventListener("dragstart", (e) => e.preventDefault());

  // Touch events
  slideP.addEventListener("touchstart", touchStart(indexP));
  slideP.addEventListener("touchend", touchEnd);
  slideP.addEventListener("touchmove", touchMove);

  // // Mouse Events
  slideP.addEventListener("mousedown", touchStart(indexP));
  slideP.addEventListener("mouseup", touchEnd);
  // slideP.addEventListener('mouseleave',touchEnd);
  slideP.addEventListener("mousemove", touchMove);
});

// QUITAR EL CLICK DERECHO

// window.oncontextmenu = function(event) {
//     event.preventDefault();
//     event.stopPropagation();
//     return false;
// }

function touchStart(indexP) {
  return function (event) {
    currentIndex = indexP;
    startPos = getPositionX(event);
    isDragging = true;

    animationID = requestAnimationFrame(animation);
  };
}

function touchEnd() {
  isDragging = false;
  cancelAnimationFrame(animationID);

  const movedBy = currentTranslate - prevTranslate;

  if (movedBy < -100 && currentIndex < slidePanel.length - 1) {
    currentIndex += 1;
  }

  if (movedBy > 100 && currentIndex > 0) {
    currentIndex -= 1;
  }

  setPositionByIndex();

  if (currentTranslate == 0) {
    moveD = 0;
    moveI = 2;
    izquierda.classList.add("desaparecer");
  }

  if (currentTranslate == -window.innerWidth) {
    moveD = 1;
    moveI = 1;
    izquierda.classList.remove("desaparecer");
    derecha.classList.remove("desaparecer");
  }
  if (currentTranslate == -window.innerWidth * 2) {
    moveD = 2;
    moveI = 0;
    izquierda.classList.remove("desaparecer");
    derecha.classList.add("desaparecer");
  }
}

function touchMove(event) {
  if (isDragging) {
    const currentPosition = getPositionX(event);
    currentTranslate = prevTranslate + currentPosition - startPos;
  }
}

function getPositionX(event) {
  return event.type.includes("mouse") ? event.pageX : event.touches[0].clientX;
}

function animation() {
  if (currentTranslate == -window.innerWidth) {
    slideP.style.transform = `translateX(-33%)`;
  }
  if (currentTranslate == -window.innerWidth * 2) {
    slideP.style.transform = `translateX(-66%)`;
  }
  // setSliderPosition();

  if (isDragging) {
    requestAnimationFrame(animation);
  }
}

function setSliderPosition() {
  slideP.style.transform = `translateX(${currentTranslate}px)`;
}

function setPositionByIndex() {
  currentTranslate = currentIndex * -window.innerWidth;
  prevTranslate = currentTranslate;
  setSliderPosition();
}

const derecha = document.querySelector(".derecha");
const izquierda = document.querySelector(".izquierda");

/** FLECHAS MOVER */
const anchoW = window.innerWidth;
function flechas() {
  if (derecha !== null && izquierda !== null) {
    derecha.addEventListener("click", (e) => {
      moveD++;
      moveI--;

      if (moveD == 1) {
        slideP.style.transform = `translateX(-33%)`;
        izquierda.classList.remove("desaparecer");
      }
      if (moveD == 2) {
        slideP.style.transform = `translateX(-66%)`;
        izquierda.classList.remove("desaparecer");
        derecha.classList.add("desaparecer");
      }
    });

    izquierda.addEventListener("click", (e) => {
      moveD--;
      moveI++;

      if (moveI == 2) {
        slideP.style.transform = `translateX(0px)`;
        izquierda.classList.add("desaparecer");
      }
      if (moveI == 1) {
        slideP.style.transform = `translateX(-33%)`;
        izquierda.classList.remove("desaparecer");
        derecha.classList.remove("desaparecer");
      }
    });
  }
}

flechas();
