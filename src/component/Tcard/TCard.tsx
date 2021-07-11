import React, { useMemo, useState } from 'react';
import { Table, Card} from 'antd';
import { CardTabListType } from 'antd/lib/card'
import { ColumnsType } from 'antd/lib/table'
import styles from './TCard.module.less'
import { GetRowKey } from 'antd/lib/table/interface';

export interface TcardProps{
    cardTitle?: React.ReactNode,
    tabList?: CardTabListType[],
    tableColumns?: ColumnsType<Object>,
    dataSource?: Object[]
    loading?: boolean
    rowKey?: string | GetRowKey<any>
}

const TCard: React.FC<TcardProps> = ({cardTitle, tabList, tableColumns, dataSource, loading, rowKey}) => {
    const [activeKey, setActiveKey]= useState(tabList?.[0].key);
    const tableData = useMemo(() => {
        if(activeKey === "all"){
            return dataSource;
        }
        return dataSource?.filter((record: any)=>{
            return record.platform === activeKey;
        })
    }, [activeKey, dataSource])
    return (
        <Card 
            className = {styles['t-card']}
            title = {cardTitle}
            tabList = {tabList}
            activeTabKey = {activeKey}
            onTabChange = {key => setActiveKey(key)}
            hoverable
        >
           <Table
                loading = {loading}
                columns = {tableColumns}
                dataSource = {tableData} 
                rowKey = {rowKey}
           /> 
        </Card>
    )
} 

export default TCard;