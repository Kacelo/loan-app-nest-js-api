export declare class CreateLoanDto {
    lenderId: string;
    borrowerId: string;
    amount: GLfloat;
    interestRate: GLfloat;
    startDate: Date;
    endDate: Date;
    status: string;
    collateral?: string;
    latePaymentPenalty: number;
    comments?: string;
    deleted?: boolean;
}
