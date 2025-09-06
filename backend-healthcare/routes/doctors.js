const express = require('express');
const router = express.Router();
const { body, validationResult, param } = require('express-validator');
const auth = require('../middleware/auth');
const { Doctor } = require('../models');


router.post('/', auth,
  body('name').notEmpty(),
  async (req, res, next) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });

      const { name, specialization, phone, email } = req.body;
      const doctor = await Doctor.create({ name, specialization, phone, email });
      res.status(201).json(doctor);
    } catch (err) { next(err); }
  });


router.get('/', auth, async (req, res, next) => {
  try {
    const doctors = await Doctor.findAll();
    res.json(doctors);
  } catch (err) { next(err); }
});


router.get('/:id', auth, param('id').isUUID(), async (req, res, next) => {
  try {
    const doctor = await Doctor.findByPk(req.params.id);
    if (!doctor) return res.status(404).json({ message: 'Doctor not found' });
    res.json(doctor);
  } catch (err) { next(err); }
});


router.put('/:id', auth, param('id').isUUID(), async (req, res, next) => {
  try {
    const doctor = await Doctor.findByPk(req.params.id);
    if (!doctor) return res.status(404).json({ message: 'Doctor not found' });
    await doctor.update(req.body);
    res.json(doctor);
  } catch (err) { next(err); }
});


router.delete('/:id', auth, param('id').isUUID(), async (req, res, next) => {
  try {
    const doctor = await Doctor.findByPk(req.params.id);
    if (!doctor) return res.status(404).json({ message: 'Doctor not found' });
    await doctor.destroy();
    res.json({ message: 'Doctor deleted' });
  } catch (err) { next(err); }
});

module.exports = router;
