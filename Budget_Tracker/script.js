var help_btn = document.getElementById("help_btn");
var modal_help = document.getElementById("modal_help");
var close_help = document.getElementsByClassName("close_help")[0];

var add_btn = document.getElementById("add_btn");
var modal_add = document.getElementById("modal_add");
var close_add = document.getElementsByClassName("close_add")[0];

var filter_btn = document.getElementById("filter_btn");
var modal_filter = document.getElementById("modal_filter");
var close_filter = document.getElementsByClassName("close_filter")[0];

//Відображення модального вікна "Допомога" при натисканні на кнопку
help_btn.onclick = function() {
  modal_help.style.display = "block";
}

//Закриття модального вікна "Допомога" при натисканні на хрестик
close_help.onclick = function() {
  modal_help.style.display = "none";
}

//Відображення модального вікна "Додати транзакцію" при натисканні на кнопку
add_btn.onclick = function() {
    modal_add.style.display = "block";
}

//Закриття модального вікна "Додати транзакцію" при натисканні на хрестик
close_add.onclick = function() {
    modal_add.style.display = "none";
}

//Відображення модального вікна "Фільтр" при натисканні на кнопку
filter_btn.onclick = function() {
  modal_filter.style.display = "block";
}

//Закриття модального вікна "Фільтр" при натисканні на хрестик
close_filter.onclick = function() {
  modal_filter.style.display = "none";
}

//Закриття модальних вікон при натисканні поза ними
window.onclick = function(event) {
  if (event.target == modal_help) {
    modal_help.style.display = "none";
  }

  if (event.target == modal_add) {
    modal_add.style.display = "none";
  }
  
  if (event.target == modal_filter) {
    modal_filter.style.display = "none";
  }
}

const generate_btn = document.querySelector('#generate_btn');
const save_btn = document.querySelector('#save_btn');

filter_btn.style.display = 'none';
generate_btn.style.display = 'none';
save_btn.style.display = 'none';
show_btn.style.display = 'none';

const form = document.querySelector('form');
const amountInput = form.querySelector('#amount');
const dateInput = form.querySelector('#date');
const categoryInput = form.querySelector('#category');
const optionInputs = form.querySelectorAll('input[type="radio"]');

const transactions = [];

const table = document.querySelector('#expenses');
const title = document.querySelector('#add');
table.style.display = 'none';
title.style.display = 'block';

//Додавання обробника події при натисканні кнопки "Зберегти"
form.addEventListener('submit', function(event) {
  
  event.preventDefault();

  const amount = amountInput.value;
  const date = dateInput.value;
  const category = categoryInput.value !== 'Оберіть категорію' ? categoryInput.value : '-';
  let type = null;

  for (const optionInput of optionInputs) {
    if (optionInput.checked) {
      type = optionInput.value;
      break;
    }
  }

  const transaction = { amount, date, category, type };
  transactions.push(transaction);

  amountInput.value = '';
  dateInput.value = '';
  categoryInput.value = 'Оберіть категорію';
  optionInputs[0].checked = true;
  modal_add.style.display = 'none';

  //Функція для відображення даних на сторінці
  displayTransactions();

  const table = document.querySelector('table#expenses');
  const rows = table.getElementsByTagName('tr');
  
  //Перебирання всіх рядків таблиці, крім першого (заголовків колонок)
  for (let i = 1; i < rows.length; i++) {
    
    //Отримання комірки "Категорія" для поточного рядка
    const categoryCell = rows[i].getElementsByTagName('td')[2];
    
    //Перевірка, чи дорівнює значення комірки категорії "Інше"
    if (categoryCell.innerHTML === "Інше") {
      
      //Створення нового елемента "select" (випадаючий список)
      const selectList = document.createElement("select");
      
      //Створення масиву зі значеннями для випадаючого списку
      const categories = ["Кіно, театр, музей", "Транспорт", "Житло, комунальні послуги", "Подарунки", "Косметика, побутова хімія", "Різне"];
      
      //Додавання кожного елемента масиву як новий елемент "option" (опцію) у випадаючий список
      for (let j = 0; j < categories.length; j++) {
        const option = document.createElement("option");
        option.value = categories[j];
        option.text = categories[j];
        selectList.appendChild(option);
      }
      
      //Заміна вмісту комірки "Категорія" на випадаючий список
      categoryCell.innerHTML = "";
      categoryCell.appendChild(selectList);
    }
  }

  filter_btn.style.display = 'block';
  generate_btn.style.display = 'block';
  save_btn.style.display = 'block';
  show_btn.style.display = 'block';
});

