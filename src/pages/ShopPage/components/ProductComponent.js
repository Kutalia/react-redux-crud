import { useState } from 'react';

import TippyWrapper from '../../../common/components/TippyWrapperComponent';
import requiredFields from './requiredFields.json';
import { fieldEmptyMsg } from '../../../constants';
import fieldValidators from './fieldValidators';

const ProductComponent = ({ product, removeProduct, editProduct }) => {
    const { id } = product;

    const [editMode, setEditMode] = useState(false);
    const [tooltips, setTooltips] = useState({});
    const [inputs, setInputs] = useState(product);

    const { name, price, quantity } = inputs;

    const onChangeHandler = (e) => {
        let value = e.target.value;

        if (e.target.name === 'quantity' && !fieldValidators.quantity(value)) {
            return;
        }

        if (e.target.name === 'price' && !fieldValidators.price(value)) {
            return;
        }

        setInputs((prevInputs) => ({ ...prevInputs, [e.target.name]: value }));
        if (tooltips[e.target.name]) {
            setTooltips((prevTooltips) => ({ ...prevTooltips, [e.target.name]: null }));
        }
    }

    const onSubmitHandler = () => {
        const newTooltips = {};

        requiredFields.forEach((fieldName) => {
            if (!inputs[fieldName]) {
                newTooltips[fieldName] = fieldEmptyMsg;
            }
        });

        if (Object.keys(newTooltips).length) {
            setTooltips(newTooltips);
        } else {
            editProduct({ id, ...inputs });
            setEditMode(false);
        }
    };

    return (
        <form onSubmit={(e) => e.preventDefault()}>
            <small style={{ display: 'block' }} className="mb-2">{id}</small>
            <div className="form-group row">
                <label htmlFor={`product-name-${id}`} className="col-lg-4 col-form-label">სახელწოდება</label>
                <div className="col-lg-8">
                    <TippyWrapper content={tooltips.name}>
                        <input id={`product-name-${id}`} className="form-control" name="name" value={name} onChange={onChangeHandler} disabled={!editMode} />
                    </TippyWrapper>
                </div>
            </div>
            <div className="form-group row">
                <label htmlFor={`product-price-${id}`} className="col-lg-4 col-form-label">ფასი</label>
                <div className="col-lg-8">
                    <TippyWrapper content={tooltips.price}>
                        <input id={`product-price-${id}`} className="form-control" name="price" value={price} onChange={onChangeHandler} disabled={!editMode} />
                    </TippyWrapper>
                </div>
            </div>
            <div className="form-group row">
                <label htmlFor={`product-quantity-${id}`} className="col-lg-4 col-form-label">რაოდენობა</label>
                <div className="col-lg-8">
                    <TippyWrapper content={tooltips.quantity}>
                        <input id={`product-quantity-${id}`} className="form-control" name="quantity" value={quantity} onChange={onChangeHandler} disabled={!editMode} />
                    </TippyWrapper>
                </div>
            </div>
            <div className="form-group row">
                {!editMode &&
                    <>
                        <div className="col-lg-4">
                            <button className="btn btn-info btn-sm" onClick={() => setEditMode(true)}>რედაქტირება</button>
                        </div>
                        <div className="col-lg-8">
                            <button className="btn btn-secondary btn-sm" onClick={removeProduct}>წაშლა</button>
                        </div>
                    </>
                }
                {editMode &&
                    <>
                        <div className="col-lg-4">
                            <button className="btn btn-info btn-sm " onClick={onSubmitHandler}>შენახვა</button>
                        </div>
                        <div className="col-lg-8">
                            <button className="btn btn-secondary btn-sm" onClick={() => setEditMode(false)}>გაუქმება</button>
                        </div>
                    </>
                }
            </div>
        </form>
    );
};

export default ProductComponent;
