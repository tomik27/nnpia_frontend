import React from 'react';
import { styled } from '@mui/material/styles';

const Content = styled('div')({
    paddingTop:64
});

const PaddedContent: React.FC<React.PropsWithChildren<{}>> = ({ children }) => {
    return <Content>{children}</Content>;
};

export default PaddedContent;
