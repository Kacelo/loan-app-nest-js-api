export declare class CreateLoanDto {
    loanerId: string;
    loaneeId: string;
    amount?: string;
    interestRate?: string;
    duration?: number;
    startDate?: Date;
    endDate?: Date;
    status?: string;
    collateral?: string;
    repaymentSchedule?: string;
    latePaymentPenalty?: number;
    comments?: string;
    deleted?: boolean;
}
