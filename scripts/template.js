function getCategoryTemplate(categoryIndex) {
  const category = menuList[categoryIndex].category;
  return /*html*/ `
        <div class="category-list">
          <div class="categroy-list-wrapper">
            <div class="content">
            <img src="${category.src}" alt="${category.alt}"/>
            <span>${category.name}</span>
            </div>
          </div>
            <div class="content">
                <div id="menu-item-wrapper${categoryIndex}"></div>
            </div>
        </div>        
        `;
}

function getDishesTemplate(categoryIndex, dishesIndex) {
  const dish = menuList[categoryIndex].dishes[dishesIndex];
  return /*html*/ `
    <div class="menu-item-wrapper">
      <article class="menu-item">
        <img src="${dish.src}" />
        <div class="menu-item-info">
          <h2>${dish.name}</h2>
          <p>${dish.description}</p>
        </div>
        <div class="menu-item-action">
          <span>${dish.price.toFixed(2).replace(".", ",")} €</span>
          <button class="add-basket-btn" onclick="addToBasket(${categoryIndex}, ${dishesIndex})">Add to basket</button>
        </div>
      </article>
    </div>
  `;
}

function getBasketTemplate() {
  return /*html*/ `
  <div class="basket-wrapper">
    <header class="basket-header">
        <button onclick="toggleBasket()" class="basket-btn">✕</button>
        <h2>Your Basket</h2>
    </header>
    <div id="basket-items"></div>
    <div id="basket-summary-id"></div>
  </div>
  `;
}

function getSummaryBasketTemplate(subTotal, deliveryCost, totalPrice) {
  return /*html*/ `
  <div class="basket-wrapper">
    <table class="basket-summary">
      <tr>
        <td class="subtotal-delivery-row">Subtotal</td>
        <td id="subtotal-price">${subTotal.toFixed(2).replace(".", ",")} €</td>
      </tr>
      <tr>
        <td class="subtotal-delivery-row">Delivery fee</td>
        <td id="delivery-fee">${deliveryCost.replace(".", ",")} €</td>
      </tr>
      <tr class="total-price">
        <th>Total</th>
        <td id="total-price"><b>${totalPrice.toFixed(2).replace(".", ",")} €</b></td>
      </tr>
    </table>
    <footer class="basket-footer">
    <button class="buy-now-btn" onclick="openConfirmationDialog()">Buy now (${totalPrice.toFixed(2).replace(".", ",")} €)</button>
    </footer>
  </div>
  
  `;
}

function getEmptyBasketTemplate() {
  return /*html*/ `
    <div class="empty-basket">
      <p>Nothing here yet. Go ahead and choose something delicious!</p>
      <img class="empty-basket-img" src="./assets/icons/shopping-cart-icon.png" alt="white shopping cart">
    </div>
  `;
}

function getBasketItemTemplate(basketIndex) {
  return /*html*/ `
  
    <div class="basket-item">
  <div class="basket-item-info">
    <h3>1 x ${basket[basketIndex].dishName}</h3>
    <button onclick="removeFromBasket(${basketIndex})"><img src="./assets/icons/delete.svg" alt="delete button icon">
    </button>  
  </div>
  <div class="basket-item-wrapper">
    <div id="count" class="basket-item-controls">
      <button onclick="decreaseQuantity(${basketIndex})"><strong>-</strong></button>
      <span id="basket-item-count${basketIndex}">${basket[basketIndex].dishCount}</span>
      <button onclick="increaseQuantity(${basketIndex})"><strong>+</strong></button>
    </div>
      <div class="basket-item-price">
        <p id="basket-item-price${basketIndex}">${basket[basketIndex].dishPrice.toFixed(2).replace(".", ",")} €</p>
      </div>
   </div>
</div>
  `;
}

function getBasketCountTemplate(basketCount) {

  const basketCountValue = basketCount >= 1 ? `
  <div class="basket-count-wrapper">
   <p class="basket-item-count">${basketCount}</p>
   </div>
   ` : "";
  return /*html*/ `
   ${basketCountValue}
   `;
}
