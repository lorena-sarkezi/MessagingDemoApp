import React from 'react';
import { Form, Input, Button } from 'antd';
import ICustomer from '../../models/ICustomer';

interface FormProps {
    onSubmit: (values:ICustomer) => void
    isLoading: boolean
}

const layout = {
    labelCol: { span: 8 },
    wrapperCol: { span: 16 },
};
const tailLayout = {
    wrapperCol: { offset: 8, span: 16 },
};

const NameNumberForm = (props:FormProps) => {
    return (
        <Form
            {...layout}
            onFinish={props.onSubmit}
        >
            <Form.Item
                label="First and Last name"
                name="fullName"
                rules={[{ required: true, message: 'Requeired field!' }]}
            >
                <Input />
            </Form.Item>
            <Form.Item
                label="Phone Number"
                name="phoneNumber"
                rules={[{ required: true, message: 'Required field!' }]}
            >
                <Input type="number" />
            </Form.Item>
            <Form.Item
                {...tailLayout}
            >
                <Button type="primary" htmlType="submit" loading={props.isLoading}>Add a recepient</Button>
            </Form.Item>
        </Form>
    )
}

export default NameNumberForm;