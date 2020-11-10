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

The JS uses the `eval` method instead of making functions for adding, subtracting, etc. like TOP asks for. It seemed redudant to make a bunch of functions to evaluate an mathematical expression instead of just using the built in `eval` method. 