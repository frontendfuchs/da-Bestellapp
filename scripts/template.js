function getCategoryTemplate(categoryIndex) {
  let category = menuList[categoryIndex].category;
  return /*html*/ `
        <div class="category-list">
          <div class="categroy-list-wrapper">
            <img src="${category.src}" alt="${category.alt}"/>
            <span>${category.name}</span>
          </div>
            <div class="content">
                <div id="menu-item-wrapper${categoryIndex}"></div>
            </div>
        </div>        
        `;
}

function getDishesTemplate(categoryIndex, dishesIndex) {
  let dish = menuList[categoryIndex].dishes[dishesIndex];
  return /*html*/ `
      <div class="menu-item-wrapper">
          <article class="menu-item">
            <img src="${dish.src}" />
            <h2>${dish.name}</h2>
            <p>${dish.description}</p>
            <div>
              <span>${dish.price.toFixed(2).replace(".", ",")} €</span>
              <button>Add to basket</button>
            </div>
          </article>
   </div>
    
    `;
}
