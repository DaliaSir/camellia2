export function renderProducts(products) {
  const productsContainer = document.querySelector(".products-container__products");

  productsContainer.innerHTML = "";

  const { pathname } = document.location;

  if (pathname === "/edit-products.html") {
    products.data.forEach((product) => {
      const productName = product.attributes.name ? product.attributes.name : "Unknown name";
      const productPrice = product.attributes.price ? product.attributes.price : "Unknown price";
      productsContainer.innerHTML += `<div class="product edit-product" >
                                        <div class="product__img card-img-top" style="background-image: url('${product.attributes.image.data.attributes.url}');"></div>
                                        <div class="card-body">
                                          <h4 class="card-title">${productName}</h4>
                                          <p "card-text">&#36; ${productPrice}</p>
                                          <div class="btn edit-product__btns">
                                            <a href="details.html?id=${product.id}" class="btn edit-product__btns--btn-view" title="View ${productName}">View</a>
                                            <a href="edit.html?id=${product.id}" class="btn edit-product__btns--btn-edit" title="Edit ${productName}">Edit</a>
                                          </div>
                                        </div>
                                      </div>
                                      `;
    });
  } else {
    products.data.forEach((product) => {
      const productName = product.attributes.name ? product.attributes.name : "Unknown name";
      const productPrice = product.attributes.price ? product.attributes.price : "Unknown price";
      productsContainer.innerHTML += `<a class="product" href="details.html?id=${product.id}">
                                        <div class="product__img card-img-top" style="background-image: url('${product.attributes.image.data.attributes.url}');"></div>
                                        <div class="card-body">
                                          <h4 class="card-title">${productName}</h4>
                                          <p class="card-text">&#36; ${productPrice}</p>
                                        </div>
                                      </a>`;
    });
  }
}