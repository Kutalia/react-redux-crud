import { useSelector } from 'react-redux';
import { Switch, Redirect, Route } from 'react-router-dom';

import { selectUser } from './app/user/userSlice';
import LoginPage from './pages/LoginPage/LoginPageContainer';
import ShopPage from './pages/ShopPage/ShopPageContainer';

const Routes = () => {
    const authorized = !!useSelector(selectUser);

    return (
        <Switch>
            {authorized
                ? <>
                    <Route exact path="/shop" component={ShopPage} />
                    <Redirect to="/shop" />
                </>
                : <>
                    <Route exact path="/login" component={LoginPage} />
                    <Redirect to="/login" />
                </>
            }
        </Switch>
    )
};

export default Routes;
