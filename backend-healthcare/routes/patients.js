const express = require('express');
const router = express.Router();
const { body, validationResult, param } = require('express-validator');
const auth = require('../middleware/auth');
const { Patient, Mapping, Doctor } = require('../models');


router.post('/',
  auth,
  body('name').notEmpty(),
  async (req, res, next) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });

      const { name, age, gender, phone, address } = req.body;
      const patient = await Patient.create({
        name, age, gender, phone, address, createdBy: req.user.id
      });
      res.status(201).json(patient);
    } catch (err) { next(err); }
  });


router.get('/', auth, async (req, res, next) => {
  try {
    const patients = await Patient.findAll({ where: { createdBy: req.user.id }});
    res.json(patients);
  } catch (err) { next(err); }
});


router.get('/:id', auth, param('id').isUUID(), async (req, res, next) => {
  try {
    const patient = await Patient.findOne({ where: { id: req.params.id, createdBy: req.user.id }});
    if (!patient) return res.status(404).json({ message: 'Patient not found' });
    res.json(patient);
  } catch (err) { next(err); }
});


router.put('/:id', auth,
  param('id').isUUID(),
  body('name').optional().notEmpty(),
  async (req, res, next) => {
    try {
      const patient = await Patient.findOne({ where: { id: req.params.id, createdBy: req.user.id }});
      if (!patient) return res.status(404).json({ message: 'Patient not found' });

      await patient.update(req.body);
      res.json(patient);
    } catch (err) { next(err); }
  });


router.delete('/:id', auth, param('id').isUUID(), async (req, res, next) => {
  try {
    const patient = await Patient.findOne({ where: { id: req.params.id, createdBy: req.user.id }});
    if (!patient) return res.status(404).json({ message: 'Patient not found' });
    await patient.destroy();
    res.json({ message: 'Patient deleted' });
  } catch (err) { next(err); }
});

module.exports = router;
