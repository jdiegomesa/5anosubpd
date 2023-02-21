// Función para abrir elementos
// Primer parámetro: id del elemento al que le agregará la clase 'opened'
// Segundo parámetro (opcional): clase de los elementos a los que les quitará la clase 'opened'
const UBPDopen = (el, cl) => {
  let element = document.getElementById(el);
  if(cl){
    let sameClass = document.getElementsByClassName(cl);
    for(i = 0; i < sameClass.length; i++){
      if(sameClass[i] != element){
        sameClass[i].classList.remove('opened');
      }
    }
  }
  element.classList.toggle('opened');
  document.activeElement.blur();
}

const abrirMenu = () => {
  UBPDopen('boton'); 
  UBPDopen('fondo'); 
  UBPDopen('botones');
}


let UBPDnav = document.getElementById('UBPDnav');
let UBPDUp = document.getElementById('UBPDUp');


let UBPDinterval = false;
// Funciones para avanzar, retroceder o reproducir sliders
// Parámetro el: id del slider
// Parámetro cl: clase de los slides
// Parámetro val: valida si el slider tiene puntos (dots) o no
// Parámetro num: número del slide sobre el que se realiza la acción
// Parámetro but: id del botón relacionado a la acción
// Parámetro time: tiempo para la ejecución de la acción 

const UBPDnextSlide = (el, cl) => {
  //Calcula número de slides
  let numberOfSlides = document.getElementsByClassName(cl).length;
  let container = document.getElementById(el);
  // Mide cuántos elementos se muestran 
  let maxPosition = Math.round((container.parentElement.offsetWidth / document.getElementsByClassName(cl)[0].offsetWidth)) - 1;
  let position = parseInt(container.getAttribute('data-position'));
  let percentageToMove = position*(100/numberOfSlides);
  if(position >= (numberOfSlides - maxPosition)){
    position = 0;
    percentageToMove = 0;
  }
  container.setAttribute('data-position', (position + 1));
  container.style.transform = 'translateX(-' + percentageToMove + '%)';
  UBPDactiveDot(el, (position + 1));
};

const UBPDprevSlide = (el, cl) => {
  let numberOfSlides = document.getElementsByClassName(cl).length;
  let container = document.getElementById(el);
  let maxPosition = Math.round((container.parentElement.offsetWidth / document.getElementsByClassName(cl)[0].offsetWidth)) - 1;
  let position = parseInt(container.getAttribute('data-position'));
  let percentageToMove = (position - 2) *(100/numberOfSlides);
  if(position <= 1){
    position = (numberOfSlides - maxPosition) + 1;
    percentageToMove = ((numberOfSlides - maxPosition) - 1) *(100/numberOfSlides);
  }
  container.setAttribute('data-position', (position - 1));
  container.style.transform = 'translateX(-' + percentageToMove + '%)';
  UBPDactiveDot(el, (position - 1));
};

const UBPDgotoSlide = (el, cl, num) => {
  let numberOfSlides = document.getElementsByClassName(cl).length;
  let container = document.getElementById(el);
  let position = num;
  let percentageToMove = (position - 1) *(100/numberOfSlides);
  container.setAttribute('data-position', position);
  container.style.transform = 'translateX(-' + percentageToMove + '%)';
  UBPDactiveDot(el, num);
};

//Activa el punto del slider
function UBPDactiveDot(el, num){
  let dots = document.getElementsByClassName(el + '-dot');
  if(dots.length > 0){
    for (i = 0; i < dots.length; i++) {
      dots[i].classList.remove('active');
    }
    dots[num - 1].classList.add('active');
  }
}


  //  segundo slider

  const UBPDnextSub = (el, cl) => {
    //Calcula número de slides
    let numberOfSlides = document.getElementsByClassName(cl).length;
    let container = document.getElementById(el);
    // Mide cuántos elementos se muestran 
    let maxPosition = Math.round((container.parentElement.offsetWidth / document.getElementsByClassName(cl)[0].offsetWidth)) - 1;
    let position = parseInt(container.getAttribute('data-position'));
    let percentageToMove = position*(100/numberOfSlides);
    if(position >= (numberOfSlides - maxPosition)){
      position = 0;
      percentageToMove = 0;
    }
    container.setAttribute('data-position', (position + 1));
    container.style.transform = 'translateX(-' + percentageToMove + '%)';
    if(el == 'UBPDsliderSub'){
      UBPDactiveSub(position + 1);
    }
  };

  const UBPDprevSub = (el, cl) => {
    let numberOfSlides = document.getElementsByClassName(cl).length;
    let container = document.getElementById(el);
    let maxPosition = Math.round((container.parentElement.offsetWidth / document.getElementsByClassName(cl)[0].offsetWidth)) - 1;
    let position = parseInt(container.getAttribute('data-position'));
    let percentageToMove = (position - 2) *(100/numberOfSlides);
    if(position <= 1){
      position = (numberOfSlides - maxPosition) + 1;
      percentageToMove = ((numberOfSlides - maxPosition) - 1) *(100/numberOfSlides);
    }
    container.setAttribute('data-position', (position - 1));
    container.style.transform = 'translateX(-' + percentageToMove + '%)';
    if(el == 'UBPDsliderSub'){
      UBPDactiveSub(position - 1);
    }
  };

  const UBPDgotoSub = (el, cl, num) => {

    let numberOfSlides = document.getElementsByClassName(cl).length;
    let container = document.getElementById(el);
    let position = num;
    let percentageToMove = (position - 1) *(100/numberOfSlides);
    container.setAttribute('data-position', position);
    container.style.transform = 'translateX(-' + percentageToMove + '%)';
    if(el == 'UBPDsliderSub'){
      UBPDactiveSub(num);
    }
  };

//Activa el punto del segundo slider
const UBPDactiveSub = (num) =>{
  let dots = document.getElementsByClassName("UBPDSlider-buttons-dots-element");
  for (i = 0; i < dots.length; i++) {
    dots[i].classList.remove('active');
  }
  dots[num - 1].classList.add('active');
}

function UBPDclearInterval() {
    if(UBPDinterval){
      clearInterval(UBPDinterval);
      UBPDinterval = false;
    }
}

function copyToClipboard (str){
  let el = document.createElement('textarea');
  el.value = str;
  el.setAttribute('readonly', '');
  el.style.position = 'absolute';
  el.style.left = '-9999px';
  document.body.appendChild(el);
  el.select();
  document.execCommand('copy');
  document.body.removeChild(el);
  alert('URL copiada en el portapapeles');
};

let actualURL = window.location.protocol + "//" + window.location.host + "/" + window.location.pathname + window.location.search;

function UBPDactiveElement(el, val){
  if( val){
    document.getElementById(el).classList.add('active');
  } else {
    el.classList.add('active');
  }
}

const UBPDopenimage = (el, id) => {
  let modal = document.getElementById(id);
  let urlImage = el.getElementsByTagName('img')[0].src;
  let textImage = el.getElementsByTagName('p')[0].textContent;
  modal.getElementsByTagName('img')[0].src = urlImage;
  modal.getElementsByTagName('p')[0].innerHTML = textImage;
  UBPDopen(id);
}

function UBPDvalidateTarget(fun, par){
  if(event.target == event.currentTarget){
    fun(par);
  }
}