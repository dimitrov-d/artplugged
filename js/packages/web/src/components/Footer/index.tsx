import React from 'react';
import styled from 'styled-components';
import { Col, Row } from 'antd';
import SocialLinks from '../SocialLinks';

export const Footer = () => {
  const AppFooter = styled(Row)`
  padding: 20px 50px 20px;
`;

  return (
    <AppFooter justify="center">
      <Col span={24}>
        <Row>
          <Col xs={24} md={8} lg={8}>
            <a href="mailto:nfts@artplugged.co.uk">nfts@artplugged.co.uk</a>
          </Col>
          <Col xs={24} md={8} lg={8}>
            <Row id="centered">
              Powered by &nbsp;
              <a href="https://metaplex.com/" style={{marginTop: '-5px'}}>
                <img src="/metaplex.svg" />
              </a>
            </Row>
          </Col>
          <Col xs={24} md={8} lg={8}>
            <Row id="ended">
              <SocialLinks />
            </Row>
          </Col>
        </Row>
      </Col>
    </AppFooter>
  );
};
