// Seleccionamos todos los productos de la página
const productos = document.querySelectorAll('.producto');

// Elementos donde mostraremos el carrito y el total
const carritoLista = document.getElementById('carrito');
const totalElemento = document.getElementById('total');

// Objeto para guardar el carrito (los productos que agregamos)
let carrito = {};

// Recorremos cada producto de la página
productos.forEach(prod => {
  // Tomamos los datos de cada producto desde el HTML (atributos data-*)
  const id = prod.dataset.id;
  const nombre = prod.dataset.nombre;
  const precio = parseFloat(prod.dataset.precio);

  // Seleccionamos los botones y el span donde mostramos la cantidad
  const cantidadElemento = prod.querySelector('.cantidad');
  const masBtn = prod.querySelector('.mas');
  const menosBtn = prod.querySelector('.menos');

  // Evento para el botón "+"
  masBtn.addEventListener('click', () => {
    // Si el producto no está en el carrito lo creamos, si está solo sumamos cantidad
    carrito[id] = (carrito[id] || { nombre, precio, cantidad: 0 });
    carrito[id].cantidad++;

    // Mostramos en pantalla la cantidad del producto
    cantidadElemento.textContent = carrito[id].cantidad;

    // Actualizamos la vista del carrito
    actualizarCarrito();
  });

  // Evento para el botón "-"
  menosBtn.addEventListener('click', () => {
    // Solo restamos si ya existe en el carrito y la cantidad es mayor a 0
    if (carrito[id] && carrito[id].cantidad > 0) {
      carrito[id].cantidad--;

      // Mostramos en pantalla la nueva cantidad
      cantidadElemento.textContent = carrito[id].cantidad;

      // Si la cantidad llega a 0, eliminamos el producto del carrito
      if (carrito[id].cantidad === 0) delete carrito[id];

      // Actualizamos la vista del carrito
      actualizarCarrito();
    }
  });
});

// Función que actualiza el contenido del carrito
function actualizarCarrito() {
  // Limpiamos el listado antes de volver a llenarlo
  carritoLista.innerHTML = '';

  let total = 0; // variable para sumar el precio total

  // Recorremos los productos que hay en el carrito
  Object.values(carrito).forEach(item => {
    // Creamos un <li> por cada producto
    let li = document.createElement('li');
    li.textContent = `${item.nombre} x${item.cantidad} = $${item.precio * item.cantidad}`;

    // Lo agregamos al carrito en la pantalla
    carritoLista.appendChild(li);

    // Sumamos al total
    total += item.precio * item.cantidad;
  });

  // Mostramos el total en la pantalla
  totalElemento.textContent = total;
}