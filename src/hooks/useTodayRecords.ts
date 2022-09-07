import {useQuery} from "react-query";
import {QueryKeys, TableColumns} from "../utils/Constants";
import {ObjectsService} from "../api/objects";

export const useTodayRecords = () => {
    const {isLoading, data:records} = useQuery(
        QueryKeys.GetNEOListForToday,
        () => ObjectsService.getTodayObjects(),
        {
            select: ({data}) => {
                let result: any[] = []
                Object.keys(data.near_earth_objects).forEach((date:string, index)=> {
                    data.near_earth_objects[Object.keys(data.near_earth_objects)[index]].map((near_earth_object: any) => (
                        result.push({
                            key: near_earth_object.id,
                            [TableColumns.Close_Approach_Date_Full]: near_earth_object.close_approach_data[0].close_approach_date_full,
                            [TableColumns.Name]: near_earth_object.name,
                            [TableColumns.IsPotentiallyHazardousAsteroid]: near_earth_object.is_potentially_hazardous_asteroid,
                            [TableColumns.EstimatedDiameterMax]: near_earth_object.estimated_diameter.meters.estimated_diameter_max,
                            [TableColumns.Miss_Distance]: near_earth_object.close_approach_data[0].miss_distance.kilometers,
                            [TableColumns.RelativeVelocity]: near_earth_object.close_approach_data[0].relative_velocity.kilometers_per_hour
                        })
                    ))
                })
                return result
            }
        }
    )

    return {isLoading, records}
}