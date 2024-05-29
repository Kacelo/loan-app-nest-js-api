import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Schema as MongooseSchema, Document } from 'mongoose';

export type BaseDocument = Document & {
  deleted: boolean;
  createdAt: Date;
  updatedAt: Date;
};

@Schema({ timestamps: true })
export class BaseSchema {
  @Prop({ type: Boolean, default: false })
  deleted: boolean;

  @Prop({ type: Date, default: Date.now, index: true })
  createdAt: Date;

  @Prop({ type: Date, default: Date.now })
  updatedAt: Date;
}

export const applyBaseSchemaOptions = (schema: MongooseSchema) => {
  // Pre-save hook to update the updatedAt field
  schema.pre<BaseDocument>('save', function (next: (err?: Error) => void) {
    this.updatedAt = new Date();
    next();
  });

  // Pre-findOneAndUpdate hook to update the updatedAt field
  schema.pre<BaseDocument>('findOneAndUpdate', function (next: (err?: Error) => void) {
    this.set({ updatedAt: new Date() });
    next();
  });

  // Pre-updateMany hook to update the updatedAt field
  schema.pre<BaseDocument>('updateMany', function (next: (err?: Error) => void) {
    this.set({ updatedAt: new Date() });
    next();
  });
  // Apply common schema options like timestamps and toJSON transformation
  schema.set('timestamps', true);

  schema.set('toJSON', {
    virtuals: true,
    transform: (doc, ret) => {
      delete ret._id;
      delete ret.__v;
      return ret;
    },
  });

  console.log('Schema options applied:', schema); // Debugging log
};
