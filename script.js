function updatePrice() {
    // selektor itemu a načtení kvantity
    var selectedItem = document.querySelector('input[name="item"]:checked');
    var price = document.getElementById('price');
    var quantity = document.getElementById('quantity').value;

    if (selectedItem) {
        // načtení ceny
        var itemPrice = parseFloat(selectedItem.getAttribute('data-price'));
        price.value = itemPrice;

        // výpočet a zobrazení
        var total = itemPrice * quantity; 
        document.getElementById('totalPrice').textContent = total.toFixed(2) + " CZK"; 
    }
}