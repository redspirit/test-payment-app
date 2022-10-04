const axios  = require('axios');

const invoice = () => {

    return axios({
        url: 'https://demo-paygate.steaminventoryhelper.com/invoice',
        method: 'post',
        data: {
            ip: '127.0.0.1' // callback ip
        },
    }).then(result => result.data);

};

module.exports = {
    invoice
}
