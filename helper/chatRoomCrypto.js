const crypto = require("crypto");
const {chatRoomKeys} = require("../config/keys");

// AES encryption 

const encryptInformation = (plainText) => {
    const cipher = crypto.createCipher("aes-256-ctr", chatRoomKeys);
    let encrypted = cipher.update(plainText, "utf8", "hex");
    encrypted += cipher.final('hex');
    return encrypted;
}

// AES decryption

const decryptInformation = (cypherText) => {
    const decipher = crypto.createDecipher("aes-256-ctr", chatRoomKeys);
    let decrypted = decipher.update(cypherText, "hex", "utf8");
    decrypted += decipher.final('utf8');
    return decrypted;
}

module.exports = {
    encryptInformation, decryptInformation
}