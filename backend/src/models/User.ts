import mongoose from 'mongoose';
import bcrypt from 'bcrypt';
export interface IUser extends mongoose.Document {
    _id: mongoose.Types.ObjectId;
    name: string;
    email: string;
    password: string;
    favorites: mongoose.Types.ObjectId[];
    adoptionRequests: mongoose.Types.DocumentArray<{
      pet: mongoose.Types.ObjectId;
      status: 'pending' | 'approved' | 'rejected';
      date: Date;
    }>;
    comparePassword(candidatePassword: string): Promise<boolean>;
  }

export interface IAdoptionRequest extends mongoose.Types.Subdocument {
  _id: mongoose.Types.ObjectId;
  pet: mongoose.Types.ObjectId;
  status: 'pending' | 'approved' | 'rejected';
  date: Date;
}

const adoptionRequestSchema = new mongoose.Schema<IAdoptionRequest>({
  pet: { 
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Pet',
    required: true
  },
  status: {
    type: String,
    enum: ['pending', 'approved', 'rejected'],
    default: 'pending'
  },
  date: {
    type: Date,
    default: Date.now
  }
});

const userSchema = new mongoose.Schema<IUser>({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  favorites: [{ 
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Pet' 
  }],
  adoptionRequests: [adoptionRequestSchema]
});
userSchema.methods.comparePassword = async function(
    candidatePassword: string
  ): Promise<boolean> {
    return bcrypt.compare(candidatePassword, this.password);
  };

export default mongoose.model<IUser>('User', userSchema);