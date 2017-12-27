import { applyMiddleware, createStore, compose } from "redux";
import thunkMiddleware from "redux-thunk";
import Reducers from "./../reducers";

function middleware() {
    return applyMiddleware(thunkMiddleware);
}

export default createStore(Reducers, middleware());
