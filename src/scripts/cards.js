const container = document.querySelector(".container1");
const containerCard = container.querySelector(".container-cards");
const cards1 = container.querySelector(".cards1");
const cardsItems = cards1.querySelectorAll(".cards-item");

let isMouseDown = false;
let currentMousePos = 0;
let lastMousePos = 0;
let lastMoveTo = 0;
let moveTo = 0;

// Preload images
const preloadImages = () => {
  cardsItems.forEach(item => {
    const img = item.querySelector('img');
    const src = img.getAttribute('src');
    const image = new Image();
    image.src = src;
  });
};

const createCarousel = () => {
  const carouselProps = onResize();
  const length = cardsItems.length;
  const degrees = 360 / length;
  const gap = 20;
  const tz = distanceZ(carouselProps.w, length, gap);
  const height = calculateHeight(tz);

  container.style.width = tz * 2 + gap * length + "px";
  container.style.height = height + "px";

  cardsItems.forEach((item, i) => {
    const degreesByItem = degrees * i + "deg";
    item.style.setProperty("--rotatey", degreesByItem);
    item.style.setProperty("--tz", tz + "px");
  });
};

const lerp = (a, b, n) => n * (a - b) + b;

const distanceZ = (widthElement, length, gap) => widthElement / 2 / Math.tan(Math.PI / length) + gap;

const calculateHeight = (z) => {
  const t = Math.atan((90 * Math.PI) / 180 / 2);
  return t * 2 * z;
};

const getPosX = (x) => {
  currentMousePos = x;
  moveTo = currentMousePos < lastMousePos ? moveTo - 3 : moveTo + 3;
  lastMousePos = currentMousePos;
};

const update = () => {
  lastMoveTo = lerp(moveTo, lastMoveTo, 0.05);
  cards1.style.setProperty("--rotatey", lastMoveTo + "deg");
  requestAnimationFrame(update);
};

const onResize = () => {
  const carouselDimensions = containerCard.getBoundingClientRect();
  return {
    w: carouselDimensions.width,
    h: carouselDimensions.height,
  };
};

const autoRotate = () => {
  moveTo += 360 / cardsItems.length; // Rotate by the angle of one image
};

const initEvents = () => {
  cards1.addEventListener("mousedown", () => {
    isMouseDown = true;
    cards1.style.cursor = "grabbing";
  });
  cards1.addEventListener("mouseup", () => {
    isMouseDown = false;
    cards1.style.cursor = "grab";
  });
  cards1.addEventListener("mouseleave", () => {
    isMouseDown = false;
  });
  cards1.addEventListener("mousemove", (e) => isMouseDown && getPosX(e.clientX));
  cards1.addEventListener("touchstart", () => {
    isMouseDown = true;
    cards1.style.cursor = "grabbing";
  });
  cards1.addEventListener("touchend", () => {
    isMouseDown = false;
    cards1.style.cursor = "grab";
  });
  cards1.addEventListener("touchmove", (e) => isMouseDown && getPosX(e.touches[0].clientX));

  window.addEventListener("resize", createCarousel);

  setInterval(autoRotate, 3000); 
  update();
  createCarousel();
  preloadImages(); // Call preloadImages function
};

initEvents();
