import * as bcrypt from "bcrypt";

export async function encodePassword(pswd: string) {
    const SALT = bcrypt.genSaltSync();
    return bcrypt.hash(pswd, SALT);
}

export function comparePasswords(saved: string, incoming: string) {
    return bcrypt.compareSync(incoming, saved);
}
