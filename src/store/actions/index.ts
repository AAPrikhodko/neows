export interface Action<E,T> {
    type: E
    data?: any
}

export enum ActionType {
    SEARCH_MANAGER_FILTERS_DATA_UPDATED,
    SEARCH_MANAGER_FILTERS_DATE_RANGE_RESET,

    SEARCH_MANAGER_TABLE_ADD_NOTICE
}