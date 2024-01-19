import { fetchApi } from "./fetchApi.js";
import { API_CATEGORY } from "./contants.js";
import { params } from "./variable.js";
import { drawProducts } from "./drawProduct.js";

const category = document.querySelector("#category")

fetchApi(API_CATEGORY).then(data => {
    let htmls = data.map((item) => {
        return `
            <div class="category__item" data-category="${item}">
                ${item}
            </div>
            `;
    });

    category.innerHTML = htmls.join("");

    const listCategory = document.querySelectorAll("#category .category__item");
    listCategory.forEach(item => {
        item.addEventListener("click", function() {
            // console.log(item.innerText);
            params.category = item.innerText;
            // params.category = item.dataset.category;
            // params.category = item.getAttribute("data-category");
            console.log(params);
            drawProducts();
        })
    })
})
