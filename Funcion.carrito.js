
// Esperar a que el HTML esté cargado
document.addEventListener("DOMContentLoaded", () => {

  // Selecciona todos los productos
  const productos = document.querySelectorAll(".producto");

  productos.forEach(producto => {
    const btnMas = producto.querySelector(".mas");
    const btnMenos = producto.querySelector(".menos");
    const cantidad = producto.querySelector(".cantidad");

    let valor = 1;

    btnMas.addEventListener("click", () => {
      valor++;
      cantidad.textContent = valor;
    });

    btnMenos.addEventListener("click", () => {
      if (valor > 1) {
        valor--;
        cantidad.textContent = valor;
      }
    });
  });

});