import { IRide } from "./RideModel"

export interface ITaxiCompany {
    id: number
    name: string
    ride_id: number
    location: string
    rides: IRide[]
}