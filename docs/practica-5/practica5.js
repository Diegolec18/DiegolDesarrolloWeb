
let productos = [
    { nombre: 'Laptop', precio: 800, stock: 5 },
    { nombre: 'Teléfono', precio: 500, stock: 10 },
    { nombre: 'Audífonos', precio: 100, stock: 20 },
    { nombre: 'Monitor', precio: 200, stock: 7 },
];

let carrito = [];


function agregarProductoAlCarrito(nombreProducto, cantidad) {
    let producto = productos.find(p => p.nombre === nombreProducto);
    
    if (producto) {
        if (producto.stock >= cantidad) {
            carrito.push({ nombre: producto.nombre, precio: producto.precio, cantidad: cantidad });
            producto.stock -= cantidad;
            console.log(`Agregaste ${cantidad} ${nombreProducto}(s) al carrito.`);
        } else {
            console.log(`No hay suficiente stock de ${nombreProducto}.`);
        }
    } else {
        console.log(`El producto ${nombreProducto} no existe en la tienda.`);
    }
}


function calcularTotalCarrito() {
    return carrito.reduce((total, item) => total + (item.precio * item.cantidad), 0);
}


function aplicarDescuento(total) {
    if (total > 100) {
        total *= 0.9; 
        console.log('Se aplicó un descuento del 10% por superar los $100.');
    }
    return total;
}


function simularCompra() {
    
    agregarProductoAlCarrito('Laptop', 1);
    agregarProductoAlCarrito('Audífonos', 2);

    let total = calcularTotalCarrito();
    total = aplicarDescuento(total);
    
    console.log('Procesando compra...');
    
    setTimeout(() => {
        console.log(`Compra completada. Total a pagar: $${total.toFixed(2)}`);
    }, 3000); 
}


function eliminarProductoDelCarrito(nombreProducto) {
    
    let productoEnCarrito = carrito.find(item => item.nombre === nombreProducto);
    
    if (productoEnCarrito) {
        
        let productoEnTienda = productos.find(p => p.nombre === nombreProducto);
        productoEnTienda.stock += productoEnCarrito.cantidad;

        
        carrito = carrito.filter(item => item.nombre !== nombreProducto);
        console.log(`Eliminaste ${nombreProducto} del carrito y se devolvieron ${productoEnCarrito.cantidad} unidad(es) al stock.`);
    } else {
        console.log(`El producto ${nombreProducto} no está en el carrito.`);
    }
}


function eliminarProductoDesdeUI() {
    let nombreProducto = document.getElementById('productoEliminar').value;
    
    if (nombreProducto) {
        eliminarProductoDelCarrito(nombreProducto);
    } else {
        console.log('Por favor, ingresa el nombre del producto que deseas eliminar.');
    }
}


function contarRegresivoCompra() {
    let tiempo = 3;
    let intervalo = setInterval(() => {
        if (tiempo > 0) {
            console.log(`Compra confirmada en ${tiempo}...`);
            tiempo--;
        } else {
            clearInterval(intervalo);
            console.log('¡Compra confirmada!');
        }
    }, 1000);
}
