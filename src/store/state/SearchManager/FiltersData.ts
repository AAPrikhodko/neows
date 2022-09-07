export interface IFiltersData {
   dateRange: [string, string]
}

export class FiltersData implements IFiltersData {
    dateRange: [string, string]

    constructor() {
       this.dateRange = [new Date().toISOString().split('T')[0],new Date().toISOString().split('T')[0]]
   }
}