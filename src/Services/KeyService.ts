import Key from '../Domain/Key/Key';
import KeyFactory from '../Domain/Key/KeyFactory';
import IKey from '../Interfaces/IKey';
import KeyODM from '../Models/KeyODM';

class KeyService {
  private createKeyDomain(key: IKey | null): Key | null {
    if (key) {
      return new Key(
        key.value,
        key.owner,
        key.type,
        key.id,
      );
    }
    return null;
  }

  public async register(key: IKey) {
    const typedKey = KeyFactory.create(key);
    const keyODM = new KeyODM();
    const newkey = await keyODM.create(typedKey);
    return this.createKeyDomain(newkey);
  }

  public async getByValue(value: string) {
    const keyODM = new KeyODM();
    const key = await keyODM.findByValue(value);
    return this.createKeyDomain(key);
  }
}

export default KeyService;