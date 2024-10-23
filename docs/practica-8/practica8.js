const d = document;
const $listaCarrito = d.querySelector("#lista-carrito");
const $totalCarrito = d.querySelector("#total-carrito");
const $btnCompra = d.querySelector("#btn-compra");
const $mensajeCompra = d.querySelector("#mensaje-compra");
const $productos = d.querySelector("#productos");


async function cargarProductos() {
  try {
    
    const res = await fetch("https://fakestoreapi.com/products");
    const productos = await res.json();

    
    productos.forEach(producto => {
      const $producto = d.createElement("article");
      $producto.classList.add("producto");
      $producto.setAttribute("data-id", producto.id);
      $producto.setAttribute("data-nombre", producto.title);
      $producto.setAttribute("data-precio", producto.price);

      
      $producto.innerHTML = `
        <img src="${producto.image}" alt="${producto.title}" class="producto-imagen">
        <p>${producto.title} - $${producto.price}</p>
        <button class="btn-add">+</button>
        <button class="btn-remove">-</button>
      `;

      $productos.appendChild($producto);
    });
  } catch (error) {
    console.error("Error al cargar los productos", error);
  }
}


cargarProductos();

d.addEventListener("click", function (e) {
  if (e.target.matches(".btn-add")) {
    const $producto = e.target.closest(".producto");
    let nombre = $producto.getAttribute("data-nombre");
    let precio = parseFloat($producto.getAttribute("data-precio"));

    const $itemCarrito = d.createElement("li");
    $itemCarrito.innerText = `${nombre} - $${precio}`;
    $listaCarrito.appendChild($itemCarrito);

    let totalActual = parseFloat($totalCarrito.innerText);
    $totalCarrito.innerText = (totalActual + precio).toFixed(2);
  }

  if (e.target.matches(".btn-remove")) {
    const $producto = e.target.closest(".producto");
    let nombre = $producto.getAttribute("data-nombre");

    const $items = $listaCarrito.querySelectorAll("li");
    for (let $item of $items) {
      if ($item.innerText.includes(nombre)) {
        let precio = parseFloat($item.innerText.split("- $")[1]);
        $item.remove();

        let totalActual = parseFloat($totalCarrito.innerText);
        $totalCarrito.innerText = (totalActual - precio).toFixed(2);
        break;
      }
    }
  }
});

$btnCompra.addEventListener("click", function () {
  if ($listaCarrito.children.length > 0) {
    $mensajeCompra.classList.remove("hidden");

    $mensajeCompra.innerHTML = '<div class="loader"></div><p>Procesando compra...</p>';

    setTimeout(() => {
      $mensajeCompra.innerHTML = '<h2>¡Compra realizada con éxito!</h2><p>Gracias por su compra.</p>';

      $listaCarrito.innerHTML = "";
      $totalCarrito.innerText = "0";
    }, 5000);
  } else {
    alert("El carrito está vacío, no se puede realizar la compra.");
  }
});
