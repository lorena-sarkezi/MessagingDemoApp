import React,{FC, useState, useEffect} from 'react';
import {Card, Form, Button, Input, Divider} from 'antd';
import ICustomer from '../../models/ICustomer';
import axios from '../../axios';
import { useErrorModal} from '../../context/ErrorModalContext';

import NameNumberForm from './NameNumberForm';
import CustomersTable from './CustomersTable';
import IMessage from '../../models/IMessage';



const MainCard = (props:any) => {

    const {showError, setShowError} = useErrorModal();

    const [customers, setCustomers] = useState<ICustomer[]>([]);
    const [selectedCustomerKeys, setSelectedCustomerKeys] = useState<number[]>([]);
    const [messageContent, setMessageContent] = useState<string>("");
    const [charsLeft, setCharsLeft] = useState<number>(160);

    const [isTableLoading, setIsTableLoading] = useState<boolean>(false);
    const [isFormButtonLoading, setIsFormButtonLoading] = useState<boolean>(false);
    const [isMessageSendButtonLoading, setIsMessageSendButtonLoading] = useState<boolean>(false);

    

    const onSubmitForm = async (values:ICustomer) => {
        try{
            console.log(values);
            setIsFormButtonLoading(true);
            const response = await axios.post("/api/demo/customer", values);

            let data: ICustomer[] = [...customers];
            data.push(response.data);

            setCustomers(data);
            setIsFormButtonLoading(false);
        }
        catch(e){
            console.error(e);
            setIsFormButtonLoading(false);
            setShowError(true);
        }
    }

    const onMessageSend = async () => {
        try{
            setIsMessageSendButtonLoading(true);
            const data: IMessage = {
                customers: selectedCustomerKeys,
                message: messageContent
            };

            const response = await axios.post("/api/demo/message", data);

            setMessageContent("");
            setSelectedCustomerKeys([]);
            setIsMessageSendButtonLoading(false);
        }
        catch(e){
            console.error(e);
            setShowError(true);
            setIsMessageSendButtonLoading(false);
        }
    }

    const initCustomers = async () => {
        try{
            setIsTableLoading(true);
            const initVals = await axios.get("/api/demo/customers");
            setCustomers(initVals.data);
            setIsTableLoading(false);
        }
        catch(e){
            console.error(e);
            setIsTableLoading(false);
            setShowError(true);

        }
    }

    const onTableChkSelect = (keys:number[]) => {
        setSelectedCustomerKeys(keys);
    }

    const onMessageContentChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
        setMessageContent(event.target.value);
    }

    useEffect(() => {
        initCustomers();
    },[]);

    useEffect(() => {
        setCharsLeft(160 - messageContent.length);
    }, [messageContent])



    return(
        <Card title="Demo" className="main-card">
            <NameNumberForm 
                onSubmit={onSubmitForm} 
                isLoading={isFormButtonLoading}/>
            <Divider/>
            <CustomersTable 
                isLoading={isTableLoading}
                data={customers} 
                selectedKeys={selectedCustomerKeys}
                itemsSelectedCallback={onTableChkSelect}/>
            <p className="msg-chars-left">SMS Message (max 160 charscters, {charsLeft} left</p>
            <Input.TextArea 
                value={messageContent}
                maxLength={160} 
                placeholder="Enter your message here..."
                onChange={onMessageContentChange}
            />
            <Button
                type="primary"
                htmlType="button"
                onClick={onMessageSend}
                loading={isMessageSendButtonLoading}
                className="msg-send-button"
            >
                Send
            </Button>
        </Card>
    )
}

export default MainCard;