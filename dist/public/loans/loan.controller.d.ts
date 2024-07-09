import { LoanService } from "./loan.service";
import { CreateLoanDto } from "./dto/createLoanDto";
import { UpdateLoanDto } from "./dto/updateLoanDto";
export declare class LoanController {
    private readonly loanService;
    constructor(loanService: LoanService);
    createLoan(response: any, createLoanDto: CreateLoanDto): Promise<any>;
    updateLoan(response: any, id: string, updateLoanDto: UpdateLoanDto): Promise<any>;
    deleteLoan(response: any, id: string, updateLoanDto: UpdateLoanDto): Promise<any>;
    getLoans(response: any): Promise<any>;
    getLoanApplications(response: any, lenderId: string): Promise<any>;
}
