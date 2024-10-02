export declare class CreateLoanDto {
    lenderId: string;
    borrowerId: string;
    amount: number;
    interestRate: GLfloat;
    startDate: Date;
    endDate: Date;
    status: string;
    totalRepayment?: number;
    comments?: string;
    deleted?: boolean;
}
