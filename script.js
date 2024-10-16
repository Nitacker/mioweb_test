function updatePrice () {
    //selektor itemu a načtení kvantity
    var selectedItem = document.querySelector('input[name="product"]:checked');
    //var price = document.getElementById('price');
    var quantity = document.getElementById('quantity');

    if (selectedItem) {
        //načtení ceny vybraného itemu
        var itemPrice = selectedItem.getAttribute('data-price');
        //priceElement.value = productPrice;

        // výpočet celkové ceny a zobrazení
        var totalCost = itemPrice* quantity; 
        document.getElementById('total').textContent = totalCost.toFixed(2) + CZK; 
    }
}