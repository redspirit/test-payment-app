const util = require('util')
const { Pool } = require('pg');
const config = require('../appConfig.json').pg;

const pool = new Pool({
    host: config.host,
    database: config.user,
    user: config.user,
    port: config.port,
    password: process.env.PGPASS
});

pool.connect();

module.exports = pool;
