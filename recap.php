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
        //session_start();
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
</body>
</html>
