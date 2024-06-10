import mongoose from 'mongoose';
import { Password } from '../services/password';

// Interface that describes the properties for creating a user
export interface UserAttrs {
    email: string;
    displayName: string;
    password: string;
    role?: 'user' | 'admin';
    cartId?: mongoose.Types.ObjectId;
}

// Interface that describes the properties that a user model has
export interface UserModel extends mongoose.Model<UserDoc> {
    build(attrs: UserAttrs): UserDoc;
}

// Interface that describes the properties a user document has
export interface UserDoc extends mongoose.Document {
    email: string;
    displayName: string;
    password: string;
    role: 'user' | 'admin';
    cartId: mongoose.Types.ObjectId;
}

const userSchema = new mongoose.Schema(
    {
        email: {
            type: String,
            required: true,
        },

        displayName: {
            type: String,
            required: true,
        },

        password: {
            type: String,
            required: true,
        },

        role: {
            type: String,
            default: 'user',
        },

        cartId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Cart',
        },
    },
    {
        toJSON: {
            transform(doc, ret) {
                ret.id = ret._id;
                delete ret._id;
                delete ret.password;
                delete ret.__v;
            },
        },
    }
);

userSchema.pre('save', async function (done) {
    if (this.isModified('password')) {
        const hashed = await Password.toHash(this.get('password'));
        this.set('password', hashed);
    }

    // check if the email is admin email
    /**
     * TODO: change the email into .env after testing.
     */
    if (this.email === 'admin@gmail.com') {
        this.role = 'admin';
    }

    done();
});

userSchema.statics.build = (attrs: UserAttrs) => {
    return new User(attrs);
};

const User = mongoose.model<UserDoc, UserModel>('User', userSchema);

export { User };
