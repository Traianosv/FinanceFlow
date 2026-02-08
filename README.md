# 💰 FinanceFlow

**A professional expense tracking application built with vanilla HTML, CSS, and JavaScript**

FinanceFlow is a lightweight, responsive web application designed to help users manage their daily expenses with the precision of an accountant. This project showcases the transition from Accounting to Software Development, demonstrating a deep understanding of core web fundamentals and financial domain expertise.

![Uploading Screenshot 2026-02-08 at 4.39.30 PM.png…]()

## 🚀 Features

### Core Functionality
- **Dynamic Expense Management**: Add and delete expense/income transactions in real-time
- **Financial Summaries**: Automated calculation of Total Balance, Income, and Expenses
- **Data Validation**: Strict input handling preventing negative numbers or empty fields
- **Data Persistence**: Local Storage integration ensures data remains available after page refresh
- **CSV Export**: Download transaction history for external analysis and record-keeping
- **Responsive Design**: Fully optimized for desktop, tablet, and mobile devices

### Technical Highlights
- **Vanilla JavaScript (ES6+)**: Modern JavaScript features including arrow functions, template literals, and array methods
- **Professional UI/UX**: Gradient backgrounds, smooth animations, and color-coded transactions
- **Accounting Precision**: Currency formatting using `Intl.NumberFormat` API
- **Semantic HTML5**: Proper structure for accessibility and SEO
- **CSS Variables**: Consistent design system with custom properties
- **Flexbox & Grid**: Modern layout techniques for responsive design

## 🛠️ Tech Stack

- **HTML5** - Semantic structure for accessibility and SEO
- **CSS3** - Custom styling with CSS Variables for consistent branding and responsive layouts
- **Vanilla JavaScript (ES6+)** - DOM manipulation, Event Listeners, and Array methods

## 📸 Screenshots

### Main Interface
The application features a clean, professional interface with three summary cards showing Total Balance, Income, and Expenses at a glance.

### Transaction Management
Add transactions with descriptive names and amounts (positive for income, negative for expenses). Each transaction is color-coded with a green border for income and red for expenses.

### CSV Export
Export your complete transaction history to CSV format for external analysis, spreadsheet integration, or record archiving.

## 🎯 Getting Started

### Prerequisites
- Any modern web browser (Chrome, Firefox, Safari, Edge)
- No build tools or dependencies required!

### Installation

1. Clone this repository:
```bash
git clone https://github.com/traianosv/finance-flow.git
```

2. Navigate to the project directory:
```bash
cd finance-flow
```

3. Open `index.html` in your web browser:
```bash
# macOS
open index.html

# Linux
xdg-open index.html

# Windows
start index.html
```

That's it! No npm install, no build process—just open and use.

## 💡 Usage

### Adding a Transaction

1. **Enter Description**: Type a meaningful description for your transaction (e.g., "Monthly Salary", "Grocery Shopping")
2. **Enter Amount**: 
   - For Income: Enter a positive number (e.g., "2500")
   - For Expense: Enter a negative number (e.g., "-150.50")
3. **Click "Add Transaction"**: The transaction appears immediately in the list, and summaries update automatically

### Deleting a Transaction

- Click the red "Delete" button next to any transaction to remove it
- The summaries recalculate instantly

### Exporting to CSV

- Click the "📊 Export CSV" button to download your transaction history
- The CSV file includes: Date, Description, Amount, and Type (Income/Expense)
- Filename format: `financeflow_transactions_[timestamp].csv`

## 📁 Project Structure

```
finance-flow/
├── index.html          # Main HTML structure
├── style.css           # Professional CSS styling
├── app.js              # JavaScript application logic
├── README.md           # Project documentation
└── .gitignore          # Git ignore file
```

## 🎨 Design Philosophy

### Modern Web Standards
- **Semantic HTML** for better accessibility and SEO
- **CSS Variables** for maintainable, consistent styling
- **ES6+ JavaScript** demonstrating modern development practices
- **Responsive Design** ensuring usability across all devices

## 🔧 Key Implementation Details

### State Management
```javascript
let transactions = [];  // Single source of truth
```

### Financial Calculations
```javascript
// Total Balance
const total = transactions.reduce((acc, item) => acc + item.amount, 0);

// Income (positive amounts only)
const income = transactions
  .filter(item => item.amount > 0)
  .reduce((acc, item) => acc + item.amount, 0);

// Expenses (absolute values of negative amounts)
const expense = transactions
  .filter(item => item.amount < 0)
  .reduce((acc, item) => acc + Math.abs(item.amount), 0);
```

### Local Storage Persistence
```javascript
// Save
localStorage.setItem('financeflow_transactions', JSON.stringify(transactions));

// Load
const stored = localStorage.getItem('financeflow_transactions');
transactions = stored ? JSON.parse(stored) : [];
```

## 🤝 Contributing

While this is primarily a portfolio project, suggestions and feedback are welcome! Feel free to:
- Open an issue for bugs or feature requests
- Submit a pull request with improvements
- Share your experience using FinanceFlow

## 📄 License

This project is open source and available under the [MIT License](LICENSE).



---

**Built with vanilla HTML, CSS & JavaScript** | **No frameworks, no build tools, just fundamental web development**
