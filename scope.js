let a = 10; // variable a assigned to 10
if (a === 10) {
	let a = 15;
	let b = 6; // variable b assigned to 6 using let
	var c = 7; // variable c assigned to 7 using var
	console.log("a, b and c accessible (block scope)", a, b, c); // a, b and c accessible inside block scope
}
console.log("a and c accessible (global scope)", a, c); // in global scope on a and c accessible