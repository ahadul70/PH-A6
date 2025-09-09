// ======================== API Endpoints ========================
const getplants = "https://openapi.programming-hero.com/api/plants";
const getallcatagory = "https://openapi.programming-hero.com/api/categories";
const getPlantByCategory = (id) =>
  `https://openapi.programming-hero.com/api/category/${id}`;
const getplantdetails = (id) =>
  `https://openapi.programming-hero.com/api/plant/${id}`;

// ======================== Global Arrays ========================
let allPlants = [];
let allCategories = [];

// ======================== DOM references for modal ========================
const modal = document.getElementById("plantModal");
const modalTitle = document.getElementById("modalTitle");
const modalImage = document.getElementById("modalImage");
const modalCategory = document.getElementById("modalCategory");
const modalPrice = document.getElementById("modalPrice");
const modalDescription = document.getElementById("modalDescription");
const modalClose = document.querySelector(".modal .close");

// Close modal on clicking X
modalClose.addEventListener("click", () => {
  modal.style.display = "none";
});

// Close modal when clicking outside content
window.addEventListener("click", (e) => {
  if (e.target === modal) modal.style.display = "none";
});

// ======================== Load All Plants ========================
fetch(getplants)
  .then((res) => res.json())
  .then((data) => {
    allPlants = data.plants;
    displayAllPlants(allPlants);
  })
  .catch((err) => console.error("Error fetching plants:", err));

// ======================== Load All Categories ========================
fetch(getallcatagory)
  .then((res) => res.json())
  .then((data) => {
    allCategories = data.categories;
    displayAllCategories(allCategories);
  })
  .catch((err) => console.error("Error fetching categories:", err));

// ======================== Display Plants ========================
const displayAllPlants = (plants) => {
  const postPlant = document.querySelector(".tree_cards");
  postPlant.innerHTML = "";

  plants.forEach((plant) => {
    const card = document.createElement("div");
    card.classList.add("tree_card");

    // Image
    const img = document.createElement("img");
    img.src = plant.image || "https://i.ibb.co.com/cSQdg7tf/mango-min.jpg";
    img.alt = plant.name || "Plant";
    img.classList.add("tree_img");
    card.appendChild(img);

    // Name (clickable for modal)
    const h3 = document.createElement("h3");
    h3.innerText = plant.name || "Plant Name";
    h3.classList.add("tree_name");
    h3.addEventListener("click", () => openPlantModal(plant));
    card.appendChild(h3);

    // Short description (20 words max)
    const p = document.createElement("p");
    const words = (plant.description || "").split(" ");
    const limited = words.slice(0, 20).join(" ");
    p.innerText = limited + (words.length > 20 ? "..." : "");
    card.appendChild(p);

    // Price + Category
    const priceCategory = document.createElement("div");
    priceCategory.classList.add("price_category");

    const spanCategory = document.createElement("span");
    spanCategory.innerText = plant.category || "Category";
    spanCategory.classList.add("span_cat");
    priceCategory.appendChild(spanCategory);

    const spanPrice = document.createElement("span");
    spanPrice.innerHTML = `&#2547; ${plant.price || 0}`;
    priceCategory.appendChild(spanPrice);

    card.appendChild(priceCategory);

    // Add to cart button
    const button = document.createElement("button");
    button.classList.add("btn_primary", "cart");
    button.innerText = "Add to Cart";
    card.appendChild(button);

    postPlant.appendChild(card);
  });
};

// ======================== Display Categories ========================
const displayAllCategories = (categories) => {
  const postCategories = document.querySelector(".categories");
  postCategories.innerHTML = "";

  const setActive = (liElement) => {
    document
      .querySelectorAll(".categories li")
      .forEach((li) => li.classList.remove("active-category"));
    liElement.classList.add("active-category");
  };

  // All Trees option
  const liAll = document.createElement("li");
  liAll.innerText = "All Trees";
  liAll.onclick = () => {
    displayAllPlants(allPlants);
    setActive(liAll);
  };
  postCategories.appendChild(liAll);

  // Other categories
  categories.forEach((category) => {
    const li = document.createElement("li");
    li.innerText = category.category_name;
    li.onclick = () => {
      filterPlantsByCategory(category.category_name);
      setActive(li);
    };
    postCategories.appendChild(li);
  });
};

// ======================== Filter By Category ========================
const filterPlantsByCategory = (categoryName) => {
  const filteredPlants = allPlants.filter(
    (plant) => plant.category === categoryName
  );
  displayAllPlants(filteredPlants);
};

// ======================== Modal Functions ========================
// Open modal with **full plant details from API**
function openPlantModalById(id) {
  fetch(getplantdetails(id))
    .then((res) => res.json())
    .then((data) => {
      const plant = data.plants; // API returns a single plant object
      openPlantModal(plant);
    })
    .catch((err) => console.error("Error fetching plant details:", err));
}

function openPlantModal(plant) {
  modalTitle.innerText = plant.name || "Plant Name";
  modalImage.src = plant.image || "https://i.ibb.co.com/cSQdg7tf/mango-min.jpg";
  modalImage.alt = plant.name || "Plant Image";
  modalCategory.innerText = plant.category || "Category";
  modalPrice.innerHTML = `&#2547; ${plant.price || 0}`;
  modalDescription.innerText = plant.description || "No description available.";
  modal.style.display = "flex"; // show modal
}
