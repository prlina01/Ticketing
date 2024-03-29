import mongoose from "mongoose";
import {PasswordManager} from "../services/passwordManager";

interface UserAttributes {
	email: string;
	password: string;
}

interface UserModel extends mongoose.Model<UserDocument> {
	build(attrs: UserAttributes): UserDocument;
}

interface UserDocument extends mongoose.Document {
	email: string;
	password: string;
}

const userSchema = new mongoose.Schema({
	email: {
		type: String,
		required: true
	},
	password: {
		type: String,
		required: true
	}
}, {
	toJSON: {
		transform(doc, ret) {
			ret.id = ret._id
			delete ret._id
			delete ret.password;
			delete ret.__v;
		}
	}
})

userSchema.pre('save', async function(done) {
	if (this.isModified('password')) {
		const hashed = await PasswordManager.toHash(this.get('password'))
		this.set('password', hashed)
	}
	done()
})

userSchema.statics.build = (attrs: UserAttributes) => {
	return new User(attrs)
}

const User = mongoose.model<UserDocument, UserModel>('User', userSchema)


export { User }