import { Document } from 'mongoose';

export interface ILoan extends Document {
  readonly loanee: string;
  readonly loaner: string;
  readonly documents: string;
  readonly loanAmount: string;
  readonly isApproved: boolean;
}
