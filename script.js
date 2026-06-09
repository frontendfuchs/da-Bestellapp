// definition von globale Variablen für die verwendung in verschiedene Funktionen
const confirmationDialogRef = document.getElementById("confirmationDialog");

//initializierungsfunktion für rendern der seite
function render() {
  renderCategory();
  renderBasket();
  basketCount();
}

//die funktion rendert alle vorhandenen Menü Kategorien und Gerichte. Aus der JSON Datei werden in eine schleife alle Kategorien durchlaufen und mit hilfe der ermitellte categorieIndex in html template als einzelne elemente hinzugefügt
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

//die funktion rendert alle vorhandenen Gerichte. Aus der JSON Datei werden in eine schleife alle Gerichte durchlaufen und mit hilfe der ermitellte dishesIndex und der categorieIndex, was als übergabeparameter erhalten wird, in html template als einzelne elemente hinzugefügt
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

//diese Funktion rendert das ganze Inhalt von Warenkorb, dazu gehört die jeweilige Items und die Preisinformationen
function renderBasket() {
  let basketRef = document.getElementById(`myBasket`);
  basketRef.innerHTML = "";
  basketRef.innerHTML += getBasketTemplate();

  renderBasketItems();
  renderBasketSummary();
}

//diese Funktion ruft die basket Klasse "d-none" und mit hilfe des ".toggle" Methode wird die Eigenschaft von none auf display geswitched was dazu führt das das basket angezeigt oder ausgeblendet wird
function toggleBasket() {
  let openBasketRef = document.getElementById("myBasket");
  openBasketRef.classList.toggle("d-none");

  basketCount();
}

//die Funktion wird aufgerufen beim clicken auf das button "add to basket" von ein Gericht. Beim clicken werden die categoryIndex und dishIndex der jeweilige Gerichts an der Funktion übergeben um das gewünschte Gericht in eine globale JSON Liste (basket) hinzuzufügen. Diese Liste wird verwendet um die Gerichte in Basket zu rendern.
// es wurde eine Schleife implementiert der das ganze Inhalt von Basket ließt , durchläuft um zu prüfen ob das angeclickte gericht bereits in der globale JSON Liste eingetragen ist. Die prüfung erfolgt mit der Vergleich der categorieIndex und dischesIndex da diese 2 eigenschaften eindeutig sind , falls der Vergleich zutrifft dann wird nur der Anzahl von Gericht und Preis erhöht wenn nicht dann wird das Gericht in der Liste hinzugefügt.  
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

//die Funktion rendert in Basket die Items Inhalte. Dafür wurde eine Schleife gemacht um die jeweilige Einträge in der globale JSON Basket List in das html Template zu addieren. Es wurde eine Abfrage gemacht um zu prüfen ob in der Basket Liste irgendwelche Einträge sind, falls nein wird anstatt die Items ein Einkaufswagen symbol angezeigt und ein text das nichts im Einkaufswagen vorliegt. 
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

//diese Funktion rendert die Preisinformation in Basket. An das html Template wird das berechnete Zwischensumme, Delivery Cost und die Totale Summe als übergabeparameter übergeben. Die Zwischensumme und Total Summe werden in separaten Funktionen berechnet. Die Lieferkosten wurde in die Globale JSON Liste definiert um Zukunfstorientiert anpassbar zu sein. Eine Kovertierung von Int to String war notwendig um . mit komma zu ersetzen.
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

//diese Funktion öffnet ein Separates Dialog als Konfirmation für die Bestellung. Ein Timer wurde dazu gesezt für 5 secunden was führt das der Dialog sich automatisch schließt
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

//diese Funktion schließt der Dialog 
function closeConfirmationDialog() {
  confirmationDialogRef.close();
}

// Function to increase the dish counter and price and then reder the basket again
function increaseQuantity(basketIndex) {
  basket[basketIndex].dishCount++;

  increasePrice(basketIndex);
  renderBasketItems();
  renderBasketSummary();
}

// Function to increase the dish price in the basket. An der Funktion wurde das Basket Index übergeben damit der Original Preis aus der Menü Liste entnommen werden kann. In der Globale Basket List wurde die categorieIndex und dishesIndex als eigenschaften gespeichert und somit konnte beim clicken der Gericht auf der Originalpreis zugegriffen werden.  
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

function basketCount() {
  let basketDishCount = 0;
  let basketCountRef = document.getElementById(`basket-count-id`);

  for (const dish of basket) {
    basketDishCount += dish.dishCount;
  }
  basketCountRef.innerHTML = getBasketCountTemplate(basketDishCount);
}

function updateBasket() {
  basketCount();
  renderBasketItems();
  renderBasketSummary();
}