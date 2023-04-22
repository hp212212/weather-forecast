import { createStore } from "redux";
import CombinedReduser from "./CombinedRedusere";

export const store = createStore(CombinedReduser)