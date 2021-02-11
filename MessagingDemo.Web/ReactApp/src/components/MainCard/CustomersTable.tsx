import React from 'react'
import { Table } from 'antd';
import ICustomer from '../../models/ICustomer';
import { preProcessFile } from 'typescript';

interface TableProps{
    data: ICustomer[],
    itemsSelectedCallback: (keys: number[]) => void
}

interface TableDataType{
    key: React.Key,
    fullName: string,
    phone: string
}

const TableColumns = [
    {
        title:"First and Last Name",
        dataIndex:"fullname"
    },
    {
        title:"Phone Number",
        dataIndex:"phoneNumber"
    }
]

const CustomersTable = (props:TableProps) => {
    let tableData: TableDataType[] = [];
    
    props.data.map((value:ICustomer, index:number) => {
        let singleElement: TableDataType = {
            key: value.id,
            fullName:value.fullName,
            phone: value.fullName
        };
        tableData.push(singleElement);
    });


    const onRowSelected = (selectedRowKeys:React.Key[], selectedRows: TableDataType[]) =>{
        props.itemsSelectedCallback(selectedRowKeys as number[]);
    }

    return(
        <Table
            columns={TableColumns}
            dataSource={tableData}
            rowSelection={{
                type:"checkbox",
                onChange:onRowSelected
            }}
        >

        </Table>
    )
}


export default CustomersTable;