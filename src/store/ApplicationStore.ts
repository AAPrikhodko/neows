import { Store, createStore } from "redux"
import { combinedAppReducers } from "./reducers"
import { Action, ActionType } from "./actions"
import { composeWithDevTools } from "redux-devtools-extension";

import { FiltersData as SearchManagerFiltersData } from "./state/SearchManager/FiltersData"
import { TableData as SearchManagerTableData } from "./state/SearchManager/TableData"

export interface ApplicationState {
   searchManager: {
       filtersData: SearchManagerFiltersData
       tableData: SearchManagerTableData
   }
}

export const applicationStore: Store<ApplicationState, Action<ActionType, any>> = createStore(combinedAppReducers,composeWithDevTools())

export default applicationStore