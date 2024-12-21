const currencyTable = document.getElementById('items');
const loadingSpinner = document.getElementById('loader');

async function fetchCurrencyRates() {
  try {
    loadingSpinner.classList.add('loader_active');

    const cachedCurrencies = localStorage.getItem('currencyRates');
    
    if (cachedCurrencies) { 
      displayCurrencies(JSON.parse(cachedCurrencies).response.Valute);
    }

    const response = await fetch('https://students.netoservices.ru/nestjs-backend/slow-get-courses');
    if (!response.ok) {
      throw new Error('Загрузка курсов валют закончилась неудачно');
    }

    const data = await response.json();
    localStorage.setItem('currencyRates', JSON.stringify(data)); 
    displayCurrencies(data.response.Valute);
  } catch (error) {
    console.error('Ошибка при загрузке: ', error);
  } finally { 
    loadingSpinner.classList.remove('loader_active');
  }
}

// отображение курсов валют
function displayCurrencies(currencies) {
  currencyTable.innerHTML = ''; 
  for (const key in currencies) {
    if (currencies.hasOwnProperty(key)) {
      const currency = currencies[key];

      const currencyItem = document.createElement('div');
      currencyItem.className = 'item';

      currencyItem.innerHTML = `
        <div class="item__code">${currency.CharCode}</div>
        <div class="item__value">${currency.Value.toFixed(2)}</div>
        <div class="item__currency">руб.</div>
      `;
      currencyTable.appendChild(currencyItem);
    }
  }
}

window.onload = fetchCurrencyRates;
