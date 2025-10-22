import http from "http";
import { customers, products, orders } from "./data.js";

const server = http.createServer((request, response) => {
  const base = `http://${request.headers.host || "localhost"}`;
  const urlObj = new URL(request.url, base);
  const pathname = urlObj.pathname; // vd: '/customers/c001/orders'
  const parts = pathname.split("/").filter(Boolean); // ['customers','c001','orders']

  response.setHeader("Content-Type", "application/json; charset=utf-8");

  // GET /
  if (request.method === "GET" && pathname === "/") {
    response.writeHead(200, { "Content-Type": "text/plain; charset=utf-8" });
    response.end("Hello");
    return;
  }

  // GET /customers
  if (request.method === "GET" && pathname === "/customers") {
    response.writeHead(200);
    response.end(JSON.stringify(customers));
    return;
  }

  // GET /customers/:id 
  if (request.method === "GET" && parts.length === 2 && parts[0] === "customers") {
    const id = parts[1];
    const customer = customers.find((c) => String(c.id) === id);

    if (customer) {
      response.writeHead(200);
      response.end(JSON.stringify(customer));
    } else {
      response.writeHead(404);
      response.end(JSON.stringify({ error: "Customer not found" }));
    }
    return;
  }

  // GET /customers/:customerId/orders
  if (request.method === "GET" && parts.length === 3 && parts[0] === "customers" && parts[2] === "orders") {
    const customerId = parts[1];
    const customerOrders = orders.filter((o) => String(o.customerId) === customerId);
    response.writeHead(200);
    response.end(JSON.stringify(customerOrders));
    return;
  }

  // GET /orders/highvalue  -> trả orders có totalPrice > 10_000_000
  if (request.method === "GET" && pathname === "/orders/highvalue") {
    const highValueOrders = orders.filter((o) => Number(o.totalPrice) > 10000000);
    response.writeHead(200);
    response.end(JSON.stringify(highValueOrders));
    return;
  }

    //  GET /products?minPrice=&maxPrice= ( vd: /products?minPrice=5000000&maxPrice=10000000 )
  if (request.method === "GET" && pathname === "/products") {
   
    const minPrice = urlObj.searchParams.get("minPrice");
    const maxPrice = urlObj.searchParams.get("maxPrice");
  
    const min = minPrice ? Number(minPrice) : null;
    const max = maxPrice ? Number(maxPrice) : null;

    let filtered = products;
    if (min !== null && max !== null) {
      filtered = products.filter((p) => p.price >= min && p.price <= max);
    } else if (min !== null) {
      filtered = products.filter((p) => p.price >= min);
    } else if (max !== null) {
      filtered = products.filter((p) => p.price <= max);
    }

    response.writeHead(200);
    response.end(JSON.stringify(filtered));
    return;
  }

  // GET /orders 
  if (request.method === "GET" && pathname === "/orders") {
    response.writeHead(200);
    response.end(JSON.stringify(orders));
    return;
  }

  // GET /products
  if (request.method === "GET" && pathname === "/products") {
    response.writeHead(200);
    response.end(JSON.stringify(products));
    return;
  }
  
  response.writeHead(404);
  response.end(JSON.stringify({ error: "NotFound API!" }));
});

server.listen(8080, () => {
  console.log("Server is running at http://localhost:8080");
});
