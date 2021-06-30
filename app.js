const fs = require('fs');
const path = require('path');
const utils = require('util');
var html_to_pdf = require('html-pdf-node');

const express = require('express');
const app = express();
const port = 3000;

fs.writeFile('invoice.html', `<html><head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>Snippet - Bootsnipp.com</title>
<link href="//netdna.bootstrapcdn.com/bootstrap/3.1.0/css/bootstrap.min.css" rel="stylesheet">
<style>.invoice-title h2, .invoice-title h3 {
display: inline-block;
}

.table > tbody > tr > .no-line {
border-top: none;
}

.table > thead > tr > .no-line {
border-bottom: none;
}

.table > tbody > tr > .thick-line {
border-top: 2px solid;
}</style>
<script type="text/javascript" src="//code.jquery.com/jquery-1.11.1.min.js"></script>
<script type="text/javascript" src="//netdna.bootstrapcdn.com/bootstrap/3.1.0/js/bootstrap.min.js"></script>
<script type="text/javascript"></script>
</head>
<body>
<link href="//netdna.bootstrapcdn.com/bootstrap/3.1.0/css/bootstrap.min.css" rel="stylesheet" id="bootstrap-css">
<script src="//netdna.bootstrapcdn.com/bootstrap/3.1.0/js/bootstrap.min.js"></script>
<script src="//code.jquery.com/jquery-1.11.1.min.js"></script>
<!------ Include the above in your HEAD tag ---------->

<div class="container">
<div class="row">
<div class="col-xs-12">
<div class="invoice-title">
<h2>Invoice</h2><h3 class="pull-right">Order # 12345</h3>
</div>
<hr>
<div class="row">
<div class="col-xs-6">
<address>
<strong>Billed To:</strong><br>
John Smith<br>
1234 Main<br>
Apt. 4B<br>
Springfield, ST 54321
</address>
</div>
<div class="col-xs-6 text-right">
<address>
<strong>Shipped To:</strong><br>
Anil Kumar<br>
1234 Main<br>
Apt. 4B<br>
Springfield, ST 54321
</address>
</div>
</div>
<div class="row">
<div class="col-xs-6">
<address>
<strong>Payment Method:</strong><br>
Visa ending **** 4242<br>
jsmith@email.com
</address>
</div>
<div class="col-xs-6 text-right">
<address>
<strong>Order Date:</strong><br>
March 7, 2014<br><br>
</address>
</div>
</div>
</div>
</div>

<div class="row">
<div class="col-md-12">
<div class="panel panel-default">
<div class="panel-heading">
<h3 class="panel-title"><strong>Order summary</strong></h3>
</div>
<div class="panel-body">
<div class="table-responsive">
<table class="table table-condensed">
<thead>
<tr>
    <td><strong>Item</strong></td>
    <td class="text-center"><strong>Price</strong></td>
    <td class="text-center"><strong>Quantity</strong></td>
    <td class="text-right"><strong>Totals</strong></td>
</tr>
</thead>
<tbody>
<!-- foreach ($order->lineItems as $line) or some such thing here -->
<tr>
    <td>BS-200</td>
    <td class="text-center">$10.99</td>
    <td class="text-center">1</td>
    <td class="text-right">$10.99</td>
</tr>
<tr>
    <td>BS-400</td>
    <td class="text-center">$20.00</td>
    <td class="text-center">3</td>
    <td class="text-right">$60.00</td>
</tr>
<tr>
    <td>BS-1000</td>
    <td class="text-center">$600.00</td>
    <td class="text-center">1</td>
    <td class="text-right">$600.00</td>
</tr>
<tr>
    <td class="thick-line"></td>
    <td class="thick-line"></td>
    <td class="thick-line text-center"><strong>Subtotal</strong></td>
    <td class="thick-line text-right">$670.99</td>
</tr>
<tr>
    <td class="no-line"></td>
    <td class="no-line"></td>
    <td class="no-line text-center"><strong>Shipping</strong></td>
    <td class="no-line text-right">$15</td>
</tr>
<tr>
    <td class="no-line"></td>
    <td class="no-line"></td>
    <td class="no-line text-center"><strong>Total</strong></td>
    <td class="no-line text-right">$685.99</td>
</tr>
</tbody>
</table>
</div>
</div>
</div>
</div>
</div>
</div>

</body></html>`, function (err) {
    if (err) throw err;
    console.log('Saved!');
    //generatePdf();
    let options = { format: 'A4' };
    // Example of options with args //
    // let options = { format: 'A4', args: ['--no-sandbox', '--disable-setuid-sandbox'] };

    //let file = { content: "<h1>Welcome to html-pdf-node</h1>" };
    // or //
    let file = { url: `http://localhost:3000/invoice` };
    html_to_pdf.generatePdf(file, options).then(pdfBuffer => {
        console.log("PDF Buffer:-", pdfBuffer);
        fs.writeFile('invoice.pdf', pdfBuffer, function (err) {
            if (err) throw err;
            console.log('Saved!');
        });
    });
});



app.get('/invoice', (req, res) => {

    fs.readFile('./invoice.html', function (err, html) {
        if (err) {
            throw err;
        }

        res.writeHeader(200, { "Content-Type": "text/html" });
        res.write(html);
        res.end();
    });

})

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
})



