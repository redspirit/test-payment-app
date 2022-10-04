const axios  = require('axios');

const invoice = () => {

    return axios({
        url: 'https://demo-paygate.steaminventoryhelper.com/invoice',
        method: 'post',
        data: {
            ip: 'testpay.clouddocs.pw' // callback ip
        },
    }).then(result => result.data);

};

module.exports = {
    invoice
}
