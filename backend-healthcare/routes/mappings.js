const express = require('express');
const router = express.Router();
const { body, param, validationResult } = require('express-validator');
const auth = require('../middleware/auth');
const { Mapping, Patient, Doctor } = require('../models');


router.post('/', auth,
  body('patientId').isUUID(),
  body('doctorId').isUUID(),
  async (req, res, next) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });

      const { patientId, doctorId, notes } = req.body;
      const patient = await Patient.findOne({ where: { id: patientId, createdBy: req.user.id }});
      if (!patient) return res.status(404).json({ message: 'Patient not found or not owned by you' });

      const doctor = await Doctor.findByPk(doctorId);
      if (!doctor) return res.status(404).json({ message: 'Doctor not found' });

      const mapping = await Mapping.create({ patientId, doctorId, notes });
      res.status(201).json(mapping);
    } catch (err) {
      if (err.name === 'SequelizeUniqueConstraintError') {
        return res.status(409).json({ message: 'Doctor already assigned to this patient' });
      }
      next(err);
    }
  });


router.get('/', auth, async (req, res, next) => {
  try {
    const mappings = await Mapping.findAll({
      include: [
        { model: Patient, where: { createdBy: req.user.id }, attributes: ['id', 'name'] },
        { model: Doctor, attributes: ['id', 'name', 'specialization'] }
      ]
    });
    res.json(mappings);
  } catch (err) { next(err); }
});


router.get('/:patientId', auth, param('patientId').isUUID(), async (req, res, next) => {
  try {
    const patient = await Patient.findOne({ where: { id: req.params.patientId, createdBy: req.user.id }});
    if (!patient) return res.status(404).json({ message: 'Patient not found or not owned by you' });

    const mappings = await Mapping.findAll({
      where: { patientId: req.params.patientId },
      include: [{ model: Doctor, attributes: ['id', 'name', 'specialization', 'email', 'phone'] }]
    });
    res.json(mappings);
  } catch (err) { next(err); }
});


router.delete('/:id', auth, param('id').isUUID(), async (req, res, next) => {
  try {
    const mapping = await Mapping.findByPk(req.params.id, { include: [Patient] });
    if (!mapping) return res.status(404).json({ message: 'Mapping not found' });

    if (!mapping.Patient || mapping.Patient.createdBy !== req.user.id) {
      return res.status(403).json({ message: 'Not authorized to remove this mapping' });
    }
    await mapping.destroy();
    res.json({ message: 'Mapping deleted' });
  } catch (err) { next(err); }
});

module.exports = router;
