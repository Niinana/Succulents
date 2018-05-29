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



/* ---------- GALLERY ---------- */

const gallery = document.querySelector('#gallery');
const galleryWrapper = document.querySelector('#gallery .wrapper');
const moveBtns = document.querySelectorAll('#gallery .move');

const translateValue = gallery.offsetWidth / 2.2;
const lastImg = Array.from(document.querySelectorAll('#gallery .wrapper img')).pop();

/* --- moving --- */

let translated = 0;

function galleryMove(){
  if(this.classList.contains('next')){
    let galleryEnd = gallery.getBoundingClientRect().x + gallery.getBoundingClientRect().width;
    let imageEnd =  lastImg.getBoundingClientRect().x + lastImg.getBoundingClientRect().width;
    if(galleryEnd >= translateValue + translated){
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
      console.log(`translate(-${translated}px, 0px)`);
    }
    else{
      translated=0;
      galleryWrapper.style.transform = `translate(0px, 0px)`;
    }
  }
}

moveBtns.forEach(btn => btn.addEventListener('click', galleryMove));

/* --- end of gallery moving --- */
