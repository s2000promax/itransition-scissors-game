import { createHmac, randomBytes } from 'crypto';

export class GameCrypto {
  public generateHmacKey(): string {
    const hmacKey = randomBytes(32);
    return hmacKey.toString('hex').toUpperCase();
  }

  public encode(hmacKey: string, word: string): string {
    const hmac = createHmac('sha256', hmacKey);
    hmac.update(word);
    return hmac.digest('hex').toUpperCase();
  }

  public validateHMAC(hmacKey: string, validationHMAC: string, validationWord: string): string {
    const hmac = this.encode(hmacKey, validationWord);
    if (validationHMAC === hmac) {
      return 'HMAC is Valid';
    }
    return 'HMAC is Invalid';
  }
}
