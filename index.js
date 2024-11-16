const { faker } = require('@faker-js/faker');

const generateData = (records = 3000) => {
    const data = [];
    for (let i = 0; i < records; i++) {
        data.push({
            id: faker.string.uuid(),
            name: faker.person.fullName(),
            email: faker.internet.email(),
            purchaseDate: faker.date.recent(),
            productName: faker.commerce.productName(),
            quantity: faker.number.int({ min: 1, max: 10 }),
            price: faker.commerce.price(),
            totalValue: faker.commerce.price(),
            location: faker.location.city(),
            paymentMethod: faker.finance.transactionType(),
            satisfactionRating: faker.number.int({ min: 1, max: 5 }),
        });
    }
    return data;
};

const xlsx = require('xlsx');
const data = generateData(3000);

const worksheet = xlsx.utils.json_to_sheet(data);
const workbook = xlsx.utils.book_new();
xlsx.utils.book_append_sheet(workbook, worksheet, "SyntheticData");

xlsx.writeFile(workbook, "synthetic_data.xlsx");

const fs = require('fs');

// Function to convert JSON array to CSV format
const jsonToCsv = (data) => {
    const headers = Object.keys(data[0]).join(','); // Get headers from keys of the first object
    const rows = data.map(row => Object.values(row).join(',')); // Map each object to a CSV row
    return [headers, ...rows].join('\n'); // Combine headers and rows
};

// Convert data to CSV format
const csvData = jsonToCsv(data);

// Write CSV data to a file
fs.writeFileSync('synthetic_data.csv', csvData);

console.log("CSV file created successfully: synthetic_data.csv");