const nav = document.querySelector('#navigation');

const title = "let the love grow.";
let titleArray = title.split("");
let topOfNav = nav.offsetTop;



function typing(titleArray){
    let ch = titleArray.shift();  
    if(ch != undefined){
    document.querySelector("#title").innerHTML += ch;
    setTimeout(()=>{typing(titleArray)}, 100);
  }
  else {
    nav.classList.remove("hidden");
    return;
  }
}

/*function scaleIcon(){
  document.querySelector(".wrapper").style.width = "10%";
}*/

function fixNav() {
  if (window.scrollY >= topOfNav) {
    document.body.style.paddingTop = nav.offsetHeight + 'px';
    nav.classList.add('fixed-nav');
} else {
    nav.classList.remove('fixed-nav');
    document.body.style.paddingTop = 0;
  }
}


  setTimeout(()=>{typing(titleArray)}, 300);
  //setTimeout(scaleIcon, 3000);

  window.addEventListener('scroll', fixNav);
