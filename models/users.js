const pg = require('../modules/pg');
const uuid = require('uuid');

const getByName = (name) => {
    const sql = 'SELECT * FROM public.users WHERE name = $1';
    return pg.query(sql, [name]).then(result => result.rows[0]);
}

const create = (name) => {
    const sql = 'INSERT INTO public.users (id, name) VALUES ($1, $2)';
    const data = [
        uuid.v4(),
        name
    ];
    return pg.query(sql, data).then(result => data[0]); // return new id
}

const getAll = () => {
    const sql = 'SELECT * FROM public.users_view';
    return pg.query(sql, []).then(result => result.rows);
}


module.exports = {
    getByName,
    create,
    getAll
}
