const express = require('express');
const app = express();

app.use(express.json());
app.set('port', process.env.PORT || 3001);

// ingredient options: beans, steak, carnitas, sofritas, lettuce, queso fresco, pico de gallo, hot sauce, guacamole, jalapeno, cilantro, sour cream 

app.locals.burritos = [
  {
    id: 1,
    name: 'Pat',
    ingredients: ['beans', 'lettuce', 'carnitas', 'queso fresco', 'jalapeno']
  }
];

app.get('/', (request, response) => {
  return response.status(200).json({ hello: 'world', burrito: 'builder' });
});


// Get all burritos
app.get('/api/v1/burritos', (request, response) => {
  return response.status(200).json({ burritos: app.locals.burritos });
});


// Add a burrito
app.post('/api/v1/burritos', (request, response) => {
  const newBurrito = request.body;
  const requiredParams = ['name', 'ingredients'];
  let missingParams = [];

  for (let requiredProperty of requiredParams) {
    if (newBurrito[requiredProperty] === undefined) {
      missingParams = [...missingParams, requiredProperty];
    }
  }

  if (missingParams.length) {
    return response.status(422).send({ message: `Missing ${missingParams.join(', ')} in request.` });
  } else {
    newBurrito.id = app.locals.burritos[app.locals.burritos.length - 1].id + 1;
    app.locals.burritos.push(newBurrito);
    return response.status(201).json(newBurrito);
  }
});


// Remove a burrito
app.delete('/api/v1/burritos/:burrito_id', (request, response) => {
  const burritoId = parseInt(request.params.burrito_id);

  const numBurritosBeforeFilter = app.locals.burritos.length;
  const filteredBurritos = app.locals.burritos.filter(burrito => {
    return burritoId !== burrito.id;
  });
  
  if (numBurritosBeforeFilter === filteredBurritos.length) {
    return response.status(404).json({ message: `No burrito found with id: ${burritoId}` });
  } else {
    app.locals.burritos = filteredBurritos;
    return response.sendStatus(204);
  }
});

app.listen(app.get('port'), () => {
  console.log(`Burrito Builder API running on http://localhost:${app.get('port')}`);
});
