import { ApplicationState } from "../ApplicationStore";
import { combineReducers, Reducer} from "redux";

import updateFiltersData from "./SearchManager/FiltersReducers";
import updateTableData from "../reducers/SearchManager/TableReducers"

export const combinedAppReducers: Reducer<ApplicationState> = combineReducers({
    searchManager: combineReducers({
        filtersData: updateFiltersData,
        tableData: updateTableData
    })
})