const API_URL = "https://script.google.com/macros/s/AKfycbxcMGaKgOwwS8QuFKx_pzVB2y0vHtLkOnU5Rq83_HzOedchopiCRadp9vtxrvxQEczxTA/exec";
const WHATSAPP = "59899981314"; 

const grid = document.getElementById("productos");
const filtro = document.getElementById("filtro");

let productos = [];
// Mostrar spinner antes de la carga
grid.innerHTML = `
  <div id="loading" class="loading-container">
    <div class="loader"></div>
    <p>Buscando las mejores fragancias...</p>
  </div>`;

fetch(API_URL)
  .then(res => res.json())
  .then(data => {
    document.getElementById("loading")?.remove(); //remueve el spinner cuando cargue la info
    productos = data;
    renderProductos(data);
    cargarFiltros(data);
  })
  .catch(err => console.error("Error cargando productos:", err));

function renderProductos(lista) {
  grid.innerHTML = "";

  lista.forEach(p => {
    const msg = encodeURIComponent(
      `Hola! Quiero pedir:\n\n${p.marca} ${p.nombre}\nPrecio: $${p.precio}`
    );

    grid.innerHTML += `
      <div class="card" data-aos="fade-up"> 

        <div class="img-box">
          <img src="${p.imagen}" alt="Perfume ${p.marca} ${p.nombre} - Fragancia Original">
        </div>

        <div class="content">
          <h3>${p.marca}</h3>
          <h2>${p.nombre}</h2>
          <p>${p.descripcion}</p>
        </div>

        <div class="actions">
          <div class="price">$${p.precio}</div>
          <a class="btn"
             href="https://wa.me/${WHATSAPP}?text=${msg}"
             target="_blank">
             Pedir por WhatsApp
          </a>
        </div>

      </div>
    `;
  });
}


function cargarFiltros(data) {
  // Obtenemos géneros únicos
  const categorias = [...new Set(data.map(p => p.genero))].filter(Boolean);

  categorias.forEach(cat => {
    const option = document.createElement("option");
    option.value = cat;
    option.textContent = cat;
    filtro.appendChild(option);
  });

  filtro.addEventListener("change", () => {
    const valor = filtro.value;
    const filtrados = valor ? productos.filter(p => p.genero === valor) : productos;
    renderProductos(filtrados);
  });

}
