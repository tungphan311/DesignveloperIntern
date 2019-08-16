import React from 'react';
import { Redirect } from 'react-router-dom';

const WrongRouter = () => {
    return (
        <Redirect to="/" />
    );
}

export default WrongRouter;