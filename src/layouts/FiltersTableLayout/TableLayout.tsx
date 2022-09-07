import React, {useContext, useEffect, useRef, useState} from "react";
import {FiltersData, TableData} from "./FiltersTableLayoutWrapper";
import Table from 'antd/lib/table/Table'
import Card from "antd/lib/card/Card";
import {ColumnProps} from "antd/lib/table";
import styles from "./TableLayout.module.scss"
import {useTodayRecords} from "../../hooks/useTodayRecords";
import {TableColumns} from "../../utils/Constants";
import {useRecordsByDates} from "../../hooks/useRecordsByDates";
import {useBrowseObjects} from "../../hooks/useBrowseObjects";
import {InputRef, Pagination} from "antd";
import {FormInstance, Form, Input} from "antd/es";
import {SearchManagerTableActions} from "../../store/actions/SearchManager/TableActions";
import getBarChart from "../../utils/chart";

interface ITableLayout {
    filtersData: FiltersData,
    tableData: TableData
    columns: (ColumnTypes[number] & { editable?: boolean; dataIndex: string })[]
}

interface IAdditionalColumnSettings {
    transformValueToTitle?: (value: any) => any
}

interface ISetOfColumnsWithAdditionalSettings {
    [TableColumns.Close_Approach_Date_Full]?: IAdditionalColumnSettings,
    [TableColumns.Name]?: IAdditionalColumnSettings,
    [TableColumns.IsPotentiallyHazardousAsteroid]?: IAdditionalColumnSettings,
    [TableColumns.EstimatedDiameterMax]?: IAdditionalColumnSettings,
    [TableColumns.Miss_Distance]?: IAdditionalColumnSettings,
    [TableColumns.RelativeVelocity]?: IAdditionalColumnSettings
}

const EditableContext = React.createContext<FormInstance<any> | null>(null);

interface EditableRowProps {
    index: number;
}

const EditableRow: React.FC<EditableRowProps> = ({ index, ...props }) => {
    const [form] = Form.useForm();
    return (
        <Form form={form} component={false}>
            <EditableContext.Provider value={form}>
                <tr {...props} />
            </EditableContext.Provider>
        </Form>
    );
};

interface EditableCellProps {
    title: React.ReactNode;
    editable: boolean;
    children: React.ReactNode;
    dataIndex: string;
    record: any;
    handleSave: (record: any) => void;
}

const EditableCell: React.FC<EditableCellProps> = ({
       title,
       editable,
       children,
       dataIndex,
       record,
       handleSave,
       ...restProps
   }) => {
    const [editing, setEditing] = useState(false);
    const inputRef = useRef<InputRef>(null);
    const form = useContext(EditableContext)!;

    useEffect(() => {
        if (editing) {
            inputRef.current!.focus();
        }
    }, [editing]);

    const toggleEdit = () => {
        setEditing(!editing);
        form.setFieldsValue({ [dataIndex]: record[dataIndex] });
    };

    const save = async () => {
        try {
            const values = await form.validateFields();

            toggleEdit();
            handleSave({ ...record, ...values });
        } catch (errInfo) {
            console.log('Save failed:', errInfo);
        }
    };

    let childNode = children;

    if (editable) {
        childNode = editing ? (
            <Form.Item
                style={{ margin: 0 }}
                name={dataIndex}
            >
                <Input ref={inputRef} onPressEnter={save} onBlur={save} />
            </Form.Item>
        ) : (
            <div className="editable-cell-value-wrap" style={{ paddingRight: 24 }} onClick={toggleEdit}>
                {children}
            </div>
        );
    }

    return <td {...restProps}>{childNode}</td>;
};

type EditableTableProps = Parameters<typeof Table>[0];

export type ColumnTypes = Exclude<EditableTableProps['columns'], undefined>;



const TableLayout = (props: ITableLayout) => {

    const [page, setPage] = useState(1)

    const { columns, filtersData, tableData } = props
    let noticeArr = tableData.noticeArr
    debugger
    // const { isLoading, records } = useTodayRecords()
    // const { isLoading, records } = useRecordsByDates(filtersData.dateRange[0], filtersData.dateRange[1])
    const { isLoading, data } = useBrowseObjects(page, 10, noticeArr)
    const [dataSource, setDataSource] = useState<Array<any>>(data?.records ? data.records : [])

    useEffect(()=>{
        data && setDataSource(data.records)
    }, [data])

    const additionalColumnsSettings: ISetOfColumnsWithAdditionalSettings = {
        [TableColumns.IsPotentiallyHazardousAsteroid]: {
            transformValueToTitle: (value) => {return value ? "Yes": "No"}
        },
    }

    const renderCellsForColumn = (columnSettings: IAdditionalColumnSettings) => {
        const {transformValueToTitle} = columnSettings || {}
        return function (value: any, record: any) {
            return <span> {transformValueToTitle ? transformValueToTitle(value) : value} </span>
        }
    }

    const handleSave = (row: any) => {
        const newData = [...dataSource];
        const index = newData.findIndex(item => row.key === item.key);
        const item = newData[index];
        newData.splice(index, 1, {
            ...item,
            ...row,
        });
        debugger
        SearchManagerTableActions.addNotice({
            [row.key]:row.notice
        })
        setDataSource(newData);
    };

    const prepareColumns = (columns: (ColumnTypes[number] & { editable?: boolean; dataIndex: string })[]) => {
        columns?.forEach(column=>{
            column.key = String(column.dataIndex)
            if (!column.render) column.render = renderCellsForColumn((additionalColumnsSettings as any)[column.key])
            if (column.editable) column.onCell = (record: any) => ({
                record,
                editable: column.editable,
                dataIndex: column.dataIndex,
                title: (column.title) as string,
                handleSave,
            })
        })
        return columns
    }

    const onPaginationParamsChange = (page:number) => {
        setPage(page)
    }

    const components = {
        body: {
            row: EditableRow,
            cell: EditableCell,
        },
    };

    return (
        isLoading
            ? <div>loading...</div>
            : <Card
                    title={<strong>Results</strong>}
                    type="inner"
                    className={styles.customCard}
                >
                <>
                    <Table
                            className={styles.customTable}
                            columns={prepareColumns(columns)}
                            dataSource={dataSource}
                            pagination={false}
                            tableLayout={"fixed"}
                            components ={components}
                        />
                        <br/>
                        <Pagination onChange={onPaginationParamsChange}
                                    total={data?.total_pages}
                                    current={page}
                                    showSizeChanger={false}
                        />
                        {getBarChart(dataSource)}
                    </>
                </Card>
    )
}

export default TableLayout