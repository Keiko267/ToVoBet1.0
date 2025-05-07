test('a', async () => {
    expect(true).toBe(true);
});
test('a', async () => {
    await new Promise(resolve => setTimeout(resolve, 500));

    expect(true).toBe(true);
});