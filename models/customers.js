'use strict';
module.exports = (sequelize, DataTypes) => {
  var customers = sequelize.define('customers', {
    customer_name: DataTypes.STRING,
    customer_code: DataTypes.STRING,
    customer_number: DataTypes.INTEGER,
    customer_bill: DataTypes.STRING,
    customer_balance: DataTypes.STRING
  }, {});
  customers.associate = function(models) {
    // associations can be defined here
  };
  return customers;
};