const confirmationDialogRef = document.getElementById("confirmationDialog");

function render() {
  renderCategory();
  renderBasket();
  basketCount();
}

function renderCategory() {
  let categoryRef = document.getElementById("menu-list");
  categoryRef.innerHTML = "";

  for (
    let categoryIndex = 0;
    categoryIndex < menuList.length;
    categoryIndex++
  ) {
    categoryRef.innerHTML += getCategoryTemplate(categoryIndex);

    renderDishes(categoryIndex);
  }
}

function renderDishes(categoryIndex) {
  let dishesRef = document.getElementById(`menu-item-wrapper${categoryIndex}`);
  dishesRef.innerHTML = "";

  for (
    let dishesIndex = 0;
    dishesIndex < menuList[categoryIndex].dishes.length;
    dishesIndex++
  ) {
    dishesRef.innerHTML += getDishesTemplate(categoryIndex, dishesIndex);
  }
}

function renderBasket() {
  let basketRef = document.getElementById(`myBasket`);
  basketRef.innerHTML = "";
  basketRef.innerHTML += getBasketTemplate();

  renderBasketItems();
  renderBasketSummary();
}

function toggleBasket() {
  let openBasketRef = document.getElementById("myBasket");
  openBasketRef.classList.toggle("d-none");

  basketCount()
}

function addToBasket(categoryIndex, dishesIndex) {
  let dishItem = menuList[categoryIndex].dishes[dishesIndex];
  for (let basketIndex = 0; basketIndex < basket.length; basketIndex++) {
    if (
      basket[basketIndex].dishCategoryIndex === categoryIndex &&
      basket[basketIndex].dishesIndex === dishesIndex
    ) {
      basket[basketIndex].dishCount++;
      basketCount();
      increasePrice(basketIndex);
      renderBasketItems();
      renderBasketSummary();
      return;
    }
  }

  basket.push({
    dishName: dishItem.name,
    dishPrice: dishItem.price,
    dishCount: 1,
    dishCategoryIndex: categoryIndex,
    dishesIndex: dishesIndex,
  });

  basketCount();
  renderBasketItems();
  renderBasketSummary();
}

function renderBasketItems() {
  let basketItemsRef = document.getElementById("basket-items");
  basketItemsRef.innerHTML = "";

  if (basket.length === 0) {
    basketItemsRef.innerHTML = getEmptyBasketTemplate();
    return;
  }

  for (let index = 0; index < basket.length; index++) {
    basketItemsRef.innerHTML += getBasketItemTemplate(index);
  }
}

function renderBasketSummary() {
  let basketSummaryRef = document.getElementById("basket-summary-id");
  let subTotalValue = subTotal();
  let totalPriceValue = totalPrice();
  let deliveryCost = String(deliveryFee);

  if (basket.length === 0) {
    basketSummaryRef.innerHTML = "";
    return;
  }
  basketSummaryRef.innerHTML = "";
  basketSummaryRef.innerHTML += getSummaryBasketTemplate(
    subTotalValue,
    deliveryCost,
    totalPriceValue,
  );
}

function openConfirmationDialog() {
  toggleBasket();
  confirmationDialogRef.showModal();
  basket = "";
  renderBasketItems();
  renderBasketSummary();

  setTimeout(() => {
    confirmationDialogRef.close();
  }, 5000);
}

function closeConfirmationDialog() {
  confirmationDialogRef.close();
}

// Function to increase the counter and price
function increaseQuantity(basketIndex) {
  basket[basketIndex].dishCount++;

  increasePrice(basketIndex);
  renderBasketItems();
  renderBasketSummary();
}

function increasePrice(basketIndex) {
  let originalPrice =
    menuList[basket[basketIndex].dishCategoryIndex].dishes[
      basket[basketIndex].dishesIndex
    ].price;

  let dishPrice = basket[basketIndex].dishPrice;
  let dishPriceSum = dishPrice + originalPrice;

  basket[basketIndex].dishPrice = dishPriceSum;

  renderBasketItems();
  renderBasketSummary();
}

// Function to decrease the counter and price
function decreaseQuantity(basketIndex) {
  basket[basketIndex].dishCount--;

  decreasePrice(basketIndex);
  renderBasketItems();
  renderBasketSummary();
}

function decreasePrice(basketIndex) {
  let originalPrice =
    menuList[basket[basketIndex].dishCategoryIndex].dishes[
      basket[basketIndex].dishesIndex
    ].price;

  let dishPrice = basket[basketIndex].dishPrice;
  let dishPriceSum = dishPrice - originalPrice;

  basket[basketIndex].dishPrice = dishPriceSum;

  renderBasketItems();
  renderBasketSummary();
}

function removeFromBasket(basketIndex) {
  basket.splice(basketIndex, 1);

  renderBasketItems();
  renderBasketSummary();
}

function subTotal() {
  let subTotal = 0;
  for (const basketItem of basket) {
    subTotal += basketItem.dishPrice;
  }
  return subTotal;
}

function totalPrice() {
  let subTotalValue = subTotal();

  let totalPrice = subTotalValue + deliveryFee;
  return totalPrice;
}


function basketCount(){

  let basketDishCount=0;
  let basketCountRef = document.getElementById(`basket-count-id`);

  
  for (const dish of basket) {
    basketDishCount += dish.dishCount;
  }
  basketCountRef.innerHTML = getBasketCountTemplate(basketDishCount);
}

