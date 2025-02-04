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
  name:String;
  imageUrl: String;
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
  },
  name: { type: String},
  imageUrl: { type: String, required: true },
});

const userSchema = new mongoose.Schema<IUser>({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  favorites: [adoptionRequestSchema],
  adoptionRequests: [adoptionRequestSchema]
});
userSchema.methods.comparePassword = async function (password: string) {
  return await bcrypt.compare(password, this.password);
};
userSchema.methods.comparePassword = async function (password: string) {
  if(password==this.password) return true;
  else return false;
};

export default mongoose.model<IUser>('User', userSchema);