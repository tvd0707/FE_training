// const sum = (a = 0, b = 0) => {
//     return a + b;
// }

// const sum = (a, b) => {
//     a = a || 0;
//     b = b || 0;
//     return a + b;
// }

// console.log(sum());



// const array1 = [1, 2, 3];
// const array2 = [4, 5, 6];
// const array3 = [...array1, ...array2];
// console.log(array1);
// console.log(array2);
// console.log(array3);

// let infoUser = {
//     fullName: "Tran Vu Dat",
//     email: "tvd0707@gmail.com"
// }

// let infoUpdate = {
//     age: 22,
//     phone: "0123456789"
// }

// let infoFinal = {
//     ...infoUser,
//     ...infoUpdate
// }

// console.log(infoUser);
// console.log(infoUpdate);
// console.log(infoFinal);

// const sum = (...numbers) => {
//     console.log(numbers);
//     const result = numbers.reduce((total, item) => {
//         return total + item;
//     }, 0);
//     return result
// };

// console.log(sum(10, 20, 30, 40));


let infoUser = {
    fullName: "Tran Vu Dat",
    email: "tvd0707@gmail.com"
} || {};

var { fullName } = infoUser;
console.log(fullName);

console.log(infoUser);

