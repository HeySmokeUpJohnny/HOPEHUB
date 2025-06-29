-- Tablo oluşturma
CREATE TABLE IF NOT EXISTS customers (
    customer_id INT AUTO_INCREMENT PRIMARY KEY,
    first_name VARCHAR(255),
    last_name VARCHAR(255),
    email VARCHAR(255),
    phone_number VARCHAR(255),
    address VARCHAR(255),
    city VARCHAR(255),
    username VARCHAR(255),
    password VARCHAR(255)
);

-- Örnek veri ekleme
INSERT INTO customers (first_name,
                       last_name,
                       email,
                       phone_number,
                       address,
                       city,
                       username,
                       password)
VALUES ('Leal', 'Candemir', 'lealcandemir@example.com', '05321234567', 'İstiklal Caddesi No:23', 'İstanbul', 'lealcndmr',
        '123')

