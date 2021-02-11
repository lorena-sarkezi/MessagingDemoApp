import React, {FC} from 'react';
import { Layout, Row, Col } from 'antd';
import ColumnSpan from '../../constants/ColumnSpan';



const Header:FC = () => {
    return(
        <Layout.Header>
            <Row>
                <Col {...ColumnSpan.Secondary}></Col>
                <Col {...ColumnSpan.Secondary}>
                    <h1>
                        MessagingDemo
                    </h1>
                </Col>
                <Col {...ColumnSpan.Secondary}></Col>
            </Row>
            
        </Layout.Header>
        
    )
}

export default Header;