import { PrismaService } from "src/prisma.service";
import { CreateLoanDto } from "./dto/createLoanDto";
import { UpdateLoanDto } from "./dto/updateLoanDto";
export declare class LoanService {
    private prisma;
    constructor(prisma: PrismaService);
    createLoan(createLoanDto: CreateLoanDto): Promise<{
        id: string;
        lenderId: string;
        borrowerId: string;
        amount: number;
        interestRate: number;
        startDate: Date;
        endDate: Date;
        status: string;
        totalRepayment: number;
        comments: string;
        createdAt: Date;
        updatedAt: Date;
        deleted: boolean;
    }>;
    updateLoan(id: string, updateLoanDto: UpdateLoanDto): Promise<{
        id: string;
        lenderId: string;
        borrowerId: string;
        amount: number;
        interestRate: number;
        startDate: Date;
        endDate: Date;
        status: string;
        totalRepayment: number;
        comments: string;
        createdAt: Date;
        updatedAt: Date;
        deleted: boolean;
    }>;
    deleteLoan(id: string): Promise<{
        id: string;
        lenderId: string;
        borrowerId: string;
        amount: number;
        interestRate: number;
        startDate: Date;
        endDate: Date;
        status: string;
        totalRepayment: number;
        comments: string;
        createdAt: Date;
        updatedAt: Date;
        deleted: boolean;
    }>;
    getAllLoans(): Promise<{
        id: string;
        lenderId: string;
        borrowerId: string;
        amount: number;
        interestRate: number;
        startDate: Date;
        endDate: Date;
        status: string;
        totalRepayment: number;
        comments: string;
        createdAt: Date;
        updatedAt: Date;
        deleted: boolean;
    }[]>;
    findLenderApplications(lenderId: string): Promise<any[]>;
}
