import { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { selectUser, logout } from '../../app/user/userSlice';
import { allProductsSelector, addProduct, removeProduct, editProduct } from '../../app/shop/shopSlice';
import AddProductComponent from './components/AddProductComponent';
import ProductsContainer from './ProductsContainer';

const ShopPageContainer = () => {
    const dispatch = useDispatch();

    const allProducts = useSelector(allProductsSelector);
    const firstName = useSelector(selectUser).firstName;

    const logoutBtnOnClickHandler = () => dispatch(logout());

    const addProductCallback = useCallback(product => dispatch(addProduct(product)), [dispatch]);
    const removeProductCallback = useCallback(id => dispatch(removeProduct(id)), [dispatch]);
    const editProductCallback = useCallback(product => dispatch(editProduct(product)), [dispatch]);

    return (
        <div className="container mt-4">
            <h3 className="mb-4">გამარჯობა, {firstName}!</h3>
            <div className="row mb-4">
                <div className="col">
                    <button className="btn" onClick={logoutBtnOnClickHandler}>გამოსვლა</button>
                </div>
            </div>
            <div className="row justify-content-center">
                <div className="col">
                    <AddProductComponent addProduct={addProductCallback} />
                </div>
            </div>
            <ProductsContainer products={allProducts} removeProduct={removeProductCallback} editProduct={editProductCallback} />
        </div>
    );
};

export default ShopPageContainer;
