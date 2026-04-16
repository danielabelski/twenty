import { transformPhonesValue } from 'src/engine/core-modules/record-transformer/utils/transform-phones-value.util';

describe('transformPhonesValue', () => {
  it('should return undefined when input is undefined', () => {
    const result = transformPhonesValue({ input: undefined });

    expect(result).toBeUndefined();
  });

  it('should return null when input is null', () => {
    const result = transformPhonesValue({ input: null });

    expect(result).toBeNull();
  });

  it('should return null for primaryPhoneNumber when it is empty string', () => {
    const result = transformPhonesValue({
      input: {
        primaryPhoneNumber: '',
        primaryPhoneCountryCode: '',
        primaryPhoneCallingCode: '',
        additionalPhones: null,
      },
    });

    expect(result?.primaryPhoneNumber).toBeNull();
  });

  it('should return undefined for primaryPhoneNumber when it is not provided', () => {
    const result = transformPhonesValue({
      input: {
        additionalPhones: null,
      },
    });

    expect(result?.primaryPhoneNumber).toBeUndefined();
  });

  it('should validate and return a valid phone number', () => {
    const result = transformPhonesValue({
      input: {
        primaryPhoneNumber: '612345678',
        primaryPhoneCountryCode: 'FR',
        primaryPhoneCallingCode: '+33',
        additionalPhones: null,
      },
    });

    expect(result?.primaryPhoneNumber).toBe('612345678');
    expect(result?.primaryPhoneCountryCode).toBe('FR');
    expect(result?.primaryPhoneCallingCode).toBe('+33');
  });

  it('should return null additionalPhones when empty array is provided', () => {
    const result = transformPhonesValue({
      input: {
        primaryPhoneNumber: '',
        primaryPhoneCountryCode: '',
        primaryPhoneCallingCode: '',
        additionalPhones: null,
      },
    });

    expect(result?.additionalPhones).toBeNull();
  });
});
