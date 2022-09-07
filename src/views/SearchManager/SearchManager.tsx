import React from "react";
import {connect} from 'react-redux';
import {TableColumns} from "../../utils/Constants";
import FiltersTableLayoutWrapper from "../../layouts/FiltersTableLayout/FiltersTableLayoutWrapper";
import {ApplicationState} from "../../store/ApplicationStore";
import {FiltersData as SearchManagerFiltersData} from "../../store/state/SearchManager/FiltersData";
import {TableData as SearchManagerTableData} from "../../store/state/SearchManager/TableData";
import {IItem} from "../../layouts/FiltersTableLayout/FiltersLayout";
import {SearchManagerFiltersAction as ActionClassFilters} from "../../store/actions/SearchManager/FiltersActions"
import {ColumnTypes} from "../../layouts/FiltersTableLayout/TableLayout";

interface ISearchManagerProps {
    searchManagerFiltersData: SearchManagerFiltersData
    searchManagerTableData: SearchManagerTableData
}

const SearchManager: React.FC<ISearchManagerProps> = (props) => {

    const { searchManagerFiltersData, searchManagerTableData } = props;

    const items: Array<IItem> = [
        {
            id: "dateRange",
            type: "dateRange",
        },
        {
            id: "buttonToday",
            label: "Today",
            type:"button"
        }
    ]

    const columns: (ColumnTypes[number] & { editable?: boolean; dataIndex: string })[] = [
        { title: "Date and Time", dataIndex: TableColumns.Close_Approach_Date_Full},
        { title: "Asteroid name", dataIndex: TableColumns.Name },
        { title: "Potential Hazard", dataIndex: TableColumns.IsPotentiallyHazardousAsteroid },
        { title: "Estimated diameter (meters)", dataIndex: TableColumns.EstimatedDiameterMax },
        { title: "Miss distance (kilometers)", dataIndex: TableColumns.Miss_Distance },
        { title: "Velocity (kilometers per hour)", dataIndex: TableColumns.RelativeVelocity},
        { title: "Notice", dataIndex: TableColumns.Notice, editable:true}
    ]

    const layoutFilters = {
        title: "Search parameters",
        items: items,
        filtersData: searchManagerFiltersData,
    }

    const layoutTable = {
        columns: columns,
        filtersData: searchManagerFiltersData,
        tableData: searchManagerTableData,
    }

  return (
      <FiltersTableLayoutWrapper
         layoutFilters={layoutFilters}
         actionClassFilters={ActionClassFilters}
         layoutTable={layoutTable}
     />
  )
}

const mapStateToProps = function (state: ApplicationState): ISearchManagerProps {
  const {filtersData: searchManagerFiltersData, tableData: searchManagerTableData} = state.searchManager;
  return {searchManagerFiltersData, searchManagerTableData}
}

export default connect(mapStateToProps)(SearchManager)
