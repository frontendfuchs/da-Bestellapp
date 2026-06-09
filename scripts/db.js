let menuList = [
  {
    category: {
      name: "Burger",
      src: "./assets/icons/burger-icon.png",
      alt: "burger-icon",
    },

    dishes: [
      {
        name: "Veggie mushroom black burger",
        description:
          "Chicken, Mozzarella, Gorgonzola, Fontina, Parmigiano Reggiano",
        price: 16.9,
        src: "./assets/img/veggie-burger.jpg",
        alt: "veggie burger",
      },
      {
        name: "All meat burger",
        description:
          "Beef, Bacon, Dill pickles, Smoked cheese, Ketchup, BBQ sauce",
        price: 15.9,
        src: "./assets/img/all-meat-burger.jpg",
        alt: "all meat burger",
      },
      {
        name: "Beef red burger",
        description: "Beef, Cheese, Tomatoes, Lettuce, Onion",
        price: 14.9,
        src: "./assets/img/beef-red-burger.jpg",
        alt: "beef red burger",
      },

      {
        name: "Big chicken burger",
        description: "Chicken, Cheese, Tomatoes, Lettuce, Onion, Bell pepper",
        price: 15.9,
        src: "./assets/img/big-chicken-burger.jpg",
        alt: "big chicken burger",
      },
    ],
  },

  {
    category: {
      name: "Pizza",
      src: "./assets/icons/pizza-icon.png",
      alt: "pizza-icon",
    },

    dishes: [
      {
        name: "Pizza Margherita",
        description: "Tomato Sauce, Mozzarella",
        price: 11.9,
        src: "./assets/img/pizza-margherita.jpg",
        alt: "pizza margherita",
      },
      {
        name: "Pizza Chorizo",
        description: "Tomato slices, Mozzarella, Chorizo",
        price: 13.9,
        src: "./assets/img/pizza-chorizo.jpg",
        alt: "pizza chorizo",
      },
      {
        name: "Pizza Funghi",
        description: "Red onion, Olives, Button Mushrooms, Mozzarella",
        price: 13.9,
        src: "./assets/img/pizza-funghi.jpg",
        alt: "pizza funghi",
      },
      {
        name: "Quattro Formaggi with Chicken",
        description:
          "Chicken, Mozzarella, Gorgonzola, Fontina, Parmigiano Reggiano",
        price: 16.9,
        src: "./assets/img/pizza-quattro.jpg",
        alt: "Quattro Formaggi with Chicken",
      },
    ],
  },
  {
    category: {
      name: "Salad",
      src: "./assets/icons/salad-icon.png",
      alt: "salad-icon",
    },

    dishes: [
      {
        name: "Warm beef arugula salad",
        description:
          "Beef, Arugula, Field salad, Greek feta, Cherry tomatoes, Sun-dried tomatoes, Balsamic-vinegar dressing",
        price: 16.9,
        src: "./assets/img/beef-salad.jpg",
        alt: "Warm beef arugula salad",
      },
      {
        name: "Mini green salad",
        description: "Green salad, Cucumber, Carrots, Parsley, Radishes",
        price: 7.9,
        src: "./assets/img/mini-salad.jpg",
        alt: "Mini green salad",
      },
      {
        name: "Green salad with sea food",
        description:
          "Mixed greens, Cherry tomatoes, Red onion, Mussles, Squid rings, Shrimp, Djíjon mustard-lemon dressing with dill",
        price: 16.9,
        src: "./assets/img/green-salad.jpg",
        alt: "Green salad with sea food",
      },
      {
        name: "Vegan green salad with tofu",
        description:
          "Green salad, Cherry tomatoes, Cucumber, Baby spinach, Edamame, radishes, Bittercress, Tofu, Peanuts",
        price: 14.9,
        src: "./assets/img/vegan-salad.jpg",
        alt: "Vegan green salad with tofu",
      },
    ],
  },
];

let basket = [];
let deliveryFee = 4.99;
