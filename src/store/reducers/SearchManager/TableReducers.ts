import { Reducer} from "redux";
import { Action, ActionType } from "../../actions";
import {TableData} from "../../state/SearchManager/TableData";

const updateTableData: Reducer<TableData> = (state: TableData = new TableData(), action: Action<ActionType, TableData>) => {
    switch (action.type) {
        case ActionType.SEARCH_MANAGER_TABLE_ADD_NOTICE:
            return {...state, noticeArr: {...state.noticeArr, ...action.data}}
        default:
            return state
    }
}

export default updateTableData;