//Функція для відображення даних на сторінці
function displayTransactions() {
  title.style.display = 'none';
  table.style.display = 'block';
  const tbody = document.querySelector('table tbody');
  
  tbody.innerHTML = '';
  
  for (let i = 0; i < transactions.length; i++) {
    const transaction = transactions[i];

    const row = document.createElement('tr');

    const amountCell = document.createElement('td');
    amountCell.textContent = transaction.amount;
    row.appendChild(amountCell);

    const dateCell = document.createElement('td');
    dateCell.textContent = transaction.date;
    row.appendChild(dateCell);

    const categoryCell = document.createElement('td');
    categoryCell.textContent = transaction.category;
    row.appendChild(categoryCell);

    const typeCell = document.createElement('td');
    typeCell.textContent = transaction.type;
    row.appendChild(typeCell);

    //Створення кнопки видалення рядка та додавання обробника події при натисканні
    const deleteButton = document.createElement('button');
    deleteButton.textContent = 'Видалити';
    deleteButton.style.backgroundColor = 'pink';
    deleteButton.style.borderRadius = '5px';
    deleteButton.style.color = 'deeppink';
    deleteButton.style.cursor = 'pointer';

    deleteButton.onclick = function() {
      transactions.splice(i, 1);
      tbody.removeChild(row);
    };

    const deleteCell = document.createElement('td');
    deleteCell.appendChild(deleteButton);
    row.appendChild(deleteCell);

    tbody.appendChild(row);
  }
}

const tableBody = document.querySelector('table tbody');
const categoryHeader = document.querySelector('th:nth-child(3)');
const typeHeader = document.querySelector('th:nth-child(4)');

//Функція для створення рядка таблиці
function createTableRow(transaction) {
  const row = document.createElement('tr');

  const amountCell = document.createElement('td');
  amountCell.textContent = transaction.amount;
  row.appendChild(amountCell);

  const dateCell = document.createElement('td');
  dateCell.textContent = transaction.date;
  row.appendChild(dateCell);

  const categoryCell = document.createElement('td');
  categoryCell.textContent = transaction.category || '-';
  row.appendChild(categoryCell);

  const typeCell = document.createElement('td');
  typeCell.textContent = transaction.type;
  row.appendChild(typeCell);

  const deleteButton = document.createElement('button');
  deleteButton.textContent = 'Видалити';
  deleteButton.style.backgroundColor = 'pink';
  deleteButton.style.borderRadius = '5px';
  deleteButton.style.color = 'deeppink';
  deleteButton.style.cursor = 'pointer';
  
  deleteButton.onclick = function() {
    transactions.splice(i, 1);
    tbody.removeChild(row);
  };

  const deleteCell = document.createElement('td');
  deleteCell.appendChild(deleteButton);
  row.appendChild(deleteCell);

  return row;
}

//Функція для оновлення таблиці
function updateTable(transactions) {
  tableBody.innerHTML = '';
  for (const transaction of transactions) {
    const row = createTableRow(transaction);
    tableBody.appendChild(row);
  }
}

//Сортування при кліку на заголовок категорії
categoryHeader.addEventListener('click', () => {
  const sortedTransactions = transactions.slice().sort((a, b) => a.category.localeCompare(b.category));
  updateTable(sortedTransactions);
});

//Сортування при кліку на заголовок типу
typeHeader.addEventListener('click', () => {
  const sortedTransactions = transactions.slice().sort((a, b) => a.type.localeCompare(b.type));
  updateTable(sortedTransactions);
});

//Виділення даних за періодом
const form_filter = document.querySelector('#modal_filter form');
form_filter.addEventListener('submit', (event) => {
  event.preventDefault();
  
  const startDateInput = document.querySelector('#start-date');
  const endDateInput = document.querySelector('#end-date');
  
  const startDate = Date.parse(startDateInput.value);
  const endDate = Date.parse(endDateInput.value);

  const rows = document.querySelectorAll('table#expenses tbody tr');
  const filteredTransactions = [];

  rows.forEach(row => {
    const rowDate = Date.parse(row.dataset.date);
    if (rowDate >= startDate && rowDate <= endDate) {
      filteredTransactions.push(row.transaction);
      row.style.display = '';
    } else {
      row.style.display = 'none';
    }
  });

  updateTable(filteredTransactions);
});

//Генерування звіту у txt-форматі
generate_btn.addEventListener('click', () => {
  const table = document.querySelector('table#expenses');
  const rows = table.querySelectorAll('tr');
  let text = '';

  for (let i = 0; i < rows.length; i++) {
    const cells = rows[i].querySelectorAll('td, th');

    for (let j = 0; j < cells.length; j++) {
      text += cells[j].innerText + ', ';
    }

    text += '\n';
  }

  const blob = new Blob([text], {type: 'text/plain;charset=utf-8'});

  saveAs(blob, 'my-table.txt');
});

//Збереження даних
function saveData() {
  const tableCells = document.querySelectorAll('#expenses tbody td');
  const data = [];

  for (let i = 0; i < tableCells.length; i++) {
    data.push(tableCells[i].textContent);
  }

  localStorage.setItem('expenses', JSON.stringify(data));
  alert('Дані успішно збережені!');
}

//Відображення збережених даних
function showData() {
  const tableRows = document.querySelectorAll('#expenses tbody tr');
  const savedData = JSON.parse(localStorage.getItem('expenses'));
  
  if (savedData) {
    for (let i = 0; i < tableRows.length; i++) {
      const cells = tableRows[i].querySelectorAll('td');
      for (let j = 0; j < cells.length; j++) {
        cells[j].textContent = savedData[i * cells.length + j] || '';
      }
    }
  }
  updateTable(cells);
}