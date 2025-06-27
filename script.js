let price = 1.87;
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

// DOM elements
const displayChangeDue = document.getElementById('change-due');
const cashDrawerDisplay = document.getElementById('cash-drawer-display');
const cash = document.getElementById('cash');
const purchaseBtn = document.getElementById('purchase-btn');
const priceDisplay = document.getElementById('price-display');

// Initialize price display
priceDisplay.textContent = price.toFixed(2);

// Utility functions for better floating point handling
const roundToTwoDecimals = (num) => Math.round(num * 100) / 100;
const formatCurrency = (amount) => `$${roundToTwoDecimals(amount).toFixed(2)}`;

// Input validation functions
const validateCashInput = (cashValue) => {
    if (isNaN(cashValue) || cashValue < 0) {
        return { valid: false, message: 'Please enter a valid positive number for cash amount' };
    }
    if (cashValue < price) {
        return { valid: false, message: 'Customer does not have enough money to purchase the item' };
    }
    return { valid: true };
};

// UI feedback functions
const setLoadingState = (isLoading) => {
    if (isLoading) {
        purchaseBtn.classList.add('loading');
        purchaseBtn.disabled = true;
        displayChangeDue.className = 'change-due processing';
    } else {
        purchaseBtn.classList.remove('loading');
        purchaseBtn.disabled = false;
    }
};

const showError = (message) => {
    displayChangeDue.className = 'change-due error';
    displayChangeDue.innerHTML = `<p class="error-message">${message}</p>`;
    // Announce to screen readers
    displayChangeDue.setAttribute('aria-live', 'assertive');
    setTimeout(() => displayChangeDue.setAttribute('aria-live', 'polite'), 1000);
};

const showSuccess = (content) => {
    displayChangeDue.className = 'change-due success';
    displayChangeDue.innerHTML = content;
};

const showExactCash = () => {
    showSuccess('<p class="success-message">No change due - customer paid with exact cash</p>');
};

// Change calculation functions
const calculateTotalCID = () => {
    return roundToTwoDecimals(
        cid.map(denomination => denomination[1])
           .reduce((total, amount) => total + amount, 0)
    );
};

const calculateChangeBreakdown = (changeDue, reversedCid, denominations) => {
    const result = { status: 'OPEN', change: [] };
    let remainingChange = changeDue;

    for (let i = 0; i < reversedCid.length; i++) {
        if (remainingChange >= denominations[i] && remainingChange > 0) {
            let count = 0;
            let availableAmount = reversedCid[i][1];
            
            while (availableAmount > 0 && remainingChange >= denominations[i]) {
                availableAmount = roundToTwoDecimals(availableAmount - denominations[i]);
                remainingChange = roundToTwoDecimals(remainingChange - denominations[i]);
                count++;
            }
            
            if (count > 0) {
                const changeAmount = roundToTwoDecimals(count * denominations[i]);
                result.change.push([reversedCid[i][0], changeAmount]);
            }
        }
    }

    // Check if we couldn't make exact change
    if (remainingChange > 0) {
        return { status: 'INSUFFICIENT_FUNDS', change: [] };
    }

    return result;
};

// Main change calculation logic
const processChangeCalculation = (cashValue) => {
    const changeDue = roundToTwoDecimals(cashValue - price);
    const reversedCid = [...cid].reverse();
    const denominations = [100, 20, 10, 5, 1, 0.25, 0.1, 0.05, 0.01];
    const totalCID = calculateTotalCID();

    // Check if we have enough money in the drawer
    if (totalCID < changeDue) {
        return { status: 'INSUFFICIENT_FUNDS', change: [] };
    }

    // Check if we need to close the drawer (exact amount)
    if (totalCID === changeDue) {
        return { status: 'CLOSED', change: [...cid] };
    }

    // Calculate the change breakdown
    return calculateChangeBreakdown(changeDue, reversedCid, denominations);
};

