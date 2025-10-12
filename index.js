import http from 'http';
import { customers, products, orders} from './data.js'

const app = http.createServer((request, response) => {
    const url = request.url;
    const method = request.method;
    if ( url.startsWith('/customers')) {
        const path = url.split('/');
        const customerId = path[2];
        const customer = customers.find(customer => customer.id === customerId);
        const orderId = orders.filter(order => order.id === customerId);
        response.writeHead(200, {'Content-Type': 'application/json; charset=utf-8'});
        response.end(JSON.stringify(customer));

    } else if (url === '/customers' && method === 'GET') {
        response.writeHead(200, {'Content-Type': 'application/json; charset=utf-8'});
        response.end(JSON.stringify(customers));
    } else {
        response.end("Wrong API !");
    }
});

app.listen(8080, () => {
    console.log("Server is running!");
});