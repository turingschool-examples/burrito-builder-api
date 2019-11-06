# Burrito Builder API

This API is used in conjunction with the Burrito Builder Front End. It stores burrito orders that people want made! Woohoo!

## Setup

* Clone down this repo and run `npm install`
* Run the server by using `npm start`

The server will run on `http://localhost:3001`. All endpoints are prefixed with `/api/v1`.

## Data Model

A order stored on the server has an `id`, `name`, and `ingredients`. Here is a sample burrito order object:

```js
{
  id: 1,
  name: 'Pat',
  ingredients: ['beans', 'lettuce', 'carnitas', 'queso fresco', 'jalapeno']
}
```

## Endpoints

| Purpose | URL | Verb | Request Body | Sample Success Response |
|----|----|----|----|----|
| Get all orders |`/api/v1/orders`| GET | N/A | All orders on the server: `{orders: [{}, {}, ...]}` |
| Add new order |`/api/v1/orders`| POST | `{name: <String>, ingredients: <Array of Strings>}` | New order that was added: `{id: 2, name: "Alex", ingredients: ["cheese", "beans"]}` |
| Delete existing order |`/api/v1/orders/:order_id`| DELETE | N/A | For successful deletion: No response body (only 204 status code) |
