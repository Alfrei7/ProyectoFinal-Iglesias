const productContainer = document.querySelector('.product-container');


function createProductCard(product) {
    const card = document.createElement('div');
    card.className = 'product-card';

    const img = document.createElement('img');
    img.src = product.image;
    img.alt = product.name;

    const h2 = document.createElement('h2');
    h2.textContent = product.name;

    const p = document.createElement('p');
    p.textContent = `Precio: $${product.price}`;

    const button = document.createElement('button');
    button.className = 'buy-button';
    button.textContent = 'Comprar';
    button.dataset.id = product.id;

    card.appendChild(img);
    card.appendChild(h2);
    card.appendChild(p);
    card.appendChild(button);

    return card;
}


function loadProductsFromJSON() {
    fetch('productos.json')
        .then(response => response.json())
        .then(data => {
            data.products.forEach(product => {
                const card = createProductCard(product);
                productContainer.appendChild(card);
            });
        })
        .catch(error => console.error('Error al cargar productos:', error));
}


loadProductsFromJSON();
