// index.html
let productPrices = {
    A: 300,
    B: 400,
    C: 500
};

let selectedProduct = null;

function selectProduct(productCode, element) {
    const allProducts = document.querySelectorAll('.product');
    
    // znovu označení produktu -> vynulování proměné, odebrání .selected
    if (element.classList.contains('selected')) {
        selectedProduct = null;
        element.classList.remove('selected');
    } else {
        // odznačení produktu
        allProducts.forEach(product => product.classList.remove('selected'));
        
        // označení nového produktu
        selectedProduct = productPrices[productCode];
        element.classList.add('selected');
    }
    
    updateTotalPrice();
}

function updateTotalPrice() {
    if (selectedProduct !== null) {
        // počet kusů
        const quantity = document.getElementById('quantity').value;

        // výpočet celkové ceny
        const totalPrice = selectedProduct * quantity;

        // zobrazení celkové ceny
        document.getElementById('total').textContent = totalPrice;
    } else {
        // žádný item -> celková cena = 0
        document.getElementById('total').textContent = 0;
    }
}

//summary.html
function displaySummary() {
    // načtení info
    const urlParams = new URLSearchParams(window.location.search);
    const fname = urlParams.get('fname');
    const lname = urlParams.get('lname');
    const birth = urlParams.get('birth');
    const adress = urlParams.get('adress');
    const phone = urlParams.get('phone');
    const email = urlParams.get('mail');
    const product = urlParams.get('product');
    const quantity = Number(urlParams.get('quantity')); // Převede na číslo

    // zobrazení shrnutí
    const summaryDiv = document.getElementById('summary');
    summaryDiv.innerHTML = `
        <p><strong>First name:</strong> ${fname}</p>
        <p><strong>Last name:</strong> ${lname}</p>
        <p><strong>Date of Birth:</strong> ${birth}</p>
        <p><strong>Adress:</strong> ${adress}</p>
        <p><strong>Phone Number:</strong> ${phone}</p>
        <p><strong>E-mail:</strong> ${email}</p>
        <p><strong>Product:</strong> ${product}</p>
        <p><strong>Quantity:</strong> ${quantity}</p>
        <p><strong>Cost:</strong> ${totalPrice} Kč</p>
        <p><strong>DPH (21%):</strong> ${vat.toFixed(2)} Kč</p>
        <p><strong>Cost with DPH:</strong> ${totalWithVat.toFixed(2)} Kč</p>
    `;
}

// zobrazení shrnutí
document.addEventListener('DOMContentLoaded', displaySummary);