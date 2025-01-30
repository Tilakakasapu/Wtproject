import mongoose from 'mongoose';

interface HealthInfo {
  vaccinated: boolean;
  neutered: boolean;
  microchipped: boolean;
}

interface IPet extends mongoose.Document {
  name: string;
  type: string;
  breed: string;
  age: number;
  location: string;
  description: string;
  imageUrl: string;
  status: 'available' | 'adopted' | 'pending';
  health: HealthInfo;
  characteristics: string[];
}

const petSchema = new mongoose.Schema<IPet>({
  name: { type: String, required: true },
  type: { type: String, required: true },
  breed: { type: String, required: true },
  age: { type: Number, required: true },
  location: { type: String, required: true },
  description: { type: String, required: true },
  imageUrl: { type: String, required: true },
  status: { 
    type: String, 
    enum: ['available', 'adopted', 'pending'],
    default: 'available'
  },
  health: {
    vaccinated: Boolean,
    neutered: Boolean,
    microchipped: Boolean
  },
  characteristics: [String]
});

export default mongoose.model<IPet>('Pet', petSchema);