const app = require('express')();
const bodyParser = require('body-parser');
const logger = require('morgan');

const port = process.env.PORT || 3030;

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.get('*', function (req, res) {
    res.send('This is an example USSD application build by Kevin Gawo')
})

app.post('*', function (req, res) {
    let {sessionId, serviceCode, phoneNumber, text} = req.body;
    if (text == '') {
        // This is the first request. Note how we start the response with CON
        //First session to get client ino
        let customerName = 'Yao Klu';
        let customerBill = 'GHC 300';
        let response = `CON Welcome ${customerName} yor bill for this month is ${customerBill}.Pay With:
            1.Make Payment ;
            2.Make Complaint`;
        
        res.send(response)

//         res.send(response)

        //show client information and mode of payment
//     } else if (text == 'A555') {
        // Business logic for first level response
//         let customerId = 'A555';
//         let customerName = 'Yao Klu';
//         let customerBill = 'GHC 300';

//         let response = `CON Welcome ${customerName} yor bill for this month is ${customerBill}.Pay With:
//             1.Make Payment`;
//         res.send(response)

        //Paywith MTN
//     } else if (text == '') {
        // This is a terminal request. Note how we start the response with END
//         let response = `CON Enter Amount`;
//         res.send(response)

    } else if (text == '1') {
        // This is a terminal request. Note how we start the response with END
        let response = `CON Enter Pin:`;
        res.send(response)

    } else if (text == '1*4040') {
        // This is a terminal request. Note how we start the response with END
        let response = `CON Confirm Payment for 300 Cedi to Jekora Waste:
    1.Confirm Payment`;
        res.send(response)

    } else if (text == '1*4040*1') {
        // This is a terminal request. Note how we start the response with END
        let companyName = 'Jekora Ventures Ltd powered Jumeni';
        let response = `END Thank You for Choosing ${companyName}`;
        res.send(response)
        //End of pay with MTN

        //Pay with Airtel
    } else if (text == 'A555*2') {
//     This is a terminal request. Note how we start the response with END
   let response = `CON Enter Amount`;
    res.send(response)

  } else if (text == 'A555*2*300') {
        // This is a terminal request. Note how we start the response with END
        let response = `CON Enter Pin:`;
        res.send(response)

    } else if (text == 'A555*2*300*4040'){
        let response = `CON Confirm Payment:
        1.Confirm Payment`;
        res.send(response)

    } else if (text == 'A555*2*300*4040*1') {
//     // Business logic for first level responsV
//     // This is a terminal request. Note how we start the response with END
    let companyName = 'Jekora Ventures Ltd powered by Jumeni'
    let response = `END Thank You for Choosing ${companyName}`;
    res.send(response)
//       //End of pay with Airtel


        //Paywith Vodaphone
    } else if (text == 'A555*3') {
        // Business logic for first level responsV
        // This is a terminal request. Note how we start the response with END
        let response = `CON Enter Amount
    1.Continue`;
        res.send(response)

    } else if (text == 'A555*3*300') {
        // Business logic for first level responsV
        // This is a terminal request. Note how we start the response with END
        let response = `CON Enter Pin:`;
        res.send(response)

    } else if (text=='A555*3*300*4040'){
        let response = `CON Confirm payment:
        1.Confirm payment`
        res.send(response)

    } else if (text == 'A555*3*300*4040*1') {
        // Business logic for first level responsV
        // This is a terminal request. Note how we start the response with END
        let companyName = 'Jekora Ventures Ltd powered by Jumeni';
        let response = `END Thank You for Choosing ${companyName}`;
        res.send(response)
//End of pay with Vodaphone

    } else {
        res.status(400).send('Bad request!')
    }
});

app.listen(port, function () {
    console.log(`Server running on port ${port}`)
});

