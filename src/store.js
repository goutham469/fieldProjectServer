import { createStore } from "redux";
import reducer from "./reducer"; 

const store = createStore(reducer)
// const appDefaults = createStore(appdefaults)

export default store