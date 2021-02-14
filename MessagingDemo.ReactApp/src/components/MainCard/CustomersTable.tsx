import React from 'react'
import { Table } from 'antd';
import ICustomer from '../../models/ICustomer';
import { preProcessFile } from 'typescript';

interface ComponentProps{
    data: ICustomer[],
    selectedKeys: number[],
    isLoading:boolean,
    itemsSelectedCallback: (keys: number[]) => void
}

interface TableDataType{
    key: React.Key,
    fullName: string,
    phoneNumber: string
}

const TableColumns = [
    {
        title:"First and Last Name",
        dataIndex:"fullName"
    },
    {
        title:"Phone Number",
        dataIndex:"phoneNumber"
    }
]

const CustomersTable = (props:ComponentProps) => {
    let tableData: TableDataType[] = [];
    
    props.data.map((value:ICustomer, index:number) => {
        let singleElement: TableDataType = {
            key: value.id,
            fullName:value.fullName,
            phoneNumber: value.phoneNumber
        };
        tableData.push(singleElement);
    });

    const onRowSelected = (selectedRowKeys:React.Key[], selectedRows: TableDataType[]) =>{
        props.itemsSelectedCallback(selectedRowKeys as number[]);
    }

    return(
        <Table
            loading={props.isLoading}
            columns={TableColumns}
            dataSource={tableData}
            rowSelection={{
                type:"checkbox",
                onChange:onRowSelected,
                selectedRowKeys: props.selectedKeys
            }}
        >

        </Table>
    )
}


export default CustomersTable;