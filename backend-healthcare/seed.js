require('dotenv').config();
const bcrypt = require('bcryptjs');
const { sequelize, User, Patient, Doctor, Mapping } = require('./models');

(async () => {
  try {
    await sequelize.sync({ force: true });
    console.log("Database synced!");


    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash('password123', salt);

    const user1 = await User.create({
      name: 'Vishesh Yadav',
      email: 'vishesh@example.com',
      password: hashedPassword
    });

    const user2 = await User.create({
      name: 'Anjali Sharma',
      email: 'anjali@example.com',
      password: hashedPassword
    });


    const patient1 = await Patient.create({
      name: 'Rohan Gupta',
      age: 34,
      gender: 'Male',
      phone: '9876543210',
      address: '12 MG Road, Bengaluru, Karnataka',
      createdBy: user1.id
    });

    const patient2 = await Patient.create({
      name: 'Priya Singh',
      age: 28,
      gender: 'Female',
      phone: '9123456780',
      address: '45 Park Street, Kolkata, West Bengal',
      createdBy: user2.id
    });

    const patient3 = await Patient.create({
      name: 'Amit Kumar',
      age: 40,
      gender: 'Male',
      phone: '9988776655',
      address: '78 MG Road, Mumbai, Maharashtra',
      createdBy: user1.id
    });


    const doctor1 = await Doctor.create({
      name: 'Dr. Rajesh Khanna',
      specialization: 'Cardiology',
      phone: '9111222233',
      email: 'rajesh.khanna@hospital.com'
    });

    const doctor2 = await Doctor.create({
      name: 'Dr. Sunita Verma',
      specialization: 'Neurology',
      phone: '9222333344',
      email: 'sunita.verma@hospital.com'
    });

    const doctor3 = await Doctor.create({
      name: 'Dr. Arjun Mehta',
      specialization: 'Orthopedics',
      phone: '9333444455',
      email: 'arjun.mehta@hospital.com'
    });

 
    await Mapping.create({
      patientId: patient1.id,
      doctorId: doctor1.id,
      notes: 'Monthly cardiac checkup'
    });

    await Mapping.create({
      patientId: patient1.id,
      doctorId: doctor2.id,
      notes: 'Neurological consultation'
    });

    await Mapping.create({
      patientId: patient2.id,
      doctorId: doctor3.id,
      notes: 'Knee pain treatment'
    });

    await Mapping.create({
      patientId: patient3.id,
      doctorId: doctor1.id,
      notes: 'Follow-up cardiac appointment'
    });

    console.log("Seed data inserted successfully!");
    process.exit(0);
  } catch (err) {
    console.error("Seeding error:", err);
    process.exit(1);
  }
})();
