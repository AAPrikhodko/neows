export enum TableColumns {
    Close_Approach_Date_Full = "close_approach_date_full",
    Name = "name",
    IsPotentiallyHazardousAsteroid = "is_potentially_hazardous_asteroid",
    EstimatedDiameterMax = "estimated_diameter_max",
    Miss_Distance = "miss_distance",
    RelativeVelocity = "relative_velocity",
    Notice = "notice"
}

export enum QueryKeys {
    GetNEOListForToday = "get_neo_list_for_today",
    GetNOEListByDates = "get_neo_list_by_dates",
    BrowseObjects = "browse_objects"
}

export enum DatesRange {
    DateFrom = "dateFrom",
    DateTo = "dateTo"
}

export const DATE_FORMAT = "YYYY-MM-DD";