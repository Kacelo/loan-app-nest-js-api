import { LoanService } from './application.service';
import { CreateLoanDto } from './dto/create-application-dto';
import { UpdateLoanDto } from './dto/update-application-dto';
export default class loanController {
    private readonly loanService;
    constructor(loanService: LoanService);
    getAllLoans(response: any): Promise<any>;
    getLenderLoans(response: any, id: string): Promise<void>;
    createLoan(response: any, createLoanDto: CreateLoanDto): Promise<any>;
    replaceLoan(response: any, id: string, updateLoanDto: UpdateLoanDto): Promise<any>;
    deleteLoan(response: any, id: string): Promise<any>;
}
