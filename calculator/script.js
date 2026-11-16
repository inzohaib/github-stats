'use strict';

(() => {
  const expressionEl = document.getElementById('expression');
  const resultEl = document.getElementById('result');
  const keypad = document.getElementById('keypad');
  const historyPanel = document.getElementById('historyPanel');
  const historyList = document.getElementById('historyList');
  let expression = '';
  let justCalculated = false;
  const history = [];

  function format(value) {
    if (!Number.isFinite(value)) throw new Error('Invalid result');
    const rounded = Number.parseFloat(value.toPrecision(12));
    return rounded.toLocaleString('en-US', { maximumFractionDigits: 10 });
  }

  // A small recursive-descent parser keeps calculations safe: no eval() or dependencies.
  function calculate(source) {
    const tokens = source.replace(/×/g, '*').replace(/÷/g, '/').replace(/−/g, '-').match(/\d*\.?\d+|[()+\-*/%]/g);
    if (!tokens || tokens.join('') !== source.replace(/\s/g, '').replace(/×/g, '*').replace(/÷/g, '/').replace(/−/g, '-')) throw new Error('Check expression');
    let index = 0;
    function primary() {
      const token = tokens[index++];
      if (token === '+') return primary();
      if (token === '-') return -primary();
      if (token === '(') {
        const value = sum();
        if (tokens[index++] !== ')') throw new Error('Missing )');
        return value;
      }
      if (token === undefined || !/^\d*\.?\d+$/.test(token)) throw new Error('Check expression');
      return Number(token);
    }
    function postfix() {
      let value = primary();
      while (tokens[index] === '%') { index++; value /= 100; }
      return value;
    }
    function product() {
      let value = postfix();
      while (tokens[index] === '*' || tokens[index] === '/') {
        const op = tokens[index++], next = postfix();
        if (op === '/' && next === 0) throw new Error('Cannot divide by zero');
        value = op === '*' ? value * next : value / next;
      }
      return value;
    }
    function sum() {
      let value = product();
      while (tokens[index] === '+' || tokens[index] === '-') {
        const op = tokens[index++], next = product();
        value = op === '+' ? value + next : value - next;
      }
      return value;
    }
    const value = sum();
    if (index !== tokens.length || !Number.isFinite(value)) throw new Error('Check expression');
    return value;
  }

  function render(preview = true) {
    expressionEl.textContent = expression || '0';
    if (!expression) { resultEl.textContent = '0'; return; }
    if (preview) {
      try { resultEl.textContent = format(calculate(expression)); }
      catch { resultEl.textContent = '—'; }
    }
  }

  function append(value) {
    if (justCalculated && /[0-9.(]/.test(value)) expression = '';
    justCalculated = false;
    const last = expression.slice(-1);
    if ('+−×÷'.includes(value)) {
      if (!expression && value !== '−') return;
      if ('+−×÷'.includes(last)) expression = expression.slice(0, -1);
      expression += value;
    } else if (value === '.') {
      const current = expression.split(/[+−×÷()]/).pop();
      if (current.includes('.')) return;
      expression += current ? '.' : '0.';
    } else {
      expression += value;
    }
    render();
  }

  function clear() { expression = ''; justCalculated = false; render(); }
  function removeLast() { expression = expression.slice(0, -1); justCalculated = false; render(); }

  function toggleSign() {
    const match = expression.match(/(\d*\.?\d+)(?!.*\d)/);
    if (!match) { append('−'); return; }
    const start = match.index;
    const before = expression.slice(0, start);
    const number = match[0];
    expression = before.endsWith('−') && (before.length === 1 || '+−×÷('.includes(before.at(-2)))
      ? before.slice(0, -1) + number
      : before + '−' + number;
    justCalculated = false; render();
  }

  function percent() {
    if (!/\d$/.test(expression)) return;
    expression += '%'; justCalculated = false; render();
  }

  function addHistory(input, output) {
    history.unshift({ input, output });
    history.splice(8);
    historyList.innerHTML = '';
    history.forEach(item => {
      const li = document.createElement('li');
      const left = document.createElement('span');
      const right = document.createElement('span');
      left.textContent = item.input;
      right.textContent = '= ' + item.output;
      li.append(left, right);
      historyList.appendChild(li);
    });
  }

  function equals() {
    if (!expression) return;
    try {
      const answer = calculate(expression);
      const output = format(answer);
      addHistory(expression, output);
      expressionEl.textContent = expression + ' =';
      resultEl.textContent = output;
      expression = String(Number.parseFloat(answer.toPrecision(12)));
      justCalculated = true;
    } catch (error) {
      resultEl.textContent = error.message || 'Check expression';
    }
  }

  keypad.addEventListener('click', event => {
    const button = event.target.closest('button');
    if (!button) return;
    if (button.dataset.value !== undefined) append(button.dataset.value);
    else ({
      clear, delete: removeLast, sign: toggleSign, percent, equals
    }[button.dataset.action] || (() => {}))();
  });

  document.addEventListener('keydown', event => {
    if (/^[0-9.]$/.test(event.key)) append(event.key);
    else if (event.key === '+') append('+');
    else if (event.key === '-') append('−');
    else if (event.key === '*') append('×');
    else if (event.key === '/') { event.preventDefault(); append('÷'); }
    else if (event.key === '%') percent();
    else if (event.key === 'Enter' || event.key === '=') { event.preventDefault(); equals(); }
    else if (event.key === 'Backspace') removeLast();
    else if (event.key === 'Escape') clear();
    else return;
  });

  document.getElementById('historyToggle').addEventListener('click', event => {
    const open = historyPanel.hidden;
    historyPanel.hidden = !open;
    event.currentTarget.setAttribute('aria-expanded', String(open));
  });
  document.getElementById('clearHistory').addEventListener('click', () => {
    history.length = 0;
    historyList.innerHTML = '<li class="history-empty">Your calculations will show up here.</li>';
  });
  render();
})();