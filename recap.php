<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Recap</title>
    <link rel="stylesheet" href="style.css">
</head>
<body>
    <?php
        session_start();
        // inicializace
        $fname = $lname = $birth = $address = $phone = $mail = $itemPrice = $quantity = $itemName = "";
        $totalPrice = $totalPriceWithTax = 0;
        if ($_SERVER["REQUEST_METHOD"] == "POST") {
            // načtení info
            $fname = htmlspecialchars($_POST['fname']);
            $lname = htmlspecialchars($_POST['lname']);
            $birth = htmlspecialchars($_POST['birth']);
            $address = htmlspecialchars($_POST['address']);
            $phone = htmlspecialchars($_POST['phone']);
            $mail = htmlspecialchars($_POST['mail']);
            $itemName = htmlspecialchars($_POST['itemName']);
            $itemPrice = floatval($_POST['item']);
            $quantity = intval($_POST['quantity']);
            
            // výpočet DPH
            $totalPrice = $itemPrice * $quantity;
            $taxRate = 0.21;
            $totalPriceWithTax = $totalPrice * (1 + $taxRate);
            
            // uchování ceny
            $_SESSION['totalPriceWithTax'] = $totalPriceWithTax;
        }
    ?>
    <h1>Summary</h1>
    <fieldset>
        <h2>Personal Info</h2>
        <p>First Name: <?php echo $fname; ?></p>
        <p>Last Name: <?php echo $lname; ?></p>
        <p>Date of Birth: <?php echo $birth; ?></p>
        <p>Address: <?php echo $address; ?></p>
        <p>Phone Number: <?php echo $phone; ?></p>
        <p>E-mail: <?php echo $mail; ?></p>
        <p>Item Type: <?php echo $itemName; ?></p>
        <p>Price per Item: <?php echo number_format($itemPrice, 2); ?> CZK</p>
        <p>Quantity: <?php echo $quantity; ?></p>
        <p>Total Price before Tax: <?php echo number_format($totalPrice, 2); ?> CZK</p>
        <p>Total Price after Tax : <?php echo number_format($totalPriceWithTax, 2); ?> CZK</p>
    </fieldset>

    <?php
    // načítání kurzů měn
    function loadExchangeRates() {
        $url = 'https://www.cnb.cz/en/financial_markets/foreign_exchange_market/exchange_rate_fixing/daily.txt';
        $content = @file_get_contents($url);
        
        //kontrola
        if ($content === FALSE) {
            echo "Error loading exchange rates.";
            return [];
        }
        
        //rozdělení na řádky
        $lines = explode("\n", $content);
        $currencies = [];
        
        // zpracování řádku, rozdělení dat
        foreach (array_slice($lines, 2) as $line) {
            $parts = explode('|', $line);
            
            if (count($parts) === 5) {
                $code = trim($parts[3]);
                $rate = floatval(trim($parts[4]));
                $currencies[$code] = ['rate' => $rate];
            }
        }
        
        return $currencies;
    }
    $exchangeRates = loadExchangeRates();
    ?>

    <fieldset>
        <h2>Currency Selection</h2>
        <label for="currency">Currency:</label>
        <select id="currency" name="currency" onchange="updateConvertedPrice()">
            <option value="">Select Currency</option>
            <?php foreach ($exchangeRates as $code => $data): ?>
            <option value="<?php echo htmlspecialchars($code); ?>"><?php echo htmlspecialchars($code); ?></option>
            <?php endforeach; ?>
        </select>
        <p>Converted Price: <span id="convertedPrice">0.00</span> <span id="selectedCurrency"></span></p>
    </fieldset>
    
    <!-- hodnota -->
    <input type="hidden" id="totalPriceWithTax" value="<?php echo number_format($totalPriceWithTax, 2, '.', ''); ?>">

    <script>
        var currencyRates = <?php echo json_encode($exchangeRates); ?>;

        // konverze ceny
        function updateConvertedPrice() {
            var selectedCurrency = document.getElementById('currency').value;
            var totalPrice = parseFloat(document.getElementById('totalPriceWithTax').value);

            if (selectedCurrency && currencyRates[selectedCurrency]) {
                var exchangeRate = currencyRates[selectedCurrency]['rate'];
                var convertedPrice = totalPrice / exchangeRate;

                // výpis hodnot na konzoli
                console.log("Exchange Rate: " + exchangeRate);
                console.log("Converted price: " + convertedPrice);
                console.log("Currency Code: " + selectedCurrency);

                document.getElementById('convertedPrice').textContent = convertedPrice.toFixed(2) + ' ' + selectedCurrency;
            } else {
                document.getElementById('convertedPrice').textContent = '0.00 ' + selectedCurrency;
            }
        }
    </script>
</body>
</html>
