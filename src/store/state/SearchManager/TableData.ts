interface ITableData {
    noticeArr: object
}

export class TableData implements ITableData {
    noticeArr: object

    constructor() {
        this.noticeArr = {}
    }
}