// index.html
function calculatePrice() {
    // množství
    const quantity = document.getElementById('quantity').value;

    // vybraný item
    const selectedItem = document.querySelector('input[name="item"]:checked');

    // vypočítání ceny vybraného itemu
    if (selectedItem) {
        const itemValue = selectedItem.value;
        const totalPrice = quantity * itemValue;

        // zobrazení celkové ceny
        document.getElementById('total').textContent = totalPrice;

        return totalPrice;
    }
    return 0;
}

function submitForm() {
    const selectedItem = document.querySelector('input[name="item"]:checked');
    const quantity = document.getElementById('quantity').value;
    
    // kontrola zvolení itemu
    if (!selectedItem) {
        alert("Please select an item.");
        return;
    }

    const itemValue = selectedItem.value;
    const itemLetter = selectedItem.getAttribute('data-letter');

    // načtení info z formuláře do URL, přesměrování
    const url = `summary.html?itemValue=${itemValue}&itemLetter=${itemLetter}&quantity=${quantity}&fname=${document.getElementById('fname').value}&lname=${document.getElementById('lname').value}&birth=${document.getElementById('birth').value}&adress=${document.getElementById('adress').value}&phone=${document.getElementById('phone').value}&email=${document.getElementById('mail').value}`;
    window.location.href = url;
}

//summary.html

function displaySummary() {
    // načtení info z URL
    const urlParams = new URLSearchParams(window.location.search);
    const fname = urlParams.get('fname');
    const lname = urlParams.get('lname');
    const birth = urlParams.get('birth');
    const adress = urlParams.get('adress');
    const phone = urlParams.get('phone');
    const email = urlParams.get('email');
    const itemValue = Number(urlParams.get('itemValue'));
    const itemLetter = urlParams.get('itemLetter');
    const quantity = Number(urlParams.get('quantity'));

    // bez DPH, DPH, celková ceny
    const totalPrice = itemValue * quantity;
    const dph = totalPrice * 0.21;
    const totalWithDPH = totalPrice + dph;

    // shrnutí
    const summaryDiv = document.getElementById('summary');
    summaryDiv.innerHTML = `
        <p><strong>First name:</strong> ${fname}</p>
        <p><strong>Last name:</strong> ${lname}</p>
        <p><strong>Date of Birth:</strong> ${birth}</p>
        <p><strong>Adress:</strong> ${adress}</p>
        <p><strong>Phone Number:</strong> ${phone}</p>
        <p><strong>E-mail:</strong> ${email}</p>
        <p><strong>Item:</strong> ${itemLetter}</p>
        <p><strong>Item Price:</strong> ${itemValue} Kč</p>
        <p><strong>Quantity:</strong> ${quantity}</p>
        <p><strong>Total Cost:</strong> ${totalPrice.toFixed(2)} Kč</p>
        <p><strong>DPH (21%):</strong> ${dph.toFixed(2)} Kč</p>
        <p><strong>Total Cost with DPH:</strong> ${totalWithDPH.toFixed(2)} Kč</p>
    `;
}

// zobrazení shrnutí
document.addEventListener('DOMContentLoaded', displaySummary);

/*
async function loadCurrencyRates() {
    try {
        // načtení lístku
        const response = await fetch('https://www.cnb.cz/cs/financni-trhy/devizovy-trh/kurzy-devizoveho-trhu/kurzy-devizoveho-trhu/denni_kurz.txt?date=11.10.2024');
        const text = await response.text();

        // zpracování dat
        parseCurrencyData(text);
    } catch (error) {
        console.error("Error fetching currency rates:", error);
    }
}

function parseCurrencyData(text) {
    const lines = text.split('\n');
    const rates = {};

    // přeskočení hlavičky, naplnění pole rates
    for (let i = 3; i < lines.length; i++) {
        const [country, currency, quantity, code, rate] = lines[i].split('|');
        if (country && currency && code && rate) {
            rates[code] = {
                country,
                currency,
                quantity,
                rate: parseFloat(rate.replace(',', '.')),
            };
        }
    }

    // zobrazení výběru měny
    displayCurrencySelection(rates);
}

function displayCurrencySelection(rates) {
    const currencySelect = document.getElementById('currencySelect');

    // naplnění výběru
    Object.keys(rates).forEach(code => {
        const option = document.createElement('option');
        option.value = code;
        option.textContent = `${rates[code].currency} (${code})`;
        currencySelect.appendChild(option);
    });

    // změna měny
    currencySelect.addEventListener('change', () => {
        const selectedCode = currencySelect.value;
        const totalPrice = parseFloat(document.getElementById('total').textContent);
        const convertedPrice = (totalPrice * rates[selectedCode].rate).toFixed(2);
        
        // zobrazení převedené ceny
        document.getElementById('convertedPrice').textContent = `${convertedPrice} ${rates[selectedCode].currency}`;
    });
}

// načtení dat
loadCurrencyRates();
*/