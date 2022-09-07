import {useQuery} from "react-query";
import {QueryKeys, TableColumns} from "../utils/Constants";
import {ObjectsService} from "../api/objects";
import {getNoticeById} from "../utils/Utils";

export const useBrowseObjects = (page: number, size: number, noticeArr: object) => {

    const {isLoading, data} = useQuery(
        [QueryKeys.BrowseObjects, page, size],
        () => ObjectsService.browseObjects(page, size),
        {
            select: ({data}) => {
                debugger
                let records: any[] = []
                    data.near_earth_objects.map((near_earth_object: any) => (
                        records.push({
                            key: near_earth_object.id,
                            [TableColumns.Close_Approach_Date_Full]: near_earth_object.close_approach_data[0].close_approach_date_full,
                            [TableColumns.Name]: near_earth_object.name,
                            [TableColumns.IsPotentiallyHazardousAsteroid]: near_earth_object.is_potentially_hazardous_asteroid,
                            [TableColumns.EstimatedDiameterMax]: near_earth_object.estimated_diameter.meters.estimated_diameter_max,
                            [TableColumns.Miss_Distance]: near_earth_object.close_approach_data[0].miss_distance.kilometers,
                            [TableColumns.RelativeVelocity]: near_earth_object.close_approach_data[0].relative_velocity.kilometers_per_hour,
                            [TableColumns.Notice]: getNoticeById((near_earth_object as any).id, noticeArr)
                        })
                    ))
                return {
                    records,
                    total_pages: data.page.total_pages
                }
            },
        }
    )

    return {isLoading, data}
}