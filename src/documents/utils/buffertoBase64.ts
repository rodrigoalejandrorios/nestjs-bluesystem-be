export const bufferToBase64 = (buf) => {
  let binstr = Array.prototype.map
    .call(buf, (ch) => {
      return String.fromCharCode(ch);
    })
    .join('');
  return binstr;
};
