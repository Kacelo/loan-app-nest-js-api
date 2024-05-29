import { Module } from '@nestjs/common';
import loanController from './application.controller';
import { LoanService } from './application.service';
import { MongooseModule } from '@nestjs/mongoose';
import { LoanSchema } from './application.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: 'Loan', schema: LoanSchema },
    ]),
  ],
  controllers: [loanController],
  providers: [LoanService],
  exports: [LoanService],
})
export class LoanModule {}
