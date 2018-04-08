const app = require('express')()
const bodyParser = require('body-parser')
const logger = require('morgan')

const port = process.env.PORT || 3030

app.use(logger('dev'))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: true}))

app.get('*', (req, res) => {
  res.send('This is an example USSD application build by Kevin Gawo')
})

app.post('*', (req, res) => {
  let {sessionId, serviceCode, phoneNumber, text} = req.body
  if (text == '') {
    // This is the first request. Note how we start the response with CON
    //First session to get client info
    let response = `CON Make Easy payments to yur service provider.Enter Customer Code and press 1 to continue:
    1.Continiue to payments`
    res.send(response)
    
  //show client information and mode of payment
  } else if (text == '1') {
    // Business logic for first level response
    let customerName = 'Kevin Gawo'
    let customerBill = 'GHC 300'
    
    let response = `CON Welcome ${customerName} yor bill for this month is ${customerBill}.Pay With:
    1. MTN 
    2. Airtel 
    3. Vodaphone `
    res.send(response)
    
    //Paywith MTN
  } else if (text == '1*1') {
    // Business logic for first level responsV
    // This is a terminal request. Note how we start the response with END
    let response = `CON Enter Amount
    1.Continue`
    res.send(response)
    
  } else if (text == '1*1*1') {
    // Business logic for first level responsV
    // This is a terminal request. Note how we start the response with END
    let response = `CON Enter Pin:
    1.Confirm Payment`
    res.send(response)
    
   } else if (text == '1*1*1*1') {
    // Business logic for first level responsV
    // This is a terminal request. Note how we start the response with END
    let companyName = 'Jekora Limited'
    let response = `END Thank You for Choosing ${companyName}'
    res.send(response)
     //End of pay with MTN

        //Pay with Airtel
  } else if (text == '1*2') {
    // Business logic for first level responsV
    // This is a terminal request. Note how we start the response with END
    let response = `CON Enter Amount
    1.Continue`
    res.send(response)
    
  } else if (text == '2*1*1') {
    // Business logic for first level responsV
    // This is a terminal request. Note how we start the response with END
    let response = `CON Enter Pin:
    1.Confirm Payment`
    res.send(response)
    
    } else if (text == '2*1*1*1') {
    // Business logic for first level responsV
    // This is a terminal request. Note how we start the response with END
    let companyName = 'Jekora Limited'
    let response = `END Thank You for Choosing ${companyName}'
    res.send(response)
      //End of pay with Airtel
 
     
       //Paywith Vodaphone
  } else if (text == '1*3') {
    // Business logic for first level responsV
    // This is a terminal request. Note how we start the response with END
    let response = `CON Enter Amount
    1.Continue`
    res.send(response)
    
  } else if (text == '1*3*1') {
    // Business logic for first level responsV
    // This is a terminal request. Note how we start the response with END
    let response = `CON Enter Pin:
    1.Confirm Payment`
    res.send(response)
    
   } else if (text == '1*3*1*1') {
    // Business logic for first level responsV
    // This is a terminal request. Note how we start the response with END
    let companyName = 'Jekora Limited'
    let response = `END Thank You for Choosing ${companyName}'
    res.send(response)
//End of pay with Vodaphone

  } else {
    res.status(400).send('Bad request!')
  }
})

app.listen(port, () => {
  console.log(`Server running on port ${port}`)
})
