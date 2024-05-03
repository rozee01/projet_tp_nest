# Scrypt

## What is Scrypt

`Scrypt` is a _password-based_ _**key derivation function**_ created by **Colin Percival**, originally designed for the Tarsnap online backup service.

_**Scrypt is designed to be expensive computationally and memory-wise in order to make brute-force attacks unrewarding.**_

The primary purpose of scrypt is to **provide a secure and efficient way to derive one or more keys from a single password or passphrase**. In addition to its use in key derivation, scrypt is also widely used for hashing passwords for storage in web applications and other security-sensitive environments.

For more informations, [check this link](https://en.wikipedia.org/wiki/Scrypt).

## Why Scrypt

When choosing a hashing algorithm for passwords in Node.js, developers often compare `bcrypt` and `scrypt` because both provide robust security features designed to protect passwords. Here are some considerations for using `scrypt` instead of `bcrypt`:

1. **Memory Intensity**: One of the key differences between `scrypt` and `bcrypt` is their approach to resource usage. `scrypt` is designed to be both CPU and memory intensive, which can make it more resistant to brute-force attacks using specialized hardware, like ASICs and FPGAs. This added memory requirement makes `scrypt` potentially more secure against hardware-based attacks compared to `bcrypt`, which primarily relies on CPU intensity.

2. **Configurable Resource Usage**: `scrypt` allows for fine-tuning of parameters that dictate how much memory and CPU processing time the algorithm will require. This configurability can be an advantage when trying to balance security needs against system performance requirements, especially in environments where available system resources can vary.

3. **Adaptability**: The ability to adjust the resource usage parameters in `scrypt` makes it adaptable to future increases in hardware capabilities. As computing power becomes cheaper and more accessible, the parameters can be scaled to maintain a high level of security.

4. **Resistance to Large-scale Custom Hardware Attacks**: Due to its design, which demands more memory, `scrypt` can be more resistant than `bcrypt` to large-scale custom hardware attacks. The cost of implementing an attack using custom hardware that efficiently computes `scrypt` hashes is typically higher than for `bcrypt`.

5. **Support and Implementation**: `scrypt` is supported in Node.js through various libraries that offer straightforward integration into existing applications. This support makes it easy to implement `scrypt` without significant changes to application infrastructure.

However, there are also some considerations to keep in mind:

- **Performance Impact**: The higher resource demands of `scrypt` can lead to slower performance, especially in systems with limited resources. This might impact user experience in scenarios where rapid hashing is necessary, such as high-volume web applications.
- **Complexity**: `scrypt`’s configurability comes at the cost of increased complexity in setting it up. Properly configuring `scrypt` requires a good understanding of its parameters and the security-performance trade-offs.

In summary, the choice between `bcrypt` and `scrypt` can depend on specific application needs and the available system resources. If memory-intensive hashing is a priority to ward off hardware-based attacks, and if there is room to manage the additional complexity and resource usage, `scrypt` could be a preferable choice.

## Notes

When comparing two hashed strings, use `timingSafeEqual` because to protect against timing attacks.
