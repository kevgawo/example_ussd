const app = require('express')();
const bodyParser = require('body-parser');
const logger = require('morgan');
const mysql = require('mysql'); 

//create connection to the database


const port = process.env.PORT || 3030;

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.get('*', function (req, res) {
    res.send('Make a payment')
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
        //First session to get client info
        let response = `CON Make Easy payments to your service provider.
        Enter Customer Code`;
        //get {customerCode} from the DB to identify the customer
        let customercode = response;
        res.send(customercode)

        //do a search to verify that they are a customer of the company
    } else if (text == 'A555') {
        // Business logic for first level response
        //get the data from the database the {customerId}, {customerName}, {customerBill}
        let customerId = 'A555';
        let customerName = 'Yao Klu';
        let customerBill = 'GHC 300';

        let response = `CON Welcome ${customerName} yor bill for this month is ${customerBill}.:
            1. Pay Bills 
            2.  Make Complaint`;
        res.send(response)

        /*make payment request for mobile money
        //hubtel has a marchant api that we can test using postman

        POST /merchants/HMXXXXXXXX/receive/mobilemoney HTTP/1.1
        Host: api.hubtel.com
        Accept: application/json
        Content-Type: application/json
        Authorization: Basic endjeLsBe8HMobnhza250G4=
        Cache-Control: no-cache
        const api = "https://api.hubtel.com/v1/merchantaccount/merchants/HMXXXXXXX/receive/mobilemoney", 
        axios.post : ( 'const api',
                    
                    {
                    "CustomerName": "customerName",
                    "CustomerMsisdn": "23327XXXXXXX",
                    "Channel": "tigo-gh",
                    "Amount": 0.8,
                    "PrimaryCallbackUrl": "http://myapi.hostname.com/callback",
                    "Description": "a post requet to make a payment through mobile money",
                    "Token": "",  // 6digit token for Vodafone cash
                    "ClientReference": "3jL2KlUy3vt21",
                    "FeesOnCustomer": true
                    });
                    .then(fuction(respose){
                        console.log(respose);
                    });
                    .catch(function(error){
                        console.log(error);
                    });
                        
        );

        
        
        */

        //start Payment process
    } else if (text == 'A555*1') {
        let response = `CON Confirm Payment of ${customerBill} to ${companyName}, enter pin`;
        res.send(response)

    } else if (text == 'A555*1*4040') {

        let response = `CON Press 1to confirm payment or any other number to cancel:
        1.Confirm Payment.`;
        res.send(response)


        /*

        //response from hubtel on the mobile money transaction
                            {
                    "ResponseCode": "0001",
                    "Data": {
                        "AmountAfterCharges": 2.9,
                        "TransactionId": "49aeaa6bc41b4dd3a4c525a7da3b8c05",
                        "ClientReference": "3jL2KlUy3vt21",
                        "Description": "Request has been accepted. A callback will be sent on final state.",
                        "ExternalTransactionId": "",
                        "Amount": 3,
                        "Charges": 0.1
                    }
                    }

        //we should then take the response by hubtel persist the {AmountAfterCharges},{transaction id},{Amount},{Charges}
        //response callback from mobile money service provider

        
        POST /mycallback HTTP/1.1
        Host: myapi.hostname.com
        Accept: application/json
        Content-Type: application/json
        {  
        "ResponseCode":"0000",
        "Data":{  
        "AmountAfterCharges": 0.3",
        "TransactionId":"RBYCnxyz9bXYnNKn",
        "ClientReference":"32321",
        "Description":"The Tigo Cash payment has been approved and processed successfully.",
        "ExternalTransactionId":"purchase-3008-0000-S",
        "Amount": 0.8,
        "Charges": 0.5
            }
            
    }*/

    } else if (text == 'A555*1*4040*1') {
        // This is a terminal request. Note how we start the response with END
        let companyName = 'Jekora Collection Limited';
        let response = `END Payment Succesfull, Thank You for Choosing ${companyName}`;
        res.send(response)
        //End of payment

      //make a complaint  
    } else if (text == 'A555*2') {
        let response = `CON Enter Complaint`;
        res.send(response)

    } else {
        res.status(400).send('Bad request!')
    }
});

app.listen(port, function () {
    console.log(`Server running on port ${port}`)
});

