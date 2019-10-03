#!/usr/bin/env node

// install jest with `npm install -g --save-dev jest`
let VolunteersCalculator = require("./volunteers_calculator");

test('processFile', function() {
  let calculator = new VolunteersCalculator();
  calculator.processFile('food_shelf_north.txt', function(daysCount, data) {
    expect(data.length).toEqual(5);
    expect(calculator.daysCount).toEqual(5);
  });
});

test('testBagsStillNeeded', function() {
  let calculator = new VolunteersCalculator();
  let data = [[10,20,17],
              [13,22,8]];

  calculator.data = data;
  calculator.daysCount = 2;

  let computedBagsStillNeeded = calculator.getBagsStillNeeded()

  expect(computedBagsStillNeeded[0]).toEqual(3);
  expect(computedBagsStillNeeded[1]).toEqual(14);
});

test('testBagsStockedPerVolunteer', function() {
  let calculator = new VolunteersCalculator();

  let data = [[15,45,35],
              [16,44,32],
              [12,33,22]];

  calculator.data = data;
  calculator.daysCount = 3;

  let computedBagsStockedPerVolunteer = calculator.getBagsStockedPerVolunteer()

  expect(computedBagsStockedPerVolunteer[0].toFixed(2)).toEqual('2.33');
  expect(computedBagsStockedPerVolunteer[1].toFixed(2)).toEqual('2.00');
  expect(computedBagsStockedPerVolunteer[2].toFixed(2)).toEqual('1.83');
});

test('testVolunteersNeeded', function() {
  let calculator = new VolunteersCalculator();

  calculator.bagsStillNeeded = [17,20,1];
  calculator.bagsStockedPerVolunteer = [12,17.55,4.18];
  calculator.daysCount = 3;

  let computedVolunteersNeeded = calculator.getVolunteersNeeded();

  expect(computedVolunteersNeeded[0]).toEqual('1');
  expect(computedVolunteersNeeded[1]).toEqual('1');
  expect(computedVolunteersNeeded[2]).toEqual('0');
});

test('testResultsWithoutDayNames', function() {
  let calculator = new VolunteersCalculator();

  let volunteers = [17,20];

  let computedResults = calculator.getResults(volunteers);

  expect(computedResults[0]).toEqual('17 additional volunteers are needed on day 0')
  expect(computedResults[1]).toEqual('20 additional volunteers are needed on day 1')
});
