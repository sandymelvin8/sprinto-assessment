import { createCipheriv, randomBytes, createDecipheriv } from "crypto";
export class EncryptionUtils {
    static encrypter(text: string) {
        const algorithm = "aes-256-cbc";
        // const key = randomBytes(32);
        const key = "12345678123456781234567812345678";
        const iv = randomBytes(16);
        const cipher = createCipheriv(algorithm, Buffer.from(key), iv);
        let encrypted = cipher.update(text);
        encrypted = Buffer.concat([encrypted, cipher.final()]);
        const result = `${iv.toString("hex")}!${encrypted.toString("hex")}`;
        return result;
    }

    static decrypter(text: string) {
        const key = "12345678123456781234567812345678";
        const algorithm = "aes-256-cbc";
        const resultArr = text.split("!");
        const iv = Buffer.from(resultArr[0], "hex");
        const encryptedText = Buffer.from(resultArr[1], "hex");
        const decipher = createDecipheriv(algorithm, Buffer.from(key), iv);
        let decrypted = decipher.update(encryptedText);
        decrypted = Buffer.concat([decrypted, decipher.final()]);
        return decrypted.toString();
    }
}
