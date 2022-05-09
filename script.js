const transactionsUL = document.querySelector(".transactions");
const incomeDisplay = document.querySelector("#money-plus");
const expenseDisplay = document.querySelector("#money-minus");
const balanceDisplay = document.querySelector("#balance");
const form = document.querySelector("#form");
const inputTransactionName = document.querySelector("#text");
const inputTransactionAmount = document.querySelector("#amount");

const dummyTransactions = [
  { id: 1, name: "Bolo de Brigadeiro", amount: -20 },
  { id: 2, name: "Salario", amount: 300 },
  { id: 3, name: "Torta de Frango", amount: -10 },
  { id: 4, name: "Violão", amount: 150 },
];

const removeTransaction = (ID) => {
  dummyTransactions.filter((transaction) => transaction.id !== ID);
  console.log(dummyTransactions);
};

const addTransactionIntoDOM = (transaction) => {
  const operator = transaction.amount < 0 ? "-" : "+";
  const li = document.createElement("li");
  const amountWithoutOperator = Math.abs(transaction.amount);
  const CSSClas = transaction.amount < 0 ? "minus" : "plus";

  li.classList.add(CSSClas);
  li.innerHTML = `${transaction.name} <span>${operator} R$ ${amountWithoutOperator} </span>
  <button class="delete-btn" onClick="removeTransaction(${transaction.id})">
  x
  </button>`;

  transactionsUL.append(li);
};

const updateBalanceValues = () => {
  const transactionsAmounts = dummyTransactions.map(
    (transaction) => transaction.amount
  );
  const total = transactionsAmounts
    .reduce((acc, transaction) => acc + transaction, 0)
    .toFixed(2);
  const income = transactionsAmounts
    .filter((value) => value > 0)
    .reduce((acc, value) => acc + value, 0)
    .toFixed(2);
  const expense = Math.abs(
    transactionsAmounts
      .filter((value) => value < 0)
      .reduce((acc, value) => acc + value, 0)
  ).toFixed(2);

  balanceDisplay.textContent = `R$ ${total}`;
  incomeDisplay.textContent = `R$ ${income}`;
  expenseDisplay.textContent = `R$ ${expense}`;
};

const init = () => {
  transactionsUL.innerHTML = "";
  dummyTransactions.forEach(addTransactionIntoDOM);
  updateBalanceValues();
};

init();

generateID = () => Math.round(Math.random() * 1000);

form.addEventListener("submit", (event) => {
  event.preventDefault();

  const transactionName = inputTransactionName.value.trim();
  const transactionAmount = inputTransactionAmount.value.trim();

  if (
    inputTransactionName.value.trim() === "" ||
    inputTransactionAmount.value.trim() === ""
  ) {
    alert("Por favor, Preencha ambos os Campos, Nome e Valor.");
    return;
  }

  const transaction = {
    id: generateID(),
    name: transactionName,
    amount: Number(transactionAmount),
  };
  dummyTransactions.push(transaction);
  init();
  inputTransactionName.value = "";
  inputTransactionAmount.value = "";
});
