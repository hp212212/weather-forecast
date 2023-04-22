import { Type } from "./ActionType";
import { defaultMainDate } from "./InitialState";

export function LatLngLanguage(state = defaultMainDate, action) {
    switch (action.type) {
        case Type.LatLng:
            state['Lat'] = action.lat;
            state['Lng'] = action.lng;
            return state;

        case Type.Language:
            state['Language'] = action.language;
            return state;
        default:
            return state;
    }
}