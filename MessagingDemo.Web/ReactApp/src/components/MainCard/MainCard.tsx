import React,{FC, useState, useEffect} from 'react';
import {Card, Table, Form, Button, Input, Divider} from 'antd';
import ICustomer from '../../models/ICustomer';
import axios from '../../axios';

import NameNumberForm from './NameNumberForm';
import CustomersTable from './CustomersTable';



const MainCard = (props:any) => {

    const [customers, setCustomers] = useState<ICustomer[]>([]);
    const [selectedCustomerKeys, setSelectedCustomerKeys] = useState<number[]>([]);

    const [formButtonLoading, setFormButtonLoading] = useState<boolean>(false);
    

    const onSubmit = async (values:ICustomer) => {
        try{
            setFormButtonLoading(true);
            const response = await axios.post("/api/demo/customer")

            let data: ICustomer[] = [...customers];
            data.push(response.data);

            setCustomers(data);
            setFormButtonLoading(false);
        }
        catch(e){
            console.log(e);
            setFormButtonLoading(false);
        }
    }

    const onTableChkSelect = (keys:number[]) => {
        setSelectedCustomerKeys(keys);
    }

    const initCustomers = async () => {
        const initVals = await axios.get("/api/demo/customers");
        setCustomers(initVals.data);
    }

    useEffect(() => {
        initCustomers();
    },[]);

    useEffect(() =>{
    }, [customers, selectedCustomerKeys]);

    return(
        <Card title="Demo">
            <NameNumberForm onSubmit={onSubmit} isLoading={formButtonLoading}/>
            <Divider/>
            <CustomersTable data={customers} itemsSelectedCallback={onTableChkSelect}/>
        </Card>
    )
}

export default MainCard;