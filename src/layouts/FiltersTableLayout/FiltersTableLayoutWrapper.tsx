import React from "react";
import FiltersLayout, {IItem} from "./FiltersLayout";
import TableLayout, {ColumnTypes} from "./TableLayout";
import { TableData as SearchManagerTableData } from "../../store/state/SearchManager/TableData";
import { FiltersData as SearchManagerFiltersData } from "../../store/state/SearchManager/FiltersData";

export type FiltersData = SearchManagerFiltersData
export type TableData = SearchManagerTableData


interface IFiltersTableLayoutWrapperProps {
    layoutFilters: {
        filtersData: FiltersData
        items: Array<IItem>
    }
    actionClassFilters: any
    layoutTable: {
        filtersData: FiltersData,
        tableData: TableData
        columns: (ColumnTypes[number] & { editable?: boolean; dataIndex: string })[]
    }
}

const FiltersTableLayoutWrapper: React.FC<IFiltersTableLayoutWrapperProps> = (props) => {
  const {layoutFilters, layoutTable, actionClassFilters} = props;
  const {filtersData,items} = layoutFilters;
  const {tableData, columns} = layoutTable;

  const updateFiltersData = (value: any) => actionClassFilters.updateFiltersData(value);
  const handleTodayButtonClick = () => actionClassFilters.resetFiltersDateRange()

    return (
      <>
          {layoutFilters && <FiltersLayout
            filtersData={filtersData}
            handleFiltersDataUpdate={updateFiltersData}
            handleTodayButtonClick={handleTodayButtonClick}
            items={items}
          /> }
          {layoutTable && <TableLayout
            filtersData={filtersData}
            tableData={tableData}
            columns = {columns}
          />}
      </>
  )
}

export default FiltersTableLayoutWrapper