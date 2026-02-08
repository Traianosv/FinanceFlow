// ============================================
// STATE MANAGEMENT
// ============================================
let transactions = [];

// ============================================
// DOM ELEMENT REFERENCES
// ============================================
const balanceElement = document.getElementById('balance');
const incomeElement = document.getElementById('income');
const expenseElement = document.getElementById('expense');
const transactionListElement = document.getElementById('transaction-list');
const transactionForm = document.getElementById('transaction-form');
const textInput = document.getElementById('text');
const amountInput = document.getElementById('amount');
const exportBtn = document.getElementById('export-btn');

// ============================================
// LOCAL STORAGE KEYS
// ============================================
const STORAGE_KEY = 'financeflow_transactions';

// ============================================
// INITIALIZATION
// ============================================
function init() {
    loadLocalStorage();
    updateUI();
    attachEventListeners();
}

// ============================================
// EVENT LISTENERS
// ============================================
function attachEventListeners() {
    transactionForm.addEventListener('submit', handleFormSubmit);
    exportBtn.addEventListener('click', exportToCSV);
}

// ============================================
// FORM SUBMISSION HANDLER
// ============================================
function handleFormSubmit(e) {
    e.preventDefault();

    const text = textInput.value.trim();
    const amount = parseFloat(amountInput.value);

    // Validation
    if (text === '') {
        alert('Please enter a transaction description');
        return;
    }

    if (isNaN(amount) || amount === 0) {
        alert('Please enter a valid amount (non-zero number)');
        return;
    }

    // Create transaction object
    const transaction = {
        id: generateID(),
        text: text,
        amount: amount
    };

    // Add to transactions array
    transactions.push(transaction);

    // Update UI and storage
    updateUI();
    saveLocalStorage();

    // Clear form inputs
    textInput.value = '';
    amountInput.value = '';
    textInput.focus();
}

// ============================================
// DELETE TRANSACTION
// ============================================
function deleteTransaction(id) {
    // Filter out the transaction with the specified ID
    transactions = transactions.filter(transaction => transaction.id !== id);

    // Update UI and storage
    updateUI();
    saveLocalStorage();
}

// Make deleteTransaction globally accessible for onclick handlers
window.deleteTransaction = deleteTransaction;

// ============================================
// UPDATE UI (Master Update Function)
// ============================================
function updateUI() {
    updateTransactionList();
    updateSummaryValues();
}

// ============================================
// UPDATE TRANSACTION LIST
// ============================================
function updateTransactionList() {
    // Clear existing list
    transactionListElement.innerHTML = '';

    // Render each transaction
    transactions.forEach(transaction => {
        const listItem = createTransactionElement(transaction);
        transactionListElement.appendChild(listItem);
    });
}

// ============================================
// CREATE TRANSACTION ELEMENT
// ============================================
function createTransactionElement(transaction) {
    const li = document.createElement('li');
    li.classList.add('transaction-item');

    // Add income or expense class
    const transactionType = transaction.amount > 0 ? 'income' : 'expense';
    li.classList.add(transactionType);

    // Format amount for display
    const sign = transaction.amount > 0 ? '+' : '';
    const formattedAmount = `${sign}${formatCurrency(transaction.amount)}`;

    li.innerHTML = `
        <div class="transaction-content">
            <div class="transaction-text">${transaction.text}</div>
            <div class="transaction-amount ${transactionType}">${formattedAmount}</div>
        </div>
        <button class="delete-btn" onclick="deleteTransaction(${transaction.id})">Delete</button>
    `;

    return li;
}

// ============================================
// UPDATE SUMMARY VALUES (Balance, Income, Expenses)
// ============================================
function updateSummaryValues() {
    // Calculate total balance
    const total = transactions.reduce((acc, transaction) => acc + transaction.amount, 0);

    // Calculate total income (sum of positive amounts)
    const income = transactions
        .filter(transaction => transaction.amount > 0)
        .reduce((acc, transaction) => acc + transaction.amount, 0);

    // Calculate total expenses (sum of absolute values of negative amounts)
    const expense = transactions
        .filter(transaction => transaction.amount < 0)
        .reduce((acc, transaction) => acc + Math.abs(transaction.amount), 0);

    // Update DOM elements
    balanceElement.textContent = formatCurrency(total);
    incomeElement.textContent = formatCurrency(income);
    expenseElement.textContent = formatCurrency(expense);
}

// ============================================
// CURRENCY FORMATTING
// ============================================
function formatCurrency(amount) {
    return new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
        minimumFractionDigits: 2,
        maximumFractionDigits: 2
    }).format(amount);
}

// ============================================
// GENERATE UNIQUE ID
// ============================================
function generateID() {
    return Date.now();
}

// ============================================
// LOCAL STORAGE - SAVE
// ============================================
function saveLocalStorage() {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(transactions));
}

// ============================================
// LOCAL STORAGE - LOAD
// ============================================
function loadLocalStorage() {
    const storedTransactions = localStorage.getItem(STORAGE_KEY);

    if (storedTransactions) {
        try {
            transactions = JSON.parse(storedTransactions);
        } catch (error) {
            console.error('Error parsing stored transactions:', error);
            transactions = [];
        }
    }
}

// ============================================
// EXPORT TO CSV
// ============================================
function exportToCSV() {
    if (transactions.length === 0) {
        alert('No transactions to export');
        return;
    }

    // CSV Headers
    const headers = ['Date', 'Description', 'Amount', 'Type'];

    // Convert transactions to CSV rows
    const rows = transactions.map(transaction => {
        const date = new Date(transaction.id).toLocaleString();
        const type = transaction.amount > 0 ? 'Income' : 'Expense';
        const amount = transaction.amount.toFixed(2);

        // Escape description if it contains commas or quotes
        const description = transaction.text.includes(',') || transaction.text.includes('"')
            ? `"${transaction.text.replace(/"/g, '""')}"`
            : transaction.text;

        return [date, description, amount, type].join(',');
    });

    // Combine headers and rows
    const csvContent = [headers.join(','), ...rows].join('\n');

    // Create blob and download
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);

    link.setAttribute('href', url);
    link.setAttribute('download', `financeflow_transactions_${Date.now()}.csv`);
    link.style.visibility = 'hidden';

    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
}

// ============================================
// START APPLICATION
// ============================================
init();
