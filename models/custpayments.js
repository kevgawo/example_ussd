'use strict';
module.exports = (sequelize, DataTypes) => {
  var custpayments = sequelize.define('custpayments', {
    transactiob_id: DataTypes.STRING,
    transaction_amount: DataTypes.STRING,
    transaction_time: DataTypes.DATE,
    customer_code: DataTypes.STRING,
    customer_number: DataTypes.INTEGER
  }, {});
  custpayments.associate = function(models) {
    // associations can be defined here
  };
  return custpayments;
};