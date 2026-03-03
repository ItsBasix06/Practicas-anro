const baseDeDatosDirectores = [
  "Alejandro Gómez - alejandro@anro.es",
  "Beatriz Navarro - beatriz@anro.es",
  "Carlos Rodríguez - carlos@anro.es",
  "Carmen López - carmen@anro.es",
  "David Fernández - david@anro.es",
  "Basilio Cordoba - basiliocordobaarcas132@gmail.com"
];

let firmaSubidaBase64 = null; 

const inputResponsable = document.getElementById('responsable');
const listaSugerencias = document.getElementById('lista-directores');

inputResponsable.oninput = function() {
  const textoEscrito = inputResponsable.value.toLowerCase();
  listaSugerencias.innerHTML = '';
  if (textoEscrito === '') return;

  for (let i = 0; i < baseDeDatosDirectores.length; i++) {
    let nombre = baseDeDatosDirectores[i];
    if (nombre.toLowerCase().includes(textoEscrito)) {
      let elemento = document.createElement('div');
      elemento.className = 'sugerencia-item';
      elemento.innerHTML = nombre;
      elemento.onclick = function() {
        inputResponsable.value = nombre;
        listaSugerencias.innerHTML = '';
      };
      listaSugerencias.appendChild(elemento);
    }
  }
};

document.onclick = function(evento) {
  if (evento.target !== inputResponsable) {
    listaSugerencias.innerHTML = '';
  }
};

function cambiarPestana(idMostrar, idOcultar, btn) {
  document.getElementById(idMostrar).style.display = idMostrar.includes('upload') ? 'flex' : 'block';
  document.getElementById(idOcultar).style.display = 'none';
  let botones = btn.parentElement.children;
  for (let i = 0; i < botones.length; i++) {
    botones[i].classList.remove('activo');
  }
  btn.classList.add('activo');
}

const zonaSubida = document.getElementById('upload-1');
const inputFirma = document.getElementById('file-1');
const nombreArchivo = document.getElementById('nombre-archivo');

['dragenter', 'dragover', 'dragleave', 'drop'].forEach(eventName => {
  zonaSubida.addEventListener(eventName, prevenirDefectos, false);
});

function prevenirDefectos(e) {
  e.preventDefault();
  e.stopPropagation();
}

['dragenter', 'dragover'].forEach(eventName => {
  zonaSubida.addEventListener(eventName, () => zonaSubida.classList.add('arrastrando'), false);
});

['dragleave', 'drop'].forEach(eventName => {
  zonaSubida.addEventListener(eventName, () => zonaSubida.classList.remove('arrastrando'), false);
});

zonaSubida.addEventListener('drop', (e) => manejarArchivoFirma(e.dataTransfer.files[0]));
inputFirma.addEventListener('change', (e) => manejarArchivoFirma(e.target.files[0]));

function manejarArchivoFirma(file) {
  if (!file) return;
  
  const validTypes = ['image/jpeg', 'image/png', 'image/jpg'];
  if (!validTypes.includes(file.type)) {
    alert("Formato no válido. Por favor, sube solo imágenes .jpg o .png");
    return;
  }

  nombreArchivo.innerText = file.name;

  const reader = new FileReader();
  reader.onload = function(event) {
    firmaSubidaBase64 = event.target.result;
  }
  reader.readAsDataURL(file);
}

function iniciarLienzo(idCanvas) {
  const canvas = document.getElementById(idCanvas);
  const ctx = canvas.getContext('2d');
  let dibujando = false;

  function redimensionarCanvas() {
    canvas.width = canvas.parentElement.clientWidth;
    canvas.height = canvas.parentElement.clientHeight;
    ctx.lineWidth = 2;
    ctx.lineCap = 'round';
    ctx.strokeStyle = '#243137';
  }
  
  redimensionarCanvas();
  window.addEventListener('resize', redimensionarCanvas);

  canvas.addEventListener('mousedown', (e) => {
    dibujando = true;
    ctx.beginPath();
    ctx.moveTo(e.offsetX, e.offsetY);
  });

  canvas.addEventListener('mousemove', (e) => {
    if (dibujando) {
      ctx.lineTo(e.offsetX, e.offsetY);
      ctx.stroke();
    }
  });

  canvas.addEventListener('mouseup', () => dibujando = false);
  canvas.addEventListener('mouseout', () => dibujando = false);

  canvas.addEventListener('touchstart', (e) => {
    e.preventDefault();
    dibujando = true;
    const touch = e.touches[0];
    const rect = canvas.getBoundingClientRect();
    ctx.beginPath();
    ctx.moveTo(touch.clientX - rect.left, touch.clientY - rect.top);
  });

  canvas.addEventListener('touchmove', (e) => {
    e.preventDefault();
    if (dibujando) {
      const touch = e.touches[0];
      const rect = canvas.getBoundingClientRect();
      ctx.lineTo(touch.clientX - rect.left, touch.clientY - rect.top);
      ctx.stroke();
    }
  });

  canvas.addEventListener('touchend', () => dibujando = false);
}

