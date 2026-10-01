// ========================================
// ROYAL RESTAURANT
// Customer-Facing Website Data Loader
// ========================================

const STORAGE_KEY = "royalRestaurantData";


// ========================================
// Fallback dish images
// ========================================

const FALLBACK_DISH_IMAGES = [
  "https://images.unsplash.com/photo-1551183053-bf91a1d81141?auto=format&fit=crop&w=1200&q=85",
  "https://images.unsplash.com/photo-1546833999-b9f581a1996d?auto=format&fit=crop&w=1200&q=85",
  "https://images.unsplash.com/photo-1547592180-85f173990554?auto=format&fit=crop&w=1200&q=85",
  "https://images.unsplash.com/photo-1551892374-ecf8754cf8b0?auto=format&fit=crop&w=1200&q=85",
  "https://images.unsplash.com/photo-1578985545062-69928b1d9587?auto=format&fit=crop&w=1200&q=85",
  "https://images.unsplash.com/photo-1565958011703-44f9829ba187?auto=format&fit=crop&w=1200&q=85"
];


// ========================================
// Default restaurant data
// ========================================

const defaultData = {

  restaurantName: "ROYAL•RESTAURANT",

  phone: "+20 100 000 0000",

  address: "123 Royal Street, Cairo, Egypt",

  email: "hello@royalrestaurant.com",

  hours: "Monday — Sunday · 12:00 PM — 12:00 AM",

  menu: [

    {
      name: "Truffle Tagliatelle",
      price: "420 EGP",
      description:
        "Fresh pasta, black truffle, parmesan and creamy sauce.",
      image: FALLBACK_DISH_IMAGES[0]
    },

    {
      name: "Royal Ribeye",
      price: "780 EGP",
      description:
        "Premium grilled ribeye with roasted vegetables and royal sauce.",
      image: FALLBACK_DISH_IMAGES[1]
    },

    {
      name: "Pan-Seared Sea Bass",
      price: "620 EGP",
      description:
        "Fresh sea bass, lemon butter, herbs and seasonal vegetables.",
      image: FALLBACK_DISH_IMAGES[2]
    },

    {
      name: "Burrata & Tomatoes",
      price: "320 EGP",
      description:
        "Creamy burrata, ripe tomatoes, basil and extra virgin olive oil.",
      image: FALLBACK_DISH_IMAGES[3]
    },

    {
      name: "Royal Cheesecake",
      price: "220 EGP",
      description:
        "Classic cheesecake with vanilla, berries and caramel.",
      image: FALLBACK_DISH_IMAGES[4]
    },

    {
      name: "Chocolate Royale",
      price: "240 EGP",
      description:
        "Dark chocolate dessert with hazelnut and vanilla cream.",
      image: FALLBACK_DISH_IMAGES[5]
    }

  ],

  images: [

    // Hero
    "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=2000&q=90",

    // Gallery 1
    "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?auto=format&fit=crop&w=1400&q=85",

    // Gallery 2
    "https://images.unsplash.com/photo-1515003197210-e0cd71810b5f?auto=format&fit=crop&w=1400&q=85",

    // Gallery 3
    "https://images.unsplash.com/photo-1559339352-11d035aa65de?auto=format&fit=crop&w=1400&q=85"

  ]

};


// ========================================
// Get restaurant data
// ========================================

function getRestaurantData() {

  try {

    const saved = localStorage.getItem(STORAGE_KEY);

    if (!saved) {
      return defaultData;
    }

    const data = JSON.parse(saved);

    const savedMenu =
      Array.isArray(data.menu)
        ? data.menu
        : defaultData.menu;


    // Make sure every dish has an image
    const normalizedMenu = savedMenu.map((item, index) => {

      const defaultItem =
        defaultData.menu[index] ||
        defaultData.menu[index % defaultData.menu.length];

      return {

        ...defaultItem,

        ...item,

        image:
          item.image ||
          defaultItem.image ||
          FALLBACK_DISH_IMAGES[
            index % FALLBACK_DISH_IMAGES.length
          ]

      };

    });


    return {

      ...defaultData,

      ...data,

      menu: normalizedMenu,

      images:
        Array.isArray(data.images)
          ? data.images
          : defaultData.images

    };

  }

  catch (error) {

    console.error(
      "Royal Restaurant data error:",
      error
    );

    return defaultData;

  }

}


// ========================================
// Update restaurant information
// ========================================

