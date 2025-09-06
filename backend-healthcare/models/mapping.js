const { DataTypes } = require('sequelize');
module.exports = (sequelize) => {
  const Mapping = sequelize.define('Mapping', {
    id: { type: DataTypes.UUID, defaultValue: DataTypes.UUIDV4, primaryKey: true },
    patientId: { type: DataTypes.UUID, allowNull: false },
    doctorId: { type: DataTypes.UUID, allowNull: false },
    notes: { type: DataTypes.TEXT, allowNull: true }
  }, {
    timestamps: true,
    tableName: 'mappings',
    indexes: [
      { unique: true, fields: ['patientId', 'doctorId'] } 
    ]
  });
  return Mapping;
};
