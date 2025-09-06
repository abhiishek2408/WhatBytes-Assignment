const { DataTypes } = require('sequelize');
module.exports = (sequelize) => {
  const Doctor = sequelize.define('Doctor', {
    id: { type: DataTypes.UUID, defaultValue: DataTypes.UUIDV4, primaryKey: true },
    name: { type: DataTypes.STRING, allowNull: false },
    specialization: { type: DataTypes.STRING, allowNull: true },
    phone: { type: DataTypes.STRING, allowNull: true },
    email: { type: DataTypes.STRING, allowNull: true, validate: { isEmail: true } }
  }, {
    timestamps: true,
    tableName: 'doctors'
  });
  return Doctor;
};
