const getplants = "https://openapi.programming-hero.com/api/plants";
const getallcatagory = "https://openapi.programming-hero.com/api/categories";
const getplantbycatagory =
  "https://openapi.programming-hero.com/api/category/${id}";
const getplantbycatagory2 =
  "https://openapi.programming-hero.com/api/category/1";
const getplantdetails = "https://openapi.programming-hero.com/api/plant/${id}";
const getplantdetails2 = "https://openapi.programming-hero.com/api/plant/1";

const loadAllPlants = fetch(getplants)
  .then((res) => res.json())
  .then((data) => {
    displayAllPlants(data.plants);
  })
  .catch((err) => console.error("Error fetching plants:", err));

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








const loadAllCatagory = fetch(getallcatagory)
  .then((res) => res.json())
  .then((data) => {
    console.log("Categories:", data);
    displayAllCategories(data.categories);
  })
  .catch((err) => console.error("Error fetching categories:", err));

const displayAllCategories = (categories) => {
  const postCategories = document.querySelector(".categories");

  categories.forEach((category) => {
    const li = document.createElement("li");
    li.innerText = category.category_name;
    postCategories.appendChild(li);
  });
};

const categoryId = 1;
fetch(`https://openapi.programming-hero.com/api/category/${categoryId}`)
  .then((res) => res.json())
  .then((data) => {
    console.log(`Plants in category ${categoryId}:`, data);
  })
  .catch((err) => console.error("Error fetching category:", err));

const plantId = 1;
fetch(`https://openapi.programming-hero.com/api/plant/${plantId}`)
  .then((res) => res.json())
  .then((data) => {
    console.log(`Plant details for ${plantId}:`, data);
  })
  .catch((err) => console.error("Error fetching plant details:", err));
