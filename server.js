const app = require('express')();
const bodyParser = require('body-parser');
const logger = require('morgan');

const port = process.env.PORT || 3030;

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.get('*', function (req, res) {
    res.send('Customer Payment')
})

app.post('*', function (req, res) {
    
    let phoneNumber = req.body.CustomerMsisdn;
    let sessionId = req.body.sessionId;
    let Channel = req.body.Channel;
    let customerName = req.body.CustomerName;
    let token = req.body.Token;
    var text = req.body.text

console.log(phoneNumber, sessionId,Channel,customerName, token)
    
    if (text == '') {
        // This is the first request. Note how we start the response with CON
        //First session to get client ino
        let customerName = 'Yao Klu';
        let customerBill = 'GHC 300';
        let response = `CON Welcome ${customerName} yor bill for this month is ${customerBill}. Pay With:
            1. Pay Bills 
            2. Make Complaint`;
        
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
        let response = `CON Confirm payment of GHS 300 to Jekora Waste. Enter Pin to confirm:`;
        res.send(response)

    } else if (text == '1*4040') {
        // This is a terminal request. Note how we start the response with END
        let response = `CON Press 1 to confirm or any number to cancel:
    1.Confirm Payment`;
        res.send(response)

    } else if (text == '1*4040*1') {
        // This is a terminal request. Note how we start the response with END
        let companyName = 'Jekora Ventures Ltd. Powered by Jumeni';
        let response = `END Thank You for Choosing ${companyName}`;
        res.send(response)
        //End of pay with MTN
     
    } else {
        res.status(400).send('Bad request!')
    }
});

app.listen(port, function () {
    console.log(`Server running on port ${port}`)
});

