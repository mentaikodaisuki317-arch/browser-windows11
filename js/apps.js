// アプリケーション機能

// 電卓アプリ
document.addEventListener('DOMContentLoaded', () => {
    setupCalculator();
});

function setupCalculator() {
    let currentValue = '0';
    let previousValue = '';
    let operation = null;

    function updateDisplay() {
        const display = document.querySelector('.calc-display');
        if (display) {
            display.textContent = currentValue;
        }
    }

    // イベントデリゲーション
    document.addEventListener('click', (e) => {
        // 数字ボタン
        if (e.target.dataset.num !== undefined) {
            const num = e.target.dataset.num;
            if (currentValue === '0') {
                currentValue = num;
            } else {
                currentValue += num;
            }
            updateDisplay();
        }

        // 演算子ボタン
        if (e.target.dataset.op !== undefined) {
            const op = e.target.dataset.op;
            if (operation !== null && currentValue !== '') {
                calculate();
            }
            previousValue = currentValue;
            operation = op;
            currentValue = '';
            updateDisplay();
        }

        // アクション
        if (e.target.dataset.action === 'clear') {
            currentValue = '0';
            previousValue = '';
            operation = null;
            updateDisplay();
        }

        if (e.target.dataset.action === 'delete') {
            currentValue = currentValue.slice(0, -1) || '0';
            updateDisplay();
        }

        if (e.target.dataset.action === 'equals') {
            calculate();
            operation = null;
            previousValue = '';
        }
    });

    function calculate() {
        if (operation === null || previousValue === '' || currentValue === '') return;

        let result;
        const prev = parseFloat(previousValue);
        const current = parseFloat(currentValue);

        switch (operation) {
            case '+':
                result = prev + current;
                break;
            case '-':
                result = prev - current;
                break;
            case '*':
                result = prev * current;
                break;
            case '/':
                result = current !== 0 ? prev / current : 0;
                break;
            case '.':
                return;
            default:
                return;
        }

        currentValue = result.toString();
        updateDisplay();
    }
}

// ブラウザアプリのリンククリック処理
document.addEventListener('click', (e) => {
    const urlInput = e.target.closest('.browser-url');
    if (urlInput && e.target.tagName === 'INPUT') {
        urlInput.select();
    }
});

// グローバルに公開
window.apps = {
    setupCalculator
};
