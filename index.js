const { faker } = require('@faker-js/faker');
const xlsx = require('xlsx');
const fs = require('fs');

number_of_records = 10000;

/**
 * Function to generate synthetic e-commerce transaction data for marketing analysis
 * @param {number} records - Number of records to generate
 * @returns {Array} - Array of synthetic data objects
 */
const generateData = (records) => {
    const data = [];
    for (let i = 0; i < records; i++) {
        data.push({
            id: faker.string.uuid(), // Unique transaction ID
            customerName: faker.person.fullName(), // Full name of the customer
            email: faker.internet.email(), // Customer's email address
            purchaseDate: faker.date.past(), // Date of the purchase
            productCategory: faker.commerce.department(), // Product category
            productName: faker.commerce.productName(), // Product name
            quantity: faker.number.int({ min: 1, max: 10 }), // Quantity purchased
            unitPrice: faker.commerce.price(10, 500, 2), // Price per unit
            totalValue: faker.commerce.price(20, 5000, 2), // Total transaction value
            location: faker.location.city(), // Customer's city
            country: faker.location.country(), // Region/State
            paymentMethod: faker.finance.transactionType(), // Payment method
            satisfactionRating: faker.number.int({ min: 1, max: 5 }), // Satisfaction rating (1–5)
            deviceType: faker.helpers.arrayElement([
                "Samsung",
                "Apple",
                "Huawei",
                "Xiaomi",
                "Oppo",
                "Redmi",
            ]), // Device used for purchase
            marketingChannel: faker.helpers.arrayElement([
                "Email",
                "Social Media",
                "Search Engine",
                "Referral",
                "Direct Traffic",
            ]), // Source of acquisition
        });
    }
    return data;
};

const data = generateData(number_of_records);

// To generate XLSX file:
const worksheet = xlsx.utils.json_to_sheet(data);
const workbook = xlsx.utils.book_new();
xlsx.utils.book_append_sheet(workbook, worksheet, "SyntheticData");

xlsx.writeFile(workbook, "synthetic_data.xlsx");

// To generate CSV file:
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