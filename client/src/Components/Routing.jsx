import React from 'react';
import { Route, Routes } from 'react-router-dom';
import AddUser from './AddUser';
import ViewUser from './ViewUser';

export default function Routing() {
    return (<Routes>
        <Route exact path="/" element={<AddUser />} />
        <Route exact path="/view" element={<ViewUser />} />
    </Routes>);
}