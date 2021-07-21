INSERT INTO users (name, email, password)
VALUES ('MOE', 'moe@1', '$2a$10$FB/BOAVhpuLvpOREQVmvmezD4ED/.JBIDRh70tGevYzYzQgFId2u'),
('afsan', 'afsan@1', '$2a$10$FB/BOAVhpuLvpOREQVmvmezD4ED/.JBIDRh70tGevYzYzQgFId2u'),
('noha', 'noha@1', '$2a$10$FB/BOAVhpuLvpOREQVmvmezD4ED/.JBIDRh70tGevYzYzQgFId2u'),
('hana', 'hana@6', '$2a$10$FB/BOAVhpuLvpOREQVmvmezD4ED/.JBIDRh70tGevYzYzQgFId2u');



INSERT INTO properties (owner_id, title, description, thumbnail_photo_url, cover_photo_url, cost_per_night, parking_spaces, number_of_bathrooms, number_of_bedrooms, country, street, city, province, post_code, active)
VALUES (4, 'Albowadi', 'description', 'thumbnil pohoto url', 'cover photo url', 150, 2, 1, 4, 'Canada', 'Mallory st', 'Mississauga', 'Ontario', 'lm5-334', TRUE),
(3, 'Lonna', 'description', 'thumbnil pohoto url', 'cover photo url', 250, 1, 2, 4, 'Canada', 'Credit view st', 'Mississauga', 'Ontario', 'lm5-M10', TRUE),
(2, 'Modi', 'description', 'thumbnil pohoto url', 'cover photo url', 50, 1, 1, 1, 'Canada', 'Tosca st', 'Mississauga', 'Ontario', 'lm5-k1k', TRUE),
(1, 'Kamal', 'description', 'thumbnil pohoto url', 'cover photo url', 80, 1, 1, 1, 'Canada', 'Telle st', 'Mississauga', 'Ontario', 'lm5-ll4', TRUE);


INSERT INTO reservations (guest_id, property_id, start_date, end_date)
VALUES (1, 1, '2018-09-11', '2018-09-26'),
(2, 2, '2019-01-04', '2019-02-01'),
(3, 3, '2021-10-01', '2021-10-14');


INSERT INTO property_reviews (guest_id, property_id, reservation_id, rating, message)
VALUES (1, 2, 3, 10, 'message'),
VALUES (2, 1, 2, 9, 'message'),
VALUES (3, 3, 1, 5, 'message'),
VALUES (4, 2, 4, 7, 'message');