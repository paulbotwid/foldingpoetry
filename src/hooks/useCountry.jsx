import useGeoLocation from "react-ipgeolocation";
import countryData from "../data/countryData";

export default function useCountry() {
    const location = useGeoLocation()
    const country = countryData.find(country => country.code === location.country)
    return country
}