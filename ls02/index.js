import express from 'express'
import * as data from './data.js'

const app = express()
const port = 3001

app.use(express.json());


app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.get('/customers/:id', (req, res) => {
    const customer = data.customers.find(customer => customer.id === req.params.id)
    if (customer) {
        res.send(customer)
    } else {
        res.status(404).send('Customer not found')
    }
  })

  app.delete('/customers/:customerId', (req, res) => {
    const customer = data.customers.find(customer => customer.id === req.params.id)
    if(!customer) {
        res.status(404).send('Customer not found')
        return
    }
    console.log('before delete', data.customers)
    data.customers.splice(data.customers.indexOf(customer), 1)
    console.log('after delete', data.customers)
    res.send('Customer deleted')

    // if (customer) {
    //     // data.customers = data.customers.filter(customer => customer.id !== req.params.id)
    //     console.log('before delete', data.customers)
    //     data.customers.splice(data.customers.indexOf(customer), 1)
    //     console.log('after delete', data.customers)
    //     res.send('Customer deleted')
    // } else {
    //     res.status(404).send('Customer not found')
    // }
  })



  app.get('/users', (req, res) => {
    fetch('http://localhost:3000/users').then((rs) => {
        return rs.json()
    }).then((data) => {
        res.send({
            message: 'Hello MindX-er',
            data
        });
    });
});

  app.get('/users/:id', (req, res) => {
    const user = data.users.find(user => user.id === req.params.id)
  })

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
