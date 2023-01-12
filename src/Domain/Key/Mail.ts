import IKey from '../../Interfaces/IKey';
import IValid from '../../Interfaces/IValid';
import KeyTypes from '../../Utils/KeyTypes';

class Mail implements IKey, IValid { // Implementa as duas interfaces exigidas pela fábrica
  readonly value: string;  // Interfaces definem apenas contratos públicos, mas o TypeScript fornece o modificador readonly para os atributos.
  readonly owner: string;
  readonly type: string;
  
  constructor(value: string, keyOwner: string) {
    if (!this.isValid(value)) throw Error('Invalid Key');  // Verifica se a chave é válida antes de construir o objeto
    this.value = value;
    this.owner = keyOwner;
    this.type = KeyTypes.MAIL; // Esse tipo irá falhar, pois ainda não existe. Crie um novo tipo no ENUM, conforme o próximo trecho de código. 
  }

  isValid(value: string): boolean {
    const emailRegex = /\S+@\S+\.\S+/;
    return emailRegex.test(value);
  }
}

export default Mail;