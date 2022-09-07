import React from "react";
import {FiltersData} from "./FiltersTableLayoutWrapper";
import {DATE_FORMAT} from "../../utils/Constants";
import {Button, Col, Row, DatePicker} from "antd";
import styles from "./FiltersLayout.module.scss"
import Card from "antd/lib/card/Card";
import moment from "moment"

export type renderFunc = (item: IItem) => JSX.Element
export type ItemTypes = 'dateRange' | 'button'

interface IFiltersLayout {
    filtersData: FiltersData,
    handleFiltersDataUpdate: (value: any) => void
    handleTodayButtonClick: (value: any) => void
    items:Array<IItem>
}

export interface IItem {
  id: string,
  type: ItemTypes
  label?: string,
}


interface IElements {
  dateRange: renderFunc,
  button: renderFunc
}


const FiltersLayout = (props: IFiltersLayout) => {
    const {items, filtersData, handleFiltersDataUpdate, handleTodayButtonClick} = props

    const renderButton = (item: IItem) => {
        const { label} = item

        return (
            <Col span={1} >
                <Button onClick={handleTodayButtonClick}>{label}</Button>
            </Col>
        )
    }

    const renderDateRange = (item: IItem) => {

        const { id } = item
        const { RangePicker } = DatePicker;

        return (
            <Col span={6} title={"Date Range"}>
                <RangePicker
                    value={[moment((filtersData as any)[(id)][0]),moment((filtersData as any)[(id)][1])]}
                    allowClear={false}
                    format={DATE_FORMAT}
                    onChange={(_, dateRange: [string, string]) => {
                        handleFiltersDataUpdate({[id]: dateRange})
                    }}
                />
            </Col>
        )
    }


    const elements: IElements = {
        dateRange: renderDateRange,
        button: renderButton
    }

    return (
      <>
          <Card
              title={<strong>Filters</strong>}
              type="inner"
              className={styles.customCard}
          >
             <Row gutter={20} className={styles.filtersData}>
              {items.map((item: IItem) => (
                  (elements as any)[item.type](item)
              ))}
             </Row>
          </Card>
      </>
  )
}

export default FiltersLayout