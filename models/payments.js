const pg = require('../modules/pg');
const uuid = require('uuid');

const create = (extId, userId) => {
    const sql = 'INSERT INTO public.payments (id, status, ext_id, user_id, created_date) ' +
        'VALUES ($1, $2, $3, $4, $5)';
    const data = [
        uuid.v4(),
        'new',
        extId,
        userId,
        new Date()
    ];
    return pg.query(sql, data).then(result => data[0]); // return new id
}

const getByExtId = (extId) => {
    const sql = 'SELECT * FROM public.payments WHERE ext_id = $1';
    return pg.query(sql, [extId]).then(result => result.rows[0]);
}

const updateStatusAndAmount = (id, status, amount) => {
    const sql = 'UPDATE public.payments SET status = $1, amount = $2 WHERE id = $3';
    return pg.query(sql, [status, amount, id]);
}

const getAll = () => {
    const sql = 'SELECT * FROM public.payments';
    return pg.query(sql, []).then(result => result.rows);
}

module.exports = {
    create,
    updateStatusAndAmount,
    getByExtId,
    getAll
}
