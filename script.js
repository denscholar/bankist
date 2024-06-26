"use strict";

const account1 = {
  owner: "Dennis Akagha Doe",
  movement: [200, 300, 120, -100, -300],
  interestRate: 1.2,
  pin: 1123,
};
const account2 = {
  owner: "Janet John Smith",
  movement: [20, -300, 1200, -100, 90],
  interestRate: 0.2,
  pin: 1125,
};
const account3 = {
  owner: "John Doe Peter",
  movement: [50, 100, -120, 10, 300],
  interestRate: 1.5,
  pin: 1124,
};
const account4 = {
  owner: "Peter Smith John",
  movement: [10, 200, 20, -100, -30],
  interestRate: 1.2,
  pin: 2222,
};

const accounts = [account1, account2, account3, account4];
console.log(accounts);

const expenseWrapper = document.querySelector(".expenses-wrapper");
const expenses = document.querySelector(".expenses");
const accountBal = document.querySelector(".balance h2");
const income = document.querySelector(".in");
const withdrawal = document.querySelector(".out");
const interestVal = document.querySelector(".interest");
const submitBtn = document.querySelector(".submit__button");
const loginInput = document.querySelector(".input__login__user");
const loginPin = document.querySelector(".input__password__user");
const body = document.querySelector(".app");
const welcomeText = document.querySelector(".welcome__text");

// console.log(income.textContent);

expenseWrapper.innerHTML = "";

// display the expenses in the ui
const displayExpenses = function (expenses) {
  expenses.forEach((exp, index) => {
    const type = exp > 0 ? "Deposit" : "Widthdrawal";
    const colour = exp < 0 ? "red" : "green";

    const html = `
                <div class="expenses d-flex justify-content-between align-items-center mb-2"        style="border-bottom: 1px solid rgb(210, 210, 210); padding-bottom: 7px;">
                    <div class="details-wrapper d-flex justify-content-between align-items-center gap-3">
                      <div class="detail d-flex justify-content-center align-items-center" style="background-color: ${colour}; padding: 7px; border-radius: 20px; color: white; height: 25px; width: 120px;text-align: center;">${
      index + 1
    } ${type}</div>
                      <div class="days">Today</div>
                    </div>
                      <div class="amount">$${exp}</div>
                  </div>
    
    `;

    expenseWrapper.insertAdjacentHTML("afterbegin", html);
  });
};



// display balance using the reduce method
const displayBalance = function (movement) {
  const balance = movement.reduce(
    (previousValue, currentValue, currentIndex, array) =>
      previousValue + currentValue,
    0
  );

  accountBal.textContent = `$${balance}`;
};

// Display payment summary
const displaySummary = function (account) {
  // total Deposits/income
  const movementAcc = account.movement
    .filter((mov) => mov > 0)
    .reduce((curVal, curIn) => curVal + curIn, 0);

  income.innerHTML = `<span style="color: black; font-size: 15px;">In:</span> $${movementAcc}`;

  // total withdrawal
  const movementWidthrawal = account.movement
    .filter((mov) => mov < 0)
    .reduce((curVal, currIn) => curVal + currIn, 0);

  withdrawal.innerHTML = `<span style="color: red; font-size: 15px;">Out:</span> $${Math.abs(
    movementWidthrawal
  )}`;

  // total interest
  const interest = account.movement
    .filter((mov) => mov > 0)
    .map((deposit) => (deposit * account.interestRate) / 100)
    .reduce((curVal, curI) => curVal + curI, 0);

  interestVal.innerHTML = `<span style="color: black; font-size: 15px;">In:</span> $${interest.toFixed(
    2
  )}`;
};

// username feature using the split and join method
const callUsername = function (accs) {
  accs.forEach((acc) => {
    acc.username = acc.owner
      .toLowerCase()
      .split(" ")
      .map((ini) => ini[0])
      .join("");
  });
};

let currentAccount;

// event handler for login
submitBtn.addEventListener("click", function (e) {
  e.preventDefault();
  currentAccount = accounts.find((acc) => acc.username === loginInput.value);

  if (currentAccount && currentAccount.pin === Number(loginPin.value)) {
    // display the welcome message
    welcomeText.textContent = `Welcome back ${
      currentAccount.owner.split(" ")[0]
    }!`;
    // display the ui of the acoount
    body.style.opacity = 100;
    displayExpenses(currentAccount.movement);
    displayBalance(currentAccount.movement);
    displaySummary(currentAccount);

    // clear the input fields
    loginInput.value = " ";
    loginPin.value = " ";
  } else {
    console.log("wrong credentials");
  }

 
});

// calling the functions

callUsername(accounts);
