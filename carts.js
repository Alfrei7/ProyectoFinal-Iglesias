document.addEventListener("DOMContentLoaded", function () {
    const cartItems = document.getElementById("cart-items");
    const cartTotal = document.querySelector("#cart-total span");
    const checkoutButton = document.getElementById("checkout-button");

    // función para cargar y mostrar los productos del carrito desde el almacenamiento local
    function loadCartItems() {
        const savedCartItems = JSON.parse(localStorage.getItem("cartItems")) || [];
        let total = 0;

        cartItems.innerHTML = ""; // limpiar el carrito

        savedCartItems.forEach((product) => {
            const cartItem = document.createElement("li");
            cartItem.textContent = `${product.name} - $${product.price}`;
            cartItems.appendChild(cartItem);

            total += product.price;
        });

        cartTotal.textContent = total.toFixed(2);
    }

    // cargar y mostrar los productos del carrito al cargar la página
    loadCartItems();

    // Función para procesar la compra (usando sweetalert)
    checkoutButton.addEventListener("click", function () {
        simulatePaymentProcessing()
            .then(() => {
                // usar weetalert para mostrar una animación de éxito
                Swal.fire({
                    icon: "success",
                    title: "¡Gracias por tu compra!",
                    text: "Tu pedido ha sido procesado con éxito."
                }).then(() => {
                    localStorage.removeItem("cartItems");
                    loadCartItems(); // actualizar la vista del carrito después de la compra
                });
            })
            .catch((error) => {
                console.error("Error al procesar el pago:", error);
                // Usar sweetalert para mostrar una animación de error
                Swal.fire({
                    icon: "error",
                    title: "Error",
                    text: "Hubo un error al procesar el pago. Inténtalo de nuevo."
                });
            });
    });

    // función para simular un procesamiento de pago (devuelve una promesa)
    function simulatePaymentProcessing() {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                // simulación exitosa de procesamiento de pago después de 2 segundos
                resolve();
            }, 2000);
        });
    }
});
