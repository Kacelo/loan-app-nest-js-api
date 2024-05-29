import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import { BaseSchema, applyBaseSchemaOptions } from 'src/public/helpers/base.schema.options';

export type UserDocument = HydratedDocument<User>;

@Schema()
export class User extends BaseSchema{
  @Prop()
  username: string;
  @Prop()
  email: string;
  @Prop()
  password: string;
}
const UserSchema = SchemaFactory.createForClass(User);
applyBaseSchemaOptions(UserSchema);

export { UserSchema };
