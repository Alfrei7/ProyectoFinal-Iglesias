const products = [];

// variables para el carrito de compras
const cart = [];
const cartItemsContainer = document.querySelector('.cart-items');
const openCartButton = document.querySelector('.open-cart');

// función para generar las tarjetas de producto
function createProductCard(product) {
    const card = document.createElement('div');
    card.classList.add('product-card');
    card.innerHTML = `
        <img src="${product.image}" alt="${product.name}">
        <h2>${product.name}</h2>
        <p>Precio: $${product.price.toFixed(2)}</p>
        <button class="buy-button" data-id="${product.id}">Comprar</button>
    `;
    return card;
}

// agregar las tarjetas de producto al contenedor
const productContainer = document.querySelector('.product-container');



// función para cargar productos desde un archivo JSON c AJAx
function loadProductsFromJSON() {
    const xhr = new XMLHttpRequest();
    xhr.open('GET', 'productos.json', true);
    xhr.onload = function () {
        if (xhr.status === 200) {
            const response = JSON.parse(xhr.responseText);
            products.push(...response.products);
            products.forEach(product => {
                const card = createProductCard(product);
                productContainer.appendChild(card);
            });
        }
    };
    xhr.send();
}

// llamar a la función para cargar productos desde el archivo JSON
loadProductsFromJSON();




// evento para agregar productos al carrito
document.addEventListener('click', event => {
    if (event.target.classList.contains('buy-button')) {
        const productId = parseInt(event.target.getAttribute('data-id'));
        const productToAdd = products.find(product => product.id === productId);
        if (productToAdd) {
            cart.push(productToAdd);
            updateCart();
        }
    }
});

// función para actualizar el carrito
function updateCart() {
    cartItemsContainer.innerHTML = '';
    cart.forEach(product => {
        const cartItem = document.createElement('div');
        cartItem.classList.add('cart-item');
        cartItem.innerHTML = `
            <img src="${product.image}" alt="${product.name}">
            <h3>${product.name}</h3>
            <p>Precio: $${product.price.toFixed(2)}</p>
            <button class="remove-from-cart" data-id="${product.id}">Eliminar</button>
        `;
        cartItemsContainer.appendChild(cartItem);
    });
}

// evento para agregar productos al carrito
document.addEventListener('click', event => {
    if (event.target.classList.contains('buy-button')) {
        const productId = parseInt(event.target.getAttribute('data-id'));
        const productToAdd = products.find(product => product.id === productId);
        if (productToAdd) {
            cart.push(productToAdd);
            updateCart();
        }
    }
});

// evento para eliminar productos del carrito
document.addEventListener('click', event => {
    if (event.target.classList.contains('remove-from-cart')) {
        const productId = parseInt(event.target.getAttribute('data-id'));
        const productIndex = cart.findIndex(product => product.id === productId);
        if (productIndex !== -1) {
            cart.splice(productIndex, 1); // eliminar el producto del carrito
            updateCart();
        }
    }
});


// función para calcular el total de la compra
function calculateTotal() {
    let total = 0;
    cart.forEach(product => {
        total += product.price;
    });
    return total.toFixed(2);
}

// función para actualizar el carrito
function updateCart() {
    cartItemsContainer.innerHTML = '';
    cart.forEach(product => {
        const cartItem = document.createElement('div');
        cartItem.classList.add('cart-item');
        cartItem.innerHTML = `
            <img src="${product.image}" alt="${product.name}">
            <h3>${product.name}</h3>
            <p>Precio: $${product.price.toFixed(2)}</p>
            <button class="remove-from-cart" data-id="${product.id}">Eliminar</button>
        `;
        cartItemsContainer.appendChild(cartItem);
    });

    // actualizar el total de la compra
    const total = calculateTotal();
    const totalElement = document.createElement('div');
    totalElement.classList.add('cart-item', 'total');
    totalElement.innerHTML = `<h3>Total: $${total}</h3>`;
    cartItemsContainer.appendChild(totalElement);
}


// evento para abrir y cerrar el carrito
let isCartOpen = false;

openCartButton.addEventListener('click', () => {
    const cartContainer = document.querySelector('.cart');

    if (!isCartOpen) {
        cartContainer.classList.add('cart-open');
    } else {
        cartContainer.classList.remove('cart-open');
    }

    isCartOpen = !isCartOpen; // ambia el estado del carrito después de abrir o cerrar
});

// evento para realizar la compra
const checkoutButton = document.querySelector('.checkout');
const cancelButton = document.querySelector('.cancel');

checkoutButton.addEventListener('click', () => {
    if (cart.length > 0) {
        Swal.fire({
            title: "Confirmar compra",
            text: "¿Estás seguro de que deseas realizar la compra?",
            icon: "info",
            showCancelButton: true,
            confirmButtonText: "Aceptar",
            cancelButtonText: "Cancelar"
        }).then((result) => {
            if (result.isConfirmed) {
                Swal.fire({
                    title: "Ingresa tu información",
                    html:
                        `<input id="swal-input1" class="swal2-input" placeholder="Nombre">` +
                        `<input id="swal-input2" class="swal2-input" placeholder="Apellido">` +
                        `<input id="swal-input3" class "swal2-input" placeholder="Número de Tarjeta">`,
                    confirmButtonText: "Realizar Compra",
                    preConfirm: () => {
                        const nombre = Swal.getPopup().querySelector("#swal-input1").value;
                        const apellido = Swal.getPopup().querySelector("#swal-input2").value;
                        const tarjeta = Swal.getPopup().querySelector("#swal-input3").value;

                        if (!nombre || !apellido || !tarjeta) {
                            Swal.showValidationMessage("Por favor, completa todos los campos.");
                        }

                      

                        return { nombre, apellido, tarjeta };
                    },
                }).then((result) => {
                    if (result.isConfirmed) {
                        Swal.fire(
                            "Compra realizada!",
                            `¡Gracias por tu compra, ${result.value.nombre} ${result.value.apellido}!`,
                            "success"
                        ).then(() => {
                            cart.length = 0; // vaciar el carrito después de la compra
                            updateCart();
                        });
                    }
                });
            }
        });
    } else {
        Swal.fire("Carrito vacío", "Agrega productos al carrito antes de realizar la compra", "warning");
    }
});

// evento para cancelar la compra
cancelButton.addEventListener('click', () => {
    if (cart.length > 0) {
        Swal.fire({
            title: "Cancelar compra",
            text: "¿Estás seguro de que quieres cancelar la compra?",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Aceptar",
            cancelButtonText: "Cancelar"
        }).then((result) => {
            if (result.isConfirmed) {
                Swal.fire("Compra cancelada", "Tu compra ha sido cancelada", "info");
                updateCart(); // actualiza el carrito para mostrar los productos actuales
            }
        });
    } else {
        Swal.fire("Carrito vacío", "No hay productos en el carrito para cancelar", "warning");
    }
});

// almacenar el carrito (localStorage)
function saveCartToLocalStorage() {
    localStorage.setItem('cart', JSON.stringify(cart));
}

// cargar el carrito desde el almacenamiento local al cargar la página
window.addEventListener('load', () => {
    const savedCart = localStorage.getItem('cart');
    if (savedCart) {
        cart.push(...JSON.parse(savedCart));
        updateCart();
    }
});

// guardar el carrito en el almacenamiento local al hacer cambios
window.addEventListener('beforeunload', () => {
    saveCartToLocalStorage();
});

// después de cargar la página, agrega la clase "loaded" a las tarjetas
window.addEventListener('load', () => {
    const productCards = document.querySelectorAll('.product-card');
    productCards.forEach(card => card.classList.add('loaded'));
});