document.getElementById('formulario-material').addEventListener('submit', function(event) {
  event.preventDefault();

  const btnEnviar = document.getElementById('btn-enviar');
  const mensajeExito = document.getElementById('mensaje-exito');
  const elementoImprimir = document.getElementById('zona-a-imprimir');
  const botonesFirma = document.getElementById('botones-firma-1');
  const inputResponsableVal = document.getElementById('responsable').value;
  
  let correoDestino = "";
  if(inputResponsableVal.includes('-')) {
      correoDestino = inputResponsableVal.split('-')[1].trim();
  } else {
      correoDestino = inputResponsableVal;
  }

  btnEnviar.style.display = 'none'; 

  const inputs = document.querySelectorAll('input');
  inputs.forEach(input => input.setAttribute('value', input.value));

  const textareas = document.querySelectorAll('textarea');
  textareas.forEach(textarea => {
    textarea.innerHTML = textarea.value;
    textarea.style.height = textarea.scrollHeight + 'px';
  });

  const canvas1 = document.getElementById('draw-1');
  const uploadLabel = document.getElementById('upload-1');
  let imgFirmaTemporal = null;
  
  if (canvas1.style.display !== 'none') {
    imgFirmaTemporal = document.createElement('img');
    imgFirmaTemporal.src = canvas1.toDataURL('image/png');
    imgFirmaTemporal.style.width = '100%';
    imgFirmaTemporal.style.height = '100%';
    imgFirmaTemporal.style.objectFit = 'contain';
    canvas1.style.display = 'none';
    canvas1.parentNode.appendChild(imgFirmaTemporal);
  } else if (uploadLabel.style.display !== 'none' && firmaSubidaBase64) {
    imgFirmaTemporal = document.createElement('img');
    imgFirmaTemporal.src = firmaSubidaBase64;
    imgFirmaTemporal.style.width = '100%';
    imgFirmaTemporal.style.height = '100%';
    imgFirmaTemporal.style.objectFit = 'contain';
    uploadLabel.style.display = 'none';
    canvas1.parentNode.appendChild(imgFirmaTemporal);
  } else if (uploadLabel.style.display !== 'none' && !firmaSubidaBase64) {
    uploadLabel.style.display = 'none'; // Si no subió nada, ocultamos la caja
  }

  botonesFirma.style.display = 'none';
  window.scrollTo(0, 0); 
  elementoImprimir.classList.add('modo-impresion');

  const opciones = {
    margin: [10, 10, 0, 10], 
    filename: 'Solicitud_Material_Anro.pdf',
    image: { type: 'jpeg', quality: 0.98 },
    html2canvas: { 
      scale: 2, 
      useCORS: true, 
      scrollY: 0,
      backgroundColor: '#ffffff'
    },
    jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' }
  };

  setTimeout(() => {
    html2pdf().set(opciones).from(elementoImprimir).save().then(() => {
      
      elementoImprimir.classList.remove('modo-impresion');
      
      botonesFirma.style.display = 'flex';
      
      if (imgFirmaTemporal) {
        imgFirmaTemporal.remove();
      }

      const btnActivo = document.querySelector('.btn-tab.activo').innerText;
      if (btnActivo === "Dibujar") {
        canvas1.style.display = 'block';
        uploadLabel.style.display = 'none';
      } else {
        canvas1.style.display = 'none';
        uploadLabel.style.display = 'flex';
      }

      mensajeExito.innerHTML = `✅ <b>¡Éxito!</b> El PDF se ha generado y descargado en tu ordenador correctamente.<br><br>Por favor, adjúntalo en tu correo y envíalo a: <b>${correoDestino}</b>`;
      mensajeExito.style.display = 'block';

      const todosLosCampos = document.querySelectorAll('input, textarea, button');
      todosLosCampos.forEach(campo => campo.disabled = true);
      document.getElementById('caja-firma-1').style.pointerEvents = 'none';
      document.getElementById('caja-firma-1').style.opacity = '0.6';
    });
  }, 200);
});

window.onload = () => {
  iniciarLienzo('draw-1');
};