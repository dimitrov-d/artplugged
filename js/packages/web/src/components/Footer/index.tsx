import React from 'react';
import { SendOutlined } from '@ant-design/icons';
import { Button, Form, Input } from 'antd';
import styled from 'styled-components';
import { Col, Row } from 'antd';
import SocialLinks from '../SocialLinks';

export const Footer = () => {
  const validateMessages = {
    types: {
      email: 'Input is not a valid email!',
    },
  };

  const AppFooter = styled(Row)`
  padding: 30px 50px 30px;
  box-shadow: 3px 3px 3px lightgrey inset;
`;

  // const CustomForm = (props: {
  //   status: any;
  //   message: any;
  //   onValidated: any;
  // }) => {
  //   let email: any;
  //   const submit = (values: any) => {
  //     email = values.user.email;
  //     email &&
  //       email.indexOf('@') > -1 &&
  //       props.onValidated({
  //         EMAIL: email,
  //         // NAME: name.value
  //       });
  //   };
  //   return (
  //     <>
  //       <Form
  //         className={'footer-sign-up'}
  //         onFinish={submit}
  //         validateMessages={validateMessages}
  //       >
  //         <Form.Item
  //           name={['user', 'email']}
  //           rules={[
  //             {
  //               type: 'email',
  //             },
  //           ]}
  //           style={{ display: 'flex !important' }}
  //         >
  //           <Input
  //             className={'footer-input'}
  //             type="text"
  //             id="input"
  //             placeholder="Email Address"
  //             bordered={false}
  //           />
  //           <Button className={'footer-button'} htmlType="submit">
  //             <SendOutlined />
  //           </Button>
  //         </Form.Item>
  //       </Form>
  //       {props.status ? (
  //         <div
  //           style={{
  //             background: 'rgb(217,217,217)',
  //             borderRadius: 2,
  //             padding: 10,
  //             display: 'inline-block',
  //           }}
  //         >
  //           {props.status === 'sending' && (
  //             <div style={{ color: 'blue' }}>Loading...</div>
  //           )}
  //           {props.status === 'error' && (
  //             <div
  //               style={{ color: 'red' }}
  //               dangerouslySetInnerHTML={{ __html: props.message }}
  //             />
  //           )}
  //           {props.status === 'success' && (
  //             <div
  //               style={{ color: 'green' }}
  //               dangerouslySetInnerHTML={{ __html: props.message }}
  //             />
  //           )}
  //         </div>
  //       ) : null}
  //     </>
  //   );
  // };

  // const NewsLetterForm = () => (
  //   <CustomForm status={status} message={''} onValidated={() => {}} />
  // );

  return (
    <AppFooter justify="center">
      <Col span={24}>
        <Row>
          <Col xs={24} md={8}>
            <a href="mailto:hello@artplugged.co.uk">hello@artplugged.co.uk</a>
          </Col>
          <Col xs={0} md={8}>
            <Row justify="center">
              Powered by &nbsp;
              <a href="https://solana.com"
              target="_blank" style={{marginRight: '10px'}}
                rel="noreferrer">Solana</a> &nbsp;
                <img src="/solana.svg"/>
            </Row>
          </Col>
          <Col xs={0} md={8}>
            <Row justify="end">
              <SocialLinks/>
            </Row>
          </Col>
        </Row>
      </Col>
    </AppFooter>
  );
};
