'use strict';

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

/* ---------- TITLE BREAKDOWN---------- */

var title = document.querySelector('.title');
title.innerHTML = breakdown(title.textContent);

function breakdown(word) {
  return [].concat(_toConsumableArray(word)).map(function (letter) {
    return '<span>' + letter + '</span>';
  }).join('');
}

/* ---------- NAVIGATION ---------- */

var nav = document.querySelector('#navigation');
var navItems = Array.from(document.querySelectorAll('[data-where]'));

var topOfNav = nav.offsetTop;

/* --- fixed strech --- */

function fixNav() {
  if (window.scrollY >= topOfNav) {
    nav.classList.add('fixed-nav');
  } else {
    nav.classList.remove('fixed-nav');
  }
}

window.addEventListener('scroll', fixNav);

/* --- navigating --- */

function navClicked() {
  var where = 0;
  if (this.dataset.where !== 'top') {
    var div = document.querySelector('#' + this.dataset.where);
    where = div.offsetTop - nav.offsetHeight;
  }
  window.scroll({
    top: where,
    behavior: "smooth"
  });
}

navItems.forEach(function (item) {
  return item.addEventListener('click', navClicked);
});

/* ---------- VARIETIES ---------- */

var slider = document.querySelector('#varieties .slider');
var points = Array.from(document.querySelectorAll('#varieties .nav-points span'));
var translate = 0;

var species = Array.from(document.querySelectorAll('#varieties .species p'));

/* --- slider --- */

function activePoint() {
  var pastPoint = document.querySelector('#varieties .nav-points .active');
  var pastSlide = document.querySelector('#varieties .slider .active');
  pastPoint.classList.remove('active');
  pastSlide.classList.remove('active');
  var matchingSlide = document.querySelector('#' + this.dataset.slide);
  this.classList.add('active');
  matchingSlide.classList.add('active');
  translate += pastSlide.getBoundingClientRect().y - matchingSlide.getBoundingClientRect().y;
  slider.style.transform = 'translate(0px, ' + translate + 'px)';
}

points.forEach(function (point) {
  return point.addEventListener('click', activePoint);
});

/* --- species --- */

function activeSpecie() {
  var previous = document.querySelector('#varieties .species .active-specie');
  var img = this.dataset.image;
  var parent = this.parentElement.id.replace(/-/g, ' ');;
  var image = document.querySelector('#varieties .active .chosen img');
  var titlePlaceholder = document.querySelector('#varieties .active .chosen-title');
  previous.classList.remove('active-specie');
  this.classList.add('active-specie');
  image.src = img;
  titlePlaceholder.innerHTML = '<span>' + this.textContent + '</span> (' + parent + ')';
}

species.forEach(function (specie) {
  return specie.addEventListener('click', activeSpecie);
});

/* ---------- FAQ ---------- */

var cards = Array.from(document.querySelectorAll('#faq .card'));
var questions = Array.from(document.querySelectorAll('#faq .back .question'));

/* --- q&a --- */

function removeActive(question) {
  var _ref = [question.querySelector('.q span'), question.querySelector('.a')],
      span = _ref[0],
      a = _ref[1];

  a.style.height = '0px';
  span.innerHTML = '&#9662;';
  question.classList.remove('active');
}

function toggleActive() {
  var _ref2 = [this.querySelector('.q span'), this.querySelector('.a')],
      span = _ref2[0],
      a = _ref2[1];

  var current = document.querySelector('#faq .question.active');
  if (!this.classList.contains('active')) {
    var height = a.querySelector('p').offsetHeight + 'px';
    a.style.height = height;
    span.innerHTML = '&#9652;';
    this.classList.add('active');
  }
  if (current != null) {
    removeActive(current);
  }
}

questions.forEach(function (question) {
  return question.addEventListener('click', toggleActive);
});

/* --- flipping --- */

function openCard(card) {
  card.classList.add('flipped');
}

function closeCard(card) {
  var activated = card.querySelector('#faq .question.active');
  if (activated) {
    removeActive(activated);
  }
  card.classList.remove('flipped');
}

function toggleCard() {
  var clicked = event.target.closest('.card');
  var flipped = document.querySelector('#faq .flipped');
  if (!clicked && flipped) {
    closeCard(flipped);
  } else if (clicked && clicked !== flipped) {
    if (flipped) {
      closeCard(flipped);
    }
    openCard(clicked);
  }
}

document.addEventListener('click', toggleCard);

/* ---------- GALLERY ---------- */

var gallery = document.querySelector('#gallery');
var galleryWrapper = document.querySelector('#gallery .wrapper');
var moveBtns = document.querySelectorAll('#gallery .move');

var translateValue = gallery.offsetWidth / 2.5;
var lastImg = Array.from(document.querySelectorAll('#gallery .wrapper img')).pop();

/* --- moving --- */

var translated = 0;

function galleryMove() {
  if (this.classList.contains('next')) {
    var galleryEnd = gallery.getBoundingClientRect().width;
    var imageEnd = lastImg.getBoundingClientRect().x + lastImg.getBoundingClientRect().width;
    console.log(galleryEnd, imageEnd);
    console.log(translateValue, translated);
    if (imageEnd - galleryEnd >= translateValue) {
      translated += translateValue;
      galleryWrapper.style.transform = 'translate(-' + translated + 'px, 0px)';
    } else {
      translated += imageEnd - galleryEnd;
      galleryWrapper.style.transform = 'translate(-' + translated + 'px, 0px)';
    }
  } else if (this.classList.contains('previous')) {
    translated -= translateValue;
    if (translated > 0) {
      galleryWrapper.style.transform = 'translate(-' + translated + 'px, 0px)';
    } else {
      translated = 0;
      galleryWrapper.style.transform = 'translate(0px, 0px)';
    }
  }
}

moveBtns.forEach(function (btn) {
  return btn.addEventListener('click', galleryMove);
});

/* ---------- CONTACT ---------- */

var contactBtn = document.querySelector('#contact button');
var popUp = document.querySelector('#contact .popup');
var overlay = document.querySelector('#contact .overlay');
var close = document.querySelector('#contact .popup .close');
var send = document.querySelector('#contact button#send');

/* --- pop up --- */

function openPopUp() {
  popUp.classList.remove('hidden');
  overlay.classList.remove('hidden');
}

function closePopUp() {
  popUp.classList.add('hidden');
  overlay.classList.add('hidden');
}

contactBtn.addEventListener('click', openPopUp);
close.addEventListener('click', closePopUp);

/* --- form --- */

function validateForm() {
  var name = document.querySelector('#contact #name').value;
  var email = document.querySelector('#contact #email').value;
  var msg = document.querySelector('#contact #msg').value;

  var reg = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  var valid = true;

  if (name.length == 0) {
    document.querySelector('#contact #validate-name').innerHTML = "Please enter your name";
    valid = false;
  } else {
    document.querySelector('#contact #validate-name').innerHTML = "";
    valid = true;
  }

  if (msg.length == 0) {
    document.querySelector('#contact #validate-msg').innerHTML = "Please enter your message";
    valid = false;
  } else {
    document.querySelector('#contact #validate-msg').innerHTML = "";
    valid = true;
  }

  if (!reg.test(email.toLowerCase())) {
    document.querySelector('#contact #validate-email').innerHTML = "Please enter valid email";
    valid = false;
  } else {
    document.querySelector('#contact #validate-email').innerHTML = "";
    valid = true;
  }

  if (valid) {
    closePopUp();
    return true;
  }
  return false;
}