let price = 1.87;
const cash = document.getElementById('cash');
let cid = [
["PENNY", 1.01],
["NICKEL", 2.05],
["DIME", 3.1],
["QUARTER", 4.25],
["ONE", 90],
["FIVE", 55],
["TEN", 20],
["TWENTY", 60],
["ONE HUNDRED", 100]
];

const displayChangeDue = document.getElementById('change-due');
const purchaseButton = document.getElementById('purchase-btn');
const cashInDrawer = document.getElementById('cash-in-drawer');

const checkCashRegister = (price, cash, cid) => {
  let change = cash - price;
  let status = "";
  let changeArray = [];

  // Display alerts in certain cases
  if (Number(cash.value) < price) {
    alert('Customer does not have enough money to purchase the item');
    cash.value = '';
    return;
  }

  if (Number(cash.value) === price) {
    displayChangeDue.innerHTML =
      '<p>No change due - customer paid with exact cash</p>';
    cash.value = '';
    return;
  }



  // Currency unit value
  const currencyUnit = {
      "PENNY": 0.01,
      "NICKEL": 0.05,
      "DIME": 0.1,
      "QUARTER": 0.25,
      "ONE": 1,
      "FIVE": 5,
      "TEN": 10,
      "TWENTY": 20,
      "ONE HUNDRED": 100
  };





  // Calculate change due in different denominations
  for (let i = cid.length - 1; i >= 0; i--) {
      const coinName = cid[i][0];
      const coinTotal = cid[i][1];
      const coinValue = currencyUnit[coinName];
      let coinAmount = (coinTotal / coinValue).toFixed(2);
      let returnAmount = 0;

      while (change >= coinValue && coinAmount > 0) {
          change -= coinValue;
          change = change.toFixed(2);
          coinAmount--;
          returnAmount++;
      }

      if (returnAmount > 0) {
          changeArray.push([coinName, returnAmount * coinValue]);
      }
  }

  // Update status
  if (change > 0) {
      status = "INSUFFICIENT_FUNDS";
      changeArray = [];
  } else if (change == 0 && changeArray.length < cid.length) {
      status = "OPEN";
  } else {
      status = "CLOSED";
  }

  return { status: status, change: changeArray };
};

const updateUI = (cashValue, price) => {
    if (cash === price) {
        console.log("you didi dyou crazy son o =f a gun, you did it!")
    }
}

purchaseButton.addEventListener('click', function() {
  let cashValue = cash.value; // Get the value from the cash input
  console.log(checkCashRegister(price, cashValue, cid)); // Call the function with the cash 
  updateUI(cashValue, price);
});

// Add event listener for keydown event
purchaseButton.addEventListener('keydown', function(event) {
  if (event.key === 'Enter') { // Check if the Enter key was pressed
      let cashValue = cash.value; // Get the value from the cash input
      console.log(checkCashRegister(price, cashValue, cid)); // Call the function with the cash value
  }
});

