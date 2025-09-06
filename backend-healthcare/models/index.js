const sequelize = require('../config/db');
const User = require('./user');
const Patient = require('./patient');
const Doctor = require('./doctor');
const Mapping = require('./mapping');


const models = {
  User: User(sequelize),
  Patient: Patient(sequelize),
  Doctor: Doctor(sequelize),
  Mapping: Mapping(sequelize),
};


models.User.hasMany(models.Patient, { foreignKey: 'createdBy', onDelete: 'CASCADE' });
models.Patient.belongsTo(models.User, { foreignKey: 'createdBy' });

models.Mapping.belongsTo(models.Patient, { foreignKey: 'patientId', onDelete: 'CASCADE' });
models.Mapping.belongsTo(models.Doctor, { foreignKey: 'doctorId', onDelete: 'CASCADE' });

models.Patient.hasMany(models.Mapping, { foreignKey: 'patientId' });
models.Doctor.hasMany(models.Mapping, { foreignKey: 'doctorId' });

module.exports = { sequelize, ...models };
