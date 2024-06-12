import mongoose from 'mongoose';

// Interface that describes the properties for creating an order item
export interface OrderItem {
    productId: mongoose.Types.ObjectId;
    quantity: number;
    price: number;
}

// Interface that describes the properties for creating an order
interface OrderAttrs {
    userId: mongoose.Types.ObjectId;
    items: OrderItem[];
    totalPrice: number;
    status?: string;
    orderDate?: Date;
}

// Interface that describes the properties that an order model has
interface OrderModel extends mongoose.Model<OrderDoc> {
    build(attrs: OrderAttrs): OrderDoc;
}

// Interface that describes the properties an order document has
interface OrderDoc extends mongoose.Document {
    userId: mongoose.Types.ObjectId;
    items: OrderItem[];
    totalPrice: number;
    status?: string;
    orderDate?: Date;
}

const orderItemSchema = new mongoose.Schema(
    {
        productId: {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
            ref: 'Book',
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

const orderSchema = new mongoose.Schema(
    {
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
            ref: 'User',
        },
        items: {
            type: [orderItemSchema],
            required: true,
        },
        totalPrice: {
            type: Number,
            required: true,
        },
        status: {
            type: String,
            required: true,
            enum: ['pending', 'completed', 'cancelled'],
            default: 'pending',
        },
        orderDate: {
            type: Date,
            required: true,
            default: Date.now,
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

orderSchema.statics.build = (attrs: OrderAttrs) => {
    return new Order(attrs);
};

const Order = mongoose.model<OrderDoc, OrderModel>('Order', orderSchema);

export { Order };
