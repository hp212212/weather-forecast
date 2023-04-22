import { Type } from "./ActionType";

export const DispatchLatLng = (Lat, Lng) => {
    return {
        type: Type.LatLng,
        lat: Lat,
        lng: Lng
    }
}

export const DispatchLanguage = (Language) => {
    return {
        type: Type.Language,
        language: Language,
    }
}