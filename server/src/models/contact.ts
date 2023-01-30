import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const contactSchema = new Schema({
  code: {
    type: String,
    required: true,
  },
  phone: {
    type: String,
    required: true,
  }
});

const Contact = mongoose.model('Contact', contactSchema);

export default Contact;
