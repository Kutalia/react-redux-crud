import { useState } from 'react';

import TippyWrapper from '../../../common/components/TippyWrapperComponent';
import requiredFields from './requiredFields.json';
import { fieldEmptyMsg } from '../../../constants';
import fieldValidators from './fieldValidators';

const AddProductComponent = ({ addProduct }) => {
    const [tooltips, setTooltips] = useState({});

    const [inputs, setInputs] = useState({ price: '0', quantity: '1' });
    const { quantity, price } = inputs;

    const onInputChangeHandler = (e) => {
        const val = e.target.value;
        if (fieldValidators[e.target.name](val)) {
            setInputs((prevInputs) => ({ ...prevInputs, [e.target.name]: val }));
        }
    }

    const onSubmitHandler = (e) => {
        e.preventDefault();

        const form = e.target;

        const product = {};
        const newTooltips = {};

        requiredFields.forEach((fieldName) => {
            if (!form[fieldName].value) {
                newTooltips[fieldName] = fieldEmptyMsg;
            } else {
                product[fieldName] = form[fieldName].value;
            }
        });

        if (Object.keys(newTooltips).length) {
            setTooltips(newTooltips);
        } else {
            addProduct(product);
        }
    };

    const onFormChangeHandler = (e) => {
        if (e.target.value) {
            setTooltips(prevTooltips => ({ ...prevTooltips, [e.target.name]: null }))
        }
    }

    return (
        <form onSubmit={onSubmitHandler} onChange={onFormChangeHandler}>
            <div className="form-row">
                <div className="col-md-4 mb-3">
                    <label htmlFor="productName">დასახელება</label>
                    <TippyWrapper content={tooltips.name}>
                        <input className="form-control" name="name" id="productName" placeholder="პროდუქტის სახელი" />
                    </TippyWrapper>
                </div>
                <div className="col-md-4 mb-3">
                    <label htmlFor="productPrice">ფასი $</label>
                    <TippyWrapper content={tooltips.price}>
                        <input className="form-control" name="price"
                            onChange={onInputChangeHandler} value={price} id="productPrice" placeholder="პროდუქტის ფასი" />
                    </TippyWrapper>
                </div>
                <div className="col-md-4 mb-3">
                    <label htmlFor="productName">რაოდენობა</label>
                    <TippyWrapper content={tooltips.quantity}>
                        <input className="form-control" name="quantity"
                            onChange={onInputChangeHandler} value={quantity} id="productQuantity" placeholder="პროდუქტის რაოდენობა" />
                    </TippyWrapper>
                </div>
            </div>
            <div className="form-row">
                <div className="col">
                    <input type="submit" className="btn btn-primary" value="პროდუქტის დამატება" />
                </div>
            </div>
        </form>
    )
};

export default AddProductComponent;
