const Openpay = require('openpay');

const openpay = new Openpay(
    process.env.OPENPAY_MERCHANT_ID,
    process.env.OPENPAY_SECRET_KEY,
    false  // false = producción, true = sandbox
);

const createCharge = async (customerData, chargeData) => {
    return new Promise((resolve, reject) => {
        openpay.customers.create(customerData, (error, customer) => {
            if (error) return reject(error);

            openpay.charges.create(chargeData, (error, charge) => {
                if (error) return reject(error);
                resolve(charge);
            });
        });
    });
};

const createOxxoCharge = async (amount, description, customer) => {
    const chargeRequest = {
        method: 'oxxo',
        amount: amount,
        description: description,
        customer: customer
    };
    return new Promise((resolve, reject) => {
        openpay.charges.create(chargeRequest, (error, charge) => {
            if (error) return reject(error);
            resolve(charge);
        });
    });
};

module.exports = { createCharge, createOxxoCharge };
