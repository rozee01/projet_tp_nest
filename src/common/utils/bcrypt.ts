import { randomBytes, scryptSync, timingSafeEqual } from 'crypto';
// For security Measures Scrypt is perfect

// Scrypt is a password-based key derivation function that is designed to be expensive computationally and memory-wise
//  in order to make brute-force attacks unrewarding.
// https://en.wikipedia.org/wiki/Scrypt

export function GetHashAndSalt(password: string) {
  // Salt must be as random as possible
  const salt = randomBytes(32).toString('base64');
  const hash = scryptSync(password, salt, 128, {
    N: 16384,
    p: 8,
    r: 2,
  }).toString('base64');
  return { salt: salt, password: hash };
}
export function CompareHashAndPass(password: string, hash: string, salt: string): boolean {
  const HashedPassBuffer = scryptSync(password, salt, 128, {
    N: 16384,
    p: 8,
    r: 2,
  });
  const StoredBuffer = Buffer.from(hash, 'base64');
  // it is best to use crypto.timingSafeEqual(a, b) to compare the keys
  // in the verify function to protect against timing attacks.
  return timingSafeEqual(HashedPassBuffer, StoredBuffer);
}
