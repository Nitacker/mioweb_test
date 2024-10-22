function updatePrice() {
    // selektor itemu a načtení kvantity
    var selectedItem = document.querySelector('input[name="item"]:checked');
    var quantity = document.getElementById('quantity').value;

    if (selectedItem) {
        // načtení ceny a typu
        var itemPrice = parseFloat(selectedItem.getAttribute('value'));
        var itemType = selectedItem.getAttribute('data-type');

        // výpočet a zobrazení
        var total = itemPrice * quantity;
        document.getElementById('totalPrice').textContent = total.toFixed(2);
        
        //uložení typu
        document.getElementById('itemName').value = itemType;

    } else {
        document.getElementById('totalPrice').textContent = "0";
    }
}