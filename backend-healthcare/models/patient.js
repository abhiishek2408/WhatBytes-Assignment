const { DataTypes } = require('sequelize');
module.exports = (sequelize) => {
  const Patient = sequelize.define('Patient', {
    id: { type: DataTypes.UUID, defaultValue: DataTypes.UUIDV4, primaryKey: true },
    name: { type: DataTypes.STRING, allowNull: false },
    age: { type: DataTypes.INTEGER, allowNull: true },
    gender: { type: DataTypes.STRING, allowNull: true },
    phone: { type: DataTypes.STRING, allowNull: true },
    address: { type: DataTypes.TEXT, allowNull: true },
    createdBy: { type: DataTypes.UUID, allowNull: false }
  }, {
    timestamps: true,
    tableName: 'patients'
  });
  return Patient;
};
