/*
 * This is a JavaScript Scratchpad.
 *
 * Enter some JavaScript, then Right Click or choose from the Execute Menu:
 * 1. Run to evaluate the selected text (Ctrl+R),
 * 2. Inspect to bring up an Object Inspector on the result (Ctrl+I), or,
 * 3. Display to insert the result in a comment after the selection. (Ctrl+L)
 */
var number = 5;
defaultColor = 'hot pink';
var thisMakeSenseSoFar = true;
var numberA = 5;
var numberB = 10;
var numberC = 15;
var numberD = 20;
var numberE = 25;
//Array syntax
var numbers = [
  5,
  10,
  15,
  20,
  25
];
numbers[2];
//object syntax
var fruit = {
  kind: 'grape',
  color: 'red',
  quantity: 12,
  tasty: true
};
fruit.kind
fruit.color //obbject array syntax
var fruits = [
  {
    kind: 'grape',
    color: 'red',
    quantity: 12,
    tasty: true
  },
  {
    kind: 'kiwi',
    color: 'brown',
    quantity: 98,
    tasty: true
  },
  {
    kind: 'banana',
    color: 'yellow',
    quantity: 0,
    tasty: true
  },
];
fruits[2].kind //json syntax
var jsonFruit = {
  'kind': 'orange',
  'color': 'orange',
  'quantity': 3,
  'tasty': true
};
jsonFruit.kind //json array syntax
var jsonFruit = [
  {
    'kind': 'orange',
    'color': 'orange',
    'quantity': 3,
    'tasty': true
  },
  {
    'kind': 'banana',
    'color': 'yellow',
    'quantity': 3,
    'tasty': true
  },
  {
    'kind': 'orange',
    'color': 'orange',
    'quantity': 3,
    'tasty': true
  }
];
jsonFruit[1].kind

typeof 42;
var calculateGratuity = function(bill) {
  return bill * 0.2;
};
var tip = calculateGratuity(38);
console.log(tip); //Prints 7.6 to the console

window.String === String;

<svg width="50" height="50">
<circle cx="25" cy="25" r="22" fill="blue" stroke="gray" stroke-width="2"/>
</svg>


