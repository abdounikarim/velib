import {OpenDataLocation} from "../types/OpenDataLocation";

export default class OpenData {
    locations: OpenDataLocation[] = [];

    async getData() {
        const data = await fetch(import.meta.env.VITE_OPEN_DATA_URL);

        const jsonData = await data.json()
        jsonData.forEach((station: OpenDataLocation) => {
            this.locations.push(station)
        });

        return this.locations;
    }
}
