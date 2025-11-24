const qrcode = require("qrcode");

function generateQRCodeURL(otpauthUrl) {
  return new Promise((resolve, reject) => {
    qrcode.toDataURL(otpauthUrl, (err, data_url) => {
      if (err) reject(err);
      else resolve(data_url);
    });
  });
}

module.exports = {
  generateQRCodeURL,
};
