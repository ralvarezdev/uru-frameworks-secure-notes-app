// PBDKF2 configuration
const PBKDF2_ITERATIONS = import.meta.env.PBKDF2_ITERATIONS;
const PBKDF2_KEY_LENGTH = import.meta.env.PBKDF2_KEY_LENGTH

// Decrypts the text using the provided key with AES-256-CTR
export async function decryptText(encryptedText, key) {
    // Extract IV from the beginning of the encrypted data
    const iv = new Uint8Array(encryptedText.slice(0, 32).match(/.{1,2}/g).map(byte => parseInt(byte, 16)));
  const encryptedData = new Uint8Array(encryptedText.slice(32).match(/.{1,2}/g).map(byte => parseInt(byte, 16)));

  // Decrypt the data
  const decryptedData = await crypto.subtle.decrypt(
    {
      name: 'AES-CTR',
      counter: iv,
      length: 32
    },
    key,
    encryptedData
  );

  return new TextDecoder().decode(decryptedData);
}

// Derives a key from the provided password and salt using PBKDF2 with SHA-256
export async function deriveKey(password, salt) {
      // Convert salt to Uint8Array
  const saltBuffer = new TextEncoder().encode(salt);

    // Import the key
  const encoder = new TextEncoder();
  const keyMaterial = await crypto.subtle.importKey(
    'raw',
    encoder.encode(password),
    { name: 'PBKDF2' },
    false,
    ['deriveKey']
  );

  // Derive the key
  return await crypto.subtle.deriveKey(
    {
      name: 'PBKDF2',
      salt: saltBuffer,
      iterations: PBKDF2_ITERATIONS,
      hash: 'SHA-256'
    },
    keyMaterial,
    { name: 'AES-CTR', length: PBKDF2_KEY_LENGTH*8 },
    true,
    ['encrypt', 'decrypt']
  );
}