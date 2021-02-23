import fieldValidators from './fieldValidators';

describe('Price Field Validator', () => {
    it('returns true for an empty string', () => {
        const str = '';
        const expectedResult = true;
        expect(fieldValidators.price(str)).toEqual(expectedResult);
    });

    it('returns true for zero string representation', () => {
        const str = '0';
        const expectedResult = true;
        expect(fieldValidators.price(str)).toEqual(expectedResult);
    });

    it('returns false for strings starting with dot', () => {
        const str = '.05';
        const expectedResult = false;
        expect(fieldValidators.price(str)).toEqual(expectedResult);
    });

    it('returns true for whole number string', () => {
        const str = '5125721';
        const expectedResult = true;
        expect(fieldValidators.price(str)).toEqual(expectedResult);
    });

    it('returns true for less than 1 positive number string', () => {
        const str = '0.41';
        const expectedResult = true;
        expect(fieldValidators.price(str)).toEqual(expectedResult);
    });

    it('returns false for more than 2 ciphers after the dot', () => {
        const str = '5.555';
        const expectedResult = false;
        expect(fieldValidators.price(str)).toEqual(expectedResult);
    });
    
    it('returns false for negative number string', () => {
        const str = '-25.25';
        const expectedResult = false;
        expect(fieldValidators.price(str)).toEqual(expectedResult);
    })
});

describe('Quantity Field Validator', () => {
    it('returns true for whole number string', () => {
        const str = '52515';
        const expectedResult = true;
        expect(fieldValidators.quantity(str)).toEqual(expectedResult);
    });

    it('returns false for floating point number string', () => {
        const str = '1.2';
        const expectedResult = false;
        expect(fieldValidators.quantity(str)).toEqual(expectedResult);
    });
});
