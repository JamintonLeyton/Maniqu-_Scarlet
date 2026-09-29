function alternarMenu() {
  var menu = document.getElementById("menuScarlet");
  var tarjetaRubi = document.getElementById("tarjetaRubi");
  var logoRubi = document.getElementById("logoRubi");
  var contenedorArriba = document.getElementById("contenedorArriba");
  var contenedorCentro = document.getElementById("contenedorCentro");
  var flecha = document.getElementById("flechaMenu");

  if (menu.style.display === "grid") {
    menu.style.display = "none";
    flecha.innerText = "▼";
    logoRubi.classList.remove("pequeño");
    contenedorCentro.appendChild(tarjetaRubi);
  } else {
    menu.style.display = "grid";
    flecha.innerText = "▲";
    logoRubi.classList.add("pequeño");
    contenedorArriba.appendChild(tarjetaRubi);
  }
}

async function cargarConfiguracion() {
  try {
    const r = await fetch('/estado');
    const d = await r.json();
    document.getElementById('motorActivo').checked = d.motorActivo;
    document.getElementById('velDer').value = d.velDer;
    document.getElementById('velIzq').value = d.velIzq;
    document.getElementById('velRet').value = d.velRet;
    document.getElementById('t1').value = d.t1;
    document.getElementById('p1').value = d.p1;
    document.getElementById('t2').value = d.t2;
    document.getElementById('p2').value = d.p2;
    document.getElementById('audioAuto').checked = d.audioAuto;
    document.getElementById('audInt').value = Math.round(d.audInt / 1000);
    document.getElementById('audDur').value = Math.round(d.audDur / 1000);

    document.getElementById('volAudio').value = d.volWeb;
    document.getElementById('valVolumen').innerText = d.volWeb;
  } catch (e) {
    console.log("ESP32 desconectada (Modo simulación offline)");
  }
}

function guardarMotor() {
  const params = new URLSearchParams({
    motorActivo: document.getElementById('motorActivo').checked ? 1 : 0,
    velDer: document.getElementById('velDer').value,
    velIzq: document.getElementById('velIzq').value,
    velRet: document.getElementById('velRet').value,
    t1: document.getElementById('t1').value,
    p1: document.getElementById('p1').value,
    t2: document.getElementById('t2').value,
    p2: document.getElementById('p2').value
  });
  fetch('/motor?' + params.toString()).then(() => alert('Movimiento Guardado en ESP32'));
}

function guardarAudio() {
  const params = new URLSearchParams({
    audioAuto: document.getElementById('audioAuto').checked ? 1 : 0,
    audInt: document.getElementById('audInt').value * 1000,
    audDur: document.getElementById('audDur').value * 1000,
    volAudio: document.getElementById('volAudio').value
  });
  fetch('/audio?' + params.toString()).then(() => alert('Configuración de Audio Guardada'));
}

// Cargar estado inicial al conectar
cargarConfiguracion();