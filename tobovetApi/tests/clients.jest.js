const db = require('../sevices/db.js');
//Consulta, inserción, actualización y eliminación de clientes
test('can fetch clients', async () => {
    const result = await db.query('SELECT * FROM clients');
    expect(result).toBeDefined();
});

test('can insert a client', async () => {
    const result = await db.query('INSERT INTO clients (client_name, client_document, client_status, client_dir, client_city, client_cp, client_prov, client_observations) VALUES ("Test", "12345678A", "1", "Calle Test", "Test", "12345", "Test", "Test")');
    expect(result).toBeDefined();
});

test('can update a client', async () => {
    const result = await db.query('UPDATE clients SET client_name = "Test2" WHERE client_name = "Test"');
    expect(result).toBeDefined();
});

test('can delete a client', async () => {
    const result = await db.query('DELETE FROM clients WHERE client_name = "Test2"');
    expect(result).toBeDefined();
});

//Consulta, inserción, actualización y eliminación de empresas
test('can fetch companies', async () => {
    const result = await db.query('SELECT * FROM companies');
    expect(result).toBeDefined();
});

test('can insert a company', async () => {
    const result = await db.query('INSERT INTO companies (company_name, company_NIF, company_address, company_city, company_provence, company_pc, company_country) VALUES ("Test", "12345678A", "Calle Test", "Test", "Test", "12345", "Test")');
    expect(result).toBeDefined();
});

test('can update a company', async () => {
    const result = await db.query('UPDATE companies SET company_name = "Test2" WHERE company_name = "Test"');
    expect(result).toBeDefined();
});

test('can delete a company', async () => {
    const result = await db.query('DELETE FROM companies WHERE company_name = "Test2"');
    expect(result).toBeDefined();
});

//Consulta, inserción, actualización y eliminación de contactos de cliente
test('can fetch contacts', async () => {
    const result = await db.query('SELECT * FROM client_contacts');
    expect(result).toBeDefined();
});

test('can insert a contact', async () => {
    const result = await db.query(`INSERT INTO client_contacts (client_id, contact_name, contact_phone, contact_email) VALUES ("9999", "Test", "123456789", "1234")`);
    expect(result).toBeDefined();
});

test('can update a contact', async () => {
    const result = await db.query('UPDATE client_contacts SET contact_name = "Test2" WHERE contact_name = "Test" AND client_id = "9999"');
    expect(result).toBeDefined();
});

test('can delete a contact', async () => {
    const result = await db.query('DELETE FROM client_contacts WHERE contact_name = "Test2" AND client_id = "9999"');
    expect(result).toBeDefined();
});

//Consulta, inserción, actualización y eliminación de usuarios
test('can fetch users', async () => {
    const result = await db.query('SELECT * FROM sys_users');
    expect(result).toBeDefined();
});

test('can insert a user', async () => {
    const result = await db.query('INSERT INTO sys_users (user_name, user_email, user_tlf, user_document, user_password) VALUES ("Test", "1234", "1234", "1234", "1234")');
    expect(result).toBeDefined();
});

test('can update a user', async () => {
    const result = await db.query('UPDATE sys_users SET user_name = "Test2" WHERE user_name = "Test"');
    expect(result).toBeDefined();
});

test('can delete a user', async () => {
    const result = await db.query('DELETE FROM sys_users WHERE user_name = "Test2"');
    expect(result).toBeDefined();
});

//Consulta, inserción, actualización y eliminación de registers

//Consulta, inserción, actualización y eliminación de mascotas
test('can fetch pets', async () => {
    const result = await db.query('SELECT * FROM pets');
    expect(result).toBeDefined();
});

test('can insert a pet', async () => {
    const result = await db.query('INSERT INTO pets (pet_name, pet_owner, pet_chip, pet_sex, pet_birthdate, pet_species, pet_vet, pet_sterilized) VALUES ("Margarita", "9999", "1234", "M", "2021-01-01", "Test", "1", "0"');
    expect(result).toBeDefined();
});

test('can update a pet', async () => {
    const result = await db.query('UPDATE pets SET pet_name = "Test2" WHERE pet_name = "Test" AND pet_owner = "9999"');
    expect(result).toBeDefined();
});

test('can delete a pet', async () => {
    const result = await db.query('DELETE FROM pets WHERE pet_name = "Test2" AND pet_owner = "9999"');
    expect(result).toBeDefined();
});

//Consulta, inserción, actualización y eliminación de tags
test('can fetch tags', async () => {
    const result = await db.query('SELECT * FROM tags');
    expect(result).toBeDefined();
});

test('can insert a tag', async () => {
    const result = await db.query('INSERT INTO tags (tag_name, tag_description) VALUES ("Test", "Test")');
    expect(result).toBeDefined();
});

test('can update a tag', async () => {
    const result = await db.query('UPDATE tags SET tag_name = "Test2" WHERE tag_name = "Test"');
    expect(result).toBeDefined();
});

test('can delete a tag', async () => {
    const result = await db.query('DELETE FROM tags WHERE tag_name = "Test2"');
    expect(result).toBeDefined();
});

//Consulta, inserción, actualización y eliminación de pet_tags
test('can fetch pet_tags', async () => {
    const result = await db.query('SELECT * FROM pet_tags');
    expect(result).toBeDefined();
});

test('can insert a pet_tag', async () => {
    const result = await db.query('INSERT INTO pet_tags (pet_tag_pet, pet_tag_tag) VALUES ("9999", "1")');
    expect(result).toBeDefined();
});

test('can update a pet_tag', async () => {
    const result = await db.query('UPDATE pet_tags SET pet_tag_tag = "2" WHERE pet_tag_tag = "1" AND pet_tag_pet = "9999"');
    expect(result).toBeDefined();
});

test('can delete a pet_tag', async () => {
    const result = await db.query('DELETE FROM pet_tags WHERE pet_tag_tag = "2" AND pet_tag_pet = "9999"');
    expect(result).toBeDefined();
});



