import http from 'http';
import * as data from './data.js';
// createServer là phương thức giúp chúng ta khởi tạo 1 Server với giao thức http
// và sẽ giúp xử lý các request và response cho client
const app = http.createServer((request, response) => {
    // request: là đối tượng chứa thông tin của yêu cầu từ client gửi lên
    // response: là đối tượng chứa thông tin phản hồi từ server trả về cho client
    console.log('Client request URL:', request.url  );

    const path = request.url;
    //  /customers/1/orders
    if (path.startsWith('/customers')) {
        const parts = path.split('/');
        console.log(parts);
        if (parts.length === 4 && parts[3] === 'orders') {
            const customerId = parts[2];
            const customer = data.customers.find(c => c.id === customerId);
            const orders = data.orders.filter(o => o.customerId === customerId);
            if(orders.length > 0) {
                response.writeHead(200, {'Content-Type': 'application/json; charset=utf-8'});
                response.end(JSON.stringify(orders));
            } else {
                response.writeHead(404, {'Content-Type': 'application/json; charset=utf-8'});
                response.end(JSON.stringify([]));
            }
            // if (customer) {
            //     response.writeHead(200, {'Content-Type': 'application/json; charset=utf-8'});
            // if (customer) {
            //     response.writeHead(200, {'Content-Type': 'application/json; charset=utf-8'});
            //     response.end(JSON.stringify(customer));
            // } else {
            //     response.writeHead(404, {'Content-Type': 'application/json; charset=utf-8'});
            //     response.end(JSON.stringify({ error: 'Customer not found' }));
            // }
            return;
        }
    }

    if(request.url === '/customers') {
        response.writeHead(200, {'Content-Type': 'application/json; charset=utf-8'});
        response.end(JSON.stringify(data.customers));
        return;
    }
    response.end('Hello World');
});
// để lăng nghe được, ta cần sử dụng phương thức listen
// và có 2 tham số truyền vào
// app.listen(Cổng khởi tạo, callback Function)
// callback Function sẽ được thực thi sau khi server được khởi tạo thành công
app.listen(8080, () => {
    console.log('Server is running!');
})