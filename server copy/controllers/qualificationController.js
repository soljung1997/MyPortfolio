import Qualification from '../models/Qualification.js';

export const getQualifications = async (req, res) => {
  const qualifications = await Qualification.find();
  res.json(qualifications);
};

export const getQualificationById = async (req, res) => {
  const qualification = await Qualification.findById(req.params.id);
  res.json(qualification);
};

export const createQualification = async (req, res) => {
  const newQualification = new Qualification(req.body);
  await newQualification.save();
  res.status(201).json(newQualification);
};

export const updateQualification = async (req, res) => {
  const updated = await Qualification.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.json(updated);
};

export const deleteQualification = async (req, res) => {
  await Qualification.findByIdAndDelete(req.params.id);
  res.json({ message: 'Qualification deleted' });
};

export const deleteAllQualifications = async (req, res) => {
  await Qualification.deleteMany({});
  res.json({ message: 'All qualifications deleted' });
};
