
SELECT properties.id, title, cost_per_night, avg(property_reviews.rating) as average_rating
FROM properties
JOIN property_reviews ON property_id = properties.id
WHERE properties.city = 'Vancouver' AND property_reviews.rating >= 4
GROUP BY properties.id
ORDER BY properties.cost_per_night
LIMIT 10;

