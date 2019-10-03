## Problem 1 

Problem: 

- Unit test (testBagsStillNeeded) failed --> computedBagsStillNeeded[0] = 0 (Expected to equal: 3).. 

Solution: 

- First I looked at the syntax of the test, to ensure there were no errors - I figured though, that there were no erros in the test, considering the test successfully ran, therefore the error must exist in the function to calculate the bags needed
- After feeling good about the syntax of the test, I took a look at the README to see how the bags needed was supposed to be calculated. 
- I then took a look at the volunteers_calculator code, looking for the getBagsStillNeeded function that the unit test was running 
- I saw that the function was attempting to subtract the actual bags row of data from itself. I figured that was why the test was receiving a total of 0 bags still needed. 
- I took a look at the txt file, and concluded i needed to subtract the data at index 2 from the data at index 1 to calculate the correct difference. 
- I then changed the syntax of the function so that I would be declaring the goal bags and actual bags separately, then subtracting one from the other, and pushing the difference into the getBagsStillNeeded array. 

## Problem 2

- My first instinct was to write a conditional to declare a new variable each time 'i' reached a new value.. i.e. if i=0, let mondayResult = volunteers[i]+" additional volunteers are needed on "+ ' monday'), else if=1, let tuesdayResult = ... etc. .. however, with this method, I was not able to reach each condition in order to declare each day of the week's result with the day name attached. 
- I then realized that since we were extracting the value of volunteers needed at [i], I would be able to extract the value of each day from an array containing each day of the week, at the index of [i]. So that is what I did - declared an array as daysOfTheWeek, with Monday through Friday set as strings. I made a new function for determining the results for each day, in order to leave the original function, not containing day names, in the code.

## Problem 3 

- I knew, when reading this problem, there was an array sorting method in javascript. So I took to google to refresh my memory in what this method was called, and what the syntax was. I found the sort method, which can sort just an array of strings, and also the option of passing in a compare function into the sort method to sort an array of integers in descending or ascending order. 
- I tried, at first, passing in the compare function, to sort the array by its highest to lowest value. The problem I was having with this, I realized, was that 1) this is an array of strings, not an array of integers, I'm sorting through and 2) this method wouldn't know which integer to look for in each string in order to sort the array in descending order. 
- I tried then, since I knew this is an array of strings I'm sorting through, to just try the sort method with no parameters passed. This didn't work, as it seemed the method didn't know what value to look for to sort by. 
- I then did some more research, and found an example in stackoverflow of someone sorting through an array containing integers as well as other characters. In the most highly ranked answer, the example used the sort method as well as the split method, to run through each string, and once a certain character in each string was reached, the split method would extract the values that existed in the string up until that designated character. I then tried using this method to compare each string up until 'additional' (each string started with the number I was trying to access/compare with other numbers in the other strings). This method ended up working. 

## Problem 4 

- It seems unnecessary to declare 'self' equating to 'this', in the processFile function
    - * after removing the declaration of 'self', and running the test, i received an error as follows: 
    - "Comparing two different types of values. Expected number but received null."
- Change let to let or const for declaring variables (ES6 standards)
- Arrow functions or function functionName () syntax for writing functions 
- daycount is an unused function
- Re-order functions to follow README file 
    - 1) Bags Still Needed = Goal Bags - Actual Bags
    - 2) Bags Stocked Per Volunteer = Actual Bags / Volunteers
    - 3) Volunteers Needed = Bags Still Needed / Bags Stocked Per Volunteer
- Code comments
- For the client, include a command in the README file to run in the terminal to run food_shelf_south.txt (node volunteers_calculator.js food_shelf_south.txt)
- Provide a whole number for the calculation of volunteers needed - no decimal points, instead of 2 - passing '0' into the 'toFixed' method in the getVolunteersNeeded function, instead of '2'
    - in this case, you would need to change the 'testVolunteersNeeded' unit test to expecting whole numbers 