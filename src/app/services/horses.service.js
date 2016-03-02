export function horsesService($log, appConstants, errorCodes) {
  'ngInject';

  var horses = [
    {
      number: 1,
      name: 'That Darn Gray Cat',
      odds: 5,
      didWin: true
    },
    {
      number: 2,
      name: 'Fort Utopia',
      odds: 10,
      didWin: false
    },
    {
      number: 3,
      name: 'Count Sheep',
      odds: 9,
      didWin: false
    },
    {
      number: 4,
      name: 'Ms Traitour',
      odds: 4,
      didWin: false
    },
    {
      number: 5,
      name: 'Real Princess',
      odds: 3,
      didWin: false
    },
    {
      number: 6,
      name: 'Pa Kettle',
      odds: 5,
      didWin: false
    },
    {
      number: 7,
      name: 'Gin Stinger',
      odds: 6,
      didWin: false
    }
  ];

  // Reset the winning horse to 1
  this.reset = function () {
    horses.forEach(function (entry) {
      if (entry.number === 1) {
        entry.didWin = true;
      } else {
        entry.didWin = false;
      }
    });
  };

  // returns the list of all horses in the format:
  // NUMBER,HORSE_NAME,ODDS,WIN?_YES_NO
  this.getHorsesList = function () {
    $log.debug('horsesService, "getHorsesList" function called');
    let list = [appConstants.HorseListTitle];
    horses.forEach(function (entry) {
      list.push(entry.number + ',' + entry.name + ',' + entry.odds + ',' + (entry.didWin ? 'Yes' : 'No'));
    });
    return list;
  };

  // set the winning horse; if the provided horse number is out of range - returns error message
  this.setWinningHorse = function (horseNumber = -1) {
    $log.debug('horsesService, "setWinningHorse" function called');
    $log.debug("win horse: " + horseNumber);
    if (horseNumber < 1 || horseNumber > horses.length) {
      return errorCodes.INVALID_HORSE_NUMBER;
    }

    horses.forEach(function (entry) {
      entry.didWin = false;
      if (entry.number === horseNumber) {
        entry.didWin = true;
      }
    });
  };

  // bet money on the specific horse;
  // if the horse number is out of range of available horses - returns error message
  this.setHorseWagedOn = function (horseNumber = -1, wagedAmount = 0) {
    $log.debug('horsesService, "setHorseWagedOn" function called');
    $log.debug('horse number: ' + horseNumber + ', waged amount: ' + wagedAmount);
    if (horseNumber < 1 || horseNumber > horses.length) {
      return errorCodes.INVALID_HORSE_NUMBER;
    }
    if (!Number.isInteger(wagedAmount)) {
      return errorCodes.INVALID_BET;
    }

    let retValue;
    horses.forEach(function (entry) {
      if (entry.number === horseNumber && entry.didWin) {
        retValue = {};
        retValue.name = entry.name;
        retValue.winnings = entry.odds * wagedAmount;
        $log.debug('Winnings: ' + retValue.winnings);
      } else if (entry.number === horseNumber && !entry.didWin) {
        retValue = errorCodes.NO_PAYOUT;
      }
    });
    return retValue;
  };

  // returns the name of the specified horse
  this.getHorseName = function (horseNumber = -1) {
    let retValue;
    horses.forEach(function (entry) {
      if (entry.number === horseNumber) {
        retValue = entry.name;
      }
    });
    return retValue;
  };


};
