# Burrito Builder API

This API is used in conjunction with the Burrito Builder Front End. It stores burritos that people want made! Woohoo!

## Setup

* Clone down this repo and run `npm install`
* Run the server by using `npm start`

The server will run on `http://localhost:3001`. All endpoints are prefixed with `/api/v1`.

## Data Model

A burrito stored on the server has an `id`, `name`, and `ingredients`. Here is a sample burrito object:

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
| Get all burritos |`/api/v1/burritos`| GET | N/A | All burritos on the server: `{burritos: [{}, {}, ...]}` |
| Add new burrito |`/api/v1/burritos`| POST | `{name: <String>, ingredients: <Array of Strings>}` | New burrito that was added: `{id: 2, name: "Alex", ingredients: ["cheese", "beans"]}` |
| Delete existing burrito |`/api/v1/burritos/:burrito_id`| DELETE | N/A | For successful deletion: No reponse body (only 204 status code) |
