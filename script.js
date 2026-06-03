function render() {
    renderCategory()

}

function renderCategory(){
    let categoryRef = document.getElementById("menu-list");
    categoryRef.innerHTML="";

    for (let categoryIndex = 0; categoryIndex < menuList.length; categoryIndex++) {
        categoryRef.innerHTML += getCategoryTemplate(categoryIndex);

        renderDishes(categoryIndex)
        
    }
}

function renderDishes(categoryIndex){
    let dishesRef = document.getElementById(`menu-item-wrapper${categoryIndex}`);
    dishesRef.innerHTML="";

    for (let dishesIndex = 0; dishesIndex < menuList[categoryIndex].dishes.length; dishesIndex++) {
        dishesRef.innerHTML += getDishesTemplate(categoryIndex, dishesIndex);
        
    }
}

