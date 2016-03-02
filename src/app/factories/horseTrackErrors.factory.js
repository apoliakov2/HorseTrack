export function horseTrackErrors(errorCodes) {
  'ngInject';
  let errorsMap = new Map();
  const TEMPLATE = '%COMMAND%';

  errorsMap.set(errorCodes.INVALID_COMMAND, 'Invalid Command: ' + TEMPLATE);
  errorsMap.set(errorCodes.INVALID_HORSE_NUMBER, 'Invalid Horse Number: ' + TEMPLATE);
  errorsMap.set(errorCodes.INVALID_BET, 'Invalid Bet: ' + TEMPLATE);
  errorsMap.set(errorCodes.NO_PAYOUT, 'No Payout: ' + TEMPLATE);
  errorsMap.set(errorCodes.INSUFFICIENT_FUNDS, 'Insufficient Funds: ' + TEMPLATE);

  return {
    // returns error message based on error code with the input that caused error
    getError: function(errorCode, input) {
      let retValue = errorsMap.get(errorCode);
      //if (retValue !== undefined) {
      if (angular.isDefined(retValue)) {
        return retValue.replace(TEMPLATE, input);
      }
    }
  };
}
