import {Reducer} from "redux";
import {Action, ActionType} from "../../actions";
import {FiltersData} from "../../state/SearchManager/FiltersData";

const updateFiltersData: Reducer<FiltersData> = (state: FiltersData = new FiltersData(), action: Action<ActionType,FiltersData>) => {
    switch (action.type) {
        case ActionType.SEARCH_MANAGER_FILTERS_DATA_UPDATED:
            return {...state, ...action.data}
        case ActionType.SEARCH_MANAGER_FILTERS_DATE_RANGE_RESET:
            return new FiltersData()
        default:
            return state
    }
}

export default updateFiltersData