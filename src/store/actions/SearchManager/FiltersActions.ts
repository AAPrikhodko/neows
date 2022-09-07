import applicationStore from "../../ApplicationStore";
import {ActionType} from "../index";

export class SearchManagerFiltersAction {

    public static updateFiltersData(data: any) {
        applicationStore.dispatch({ type: ActionType.SEARCH_MANAGER_FILTERS_DATA_UPDATED, data });
        return
    }

    public static resetFiltersDateRange() {
        applicationStore.dispatch({type:ActionType.SEARCH_MANAGER_FILTERS_DATE_RANGE_RESET})
    }
}