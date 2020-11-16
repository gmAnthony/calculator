---
permalink: /index.html
---

# The [Odin Project](https://www.theodinproject.com/) Web Dev 101 Keystone Project
## A JS-Powered Calculator

### HTML
The HTML structure is very simple. I created a overall container to apply broad styles to and then two smaller divs, `display` and `keyboard`. The display contains the numerical display of the calculator and the keyboard contains the keys. Each key is a button with a `value` attribute.

### CSS
I went for a skeuomorphic design with a retro feel. I used lots of shadows to create a more real looking calculator. 

I used grid to set up the display and buttons and used `grid-template-areas` to position the grid. Flex was used to position the display screen.

### JS
The base functionality of the calculator is encapsulated in four functions: `getStoredNum`, `storeNum`, `getCurrNum`, `setCurrNum`. These functions store equations in history, get equations stored in history, get currently entered numbers, and set currently entered numbers. The display is updated through these functions.

Numbers needed to be formatted so that they didn't overflow the display. Functions like AC and DEL were made to reset the current number and stored equation or step-by-step delete the currently displayed number.

Decimal and negative functionality adds to the currently displayed number.

There is functionality for both clicking and key presses.

Instead of using the `eval` method, which can be a security risk, I made an `operate` function which parses the mathematical expression from the calculator into an array of strings where math is performed in the proper order. Negative numbers are supported.

### Opportunities
The code could be made a lot cleaner. Instead of using big if/else statements I could use switches. I didn't use them in this case because I wasn't as comfortable with them, but understand they present an opportunity to produce more efficient and cleaner code. I could also compartmentalize code a bit more and provide smaller, more specific functions and have one larger function to call the smaller functions. I deal with big numbers by hard-coding in a limit "9999999999999999", but that isn't the most elegant way to do it, I suppose. It does, in a way, emulate a classic calculator, however.