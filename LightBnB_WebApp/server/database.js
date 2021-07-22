const properties = require('./json/properties.json');
const users = require('./json/users.json');
const { Pool } = require('pg')
const pool = new Pool({
  user: 'mohamedali',
	password: '123',
	host: 'localhost',
	database: 'lightbnb'
})

/// Users

/**
 * Get a single user from the database given their email.
 * @param {String} email The email of the user.
 * @return {Promise<{}>} A promise to the user.
 */
const getUserWithEmail = function(email) {
  const queryString = `SELECT * FROM users WHERE email = $1`;
  return pool.query(queryString, [email.toLowerCase()])
  .then(res => res.rows[0])
}
exports.getUserWithEmail = getUserWithEmail;

/**
 * Get a single user from the database given their id.
 * @param {string} id The id of the user.
 * @return {Promise<{}>} A promise to the user.
 */
const getUserWithId = function(id) {
  const queryString = `SELECT * FROM users WHERE id = $1`
  return pool.query(queryString, [id])
  .then(res => res.rows[0])
}
exports.getUserWithId = getUserWithId;


/**
 * Add a new user to the database.
 * @param {{name: string, password: string, email: string}} user
 * @return {Promise<{}>} A promise to the user.
 */

  const addUser =  function(user) {
    return pool.query(`INSERT INTO users (name, password, email) VALUES($1, $2, $3) RETURNING *;`, [user.name, user.email, user.password])
    .then(res => res.rows[0])
  }
exports.addUser = addUser;

/// Reservations

/**
 * Get all reservations for a single user.
 * @param {string} guest_id The id of the user.
 * @return {Promise<[{}]>} A promise to the reservations.
 */
const getAllReservations = function(guest_id, limit = 10) {
  return pool.query(`SELECT * FROM reservations WHERE guest_id = $1 LIMIT $2`, [`%${guest_id}%` ,limit])
  .then(res => res.rows[0])
  .catch(er => {console.log(er.message)})
}
exports.getAllReservations = getAllReservations;

/// Properties

/**
 * Get all properties.
 * @param {{}} options An object containing query options.
 * @param {*} limit The number of results to return.
 * @return {Promise<[{}]>}  A promise to the properties.
 */
const getAllProperties = function(options, limit = 10) {
  const queryparams = []
  let queryString = `
  SELECT properties.*, avg(property_reviews.rating) as average_rating
  FROM properties
  JOIN property_reviews ON properties.id = property_id
  `;

  if (options.city) {
    queryparams.push(`%${options.city}%`)
    queryString += `WHERE city LIKE $${queryparams.length} `;
  }
  if (options.owner_id) {
    queryparams.push(options.owner_id)
    queryString += `AND owner_id $${owner_id}`
  }
  if (options.minimum_rating) {
    queryparams.push(`${options.minimum_rating}`)
    queryString += `AND property_reviews.rating > $${queryparams.length} `;
  }

  if (options.minimum_price_per_night) {
    queryparams.push(`${options.minimum_price_per_night}`)
    queryString += `
    AND cost_per_night > $${queryparams.length} * 100`
  }

  if (options.maximum_price_per_night) {
    queryparams.push(`${options.maximum_price_per_night}`)
    queryString += `
    AND cost_per_night < $${queryparams.length} * 100`
  }


  queryparams.push(limit)
  queryString += `
  GROUP BY properties.id
  ORDER BY cost_per_night
  LIMIT $${queryparams.length};
  `;

  console.log(queryString, queryparams);
  console.log(options)

  return pool.query(queryString, queryparams).then(res => res.rows)

}
exports.getAllProperties = getAllProperties;


/**
 * Add a property to the database
 * @param {{}} property An object containing all of the property details.
 * @return {Promise<{}>} A promise to the property.
 */
const addProperty = function(property) {
  let queryString = `INSERT INTO properties (title, description, thumbnail_photo_url, cover_photo_url, cost_per_night, street,  city, province, post_code, country, parking_spaces, number_of_bathrooms, number_of_bedrooms, owner_id)
  VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14) RETURNING *;`
  const queryparams = [];
  queryparams.push(property.title, property.description, property.thumbnail_photo_url, property.cover_photo_url, property.cost_per_night, property.street, property.city, property.province, property.post_code, property.country, property.parking_spaces, property.number_of_bathrooms, property.number_of_bedrooms, property.owner_id)
  return pool.query(queryString, queryparams).then(res => res.rows).catch(err => {console.log(err.message)})
}
exports.addProperty = addProperty;
