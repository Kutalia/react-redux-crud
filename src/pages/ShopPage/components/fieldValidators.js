const fieldValidators = {
    price: price => price === '' || /^0$|(^0\.\d{0,2}$)|(^[1-9]+\.\d{0,2}$)|(^[1-9]*$)/.test(price),
    quantity: quantity => quantity === '' || /^[0-9]+$/.test(quantity),
};

export default fieldValidators;
