import { PrismaService } from "src/prisma.service";
import { UpdateLoanDto } from "./dto/updateLoanDto";
export declare class LoanService {
    private prisma;
    constructor(prisma: PrismaService);
    createLoan(createLoanDto: any): Promise<{
        id: string;
        lenderId: string;
        borrowerId: string;
        amount: string;
        interestRate: string;
        duration: number;
        startDate: Date;
        endDate: Date;
        status: string;
        collateral: string;
        repaymentSchedule: string;
        latePaymentPenalty: number;
        comments: string;
        createdAt: Date;
        updatedAt: Date;
        deleted: boolean;
        repaymentScheduleId: string;
    }>;
    updateLoan(id: string, updateLoanDto: UpdateLoanDto): Promise<{
        id: string;
        lenderId: string;
        borrowerId: string;
        amount: string;
        interestRate: string;
        duration: number;
        startDate: Date;
        endDate: Date;
        status: string;
        collateral: string;
        repaymentSchedule: string;
        latePaymentPenalty: number;
        comments: string;
        createdAt: Date;
        updatedAt: Date;
        deleted: boolean;
        repaymentScheduleId: string;
    }>;
    deleteLoan(id: string): Promise<{
        id: string;
        lenderId: string;
        borrowerId: string;
        amount: string;
        interestRate: string;
        duration: number;
        startDate: Date;
        endDate: Date;
        status: string;
        collateral: string;
        repaymentSchedule: string;
        latePaymentPenalty: number;
        comments: string;
        createdAt: Date;
        updatedAt: Date;
        deleted: boolean;
        repaymentScheduleId: string;
    }>;
    getAllLoans(): Promise<{
        id: string;
        lenderId: string;
        borrowerId: string;
        amount: string;
        interestRate: string;
        duration: number;
        startDate: Date;
        endDate: Date;
        status: string;
        collateral: string;
        repaymentSchedule: string;
        latePaymentPenalty: number;
        comments: string;
        createdAt: Date;
        updatedAt: Date;
        deleted: boolean;
        repaymentScheduleId: string;
    }[]>;
    findLenderApplications(lenderId: string): Promise<any[]>;
}
