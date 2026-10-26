module.exports = require('./discord_sysimg.node');

// HOW TO USE
//
// sysimg.probe((err, capabilities) => {
//   if (err) throw err;
//   console.log('Platform:', capabilities.platform);
//   console.log('Backend:', capabilities.backend);
//   console.log('Input formats:', capabilities.inputFormats.map(f => f.id));
//   console.log('Output formats:', capabilities.outputFormats.map(f => f.id));
// });

// Both convert() and convertBytes() return the encoded image as an ArrayBuffer; the module
// never writes to disk.
// sysimg.convert('/path/to/input.heic', JSON.stringify({
//   format: 'jpeg',
//   maxWidth: 1920,
//   maxHeight: 1080,
//   quality: 85
// }), (err, result) => {
//   if (err) throw err;
//   console.log('Bytes:', result.byteLength);
// });

// const fs = require('fs');
// const buf = fs.readFileSync('/path/to/input.webp');
// // convertBytes requires ArrayBuffer, not Buffer. Convert with:
// const inputBytes = buf.buffer.slice(buf.byteOffset, buf.byteOffset + buf.byteLength);
// sysimg.convertBytes(inputBytes, JSON.stringify({
//   format: 'png',
//   maxWidth: 512
// }), (err, result) => {
//   if (err) throw err;
//   fs.writeFileSync('/path/to/output.png', result);
// });
