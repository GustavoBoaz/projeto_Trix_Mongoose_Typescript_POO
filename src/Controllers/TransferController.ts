import { NextFunction, Request, Response } from 'express';
import IPayment from '../Interfaces/IPayment';
import TransferService from '../Services/TransferService';
import PaymentStatus from '../Utils/PaymentStatus';

class TransferController {
  private req: Request;
  private res: Response;
  private next: NextFunction;
  private service: TransferService;

  constructor(req: Request, res: Response, next: NextFunction) {
    this.req = req;
    this.res = res;
    this.next = next;
    this.service = new TransferService();
  }

  public async create() {
    const payment: IPayment = {
      payByPerson: this.req.body.payByPerson,
      payToPerson: this.req.body.payToPerson,
      amount: this.req.body.amount,
      key: this.req.body.key,
      status: PaymentStatus.concluded,
    };

    try {
      const newPayment = await this.service.transfer(payment);
      return this.res.status(201).json(newPayment);
    } catch (error) {
      this.next(error);
    }
  }

  public async reversalRequest() {
    const payment: IPayment = {
      ...this.req.body,
      status: PaymentStatus.reversed,
    };
    const { id } = this.req.params;
    try {
      await this.service.undoTransfer(id, payment);
      return this.res.status(204).json({});
    } catch (error) {
      this.next(error);
    }
  }

  public async getAllTransfers() {
    const payments = await this.service.getAllTransfers();
    return this.res.status(200).json(payments);
  }
}
  
export default TransferController;