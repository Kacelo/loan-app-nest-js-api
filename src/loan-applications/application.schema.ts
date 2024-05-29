import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type ApplicationDocument = HydratedDocument<Loan>;

@Schema()
export class Loan {
  @Prop()
  loanee: string;
  @Prop()
  loaner: string;
  @Prop()
  documents: string;
  @Prop()
  loanAmount: string;
  @Prop()
  isApproved: boolean;
}

export const LoanSchema =
  SchemaFactory.createForClass(Loan);
