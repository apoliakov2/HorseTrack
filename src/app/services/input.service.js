export function inputService($log, horsesService, inventoryService, commandsService) {
  'ngInject';

  var input = '',
    output = [];

  // parsing the particular key that user just pressed;
  // If Enter - executes the whole command
  this.parseInput = function (event) {
    output = [];
    switch (event.which) {
      case 8: // Backspace
        if (input.length > 0) {
          input = input.substring(0, input.length - 1);
        }
        break;
      case 13: // Enter
        if (input.trim() === '') return;
        let result = commandsService.executeCommand(input);
        output = output.concat(inventoryService.getInventoryList().concat(horsesService.getHorsesList()));
        if (angular.isDefined(result)) {
          if (result === -1) {
            quitApp();
          } else {
            if (angular.isArray(result)) {
              output = output.concat(result);
            } else {
              $log.info('result : ' + result);
              output.push(result);
            }
          }
        }
        input = '';
        break;
      default:
        input += String.fromCharCode(event.which);
        break;
    };
    return {
      input: input,
      output: output
    };
  };

  // returns the message that user sees when the applications is launched
  this.getInitialInput = function() {
    return inventoryService.getInventoryList().concat(horsesService.getHorsesList())
  };

};
