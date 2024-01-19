import { fetchApi } from "./fetchApi.js";

// fetch("https://dummyjson.com/products/categories")
//     .then(response => response.json())
//     .then(data => {
//         let htmls = "";
//         data.forEach(element => {
//             // console.log(element);
//             htmls += `
//                 <div class="category-item">${element}</div> 
//             `;
//         });
//         console.log(htmls);
//         // console.log(data);

//         const category = document.querySelector("#category");
//         category.innerHTML = htmls;
//     })


// Products
// fetch("https://dummyjson.com/products")
//     .then(response => response.json())
//     .then(data => {
//         // console.log(data.products);
//         let htmls = "";
//         data.products.forEach(item => {
//             htmls += `
//             <img src="${item.thumbnail}" alt="${item.title}">
//             <h3>${item.title}</h3>
//             <p>${item.price}</p>
//             `;
//         });

//         const divProducts = document.querySelector("#products");
//         divProducts.innerHTML = htmls;
//     })

// const fetchApi = (url => {
//     const result = fetch(url)
//         .then(reponse => reponse.json())
//         .then(data => {
//             return data;
//         });
//     return result
// })

// fetchApi("https://dummyjson.com/products")
//     .then(data => {
//         // console.log(data.products);
//         let htmls = "";
//         data.products.forEach(item => {
//             htmls += `
//             <img src="${item.thumbnail}" alt="${item.title}">
//             <h3>${item.title}</h3>
//             <p>${item.price}</p>
//             `;
//         });

//         const divProducts = document.querySelector("#products");
//         divProducts.innerHTML = htmls;
//     })


// const fetchApiAsyncAwait = async (url) => {
//     const response = await fetch(url);
//     const result = await response.json();
//     return result;
// }

fetchApi("https://dummyjson.com/products")
    .then(data => {
        // console.log(data.products);
        let htmls = "";
        data.products.forEach(item => {
            htmls += `
            <img src="${item.thumbnail}" alt="${item.title}">
            <h3>${item.title}</h3>
            <p>${item.price}</p>
            `;
        });

        const divProducts = document.querySelector("#products");
        divProducts.innerHTML = htmls;
    })