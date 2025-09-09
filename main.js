const getplants = "https://openapi.programming-hero.com/api/plants";
const getallcatagory = "https://openapi.programming-hero.com/api/categories";
const getPlantByCategory = (id) =>  `https://openapi.programming-hero.com/api/category/${id}`;
const getplantbycatagory2 ="https://openapi.programming-hero.com/api/category/1";
const getplantdetails = "https://openapi.programming-hero.com/api/plant/${id}";
const getplantdetails2 = "https://openapi.programming-hero.com/api/plant/1";

let allPlants = [];
let allCategories = [];

const loadAllPlants = fetch(getplants)
  .then((res) => res.json())
  .then((data) => {
    allPlants = data.plants;
    displayAllPlants(data.plants);
  })
  .catch((err) => console.error("Error fetching plants:", err));


const loadAllCatagory = fetch(getallcatagory)
  .then((res) => res.json())
  .then((data) => {
    console.log("Categories:", data);
    allCategories = data.categories;
    displayAllCategories(data.categories);
  })
  .catch((err) => console.error("Error fetching categories:", err));

const displayAllPlants = (plants) => {
  const postPlant = document.querySelector(".tree_cards");
  postPlant.innerHTML = "";

  plants.forEach((plant) => {

    console.log(plant);

    const card = document.createElement("div");
    card.classList.add("tree_card");

    const img = document.createElement("img");
    img.src = plant.image || "https://i.ibb.co.com/cSQdg7tf/mango-min.jpg";
    img.alt = plant.name || "Plant";
    card.appendChild(img);

    const h3 = document.createElement("h3");
    h3.innerText = plant.name || "Plant Name";
    card.appendChild(h3);

    const p = document.createElement("p");
    p.innerText = plant.description || "No description available.";
    card.appendChild(p);

    const priceCategory = document.createElement("div");
    priceCategory.classList.add("price_category");

    const spanCategory = document.createElement("span");
    spanCategory.innerText = plant.category || "Category";
    priceCategory.appendChild(spanCategory);

    const spanPrice = document.createElement("span");
    spanPrice.innerHTML = `&#2547; ${plant.price || 0}`;

    priceCategory.appendChild(spanPrice);
    card.appendChild(priceCategory);


    const button = document.createElement("button");
    button.classList.add("btn_primary");
    button.innerText = "Add to Cart";
    card.appendChild(button);

    postPlant.appendChild(card);
  });
};

const displayAllCategories = (categories) => {
  const postCategories = document.querySelector(".categories");
  postCategories.innerHTML = "";


    const setActive = (liElement) => {
    // Remove active class from all
    document.querySelectorAll(".categories li")
      .forEach(li => li.classList.remove("active-category"));
    // Add to the clicked one
    liElement.classList.add("active-category");
  };


  const liAll = document.createElement("li");
  liAll.innerText = "All Trees";
 liAll.onclick = () => {
    displayAllPlants(allPlants);
    setActive(liAll);
  };
  postCategories.appendChild(liAll);


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

const filterPlantsByCategory = (categoryName) => {
  const filteredPlants = allPlants.filter(
    (plant) => plant.category === categoryName
  );
  displayAllPlants(filteredPlants);
};


