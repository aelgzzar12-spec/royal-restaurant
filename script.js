const STORAGE_KEY = "royalRestaurantData";

const FALLBACK_DISH_IMAGES = [
  "https://images.unsplash.com/photo-1551183053-bf91a1d81141?auto=format&fit=crop&w=1200&q=85",
  "https://images.unsplash.com/photo-1546833999-b9f581a1996d?auto=format&fit=crop&w=1200&q=85",
  "https://images.unsplash.com/photo-1547592180-85f173990554?auto=format&fit=crop&w=1200&q=85",
  "https://images.unsplash.com/photo-1551892374-ecf8754cf8b0?auto=format&fit=crop&w=1200&q=85",
  "https://images.unsplash.com/photo-1578985545062-69928b1d9587?auto=format&fit=crop&w=1200&q=85",
  "https://images.unsplash.com/photo-1565958011703-44f9829ba187?auto=format&fit=crop&w=1200&q=85"
];

const DEFAULT_MENU = [
  {
    name: "Truffle Tagliatelle",
    price: "420 EGP",
    description: "Fresh pasta, black truffle, parmesan and creamy sauce.",
    image: FALLBACK_DISH_IMAGES[0]
  },
  {
    name: "Royal Ribeye",
    price: "780 EGP",
    description: "Premium grilled ribeye with roasted vegetables and royal sauce.",
    image: FALLBACK_DISH_IMAGES[1]
  },
  {
    name: "Pan-Seared Sea Bass",
    price: "620 EGP",
    description: "Fresh sea bass, lemon butter, herbs and seasonal vegetables.",
    image: FALLBACK_DISH_IMAGES[2]
  },
  {
    name: "Burrata & Tomatoes",
    price: "320 EGP",
    description: "Creamy burrata, ripe tomatoes, basil and extra virgin olive oil.",
    image: FALLBACK_DISH_IMAGES[3]
  },
  {
    name: "Royal Cheesecake",
    price: "220 EGP",
    description: "Classic cheesecake with vanilla, berries and caramel.",
    image: FALLBACK_DISH_IMAGES[4]
  },
  {
    name: "Chocolate Royale",
    price: "240 EGP",
    description: "Dark chocolate dessert with hazelnut and vanilla cream.",
    image: FALLBACK_DISH_IMAGES[5]
  }
];

const DEFAULT_IMAGES = [
  "https://images.unsplash.com/photo-1515003197210-e0cd71810b5f?auto=format&fit=crop&w=2000&q=90",
  "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?auto=format&fit=crop&w=1400&q=85",
  "https://images.unsplash.com/photo-1515003197210-e0cd71810b5f?auto=format&fit=crop&w=1400&q=85",
  "https://images.unsplash.com/photo-1559339352-11d035aa65de?auto=format&fit=crop&w=1400&q=85"
];

const defaultData = {
  restaurantName: "ROYAL•RESTAURANT",
  phone: "+20 100 000 0000",
  address: "123 Royal Street, Cairo, Egypt",
  email: "hello@royalrestaurant.com",
  hours: "Monday — Sunday · 12:00 PM — 12:00 AM",
  menu: DEFAULT_MENU,
  images: DEFAULT_IMAGES
};


// ================================
// Get saved data
// ================================

function getRestaurantData() {

  try {

    const saved = localStorage.getItem(STORAGE_KEY);

    if (!saved) {
      return defaultData;
    }

    const data = JSON.parse(saved);

    if (!data || typeof data !== "object") {
      return defaultData;
    }

    const menu = Array.isArray(data.menu)
      ? data.menu
      : DEFAULT_MENU;

    const normalizedMenu = menu.map((item, index) => {

      const fallback =
        DEFAULT_MENU[index % DEFAULT_MENU.length];

      return {
        ...fallback,
        ...item,
        image:
          item.image ||
          fallback.image ||
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
          : DEFAULT_IMAGES
    };

  } catch (error) {

    console.error(
      "Royal Restaurant error:",
      error
    );

    return defaultData;
  }
}


// ================================
// Escape HTML
// ================================

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


// ================================
// Restaurant information
// ================================

function updateRestaurantInfo(data) {

  document
    .querySelectorAll("[data-restaurant-name]")
    .forEach(element => {

      element.textContent =
        data.restaurantName ||
        defaultData.restaurantName;

    });


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


  document
    .querySelectorAll("[data-address]")
    .forEach(element => {

      element.textContent =
        data.address ||
        defaultData.address;

    });


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


  document
    .querySelectorAll("[data-hours]")
    .forEach(element => {

      element.textContent =
        data.hours ||
        defaultData.hours;

    });


  document.title =
    (data.restaurantName ||
      defaultData.restaurantName) +
    " | Fine Dining";
}


// ================================
// Images
// ================================

function updateImages(data) {

  const images =
    Array.isArray(data.images)
      ? data.images
      : [];


  document
    .querySelectorAll("[data-restaurant-image]")
    .forEach(element => {

      const index =
        Number(
          element.getAttribute(
            "data-restaurant-image"
          )
        );

      if (
        Number.isNaN(index) ||
        !images[index]
      ) {
        return;
      }


      const image =
        images[index];


      if (element.tagName === "IMG") {

        element.src = image;

      } else {

        element.style.backgroundImage =
          `url("${image}")`;

      }

    });
}


// ================================
// Signature Dishes
// ================================

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
      <p style="color:rgba(255,255,255,.6)">
        Menu coming soon.
      </p>
    `;

    return;
  }


  data.menu
    .slice(0, 3)
    .forEach((item, index) => {

      const image =
        item.image ||
        FALLBACK_DISH_IMAGES[
          index %
          FALLBACK_DISH_IMAGES.length
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


        <div class="dish-info">

          <h3>
            ${escapeHTML(item.name)}
          </h3>

          <span>
            ${escapeHTML(item.price)}
          </span>

        </div>


        <p class="dish-description">
          ${escapeHTML(item.description)}
        </p>

      `;


      container.appendChild(article);

    });
}


// ================================
// Full Menu
// ================================

function updateMenu(data) {

  const container =
    document.querySelector(
      "[data-menu-list]"
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
      <p>
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


    container.appendChild(article);

  });
}


// ================================
// Initialize
// ================================

function initializeRoyalRestaurant() {

  const data =
    getRestaurantData();


  updateRestaurantInfo(data);

  updateImages(data);

  updateSignatureDishes(data);

  updateMenu(data);

}


// ================================
// Start
// ================================

if (
  document.readyState === "loading"
) {

  document.addEventListener(
    "DOMContentLoaded",
    initializeRoyalRestaurant
  );

} else {

  initializeRoyalRestaurant();

}


// ================================
// Listen for changes
// ================================

window.addEventListener(
  "storage",
  event => {

    if (
      event.key === STORAGE_KEY
    ) {

      initializeRoyalRestaurant();

    }

  }
);
