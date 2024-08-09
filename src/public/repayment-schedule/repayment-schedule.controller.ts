// // repayment-schedule.controller.ts
// import {
//   Controller,
//   Post,
//   Patch,
//   Get,
//   Body,
//   Param,
//   Res,
//   HttpStatus,
// } from "@nestjs/common";
// import { RepaymentScheduleService } from "./repayment-schedule.service";
// import { CreateRepaymentScheduleDto } from "./dto/create-repayment-schedule.dto";
// import { UpdateRepaymentScheduleDto } from "./dto/update-repayment-schedule.dto";
// import { Public } from "src/auth/constants";
// import { ApiTags } from "@nestjs/swagger";

// @Controller("repayment-schedules")
// @ApiTags("repayment-schedules")
// export class RepaymentScheduleController {
//   constructor(
//     private readonly repaymentScheduleService: RepaymentScheduleService
//   ) {}
//   @Public()
//   @Post("create")
//   async createRepaymentSchedule(
//     @Body() createRepaymentScheduleDto: CreateRepaymentScheduleDto,
//     @Res() response
//   ) {
//     try {
//       const repaymentSchedule =
//         await this.repaymentScheduleService.createRepaymentSchedule(
//           createRepaymentScheduleDto
//         );
//       return response.status(HttpStatus.CREATED).json({
//         message: "Repayment schedule created successfully",
//         repaymentSchedule,
//       });
//     } catch (err) {
//       return response.status(HttpStatus.BAD_REQUEST).json({
//         message: "Repayment schedule creation failed",
//         error: err.message,
//       });
//     }
//   }
//   @Public()
//   @Patch("update/:id")
//   async updateRepaymentSchedule(
//     @Param("id") id: string,
//     @Body() updateRepaymentScheduleDto: UpdateRepaymentScheduleDto,
//     @Res() response
//   ) {
//     try {
//       const repaymentSchedule =
//         await this.repaymentScheduleService.updateRepaymentSchedule(
//           id,
//           updateRepaymentScheduleDto
//         );
//       return response.status(HttpStatus.OK).json({
//         message: "Repayment schedule updated successfully",
//         repaymentSchedule,
//       });
//     } catch (err) {
//       return response.status(HttpStatus.BAD_REQUEST).json({
//         message: "Repayment schedule update failed",
//         error: err.message,
//       });
//     }
//   }
//   @Public()
//   @Get("loan/:loanId")
//   async getRepaymentSchedulesByLoan(
//     @Param("loanId") loanId: string,
//     @Res() response
//   ) {
//     try {
//       const repaymentSchedules =
//         await this.repaymentScheduleService.getRepaymentSchedulesByLoan(loanId);
//       return response.status(HttpStatus.OK).json({
//         repaymentSchedules,
//       });
//     } catch (err) {
//       return response.status(HttpStatus.BAD_REQUEST).json({
//         message: "Failed to get repayment schedules",
//         error: err.message,
//       });
//     }
//   }
// }
