import {
  Model,
  Schema,
  model,
  models,
  isValidObjectId,
  UpdateQuery,
} from 'mongoose';
import IPayment from '../Interfaces/IPayment';
import AbstractODM from './AbstractODM';

class PaymentODM extends AbstractODM<IPayment> {
  constructor() {
    const schema = new Schema<IPayment>({
      payByPerson: { type: String, required: true },
      payToPerson: { type: String, required: true },
      amount: { type: Number, required: true },
      key: { type: String, required: true },
      status: { type: Number },
    });
    super(schema, 'Payment');
  }

  public async find(): Promise<IPayment[]> {
    return this.model.find();
  }

  public async findByKey(key: string): Promise<IPayment[]> {
    return this.model.find({ key });
  }
}

export default PaymentODM;