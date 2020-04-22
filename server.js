const express = require('express');
const app = express();
const cors = require('cors');

app.set('port', process.env.PORT || 3001);
app.use(express.json());
app.use(cors());

// ingredient options: beans, steak, carnitas, sofritas, lettuce, queso fresco, pico de gallo, hot sauce, guacamole, jalapeno, cilantro, sour cream

app.locals.orders = [
  {
    id: 1,
    name: 'Pat',
    ingredients: ['beans', 'lettuce', 'carnitas', 'queso fresco', 'jalapeno']
  },
  {
    id: 2,
    name: 'Sam',
    ingredients: ['steak', 'pico de gallo', 'lettuce', 'carnitas', 'queso fresco', 'jalapeno']
  },
  {
    id: 3,
    name: 'Alex',
    ingredients: ['sofritas', 'beans', 'sour cream', 'carnitas', 'queso fresco']
  }
];

app.get('/', (request, response) => {
  return response.status(200).json({ hello: 'world', burrito: 'builder' });
});


// Get all orders
app.get('/api/v1/orders', (request, response) => {
  return response.status(200).json({ orders: app.locals.orders });
});


// Add an order
app.post('/api/v1/orders', (request, response) => {
  const newOrder = request.body;
  const requiredParams = ['name', 'ingredients'];
  let missingParams = [];

  for (let requiredProperty of requiredParams) {
    if (newOrder[requiredProperty] === undefined) {
      missingParams = [...missingParams, requiredProperty];
    }
  }

  if (missingParams.length) {
    return response.status(422).send({ message: `Missing ${missingParams.join(', ')} in request.` });
  } else {
    if (app.locals.orders.length === 0) {
      newOrder.id = 1;
    } else {
      newOrder.id = app.locals.orders[app.locals.orders.length - 1].id + 1;
    }
    app.locals.orders.push(newOrder);
    return response.status(201).json(newOrder);
  }
});


// Remove an order
app.delete('/api/v1/orders/:order_id', (request, response) => {
  const orderId = parseInt(request.params.order_id);

  const numOrdersBeforeFilter = app.locals.orders.length;
  const filteredOrders = app.locals.orders.filter(order => {
    return orderId !== order.id;
  });

  if (numOrdersBeforeFilter === filteredOrders.length) {
    return response.status(404).json({ message: `No order found with id: ${orderId}` });
  } else {
    app.locals.orders = filteredOrders;
    return response.sendStatus(204);
  }
});

app.listen(app.get('port'), () => {
  console.log(`Burrito Builder API running on http://localhost:${app.get('port')}`);
});
