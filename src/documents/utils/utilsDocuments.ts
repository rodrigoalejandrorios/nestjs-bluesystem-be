import { Injectable } from '@nestjs/common';

@Injectable()
export class UtilsDocumens {
  public bufferToBase64(buf): string {
    let binstr = Array.prototype.map
      .call(buf, (ch) => {
        return String.fromCharCode(ch);
      })
      .join('');
    return binstr;
  }
}
