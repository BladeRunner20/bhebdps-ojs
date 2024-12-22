const slides = document.querySelectorAll('.slider__item');
const prevButton = document.querySelector('.slider__arrow_prev');
const nextButton = document.querySelector('.slider__arrow_next');
const dots = document.querySelectorAll('.slider__dot');

let currentSlide = 0;

function updateSlides() {
  slides.forEach((slide, index) => {
    slide.classList.toggle('slider__item_active', index === currentSlide);
  });

  dots.forEach((dot, index) => {
    dot.classList.toggle('slider__dot_active', index === currentSlide);
  });
}

// циклическое переключение слайдов
function nextSlide() {
  currentSlide = (currentSlide + 1) % slides.length;
  updateSlides();
}

function prevSlide() {
  currentSlide = (currentSlide - 1 + slides.length) % slides.length; // Переход к предыдущему слайду
  updateSlides();
}

// переход к конкретному слайду по индексу
function slideByIndex(index) {
  currentSlide = index;
  updateSlides();
}

function regHandlers() {
  nextButton.addEventListener('click', nextSlide);
  prevButton.addEventListener('click', prevSlide);

  dots.forEach((dot, index) => {
    dot.addEventListener('click', () => slideByIndex(index));
  });
}

function start() {
  updateSlides();
  regHandlers();
}

window.onload = start;