// Royal Restaurant
// Customer-facing website data loader

const STORAGE_KEY = "royalRestaurantData";

const defaultData = {
  restaurantName: "ROYAL RESTAURANT",
  phone: "+20 100 000 0000",
  address: "123 Royal Street, Cairo, Egypt",
  email: "hello@royalrestaurant.com",
  hours: "Monday — Sunday · 12:00 PM — 12:00 AM",

  menu: [
    {
      name: "Truffle Burrata",
      price: "320 EGP",
      description: "Creamy burrata, black truffle, tomatoes and basil."
    },
    {
      name: "Royal Ribeye",
      price: "780 EGP",
      description: "Premium grilled ribeye with roasted vegetables and royal sauce."
    },
    {
      name: "Sea Bass",
      price: "620 EGP",
      description: "Fresh sea bass, lemon butter, herbs and seasonal vegetables."
    },
    {
      name: "Truffle Tagliatelle",
      price: "420 EGP",
      description: "Fresh pasta, black truffle, parmesan and creamy sauce."
    },
    {
      name: "Royal Cheesecake",
      price: "220 EGP",
      description: "Classic cheesecake with vanilla, berries and caramel."
    },
    {
      name: "Chocolate Royale",
      price: "240 EGP",
      description: "Dark chocolate dessert with hazelnut and vanilla cream."
    }
  ],

  images: [
    "",
    "",
    "",
    ""
  ]
};


// Get saved restaurant data
function getRestaurantData() {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);

    if (!saved) {
      return defaultData;
    }

    const data = JSON.parse(saved);

    return {
      ...defaultData,
      ...data,
      menu: Array.isArray(data.menu)
        ? data.menu
        : defaultData.menu,

      images: Array.isArray(data.images)
        ? data.images
        : defaultData.images
    };

  } catch (error) {
    console.error("Royal Restaurant data error:", error);
    return defaultData;
  }
}


// Update restaurant information
function updateRestaurantInfo(data) {

  // Restaurant name
  document.querySelectorAll("[data-restaurant-name]")
    .forEach(element => {
      element.textContent = data.restaurantName;
    });

  // Phone
  document.querySelectorAll("[data-phone]")
    .forEach(element => {
      element.textContent = data.phone;
      element.href = "tel:" + data.phone.replace(/\s+/g, "");
    });

  // Address
  document.querySelectorAll("[data-address]")
    .forEach(element => {
      element.textContent = data.address;
    });

  // Email
  document.querySelectorAll("[data-email]")
    .forEach(element => {
      element.textContent = data.email;
      element.href = "mailto:" + data.email;
    });

  // Opening hours
  document.querySelectorAll("[data-hours]")
    .forEach(element => {
      element.textContent = data.hours;
    });
}


// Update images
function updateImages(data) {

  const images = data.images || [];

  document.querySelectorAll("[data-restaurant-image]")
    .forEach((image, index) => {

      if (images[index]) {
        image.src = images[index];
      }

    });
}


// Update menu items
function updateMenu(data) {

  const menuContainer = document.querySelector("[data-menu-list]");

  if (!menuContainer || !Array.isArray(data.menu)) {
    return;
  }

  menuContainer.innerHTML = "";

  data.menu.forEach(item => {

    const article = document.createElement("article");

    article.className = "menu-item";

    article.innerHTML = `
      <div class="menu-item-top">
        <h3>${escapeHTML(item.name)}</h3>
        <span>${escapeHTML(item.price)}</span>
      </div>

      <p>${escapeHTML(item.description)}</p>
    `;

    menuContainer.appendChild(article);

  });
}


// Protect against HTML injection
function escapeHTML(value) {

  if (value === undefined || value === null) {
    return "";
  }

  return String(value)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}


// Initialize website
function initializeRoyalRestaurant() {

  const data = getRestaurantData();

  updateRestaurantInfo(data);
  updateImages(data);
  updateMenu(data);

}


// Run after page loads
document.addEventListener(
  "DOMContentLoaded",
  initializeRoyalRestaurant
);
