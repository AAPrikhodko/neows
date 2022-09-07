import applicationStore from "../../ApplicationStore";
import {ActionType} from "../index";


export class SearchManagerTableActions {
    public static async addNotice(data: any ) {
        applicationStore.dispatch({type: ActionType.SEARCH_MANAGER_TABLE_ADD_NOTICE, data})
    }

}