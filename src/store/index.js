import { combineReducers, createStore } from "redux";
import { PageReducer } from "./PageReducer";
import { composeWithDevTools } from "@redux-devtools/extension";

const rootReducer = combineReducers({
    PageReducer,
})

export const store = createStore(rootReducer, composeWithDevTools())