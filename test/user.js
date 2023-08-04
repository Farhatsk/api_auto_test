import axios from 'axios';
import https from 'https';
import assert from 'assert';
const dotenv = require("dotenv")
dotenv.config()

//access token from gorest.co.in api to access the user sample data for testing
const TOKEN = process.env.TOKEN;
const page=5;
const gender='female';
const status ='active';
const userid =1217909;

//Disable SSL certificate verification for the API requests by passing the rejectUnauthorized: false option to Axios for http URL
const axiosInstance = axios.create({
    httpsAgent: new https.Agent({
        rejectUnauthorized: false
    })
});


//block of test suites for the API which can includes multiple test cases
describe('Sample API Test Suite', () => {
    //First test case
    it('should get a list of users from the API', async () => {
        const response = await axiosInstance.get(`https://gorest.co.in/public/v2/users?acess-token=${TOKEN}&page=${page}&gender=${gender}&status=${status}`);
        assert.strictEqual(response.status, 200);
        assert(Array.isArray(response.data));
        assert.notStrictEqual(response.data.length, 0);
    });

    // Second test case
    it('should get a specific user from the API', async () => {
        const response = await axiosInstance.get(`https://gorest.co.in/public/v2/users/${userid}`);
        assert.strictEqual(response.status, 200);
        assert.strictEqual(typeof response.data, 'object');
        assert.strictEqual(response.data.id, 1217909);
    });

    // Third test case for POST request to create a new user
    it('should create a new user in the API', async () => {
        const newUser = {
            name: 'Bhagwati M',
            email: 'bhagwati.m@example.com',
            gender: 'female',
            status: 'active'
        };
        const response = await axiosInstance.post(`https://gorest.co.in/public/v2/users?access-token=${TOKEN}`, newUser);
        assert.strictEqual(response.status, 201); //201 means successful creation
        assert.strictEqual(typeof response.data, 'object');
        assert.strictEqual(response.data.name, 'Bhagwati M');
        assert.strictEqual(response.data.email, 'bhagwati.m@example.com');
        assert.strictEqual(response.data.gender, 'female');
        assert.strictEqual(response.data.status, 'active');
    });

    // Fourth test case for PUT request to update an existing user
    it('should update an existing user in the API', async () => {
        const updateUser = {
            name: 'Farhat Sheikh',
            email: 'farhat.s@example.com',
            gender: 'female',
            status: 'inactive'
        };
        const response = await axiosInstance.put(`https://gorest.co.in/public/v2/users/1217909?access-token=${TOKEN}`, updateUser);
        assert.strictEqual(response.status, 200);
        assert.strictEqual(typeof response.data, 'object');
        assert.strictEqual(response.data.name, 'Farhat Sheikh');
        assert.strictEqual(response.data.email, 'farhat.s@example.com');
        assert.strictEqual(response.data.gender, 'female');
        assert.strictEqual(response.data.status, 'inactive');
    });

    // Fifth test case for DELETE request to delete a user
    it('should delete an existing user from the API', async () => {
        const response = await axiosInstance.delete(`https://gorest.co.in/public/v2/users/1217909?access-token=${TOKEN}`);
        assert.strictEqual(response.status, 204);
    });
});
