import Payment from '../Domain/Payment';
import IPayment from '../Interfaces/IPayment';
import PaymentODM from '../Models/PaymentODM';

class TransferService {
  private isValidKey(key: string): boolean {
    const cpfRegex = /^\d{3}.\d{3}.\d{3}-\d{2}$/;
    return cpfRegex.test(key);
  }

  private createPaymentDomain(payment: IPayment | null): Payment | null {
    if (payment) {
      return new Payment(
        payment.payByPerson,
        payment.payToPerson,
        payment.amount,
        payment.key,
        payment.id,
        payment.status,
      );
    }
    return null;
  }

  public async transfer(payment: IPayment) {
    if (!this.isValidKey(payment.key)) throw new Error('Invalid Key!');

    const paymentODM = new PaymentODM();
    const newPayment = await paymentODM.create(payment);
    return this.createPaymentDomain(newPayment);
  }

  public async undoTransfer(id: string, payment: IPayment) {
    if (!this.isValidKey(payment.key)) throw new Error('Invalid Key!');

    const paymentODM = new PaymentODM();
    return paymentODM.update(id, payment);
  }

  public async getAllTransfers() {
    const paymentODM = new PaymentODM();
    const payments = await paymentODM.find();
    const paymentArray = payments.map((payment) =>
      this.createPaymentDomain(payment));
    return paymentArray;
  }
}

export default TransferService;