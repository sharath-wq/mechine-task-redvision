import mongoose from 'mongoose';

// Interface that describes the properties for creating a book
interface BookAttrs {
    title: string;
    author: string;
    price: number;
    pages: number;
    category: string;
}

// Interface that describes the properties that a book model has
interface BookModel extends mongoose.Model<BookDoc> {
    build(attrs: BookAttrs): BookDoc;
}

// Interface that describes the properties a book document has
interface BookDoc extends mongoose.Document {
    title: string;
    author: string;
    price: number;
    pages: number;
    category: string;
}

const bookSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: true,
        },
        author: {
            type: String,
            required: true,
        },
        price: {
            type: Number,
            required: true,
        },
        pages: {
            type: Number,
            required: true,
        },
        category: {
            type: String,
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

bookSchema.statics.build = (attrs: BookAttrs) => {
    return new Book(attrs);
};

const Book = mongoose.model<BookDoc, BookModel>('Book', bookSchema);

export { Book };