function updateRestaurantInfo(data) {


  // Restaurant name

  document
    .querySelectorAll("[data-restaurant-name]")
    .forEach(element => {

      element.textContent =
        data.restaurantName ||
        defaultData.restaurantName;

    });


  // Phone

  document
    .querySelectorAll("[data-phone]")
    .forEach(element => {

      const phone =
        data.phone ||
        defaultData.phone;

      element.textContent = phone;

      if (element.tagName === "A") {

        element.href =
          "tel:" +
          phone.replace(/[^\d+]/g, "");

      }

    });


  // Address

  document
    .querySelectorAll("[data-address]")
    .forEach(element => {

      element.textContent =
        data.address ||
        defaultData.address;

    });


  // Email

  document
    .querySelectorAll("[data-email]")
    .forEach(element => {

      const email =
        data.email ||
        defaultData.email;

      element.textContent = email;

      if (element.tagName === "A") {

        element.href =
          "mailto:" + email;

      }

    });


  // Opening hours

  document
    .querySelectorAll("[data-hours]")
    .forEach(element => {

      element.textContent =
        data.hours ||
        defaultData.hours;

    });


  // Browser title

  if (data.restaurantName) {

    document.title =
      data.restaurantName +
      " | Fine Dining";

  }

}


// ========================================
// Set image on IMG or background element
// ========================================

function setImage(element, imageUrl) {

  if (!element || !imageUrl) {
    return;
  }


  // Normal <img>

  if (element.tagName === "IMG") {

    element.src = imageUrl;

    element.removeAttribute("srcset");

    return;

  }


  // Background image

  element.style.backgroundImage =
    `url("${imageUrl.replace(/"/g, '\\"')}")`;

}


// ========================================
// Update restaurant images
// ========================================

function updateImages(data) {

  const images =
    Array.isArray(data.images)
      ? data.images
      : [];


  document
    .querySelectorAll("[data-restaurant-image]")
    .forEach(element => {

      const index =
        Number(element.dataset.restaurantImage);

      if (
        Number.isNaN(index) ||
        !images[index]
      ) {
        return;
      }

      setImage(
        element,
        images[index]
      );

    });

}


// ========================================
// Update Signature Dishes
// ========================================

function updateSignatureDishes(data) {

  const container =
    document.querySelector(
      "[data-signature-list]"
    );


  if (!container) {
    return;
  }


  container.innerHTML = "";


  if (
    !Array.isArray(data.menu) ||
    data.menu.length === 0
  ) {

    container.innerHTML = `
      <p style="opacity:.7;">
        Our menu is being updated.
      </p>
    `;

    return;

  }


  // First 3 dishes = Signature Dishes

  const signatureDishes =
    data.menu.slice(0, 3);


  signatureDishes.forEach(
    (item, index) => {


      const image =
        item.image ||
        FALLBACK_DISH_IMAGES[
          index % FALLBACK_DISH_IMAGES.length
        ];


      const article =
        document.createElement("article");


      article.className = "dish";


      article.innerHTML = `

        <div class="dish-image">

          <img
            src="${escapeHTML(image)}"
            alt="${escapeHTML(item.name)}"
            loading="lazy"
          >

        </div>

        <div class="dish-content">

          <div class="dish-title-row">

            <h3>
              ${escapeHTML(item.name)}
            </h3>

            <span class="dish-price">
              ${escapeHTML(item.price)}
            </span>

          </div>

          <p>
            ${escapeHTML(item.description)}
          </p>

        </div>

      `;


      container.appendChild(article);

    }

  );

}


// ========================================
// Update Full Menu
// ========================================

function updateMenu(data) {

  const menuContainer =
    document.querySelector(
      "[data-menu-list]"
    );


  if (!menuContainer) {
    return;
  }


  menuContainer.innerHTML = "";


  if (
    !Array.isArray(data.menu) ||
    data.menu.length === 0
  ) {

    menuContainer.innerHTML = `
      <p style="opacity:.7;">
        Menu coming soon.
      </p>
    `;

    return;

  }


  data.menu.forEach(item => {


    const article =
      document.createElement("article");


    article.className =
      "menu-item";


    article.innerHTML = `

      <div class="menu-item-top">

        <h3>
          ${escapeHTML(item.name)}
        </h3>

        <span>
          ${escapeHTML(item.price)}
        </span>

      </div>

      <p>
        ${escapeHTML(item.description)}
      </p>

    `;


    menuContainer.appendChild(article);

  });

}


// ========================================
// HTML Security
// ========================================

function escapeHTML(value) {

  if (
    value === undefined ||
    value === null
  ) {

    return "";

  }


  return String(value)

    .replace(/&/g, "&amp;")

    .replace(/</g, "&lt;")

    .replace(/>/g, "&gt;")

    .replace(/"/g, "&quot;")

    .replace(/'/g, "&#039;");

}


// ========================================
// Initialize Website
// ========================================

function initializeRoyalRestaurant() {

  const data =
    getRestaurantData();


  updateRestaurantInfo(data);

  updateImages(data);

  updateSignatureDishes(data);

  updateMenu(data);

}


// ========================================
// Initial load
// ========================================

document.addEventListener(
  "DOMContentLoaded",
  initializeRoyalRestaurant
);


// ========================================
// Update automatically when localStorage changes
// ========================================

window.addEventListener(
  "storage",
  function(event) {

    if (
      event.key === STORAGE_KEY
    ) {

      initializeRoyalRestaurant();

    }

  }
);
