// const menu = document.querySelector("#menu");
// console.log(menu);

// const inputName = document.querySelector("#inputName");
// inputName.onblur = function() {
//     inputName.value = inputName.value.toUpperCase();
//     inputName.classList.remove("focus");
// }

// inputName.onfocus = function() {
//     inputName.classList.add("focus");
// }

// inputName.onkeydown = function() {
//     console.log("onkeydown");
// }

// inputName.onkeyup = function() {
//     // console.log("onkeyup");
//     alert("hi");
// }

// onlick
// const buttonMenu = document.querySelector("#buttonMenu");
// const buttonClose = document.querySelector("#buttonClose");
// const menu = document.querySelector("#menu")

// buttonMenu.onclick = function() {
//     menu.classList.add("show");
// }

// buttonClose.onclick = function() {
//     menu.classList.remove("show");
// }

// const colors = document.querySelector("#colors");
// colors.onchange = function() {
//     let currentColor = colors.value;
//     console.log(currentColor);
// }

const inputName = document.querySelector("#inputName");
console.log(inputName);
inputName.onchange = function() {
    console.log(inputName.value);
}