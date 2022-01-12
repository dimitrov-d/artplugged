import React from 'react';
import styled from 'styled-components';
//@ts-ignore

const Container = styled.div`
    display: flex;
    flexDirection: row
    alignItems: center
`;

const SocialLink = styled.a`
  display: block;
  flex: center;
  color: black;
  margin-left: 16px;
  opacity: 0.5;
  transition: opacity 0.2s ease;
  &:hover {
    color: #D24089;
    opacity: 1;
  }
`;

const SocialLinks = () => {
    return (
        <Container>
            <SocialLink href="https://instagram.com/artplugged" target="_blank" rel="noreferrer">
                <img src="/instagram.svg" style={{ cursor: 'pointer' }} />
            </SocialLink>
            <SocialLink href="https://discord.com/invite/PuV4FdXqqR" target="_blank" rel="noreferrer">
                <img src="/discord.svg" style={{ cursor: 'pointer' }} />
            </SocialLink>
            <SocialLink href="https://twitter.com/artplugged" target="_blank" rel="noreferrer">
                <img src="/twitter.svg" style={{ cursor: 'pointer' }} />
            </SocialLink>
        </Container>
    );
};

export default SocialLinks;
