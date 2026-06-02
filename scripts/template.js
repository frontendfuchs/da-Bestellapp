function getCategoryTemplate(categoryIndex) {
  let category = menuList[categoryIndex].category;
  return /*html*/ `
        <div class="category-list">
            <img src="${category.src}" alt="${category.alt}"/>
            <span>${category.name}</span>
            <div class="content">
                <div id="menu-item-wrapper${categoryIndex}"></div>
            </div>
        </div>        
        `;
}

function getDishesTemplate(categoryIndex, dishesIndex) {
  let dish = menuList[categoryIndex].dishes[dishesIndex];
  return /*html*/ `
    <div>
          <article class="menu-item">
            <img src="${dish.src}" />
            <h2>${dish.name}</h2>
            <p>${dish.description}</p>
            <div>
              <span>${dish.price}</span>
              <button>x</button>
            </div>
          </article>
        </div>
    
    `;
}
