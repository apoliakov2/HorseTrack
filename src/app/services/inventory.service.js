export function inventoryService($log, appConstants, $filter, errorCodes) {
  'ngInject';

  let cash = [
    {
      denomination: 1,
      quant: 10,
      amount: 0,
      tempAmount: 0
    },
    {
      denomination: 5,
      quant: 10,
      amount: 0,
      tempAmount: 0
    },
    {
      denomination: 10,
      quant: 10,
      amount: 0,
      tempAmount: 0
    },
    {
      denomination: 20,
      quant: 10,
      amount: 0,
      tempAmount: 0
    },
    {
      denomination: 100,
      quant: 10,
      amount: 0,
      tempAmount: 0
    }
  ];

  // returns array of current inventory:
  // $<denomination>,<amount>
  this.getInventoryList = function() {
    $log.debug('service:inventoryService, "getInventoryList" function called');
    let retList = [appConstants.InventoryTitle];
    cash.forEach(function(entry) {
      retList.push($filter('currency')(entry.denomination) + ',' + entry.quant);
    });
    return retList;
  }

  // restocks the cash inventory
  this.restock = function () {
    cash.forEach(function(entry) {
      entry.quant = 10;
    });
  }

  // the actual calculation of the payout amount to be dispensed; changes the "cash" array
  function calculateAmount(cash = [], payout = -1, index = -1, tempAmount = -1) {
    if (index === -1) {
      return;
    }
    while(true) {
      if (cash[index].quant - cash[index].tempAmount === 0) {
        return calculateAmount(cash, payout, --index, tempAmount);
      }
      tempAmount += cash[index].denomination;
      cash[index].tempAmount++;
      if (tempAmount === payout) {
        return payout;
      }
      if (tempAmount > payout) {
        tempAmount -= cash[index].denomination;
        cash[index].tempAmount--;
        return calculateAmount(cash, payout, --index, tempAmount);
      }
    }
  }

  // calculates the cash amount to be dispensed depending on the availability of money in the inventory;
  // returns array in the next form:
  // $<denomination>: <number of bills>
  // $<denomination>: <number of bills>
  this.dispenseCash = function(payout = -1) {
    if (payout === -1) {
      return;
    }
    let retValue = calculateAmount(cash, payout, cash.length - 1, 0);
    if (angular.isUndefined(retValue)) {
      cash.forEach(function(entry) {
        //  entry.quant = entry.amount;
        //entry.amount = 0;
        entry.tempAmount = 0;
      });
      return errorCodes.INSUFFICIENT_FUNDS;
    }
    retValue = [];

    cash.forEach(function(entry) {
      entry.amount = entry.tempAmount;
      entry.quant -= entry.tempAmount;
      entry.tempAmount = 0;
      retValue.push('$' + entry.denomination + ':' + entry.amount);
    });
    return retValue
  }
}
