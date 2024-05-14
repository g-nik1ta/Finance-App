import { combineReducers, createStore } from "redux";
import { PageReducer } from "./PageReducer";
import { ProfileReducer } from "./ProfileReducer";
import { composeWithDevTools } from "@redux-devtools/extension";

const rootReducer = combineReducers({
    PageReducer,
    ProfileReducer,
})

export const store = createStore(rootReducer, composeWithDevTools())