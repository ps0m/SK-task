import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const contactSchema = new Schema({
  phone: {
    type: String,
    required: true,
  }
});

const Contact = mongoose.model('Contact', contactSchema);

export default Contact;
