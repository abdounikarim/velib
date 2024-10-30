export class OpenDataLocation {
    public address?: string;
    public available_bike_stands?: number;
    public available_bikes?: number;
    public bike_stands?: number;
    public bonus?: boolean;
    public name?: string;
    public number?: number;
    public position?: {
        lat?: number,
        lng?: number
    };
    public status?: string;
}
