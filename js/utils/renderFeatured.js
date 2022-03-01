export function renderFeatured(featured) {
  const featuredContainer = document.querySelector(".featured-container__products");

  featuredContainer.innerHTML = "";

  featured.forEach((product) => {
    const productName = product.name ? product.name : "Unknown name";
    const productPrice = product.price ? product.price : "Unknown price";

    if (product.featured === true) {
      featuredContainer.innerHTML += `
        <a class="product" href="details.html?id=${product.id}">
          <div class="col">
            <div class="card">
              <div class="product__img card-img-top" style="background-image: url('${product.image.url}');"></div>
              <div class="card-body">
                  <h4 class="card-title">${productName}</h4>
                  <p "card-text"> &#36; ${productPrice}</p>
              </div>
            </div>
          </div>
        </a>`;
    }


  });
}