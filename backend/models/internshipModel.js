import mongoose from 'mongoose';

const internshipSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    institution: { type: mongoose.Schema.Types.ObjectID, ref: 'User' },
    image: { type: String, required: true },
    category: { type: String, required: true },
    company: { type: String, required: true },
    location: { type: String, required: true },
    candidates: { type: Number, required: true },
    status: { type: String, required: true },
    type: { type: String, required: true },
    date: { type: String, required: true },
    description: { type: String, required: true },
  },
  {
    timestamps: true,
  }
);
const Internship = mongoose.model('Internship', internshipSchema);

export default Internship;