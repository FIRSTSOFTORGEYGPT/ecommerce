const fs = require('fs');
const path = require('path');
const http = require('http');

const API_ENDPOINT = 'http://localhost/api/puck/page';

async function seedHomepage() {
    try {
        const dbPath = path.join(__dirname, 'database.json');
        const dbContent = fs.readFileSync(dbPath, 'utf8');
        const db = JSON.parse(dbContent);

        const homepageData = db.pages.find(p => p.path === '/homepage');

        if (!homepageData) {
            console.error('Error: /homepage data not found in database.json');
            return;
        }

        const payload = {
            path: '/homepage',
            title: 'Homepage',
            slug: 'homepage',
            data: homepageData.data,
            meta: {}
        };

        console.log(`Seeding homepage to ${API_ENDPOINT}...`);

        const requestOptions = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                // Add any required auth headers here if needed (e.g. Authorization: Bearer ...)
            }
        };

        const req = http.request(API_ENDPOINT, requestOptions, (res) => {
            let data = '';

            res.on('data', (chunk) => {
                data += chunk;
            });

            res.on('end', () => {
                console.log(`Status Code: ${res.statusCode}`);
                console.log('Response:', data);
                if (res.statusCode >= 200 && res.statusCode < 300) {
                    console.log('Successfully seeded homepage!');
                } else {
                    console.error('Failed to seed homepage.');
                }
            });
        });

        req.on('error', (error) => {
            console.error('Error sending request:', error);
        });

        req.write(JSON.stringify(payload));
        req.end();

    } catch (error) {
        console.error('Error reading database.json or preparing payload:', error);
    }
}

seedHomepage();
