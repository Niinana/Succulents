/* ---------- TITLE BREAKDOWN---------- */

const title = document.querySelector('.title');
title.innerHTML = breakdown(title.textContent);

function breakdown(word) {
  return [...word].map(letter => `<span>${letter}</span>`).join('');
}


/* ---------- NAVIGATION ---------- */

const nav = document.querySelector('#navigation');
const navItems = Array.from(document.querySelectorAll('[data-where]'));

let topOfNav = nav.offsetTop;

/* --- fixed strech --- */

function fixNav() {
  if (window.scrollY >= topOfNav) {
    nav.classList.add('fixed-nav');
  }
  else {
    nav.classList.remove('fixed-nav');
  }
}

window.addEventListener('scroll', fixNav);

/* --- navigating --- */

function navClicked(){
  let where = 0;
  if(this.dataset.where !== 'top')
  {
    const div = document.querySelector(`#${this.dataset.where}`);
    where = div.offsetTop-nav.offsetHeight;
  }
  window.scroll({
    top: where,
    behavior: "smooth"
  });
}

navItems.forEach(item => item.addEventListener('click', navClicked));




/* ---------- VARIETIES ---------- */

const slider = document.querySelector('#varieties .slider');
const points = Array.from(document.querySelectorAll('#varieties .nav-points span'));
let translate = 0;

const species = Array.from(document.querySelectorAll('#varieties .species p'));


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
  const previous = Array.from(document.querySelectorAll('#varieties .species .active-specie'));
  const img = this.dataset.image;
  const parent = this.parentElement.id.replace(/-/g, ' ');;
  const image = document.querySelector('#varieties .active .chosen img');
  const titlePlaceholder = document.querySelector('#varieties .active .chosen-title');
  previous.forEach(p => p.classList.remove('active-specie'));
  this.classList.add('active-specie');
  image.src = img;
  titlePlaceholder.innerHTML=`<span>${this.textContent}</span> (${parent})`;
}

species.forEach(specie => specie.addEventListener('click', activeSpecie));



/* ---------- FAQ ---------- */

const cards = Array.from(document.querySelectorAll('#faq .card'));
const questions = Array.from(document.querySelectorAll('#faq .back .question'));

/* --- q&a --- */

function removeActive(question){
  const [span, a] = [question.querySelector('.q span'), question.querySelector('.a')];
  a.style.height='0px';
  span.innerHTML='&#9662;'
  question.classList.remove('active');
}

function toggleActive(){
  const [span, a] = [this.querySelector('.q span'), this.querySelector('.a')];
  const current = document.querySelector('#faq .question.active');
  if(!this.classList.contains('active')){
    const height = `${a.querySelector('p').offsetHeight}px`;
    a.style.height= height;
    span.innerHTML='&#9652;';
    this.classList.add('active');
  }
  if(current != null) {
    removeActive(current);
  }
}

questions.forEach(question => question.addEventListener('click', toggleActive));


/* --- flipping --- */

function openCard(card){
  card.classList.add('flipped');
}

function closeCard(card){
  const activated = card.querySelector('#faq .question.active');
  if(activated) { removeActive(activated);}
  card.classList.remove('flipped');
}

function toggleCard(){
  const clicked = event.target.closest('.card');
  const flipped = document.querySelector('#faq .flipped');
  if(!clicked && flipped){
   closeCard(flipped);
  }
  else if(clicked && clicked !== flipped){
    if(flipped) {closeCard(flipped);}
    openCard(clicked);
  }
}

document.addEventListener('click', toggleCard)


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
    console.log(galleryEnd, imageEnd);
    console.log(translateValue, translated);
    if(imageEnd - galleryEnd >= translateValue){
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


/* ---------- CONTACT ---------- */

const contactBtn = document.querySelector('#contact button');
const popUp = document.querySelector('#contact .popup');
const overlay = document.querySelector('#contact .overlay');
const close = document.querySelector('#contact .popup .close');
const send = document.querySelector('#contact button#send');

/* --- pop up --- */

function openPopUp(){
  popUp.classList.remove('hidden');
  overlay.classList.remove('hidden');
}

function closePopUp(){
  popUp.classList.add('hidden');
  overlay.classList.add('hidden');
}

contactBtn.addEventListener('click', openPopUp);
close.addEventListener('click', closePopUp);

/* --- form --- */

function validateForm(){
  const name = document.querySelector('#contact #name').value;
  const email= document.querySelector('#contact #email').value;
  const msg = document.querySelector('#contact #msg').value;

  let reg = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  let valid = true;

  if(name.length==0){
    document.querySelector('#contact #validate-name').innerHTML = "Please enter your name";
    valid = false;
  }
  else{
    document.querySelector('#contact #validate-name').innerHTML = "";
    valid = true;
  }

  if(msg.length==0){
    document.querySelector('#contact #validate-msg').innerHTML = "Please enter your message";
    valid = false;
  }
  else{
    document.querySelector('#contact #validate-msg').innerHTML = "";
    valid = true;
  }

  if(!reg.test(email.toLowerCase())){
    document.querySelector('#contact #validate-email').innerHTML = "Please enter valid email";
    valid = false;
  }
  else{
    document.querySelector('#contact #validate-email').innerHTML = "";
    valid = true;
  }

  if(valid){
    closePopUp();
    return true;
  }
  return false;
}
