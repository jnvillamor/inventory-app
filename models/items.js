import { Schema, model, models } from 'mongoose';

const ItemSchema = new Schema(
  {
    owner: {
      type: Schema.Types.ObjectId,
      ref: 'User'
    },
    itemName: {
      type: String,
      require: [true, 'Item name is required']
    },
    description: {
      type: String,
      require: [true, 'Description is required']
    },
    unitPrice: {
      type: Number,
      require: [true, 'Unit price is required']
    },
    quantity: {
      type: Number,
      require: [true, 'Quantity is required']
    }
  },
  { timestamps: true }
);

const Item = models.Item || model('Item', ItemSchema);

export default Item;
