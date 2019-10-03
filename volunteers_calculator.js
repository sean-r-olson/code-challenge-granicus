#!/usr/bin/env node

let fs = require("fs");

let VolunteersCalculator = module.exports = function(){

  return {
    bagsStillNeeded: null,
    bagsStockedPerVolunteer: null,
    volunteersNeeded: null,
    daysCount: null,
    data: null,
    results: null,
    resultsDescending: null,
    resultsWithDays: null,

    processFile: function(f, done) {
      let self = this;
      fs.readFile(f, 'utf8', function (err,data) {
        let lines = data.split('\n');
        this.volunteerData = [];
        for(let line = 0; line < lines.length; line++){
          this.volunteerData.push(lines[line].split(','));
        }
        let daysCount = (this.volunteerData.length-1);
        data = this.volunteerData.splice(1);

        self.daysCount = daysCount;
        self.data = data;
        done(daysCount, data);
      });
    },

    // determine number of additional volunteers needed/day
    // IN ORDER OF DAY OF THE WEEK
    getResults: function(volunteers) {
      this.results = [];
      for(let i = 0; i< volunteers.length; i++) {
        let result = (volunteers[i] +" additional volunteers are needed on day "+i)
        this.results.push(result)
      }
      return this.results;
    },

    // determine number of additional volunteers needed/day 
    // WITHOUT DAY OF THE WEEK - IN DESCENDING ORDER BASED ON # OF ADD. VOLUNTEERS NEEDED
    getResultsDescending: function(volunteers) {
      this.resultsDescending = [];
      for(let i = 0; i< volunteers.length; i++) {
        let result = (volunteers[i] +" additional volunteers are needed on day "+i)
        this.resultsDescending.push(result)
        console.log(result)
      }
      console.log(this.resultsDescending.sort(function(a,b){return b.split('additional')[0] - a.split('additional')[0]}));
      return this.resultsDescending;
    },

    // determine number of additional volunteers needed/day 
    // WITH DAY OF WEEK - IN DESCENDING ORDER BASED ON # OF ADD. VOLUNTEERS NEEDED
    getResultsWithDays: function(volunteers) {
      this.resultsWithDays = [];
      let daysOfTheWeek = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'];
      for(let i = 0; i< volunteers.length; i++) {
        let result = (volunteers[i]+" additional volunteers are needed on "+ daysOfTheWeek[i])
        this.resultsWithDays.push(result)
        console.log(result)
      }

      console.log(this.resultsWithDays.sort(function(a,b){return b.split('additional')[0] - a.split('additional')[0]}));
      return this.resultsWithDays;
    },

    // determine bags still needed (Bags Still Needed = Goal Bags - Actual Bags)
    getBagsStillNeeded: function() {
      if (this.bagsStillNeeded !== null) {
        return this.bagsStillNeeded;
      }

      this.bagsStillNeeded = [];
      for(let i = 0; i < this.daysCount; i++) {
        let goalBags = (this.data[i][1]);
        let actualBags = (this.data[i][2]);
        this.bagsStillNeeded.push(goalBags - actualBags);
      };
      return this.bagsStillNeeded;
    },

    // determine bags stocked per volunteer (Bags Stocked Per Volunteer = Actual Bags / Volunteers)
    getBagsStockedPerVolunteer: function() {
      if (this.bagsStockedPerVolunteer !== null) {
        return this.bagsStockedPerVolunteer;
      }

      this.bagsStockedPerVolunteer = [];
      for(let i = 0; i < this.daysCount; i++) {
        let bagsStocked = this.data[i][2];
        let volunteers = this.data[i][0];
        this.bagsStockedPerVolunteer.push((bagsStocked/volunteers));
      };
      return this.bagsStockedPerVolunteer;
    },
    
    // determine total volunteers needed/day (Volunteers Needed = Bags Still Needed / Bags Stocked Per Volunteer)
    getVolunteersNeeded: function() {
      if (this.volunteersNeeded !== null) {
        return this.volunteersNeeded;
      }

      let volunteersNeeded = [];
      for(let j = 0; j < this.daysCount; j++) {
        let v = (this.getBagsStillNeeded()[j]/this.getBagsStockedPerVolunteer()[j])
        volunteersNeeded.push(v.toFixed(0));
      };
      return volunteersNeeded;
    },
  }
}

if (require.main === module) {
  let calculator = new VolunteersCalculator();
  let readAndPrint = function(arg) {
    calculator.processFile(arg, function() {
      let volunteers = calculator.getVolunteersNeeded();
      calculator.getResultsDescending(volunteers);
      calculator.getResultsWithDays(volunteers);
    });
  }

  if (process.argv.length === 3) {
    readAndPrint(process.argv[2]);
  } else {
    console.log("Please follow the README instructions to run the program.");
  }
}
