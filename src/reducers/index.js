import authReducer from './auth.reducers';
import userReducer from './user.reducer';
import { combineReducers } from 'redux';
import productReducer from './product.reducer';
import categoryReducer from './category.reducer';
import orderReducer from './order.reducer';

const rootReducer = combineReducers({
    auth: authReducer,
    user: userReducer,
    category: categoryReducer,
    product: productReducer,
    order: orderReducer
});


export default rootReducer;