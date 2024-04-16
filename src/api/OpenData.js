import Marker from '../components/Marker'

/**
 * OpenData class
 */
export default class OpenData {
    /**
     * URL to get data
     * @type {string}
     */
    url = import.meta.env.VITE_OPEN_DATA_URL
    /**
     * Locations array
     * @type {[
     *     address: string,
     *     available_bike_stands: number,
     *     available_bikes: number,
     *     banking: boolean,
     *     bike_stands: number,
     *     bonus: boolean,
     *     contract_name: string,
     *     last_update: number,
     *     name: string,
     *     number: number,
     *     position: {
     *         lat: number,
     *         lng: number
     *     },
     *     status: string
     * ]}
     */
    locations = []
    async getData() {
        const data = await fetch(this.url)

        const jsonData = await data.json()
        jsonData.forEach((station) => {
            this.locations.push(station)
        })

        const marker = new Marker();
        marker.initMarkers(this.locations);
    }
};
