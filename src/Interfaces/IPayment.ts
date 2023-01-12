import PaymentStatus from '../Utils/PaymentStatus';

interface IPayment {
  id?: string
  payByPerson: string;
  payToPerson: string;
  amount: number;
  key: string;
  status?: PaymentStatus
}

export default IPayment;