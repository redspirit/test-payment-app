const axios  = require('axios');
const qs  = require('querystring');

const baseUrl = 'https://api.skinport.com/v1/items';

const getItems = () => {

    const params = {
        app_id: 730,
        tradable: 0,
        currency: 'EUR'
    }

    return axios({
        method: 'get',
        url: baseUrl + '?' + qs.stringify(params)
    }).then(result => result.data);

};

module.exports = {
    getItems
}
