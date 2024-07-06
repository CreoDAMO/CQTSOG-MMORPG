from cryptography.fernet import Fernet

# Generate encryption key
key = Fernet.generate_key()
cipher_suite = Fernet(key)

# Encrypt data
data = b"Sensitive Data"
encrypted_data = cipher_suite.encrypt(data)
print("Encrypted:", encrypted_data)

# Decrypt data
decrypted_data = cipher_suite.decrypt(encrypted_data)
print("Decrypted:", decrypted_data)
