import { drawProducts } from "./drawProduct.js";
import { buttonSearch, filter, inputSearch, params } from "./variable.js";

// const inputSearch = document.querySelector("#search input");
// const buttonSearch = document.querySelector("#search button");

drawProducts();

const search = () => {
    params.q = inputSearch.value;
    drawProducts();
}

buttonSearch.addEventListener("click", function () {
    // params.q = inputSearch.value;
    // console.log(inputSearch.value);
    // drawProducts();
    search();
});

inputSearch.addEventListener("keydown", function (e) {
    console.log(e);
    if (e.key === "Enter") {
        // params.q = inputSearch.value;
        // drawProducts();
        search();
    }
})

// const filter = document.querySelector("#filter");
filter.addEventListener("change", function (e) {
    console.log(e.target.value);
    switch (e.target.value) {
        case "mac-dinh":
            params.sort = "";
            params.order = "";
            break;

        case "gia-thap-den-cao":
            params.sort = "price";
            params.order = "asc";
            break;

        case "gia-cao-den-thap":
            params.sort = "price";
            params.order = "desc";
            break;

        case "giam-gia-nhieu":
            params.sort = "discountPercentage";
            params.order = "desc";
            break;
        default:
            break;
    }
    drawProducts();
})

const pagiPrev = document.querySelector("#paginationPrev");
const pagiNext = document.querySelector("#paginationNext");
const pagiNumber = document.querySelector("#paginationNumber");
pagiNext.addEventListener("click", function () {
    params.page += 1;
    pagiNumber.innerHTML = params.page;
    drawProducts();
});

pagiPrev.addEventListener("click", function () {
    if (params.page > 1) {
        params.page -= 1;
        pagiNumber.innerHTML = params.page;
        drawProducts();
    }
});