// Display functions
const formatChangeResults = (status, change) => {
    let content = `<p class="success-message">Status: ${status}</p>`;
    
    if (change.length > 0) {
        content += change
            .map(([denomination, amount]) => 
                `<p>${denomination}: ${formatCurrency(amount)}</p>`
            )
            .join('');
    }
    
    return content;
};

const updateCashDrawer = (change) => {
    const currencyNameMap = {
        PENNY: 'PENNIES',
        NICKEL: 'NICKELS',
        DIME: 'DIMES',
        QUARTER: 'QUARTERS',
        ONE: 'ONES',
        FIVE: 'FIVES',
        TEN: 'TENS',
        TWENTY: 'TWENTIES',
        'ONE HUNDRED': 'HUNDREDS'
    };

    // Update cash in drawer if change was given
    if (change && change.length > 0) {
        change.forEach(([denomination, amount]) => {
            const targetDenomination = cid.find(([name]) => name === denomination);
            if (targetDenomination) {
                targetDenomination[1] = roundToTwoDecimals(targetDenomination[1] - amount);
            }
        });
    }

    // Display updated cash drawer
    cashDrawerDisplay.innerHTML = `
        <p><strong>Change in drawer:</strong></p>
        ${cid
            .map(([name, amount]) => 
                `<p>${currencyNameMap[name]}: ${formatCurrency(amount)}</p>`
            )
            .join('')
        }
    `;
};

// Main function that orchestrates the change calculation
const checkCashRegister = async () => {
    const cashValue = parseFloat(cash.value);
    
    // Validate input
    const validation = validateCashInput(cashValue);
    if (!validation.valid) {
        showError(validation.message);
        cash.value = '';
        return;
    }

    // Show loading state
    setLoadingState(true);

    // Simulate processing time for better UX
    await new Promise(resolve => setTimeout(resolve, 300));

    try {
        // Handle exact cash scenario
        if (cashValue === price) {
            showExactCash();
            cash.value = '';
            return;
        }

        // Calculate change
        const result = processChangeCalculation(cashValue);

        // Handle insufficient funds
        if (result.status === 'INSUFFICIENT_FUNDS') {
            showError('Status: INSUFFICIENT_FUNDS');
            return;
        }

        // Display results and update UI
        const content = formatChangeResults(result.status, result.change);
        showSuccess(content);
        updateCashDrawer(result.change);

    } catch (error) {
        showError('An error occurred while calculating change. Please try again.');
        console.error('Change calculation error:', error);
    } finally {
        setLoadingState(false);
        cash.value = '';
    }
};

// Event handlers
const handleCalculation = () => {
    if (!cash.value.trim()) {
        cash.focus();
        return;
    }
    checkCashRegister();
};

const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
        e.preventDefault();
        handleCalculation();
    }
};

// Event listeners
purchaseBtn.addEventListener('click', handleCalculation);
cash.addEventListener('keydown', handleKeyPress);

// Real-time input feedback
cash.addEventListener('input', (e) => {
    const value = parseFloat(e.target.value);
    const button = purchaseBtn;
    
    if (isNaN(value) || value < 0) {
        button.textContent = 'Invalid Amount';
        button.disabled = true;
    } else if (value < price) {
        button.querySelector('.button-text').textContent = 'Insufficient Cash';
        button.disabled = true;
    } else {
        button.querySelector('.button-text').textContent = 'Calculate Change';
        button.disabled = false;
    }
});

// Initialize the UI
updateCashDrawer();

// Accessibility: Focus management
cash.addEventListener('focus', () => {
    if (displayChangeDue.textContent.includes('Enter cash amount')) {
        displayChangeDue.innerHTML = '<p class="info-message">Ready to calculate change</p>';
    }
});

// Add keyboard navigation support
document.addEventListener('keydown', (e) => {
    // Alt + C to focus cash input
    if (e.altKey && e.key === 'c') {
        e.preventDefault();
        cash.focus();
    }
    
    // Alt + Enter to calculate (alternative to Enter in input field)
    if (e.altKey && e.key === 'Enter') {
        e.preventDefault();
        if (!purchaseBtn.disabled) {
            handleCalculation();
        }
    }
});
