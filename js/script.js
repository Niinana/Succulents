/* ---------- TITLE BREAKDOWN---------- */

const title = document.querySelector('.title');
title.innerHTML = breakdown(title.textContent);

function breakdown(word) {
  return [...word].map(letter => `<span>${letter}</span>`).join('');
}

//console.log([...title.textContent])


/* ---------- NAVIGATION ---------- */

const nav = document.querySelector('#navigation');
const navItems = Array.from(document.querySelectorAll('[data-where]'));

let topOfNav = nav.offsetTop;

/* --- fixed strech --- */

function fixNav() {
  if (window.scrollY >= topOfNav) {
    nav.classList.add('fixed-nav');
  } else{
    nav.classList.remove('fixed-nav');
  }
}

window.addEventListener('scroll', fixNav);

/* --- navigating --- */

function navClicked(){
  const div = document.querySelector(`#${this.dataset.where}`);
  window.scroll({
    top: div.offsetTop-nav.offsetHeight,
    behavior: "smooth"
  });
}

navItems.forEach(item => item.addEventListener('click', navClicked));




/* ---------- VARIETIES ---------- */
const slider = document.querySelector('#varieties .slider');
const points = Array.from(document.querySelectorAll('#varieties .nav-points span'));
let translate = 0;

const species = Array.from(document.querySelectorAll('#varieties .species p'));
const imgPlaceholder = document.querySelector('#varieties .chosen');
const titlePlaceholder = document.querySelector('#varieties .chosen-title');

/* --- slider --- */

function activePoint(){
  const pastPoint=document.querySelector('#varieties .nav-points .active');
  const pastSlide=document.querySelector('#varieties .slider .active');
  pastPoint.classList.remove('active');
  pastSlide.classList.remove('active');
  const matchingSlide = document.querySelector(`#${this.dataset.slide}`);
  this.classList.add('active');
  matchingSlide.classList.add('active');
  translate += pastSlide.getBoundingClientRect().y - matchingSlide.getBoundingClientRect().y;
  slider.style.transform = `translate(0px, ${translate}px)`;
}

points.forEach(point => point.addEventListener('click', activePoint))


/* --- species --- */

function activeSpecie(){
  const img = this.dataset.image;
 imgPlaceholder.style.background = `url('${img}')`;
 titlePlaceholder.innerHTML=this.textContent;
}

species.forEach(specie => specie.addEventListener('click', activeSpecie))



/* ---------- FAQ ---------- */

const cards = Array.from(document.querySelectorAll('#faq .card'));
const questions = Array.from(document.querySelectorAll('#faq .back .question'));

/* --- q&a --- */

function toggleActive(){
  const [span, a] = [this.querySelector('.q span'), this.querySelector('.a')];
  this.classList.toggle('active');
  if(this.classList.contains('active')){
    const height = `${a.querySelector('p').offsetHeight}px`;
    a.style.height= height;
    span.innerHTML='&#9652;';
  }
  else{
    a.style.height='0px';
    span.innerHTML='&#9662;'
  }
}

questions.forEach(question => question.addEventListener('click', toggleActive));


/* --- flipping --- */

function openCard(){
  this.classList.add('flipped');
}

function closeCard(){
  const activated = Array.from(this.querySelectorAll('#faq .question.active'));
  activated.forEach(active => active.click());
 this.classList.remove('flipped');
}

cards.forEach(card => {
  card.addEventListener('click', openCard);
  card.addEventListener('mouseleave', closeCard);
});




/* ---------- GALLERY ---------- */

const gallery = document.querySelector('#gallery');
const galleryWrapper = document.querySelector('#gallery .wrapper');
const moveBtns = document.querySelectorAll('#gallery .move');

const translateValue = gallery.offsetWidth / 2.5;
const lastImg = Array.from(document.querySelectorAll('#gallery .wrapper img')).pop();

/* --- moving --- */

let translated = 0;

function galleryMove(){
  if(this.classList.contains('next')){
    let galleryEnd =  gallery.getBoundingClientRect().width;
    let imageEnd =  lastImg.getBoundingClientRect().x + lastImg.getBoundingClientRect().width;
    if(imageEnd - galleryEnd >= translateValue + translated){
      translated += translateValue;
      galleryWrapper.style.transform = `translate(-${translated}px, 0px)`;
    }
    else{
      translated += imageEnd - galleryEnd;
      galleryWrapper.style.transform = `translate(-${translated}px, 0px)`;
    }
  }
  else if(this.classList.contains('previous')){
    translated -= translateValue;
    if(translated > 0){
      galleryWrapper.style.transform = `translate(-${translated}px, 0px)`;
    }
    else{
      translated=0;
      galleryWrapper.style.transform = `translate(0px, 0px)`;
    }
  }
}

moveBtns.forEach(btn => btn.addEventListener('click', galleryMove));