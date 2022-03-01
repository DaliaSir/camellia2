export function renderProducts(products) {
  const productsContainer = document.querySelector(".products-container__products");

  productsContainer.innerHTML = "";

  products.forEach((product) => {

    const productName = product.name ? product.name : "Unknown name";
    const productPrice = product.price ? product.price : "Unknown price";

    productsContainer.innerHTML += `<a class="product" href="details.html?id=${product.id}">
            <div class="product__img card-img-top" style="background-image: url('${product.image.url}');"></div>
                                    <div class="card-body">
                                        <h4 class="card-title">${productName}</h4>
                                        <p "card-text">&#36; ${productPrice}</p>
                                        </div>
                                    </a>`;
  });
}