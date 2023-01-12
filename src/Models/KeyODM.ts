import { Schema } from 'mongoose';
import IKey from '../Interfaces/IKey';
import AbstractODM from './AbstractODM';

class KeyODM extends AbstractODM<IKey> {
  constructor() {
    const schema = new Schema<IKey>({
      value: { type: String, required: true },
      owner: { type: String, required: true },
      type: { type: String, required: true },
    });
    super(schema, 'Key');
  }

  public async findByValue(value: string): Promise<IKey | null> {  // Método usado apenas para Key
    return this.model.findOne({ value });
  }
}

export default KeyODM;