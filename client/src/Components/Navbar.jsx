import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import styled from 'styled-components';

const Head = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    & > * {
        margin-right: 10px;
        margin-left: 10px;
        cursor: pointer;
    }
`;

export default function Navbar() {
    const path = useLocation().pathname;

    return (<Head>
        {path != '/' && <Link to='/'>Click to Add User</Link>}
        {path != '/view' && <Link to='/view'>Click to View User</Link>}
    </Head>);
}