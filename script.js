// JavaScript Document
function palindrome() {
  const text = document.getElementById("text").value
  const smallText = text.toLowerCase().replace(/[\W_]/g, "")
  const reverseText = smallText.split("").reverse().join("")

  let answer = ""
  if (reverseText === smallText) answer = " Es un palíndromo"
  else answer = " No es un palíndromo"
  
  document.getElementById("answer").innerHTML = text ? answer : ""
}
function Mayor() {
  var numero1 = document.getElementById('num1').value
  var numero2 = document.getElementById('num2').value

  if (numero1 < numero2) {

    alert("El numero: " +numero2+ "Es mayor que: " +numero1)
} else{
    alert("El numero: " +numero1+ "Es mayor que: "+numero2)
}
}

function frase () {
  var frase = document.getElementById('frase').value;
  var nText = frase.length;
  var i;
  for (i = 0; i < nText; i++) {
  if (frase.substr(i,1) === "a" || frase.substr(i,1) === "e" || frase.substr(i,1) === "i" || frase.substr(i,1) === "o" || frase.substr(i,1) === "u") {
  document.write(frase.substr(i,1));
}
}
}
function contarVocales() {
  var cadena = document.getElementById('cadena').value;
  var nText = cadena.length;
  var numchar = cadena.length;   
  cadena = cadena.toUpperCase(); 
  var car;
  var contador = 0;
  var i;
  for (i = 0; i < numchar; i++) {
      car = cadena.charAt(i);   
      if ((car == "A") || (car == "E") || (car == "I") || (car == "O") || (car == "U")) {
          contador++;
      }
  }
  document.write("Número de Vocales Son: " + contador + ".");
}
//Comienza Ajax
String.prototype.transformaCaracteresEspeciales = function() {
  return unescape(escape(this).
                    replace(/%0A/g, '<br/>').
                    replace(/%3C/g, '&lt;').
                    replace(/%3E/g, '&gt;'));
}

var estadosPosibles = ['No inicializado', 'Cargando', 'Cargado', 'Interactivo', 'Completado'];
var tiempoInicial = 0;

window.onload = function() {
  var recurso = document.getElementById('recurso');
  recurso.value = location.href;

  document.getElementById('enviar').onclick = cargaContenido;
}

function cargaContenido() {
  document.getElementById('contenidos').innerHTML = "";
  document.getElementById('estados').innerHTML = "";

  if(window.XMLHttpRequest) {
    peticion = new XMLHttpRequest();
  }
  else {
    peticion = new ActiveXObject("Microsoft.XMLHTTP");
  }

  peticion.onreadystatechange = muestraContenido;

  tiempoInicial = new Date();
  var recurso = document.getElementById('recurso').value;
  peticion.open('GET', recurso+'?nocache='+Math.random(), true);
  peticion.send(null);
}

function muestraContenido() {
  var tiempoFinal = new Date();
  var milisegundos = tiempoFinal - tiempoInicial;

  var estados = document.getElementById('estados');
  estados.innerHTML += "[" + milisegundos + " mseg.] " + estadosPosibles[peticion.readyState] + "<br/>";

  if(peticion.readyState == 4) {
    if(peticion.status == 200) {
      var contenidos = document.getElementById('contenidos');
      contenidos.innerHTML = peticion.responseText.transformaCaracteresEspeciales();
    }
    muestraCabeceras();
    muestraCodigoEstado();
  }
}

function muestraCabeceras() {
  var cabeceras = document.getElementById('cabeceras');
  cabeceras.innerHTML = peticion.getAllResponseHeaders().transformaCaracteresEspeciales();
}

function muestraCodigoEstado() {
  var codigo = document.getElementById('codigo');
  codigo.innerHTML = peticion.status + "<br/>" + peticion.statusText;        
}