import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';

const SecondWrongRouter = () => {
    return (
        <Redirect to="/admin" />
    );
}

export default SecondWrongRouter;