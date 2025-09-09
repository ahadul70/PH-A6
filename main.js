        // ======================== API Endpoints ========================
        const getplants = "https://openapi.programming-hero.com/api/plants";
        const getallcatagory = "https://openapi.programming-hero.com/api/categories";
        const getPlantByCategory = (id) => `https://openapi.programming-hero.com/api/category/${id}`;
        const getplantdetails = (id) => `https://openapi.programming-hero.com/api/plant/${id}`;

        // ======================== Global Arrays ========================
        let allPlants = [];
        let allCategories = [];
        let cart = [];
        // ======================== DOM references for modal ========================
        const modal = document.getElementById("plantModal");
        const modalTitle = document.getElementById("modalTitle");
        const modalImage = document.getElementById("modalImage");
        const modalCategory = document.getElementById("modalCategory");
        const modalPrice = document.getElementById("modalPrice");
        const modalDescription = document.getElementById("modalDescription");
        const modalClose = document.querySelector(".modal .close");
        const cartContainer = document.querySelector(".pright");
        const spinner = document.getElementById("spinner");

        // Close modal on clicking X
        modalClose.addEventListener("click", () => {
            modal.style.display = "none";
        });

        // Close modal when clicking outside content
        window.addEventListener("click", (e) => {
            if (e.target === modal) modal.style.display = "none";
        });

        // ======================== Load All Plants ========================
        showSpinner();
        fetch(getplants)
            .then((res) => res.json())
            .then((data) => {
                allPlants = data.plants;
                displayAllPlants(allPlants);
                hideSpinner();
            })
            .catch((err) => {
                console.error("Error fetching plants:", err);
                hideSpinner();
            });

        // ======================== Load All Categories ========================
        showSpinner();
        fetch(getallcatagory)
            .then((res) => res.json())
            .then((data) => {
                allCategories = data.categories;
                displayAllCategories(allCategories);
                hideSpinner();
            })
            .catch((err) => {
                console.error("Error fetching categories:", err);
                hideSpinner();
            });

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
                button.classList.add("cart", "add-to-cart-btn");
                button.innerText = "Add to Cart";
                button.addEventListener("click", () => addToCart(plant));
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
                    const plant = data; // API returns a single plant object
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

        // Function to render cart
        function renderCart() {
            cartContainer.innerHTML = `<h1>Your Cart</h1>`;

            if (cart.length === 0) {
                const emptyMsg = document.createElement("p");
                emptyMsg.classList.add("cart-empty");
                emptyMsg.innerText = "Cart is empty.";
                cartContainer.appendChild(emptyMsg);
                return;
            }

            const div = document.createElement("div");
            div.classList.add("cart-items");

            let total = 0;

            cart.forEach((item, index) => {
                const divmini = document.createElement("div");
                divmini.classList.add("cart-item");
                divmini.classList.add("light1");

                divmini.innerHTML = `
                <span class="span-cart">${item.name} <br> &#2547; ${item.price}</span>
                <button class="cart-remove-btn" data-index="${index}">&times;</button>
            `;
                div.appendChild(divmini);
                total += item.price;
            });

            cartContainer.appendChild(div);

            const totalDiv = document.createElement("div");
            totalDiv.classList.add("cart-total");
            totalDiv.innerHTML = `<strong>Total: &#2547; ${total}</strong>`;
            cartContainer.appendChild(totalDiv);

            // Remove button event
            const removeButtons = div.querySelectorAll(".cart-remove-btn");
            removeButtons.forEach((btn) => {
                btn.addEventListener("click", (e) => {
                    const idx = e.target.dataset.index;
                    cart.splice(idx, 1);
                    renderCart();
                });
            });
        }

        // ======================== Add to Cart ========================
        function addToCart(plant) {
            cart.push(plant);
            renderCart();
        }

        function showSpinner() {
            spinner.style.display = "block";
        }

        function hideSpinner() {
            spinner.style.display = "none";
        }
  