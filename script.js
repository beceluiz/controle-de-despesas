const transactionsUL = document.querySelector(".transactions");
const incomeDisplay = document.querySelector("#money-plus");
const expenseDisplay = document.querySelector("#money-minus");
const balanceDisplay = document.querySelector("#balance");
const form = document.querySelector("#form");
const inputTransactionName = document.querySelector("#text");
const inputTransactionAmount = document.querySelector("#amount");

const localStorageTransctions = JSON.parse(
  localStorage.getItem("transactions")
);
let transactions =
  localStorage.getItem("transactions") !== null ? localStorageTransctions : [];

const removeTransaction = (ID) => {
  transactions = transactions.filter((transaction) => transaction.id !== ID);
  updateLocalStorage();
  init();
};

const addTransactionIntoDOM = ({ amount, name, id }) => {
  const operator = amount < 0 ? "-" : "+";
  const li = document.createElement("li");
  const amountWithoutOperator = Math.abs(amount);
  const CSSClas = amount < 0 ? "minus" : "plus";

  li.classList.add(CSSClas);
  li.innerHTML = `${name} <span>${operator} R$ ${amountWithoutOperator} </span>
  <button class="delete-btn" onClick="removeTransaction(${id})">
  x
  </button>`;

  transactionsUL.append(li);
};

const getExpenses = (transactionsAmounts) =>
  Math.abs(
    transactionsAmounts
      .filter((value) => value < 0)
      .reduce((acc, value) => acc + value, 0)
  ).toFixed(2);

const getIncome = (transactionsAmounts) =>
  transactionsAmounts
    .filter((value) => value > 0)
    .reduce((acc, value) => acc + value, 0)
    .toFixed(2);

const getTotal = (transactionsAmounts) =>
  transactionsAmounts
    .reduce((acc, transaction) => acc + transaction, 0)
    .toFixed(2);

const updateBalanceValues = () => {
  const transactionsAmounts = transactions.map(({ amount }) => amount);
  const total = getTotal(transactionsAmounts);
  const income = getIncome(transactionsAmounts);
  const expense = getExpenses(transactionsAmounts);

  balanceDisplay.textContent = `R$ ${total}`;
  incomeDisplay.textContent = `R$ ${income}`;
  expenseDisplay.textContent = `R$ ${expense}`;
};

const init = () => {
  transactionsUL.innerHTML = "";
  transactions.forEach(addTransactionIntoDOM);
  updateBalanceValues();
};

init();

const updateLocalStorage = () => {
  localStorage.setItem("transactions", JSON.stringify(transactions));
};

generateID = () => Math.round(Math.random() * 1000);

const addToTransactionsArray = (transactionName, transactionAmount) => {
  transactions.push({
    id: generateID(),
    name: transactionName,
    amount: Number(transactionAmount),
  });
};

const cleanInputs = () => {
  inputTransactionName.value = "";
  inputTransactionAmount.value = "";
};

const handleFormSubmit = (event) => {
  event.preventDefault();

  const transactionName = inputTransactionName.value.trim();
  const transactionAmount = inputTransactionAmount.value.trim();
  const isSomeInputEmpty =
    inputTransactionName.value.trim() === "" ||
    inputTransactionAmount.value.trim() === "";

  if (isSomeInputEmpty) {
    alert("Por favor, Preencha ambos os Campos, Nome e Valor.");
    return;
  }

  addToTransactionsArray(transactionName, transactionAmount);
  init();
  updateLocalStorage();
  cleanInputs();
};

form.addEventListener("submit", handleFormSubmit);
