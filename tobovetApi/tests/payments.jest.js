const db = require('../sevices/db.js');
//Consulta, inserción, actualización y eliminación de articulos
test('can fetch products', async () => {
    const result = await db.query('SELECT * FROM articles');
    expect(result).toBeDefined();
});

test('can insert an product', async () => {
    const result = await db.query('INSERT INTO articles (article_name, article_group, article_pvp, article_stock) VALUES ("Test", "Testgroup", "1", "1")');
    expect(result).toBeDefined();
});

test('can update an product', async () => {
    const result = await db.query('UPDATE articles SET article_name = "Test2" WHERE article_name = "Test"');
    expect(result).toBeDefined();
});

test('can delete an product', async () => {
    const result = await db.query('DELETE FROM articles WHERE article_name = "Test2"');
    expect(result).toBeDefined();
});

//Consulta, inserción, actualización y eliminación de payments
test('can fetch payments', async () => {
    const result = await db.query('SELECT * FROM payments');
    expect(result).toBeDefined();
});

test('can insert a payment', async () => {
    const result = await db.query('INSERT INTO payments (payment_pet, payment_type, payment_date) VALUES ("9999", "Bizum", "2025-01-01")');
    expect(result).toBeDefined();
});

test('can update a payment', async () => {
    const result = await db.query('UPDATE payments SET payment_date = "2025-01-02" WHERE payment_pet = "9999"');
    expect(result).toBeDefined();
});

test('can delete a payment', async () => {
    const result = await db.query('DELETE FROM payments WHERE payment_pet = "9999"');
    expect(result).toBeDefined();
});

//Consulta, inserción, actualización y eliminación de payment_articles
test('can fetch payments_products', async () => {
    const result = await db.query('SELECT * FROM payment_articles');
    expect(result).toBeDefined();
});

test('can insert a payments_product', async () => {
    const result = await db.query('INSERT INTO payments_articles (payments_articles_id, payments_id, articles_id, payments_articles_quantity) VALUES ("8888", "1", "1", "1")');
    expect(result).toBeDefined();
});

test('can update a payments_product', async () => {
    const result = await db.query('UPDATE payments_articles SET payments_articles_quantity = "2" WHERE payments_id = "1" AND articles_id = "1"');
    expect(result).toBeDefined();
});

test('can delete a payment_product', async () => {
    const result = await db.query('DELETE FROM payments_articles WHERE payments_id = "1" AND articles_id = "1"');
    expect(result).toBeDefined();
});