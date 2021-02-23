import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';

import { login } from '../../app/user/userSlice';
import TippyWrapper from '../../common/components/TippyWrapperComponent';
import './LoginPage.css';
import countries from './countries.json';
import { fieldEmptyMsg } from '../../constants';

const requiredFields = ['firstName', 'lastName', 'birthYear', 'email', 'phone', 'country', 'city', 'address', 'agreeTerms'];

const LoginPage = () => {
    const [tooltips, setTooltips] = useState({});
    const [submitEnabled, setSubmitEnabled] = useState(false);

    const dispatch = useDispatch();
    const history = useHistory();

    const currentYear = new Date().getFullYear();

    const onSubmitHandler = (e) => {
        e.preventDefault();

        const form = e.target;
        const newTooltips = {};
        const userObj = {};

        let firstInvalidInput;

        requiredFields.forEach((fieldName) => {
            if (!form[fieldName].value) {
                if (!firstInvalidInput) {
                    firstInvalidInput = form[fieldName];
                }
                newTooltips[fieldName] = fieldEmptyMsg;
            } else {
                userObj[fieldName] = form[fieldName].value;
            }
        });

        if (currentYear - form.birthYear.value < 18) {
            newTooltips.birthYear = 'რეგისტრაციისთვის თქვენ უნდა იყოთ არანაკლებ 18 წლის';
            if (!firstInvalidInput) {
                firstInvalidInput = form.birthYear;
            }
        }

        if (Object.keys(newTooltips).length) {
            setTooltips(newTooltips);
            firstInvalidInput.closest('div').scrollIntoView({ behavior: 'smooth' });
        } else {
            delete userObj.agreeTerms;

            dispatch(login(userObj));
            history.replace('/shop');
        }
    }

    return (
        <div className="container">
            <div className="row justify-content-center">
                <div className="col-md-8">
                    <form className="login-form" onSubmit={onSubmitHandler}>
                        <div className="form-group">
                            <label htmlFor="first-name">სახელი</label>
                            <TippyWrapper content={tooltips.firstName}>
                                <input className="form-control form-control-sm" placeholder="თქვენი სახელი" name="firstName" id="first-name" />
                            </TippyWrapper>
                        </div>
                        <div className="form-group">
                            <label htmlFor="last-name">გვარი</label>
                            <TippyWrapper content={tooltips.lastName}>
                                <input className="form-control form-control-sm" placeholder="თქვენი გვარი" name="lastName" id="last-name" />
                            </TippyWrapper>
                        </div>
                        <div className="form-group">
                            <label htmlFor="birth-year">დაბადების წელი</label>
                            <TippyWrapper content={tooltips.birthYear}>
                                <select className="form-control form-control-sm" name="birthYear" id="birth-year">
                                    {(new Array(100)).fill(null).map((value, index) => {
                                        const year = currentYear - index;
                                        return <option key={year} value={year}>{year}</option>;
                                    }
                                    )}
                                </select>
                            </TippyWrapper>
                        </div>
                        <div className="form-group">
                            <label htmlFor="email">ელფოსტა</label>
                            <TippyWrapper content={tooltips.email}>
                                <input className="form-control form-control-sm" placeholder="თქვენი ელფოსტა" name="email" id="email" type="email" />
                            </TippyWrapper>
                        </div>
                        <div className="form-group">
                            <label htmlFor="phone">ტელეფონის ნომერი</label>
                            <TippyWrapper content={tooltips.phone}>
                                <input className="form-control form-control-sm" placeholder="საკონტაქტო ტელეფონის ან მობილურის ნომერი" name="phone" id="phone" />
                            </TippyWrapper>
                        </div>
                        <div className="form-group">
                            <label htmlFor="country">ქვეყანა</label>
                            <TippyWrapper content={tooltips.country}>
                                <select className="custom-select" name="country" id="country">
                                    {
                                        countries.map(({ name, code }) => <option key={code} value={code}>{name}</option>)
                                    }
                                </select>
                            </TippyWrapper>
                        </div>
                        <div className="form-group">
                            <label htmlFor="city">ქალაქი</label>
                            <TippyWrapper content={tooltips.city}>
                                <input className="form-control form-control-sm" placeholder="საცხოვრებელი ქალაქი" name="city" id="city" />
                            </TippyWrapper>
                        </div>
                        <div className="form-group">
                            <label htmlFor="address">მისამართი</label>
                            <TippyWrapper content={tooltips.address}>
                                <input className="form-control form-control-sm" placeholder="თქვენი ფაქტობრივი საცხოვრებელი მისამართი" name="address" id="address" />
                            </TippyWrapper>
                        </div>
                        <div className="form-group">
                            <label htmlFor="notes">დამატებითი მითითებები მისამართზე</label>
                            <TippyWrapper content={tooltips.notes}><textarea className="form-control form-control-sm" name="notes" id="notes" /></TippyWrapper>
                        </div>
                        <div className="form-check">
                            <TippyWrapper content={tooltips.agreeTerms}>
                                <input className="form-check-input"
                                    onClick={() => setSubmitEnabled((prevState) => !prevState)}
                                    name="agreeTerms" id="agree-terms" type="checkbox" />
                            </TippyWrapper>
                            <label htmlFor="agree-terms" className="form-check-label">წავიკითხე და ვეთანხმები მონაცემთა დაცვის პოლიტიკას</label>
                        </div>
                        <div className="form-group">
                            <input type="submit" className={`btn btn-primary${!submitEnabled ? ' disabled' : ''}`} disabled={!submitEnabled} id="submit-btn" value="რეგისტრაცია" />
                        </div>
                    </form>
                </div>
            </div>
        </div>

    );
};

export default LoginPage;
