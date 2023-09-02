import React from 'react'
import { styled } from 'styled-components';

const Row = styled.div`
    display: flex;  
    flex-flow: row wrap;
    margin-bottom: 16px;
`;

const Label = styled.div`
    margin-left: 0;
    margin-right: auto;
`;

const Value = styled.div`
    font-weight: 600;
    margin-left: auto;
    margin-right: 0;
`;


const TextDetail = ({label, value}) => {
  return (
    <Row>
        <Label>{label}</Label>
        <Value>{value}</Value>
    </Row>
  )
}

export default TextDetail;