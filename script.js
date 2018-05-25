const nav = document.querySelector('#navigation');
const navItems = Array.from(document.querySelectorAll('[data-where]'));
const title = "let the love grow.";

let titleArray = title.split("");
let topOfNav = nav.offsetTop;


/* TITLE TYPING
function typing(titleArray){
    let ch = titleArray.shift();
    if(ch != undefined){
    document.querySelector(".title").innerHTML += ch;
    setTimeout(()=>{typing(titleArray)}, 100);
  }
    return;
}*/

//setTimeout(()=>{typing(titleArray)}, 300);

/* FIXED NAVIGATION STRECH */

function fixNav() {
  if (window.scrollY >= topOfNav) {
    nav.classList.add('fixed-nav');
  } else{
    nav.classList.remove('fixed-nav');
  }
}

window.addEventListener('scroll', fixNav);


/*NAVIGATING*/

function navClicked(){

  const div = document.querySelector(`#${this.dataset.where}`);
  console.log(div.offsetTop);
  //window.scrollTo(0, div.offsetTop-nav.offsetHeight);
  window.scroll({
  top: div.offsetTop-nav.offsetHeight,
  behavior: "smooth"
});
}

navItems.forEach(item => item.addEventListener('click', navClicked));



const letters = Array.from(document.querySelectorAll('.title span'));

let delay = 0;



//console.log(`${delay}s`);
//letters.forEach(letter => {
 //console.log(letter.style.animationDelay);
//letter.style.animationDelay = `${delay}`;
//  delay += 0.2;}
//);
