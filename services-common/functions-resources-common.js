'use strict'

function ReturnSeconds(money, costForSecond) {
  debugger;
  if (money < costForSecond)
    return 0
  return parseInt((money / costForSecond));
}

function ReturnInfo(obj) {
  debugger;
  let totalSecond = ReturnSeconds(obj.moneyInAccount, obj.costForSecond);
  return ({
    message: `Usted tiene un salgo de ${obj.moneyInAccount} pesos y tiene ${totalSecond} segundos, valor del segundo ${obj.costForSecond} pesos`,
    seconds: totalSecond
  });
}

function RestarSeconds(second, valueForsSconds) {
  return (second * valueForsSconds);
}

module.exports = {
  ReturnInfo,
  RestarSeconds
};
