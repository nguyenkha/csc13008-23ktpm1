// Accessing elements
const mainHeader = document.getElementById('main-header');
const listItems = document.querySelectorAll('.list-item');

// Traversing the DOM
const parent = mainHeader.parentNode;
const firstChild = parent.firstElementChild;
const lastChild = parent.lastElementChild;

// Outputting results
console.log('Main Header:', mainHeader.textContent);
console.log('List Items:', listItems);
console.log('Parent Element:', parent);
console.log('First Child:', firstChild.textContent);
console.log('Last Child:', lastChild.textContent);