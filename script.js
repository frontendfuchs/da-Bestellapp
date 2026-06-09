// define global variable for the confirmation dialog
// the dialog element is stored once so it can be reused in different functions
const confirmationDialogRef = document.getElementById("confirmationDialog");


// initialize the page content on load
// this function renders all menu categories, the basket content, and the basket counter
// it acts as the main start function for the application
function render() {
  renderCategory();
  renderBasket();
  basketCount();
}


// render all menu categories on the page
// first get the main container for the menu section and clear old content
// then loop through all categories from the global menuList array
// for each category add the category template to the page
// after rendering the category itself, call renderDishes()
// so that all dishes of that category are inserted into the correct category block
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


// render all dishes that belong to one specific category
// categoryIndex is passed from renderCategory() so the function knows
// which category from the global menuList array should be used
// the correct HTML container is selected by using the categoryIndex in the id
// then all dishes of that category are looped through and added one by one to the template
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


// render the complete basket content
// first clear the basket container and insert the main basket structure template
// after the basket layout exists in the DOM, render the basket items and the basket summary
// this function is responsible for building the visible basket area
function renderBasket() {
  let basketRef = document.getElementById(`myBasket`);
  basketRef.innerHTML = "";
  basketRef.innerHTML += getBasketTemplate();

  renderBasketItems();
  renderBasketSummary();
}


// show or hide the basket on mobile
// the function targets the basket element and toggles the class d-none
// this switches the basket between visible and hidden
// after that the basket counter is updated again
function toggleBasket() {
  let openBasketRef = document.getElementById("myBasket");
  openBasketRef.classList.toggle("d-none");

  basketCount();
}


// add a selected dish to the basket
// categoryIndex and dishesIndex are passed from the clicked add to basket button
// with these two values we can find the exact dish in the global menuList array
// then loop through the basket to check whether this exact dish is already stored
// the comparison is done with categoryIndex and dishesIndex because together
// they uniquely identify one dish
// if the dish is already in the basket we only increase its quantity and price
// and then update the basket view
// if the dish is not found we push a new basket object into the basket array
function addToBasket(categoryIndex, dishesIndex) {
  const dishItem = menuList[categoryIndex].dishes[dishesIndex];

  for (let basketIndex = 0; basketIndex < basket.length; basketIndex++) {
    if (
      basket[basketIndex].dishCategoryIndex === categoryIndex &&
      basket[basketIndex].dishesIndex === dishesIndex
    ) {
      basket[basketIndex].dishCount++;
      increasePrice(basketIndex);
      updateBasket();
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

  updateBasket();
}


// render all basket item cards inside the basket
// first select the basket items container and clear old content
// if the basket array is empty, render the empty basket template instead
// this shows an icon and a message that no items are in the basket yet
// if basket entries exist, loop through all items and add one basket item template per entry
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


// render the basket summary with subtotal, delivery fee, and total price
// first get the summary container and calculate all needed values
// subtotal and total are calculated in separate helper functions
// deliveryFee is converted to a string so it can be formatted correctly in the template
// if the basket is empty the summary should not be shown, so the container is cleared
// otherwise the summary template is inserted with all calculated values
function renderBasketSummary() {
  let basketSummaryRef = document.getElementById("basket-summary-id");
  const subTotalValue = subTotal();
  const deliveryCost = String(deliveryFee);
  const totalPriceValue = totalPrice();

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


// open the confirmation dialog after the user finishes the order
// first close the basket view by calling toggleBasket()
// then show the modal dialog as an order confirmation
// afterwards clear the basket data and rerender basket items and summary
// a timeout is used so the dialog closes automatically after 5 seconds
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


// close the confirmation dialog manually
// this is used for the close button inside the dialog
function closeConfirmationDialog() {
  confirmationDialogRef.close();
}


// increase the quantity of one basket item
// basketIndex tells the function which basket entry should be updated
// first increase the dishCount value by 1
// then update the price of that same basket entry
// after the data change rerender basket items and summary so the UI stays in sync
function increaseQuantity(basketIndex) {
  basket[basketIndex].dishCount++;

  increasePrice(basketIndex);
  renderBasketItems();
  renderBasketSummary();
}


// increase the total price of one basket item
// first read the original single dish price from the global menuList array
// this works because each basket entry stores its category index and dish index
// then get the current total price of that basket item
// add the original single price once more and save the new sum back into the basket
// finally rerender basket items and basket summary to show the updated values
function increasePrice(basketIndex) {
  const originalPrice =
    menuList[basket[basketIndex].dishCategoryIndex].dishes[
      basket[basketIndex].dishesIndex
    ].price;

  const dishPrice = basket[basketIndex].dishPrice;
  const dishPriceSum = dishPrice + originalPrice;

  basket[basketIndex].dishPrice = dishPriceSum;

  renderBasketItems();
  renderBasketSummary();
}


// decrease the quantity of one basket item
// basketIndex identifies which basket entry should be changed
// the item count is reduced by 1
// after that the total price of that same basket item is also reduced
// finally the basket content and summary are rerendered to display the change immediately
function decreaseQuantity(basketIndex) {
  basket[basketIndex].dishCount--;

  decreasePrice(basketIndex);
  renderBasketItems();
  renderBasketSummary();
}


// decrease the total price of one basket item
// first get the original single dish price from the global menuList array
// then subtract that value from the current total dish price stored in the basket
// save the new reduced price back into the basket entry
// after updating the data rerender the basket items and the summary
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


// remove one complete item card from the basket
// basketIndex tells the function which exact basket entry should be deleted
// splice() removes that entry from the global basket array
// after removal the basket items and summary are rerendered
// so the basket view updates immediately
function removeFromBasket(basketIndex) {
  basket.splice(basketIndex, 1);

  renderBasketItems();
  renderBasketSummary();
}


// calculate the subtotal of all basket items
// start with 0 and loop through every basket entry
// for each entry add its current total dishPrice to the subtotal
// return the final subtotal value so it can be used in the summary
function subTotal() {
  let subTotal = 0;
  for (const basketItem of basket) {
    subTotal += basketItem.dishPrice;
  }
  return subTotal;
}


// calculate the final total price of the order
// first get the current subtotal of all basket items
// then add the globally defined delivery fee to that subtotal
// return the final result so it can be rendered in the basket summary
function totalPrice() {
  let subTotalValue = subTotal();

  let totalPrice = subTotalValue + deliveryFee;
  return totalPrice;
}


// calculate the total number of selected dishes in the basket
// loop through all basket entries and add all dishCount values together
// then render the result inside the basket counter element in the navigation
// this allows the user to always see how many items are currently in the basket
function basketCount() {
  let basketDishCount = 0;
  let basketCountRef = document.getElementById(`basket-count-id`);

  for (const dish of basket) {
    basketDishCount += dish.dishCount;
  }
  basketCountRef.innerHTML = getBasketCountTemplate(basketDishCount);
}


// central update function for the basket
// this function is used whenever basket data changes
// it updates the basket counter, the basket item list, and the basket summary
// this helps avoid repeating the same render calls in many places
function updateBasket() {
  basketCount();
  renderBasketItems();
  renderBasketSummary();
}