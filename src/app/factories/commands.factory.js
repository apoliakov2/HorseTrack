export function commandsService($log, inventoryService, horsesService, horseTrackErrors, errorCodes) {
  'ngInject';
  let commands = [
    {
      description: 'Quit the application',
      pattrn: /^[qQ]{1}$/g,           // 'q' or 'Q' -  - acceptable input
      action: function() {
        return -1;
      }
    },
    {
      description: 'Restock the cash inventory',
      pattrn: /^[rR]{1}$/g,           // 'r' or 'R' -  - acceptable input
      action: function() {
        return inventoryService.restock();
      }
    },
    {
      description: 'Set the winning horse',
      pattrn: /^[wW]{1} [0-9]*$/g,    // 'w' or 'W' [1-7] -  - acceptable input, otherwise - error
      action: function(input = '') {
        if (input === '')
          return;
        let horseNumber = input.split(' ')[1],
            result = horsesService.setWinningHorse(Number(horseNumber)),
            retValue = (angular.isDefined(result)? horseTrackErrors.getError(result, horseNumber) : undefined);
        return retValue;
      }
    },
    {
      description: 'Specifies the horse wagered on and the amount of the bet',
      pattrn: /^[0-9]* [0-9.,$]*$/g,  // [1-7] <amount> - acceptable input, otherwise - error
      action: function(input = '') {
        if (input === '') {
          return;
        }
        let args = input.split(' '),
            result = horsesService.setHorseWagedOn(Number(args[0]), Number(args[1])),
            retValue;
        if (angular.isNumber(result)) {
          switch(result) {
            case errorCodes.INVALID_HORSE_NUMBER:
              retValue = horseTrackErrors.getError(result, args[0]);
              break;
            case errorCodes.INVALID_BET:
              retValue = horseTrackErrors.getError(result, args[1]);
              break;
            case errorCodes.NO_PAYOUT:
              retValue = horseTrackErrors.getError(result, horsesService.getHorseName(Number(args[0])));
              break;
          }
        } else if (angular.isObject(result)) {
          $log.debug('Payout for horse: ' + result.name);
          let dispenseResult = inventoryService.dispenseCash(result.winnings);
          retValue = [];
          if (angular.isNumber(dispenseResult)) {
            retValue.push(horseTrackErrors.getError(dispenseResult, '$' + result.winnings));
          } else {
            retValue.push('Payout: ' + result.name + ',' + result.winnings);
            retValue = retValue.concat(dispenseResult);
          }
        }
        return retValue;
      }
    }
  ];

  return {
    // matches the given command against each item in the predefined array of patterns;
    // if matches - executes the given command by calling action() function of the corresponing item in the "commands" array;
    // if invalid command - returns error message
    executeCommand: function(input = '') {
      let result,
          matchedPattrn = false;
      try {

        for (let cmd in commands) {
          if (input.match(commands[cmd].pattrn) !== null) {
            matchedPattrn = true;
            result = commands[cmd].action(input);
            break;
          }
        }
        if (!matchedPattrn) {
          result = horseTrackErrors.getError(errorCodes.INVALID_COMMAND, input);
        }
      } catch (error) {
        $log.error('ERROR executeCommand: ' + error)
      }
      return result;
    }
  };
};
