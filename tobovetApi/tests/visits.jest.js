const db = require('../sevices/db.js');
//Consulta, inserción, actualización y eliminación de visitas
test('can fetch visits', async () => {
    const result = await db.query('SELECT * FROM visits');
    expect(result).toBeDefined();
});

test('can insert a visit', async () => {
    const result = await db.query('INSERT INTO visits (visit_client, visit_pet, visit_date, visit_vet) VALUES ("9999", "9999", "2025-01-01", "1")');
    expect(result).toBeDefined();
});

test('can update a visit', async () => {
    const result = await db.query('UPDATE visits SET visit_date = "2025-01-02" WHERE visit_client = "9999" AND visit_pet = "9999"');
    expect(result).toBeDefined();
});

test('can delete a visit', async () => {
    const result = await db.query('DELETE FROM visits WHERE visit_client = "9999" AND visit_pet = "9999"');
    expect(result).toBeDefined();
});

//Consulta, inserción, actualización y eliminación de vaccinations
test('can fetch vaccinations', async () => {
    const result = await db.query('SELECT * FROM vaccinations');
    expect(result).toBeDefined();
});

test('can insert a vaccination', async () => {
    const result = await db.query('INSERT INTO vaccinations (vaccination_article, vaccination_pet) VALUES ("1", "9999")');
    expect(result).toBeDefined();
});

test('can update a vaccination', async () => {
    const result = await db.query('UPDATE vaccinations SET vaccination_article = "2" WHERE vaccination_article = "1" AND vaccination_pet = "9999"');
    expect(result).toBeDefined();
});

test('can delete a vaccination', async () => {
    const result = await db.query('DELETE FROM vaccinations WHERE vaccination_article = "2" AND vaccination_pet = "9999"');
    expect(result).toBeDefined();
});