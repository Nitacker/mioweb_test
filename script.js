function updatePrice () {
    //selektor itemu a načtení kvantity
    var selectedItem = document.querySelector('input[name="product"]:checked');
    var price = document.getElementById('price');
    var quantity = document.getElementById('quantity');

    if (selectedItem) {
        //načtení ceny vybraného itemu
        var itemPrice = selectedItem.getAttribute('data-price');
        price.value = itemPrice;

        // výpočet celkové ceny a zobrazení
        var total = itemPrice* quantity; 
        document.getElementById('totalPrice').textContent = total.toFixed(2) + CZK; 
    }
}