import mongoose from 'mongoose';

// Interface that describes the properties of an item in the cart
interface CartItem {
    productId: mongoose.Types.ObjectId;
    quantity: number;
    price: number;
}

// Interface that describes the properties for creating a cart
interface CartAttrs {
    userId: mongoose.Types.ObjectId;
    items: CartItem[];
    totalPrice: number;
}

// Interface that describes the properties that a cart model has
interface CartModel extends mongoose.Model<CartDoc> {
    build(attrs: CartAttrs): CartDoc;
}

// Interface that describes the properties a cart document has
interface CartDoc extends mongoose.Document {
    userId: mongoose.Types.ObjectId;
    items: CartItem[];
    totalPrice: number;
}

const cartItemSchema = new mongoose.Schema(
    {
        productId: {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
            ref: 'Product',
        },
        quantity: {
            type: Number,
            required: true,
        },
        price: {
            type: Number,
            required: true,
        },
    },
    {
        _id: false, // Prevents creating an _id field for each item
    }
);

const cartSchema = new mongoose.Schema(
    {
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
            ref: 'User',
        },
        items: {
            type: [cartItemSchema],
            required: true,
        },
        totalPrice: {
            type: Number,
            required: true,
        },
    },
    {
        toJSON: {
            transform(doc, ret) {
                ret.id = ret._id;
                delete ret._id;
                delete ret.__v;
            },
        },
    }
);

cartSchema.statics.build = (attrs: CartAttrs) => {
    return new Cart(attrs);
};

const Cart = mongoose.model<CartDoc, CartModel>('Cart', cartSchema);

export { Cart };
