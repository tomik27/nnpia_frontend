import React from 'react';
import { Typography, Button } from '@mui/material';
import { Icon } from '@mui/material';

import { Movie } from '@mui/icons-material';
import { styled } from '@mui/material/styles';

const Root = styled('div')({
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100vh',
    backgroundColor: '#fff',
    color: '#000',
});

const Title = styled(Typography)({
    fontSize: 72,
    fontWeight: 'bold',
    marginBottom: 24,
    display: 'flex',
    alignItems: 'center',
});

const IconStyled = styled(Icon)({
    fontSize: 100,
    marginRight: 16,

});

const Subtitle = styled(Typography)({
    fontSize: 24,
    marginBottom: 48,
    textAlign: 'center',
});

const ButtonStyled = styled(Button)({
    fontSize: 16,
    fontWeight: 'bold',
    padding: '16px 24px',
});

const HomePage = () => {
    return (
        <Root>
            <Title>
                <IconStyled>
                    <Movie style={{ fontSize: 100 }} />
                </IconStyled>
                Filmová databáze
            </Title>
            <Subtitle>
                Vítejte na naší filmové databázi. Zde najdete informace o vašich oblíbených filmech a mnoho dalšího.
            </Subtitle>
            <ButtonStyled variant="contained" color="secondary">
                Přejít na databázi
            </ButtonStyled>
        </Root>
    );
};

export default HomePage;
