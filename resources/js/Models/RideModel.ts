import { IResident } from "./ResidentModel"

export interface IRide {
    id: number
    resident_id: number
    time: string
    taxiCompany_id: number
    resident: IResident[]
}