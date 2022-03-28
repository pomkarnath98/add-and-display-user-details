import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import styled from 'styled-components';
import axios from 'axios';

const Head = styled.div`
    text-align: center;
`;

const InputDiv = styled.div`
    margin: 10px 0px;
`;

export default function AddUser() {

    const location = useLocation();
    const splitedLocation = location.search.split('=');
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const addUpdateUserAction = async (event) => {
        event.preventDefault();
        if (splitedLocation?.length > 1) {
            const payload = { name };
            try {
                const res = await axios.put(`http://localhost:9000/api/user/update/${email}`, payload);
                alert(res.data || 'User updated successfully!');
            } catch (err) {
                alert(err?.response?.data || 'Something went wrong...');
            }
        } else {
            const payload = { name, email, password };
            try {
                const res = await axios.post("http://localhost:9000/api/register", payload);
                alert(res.data || 'User added successfully!');
                setName('');
                setEmail('');
                setPassword('');
            } catch (err) {
                alert(err?.response?.data || 'Something went wrong...');
            }
        }
    }

    useEffect(async () => {
        let email_id;
        if (splitedLocation?.length > 1) email_id = splitedLocation[splitedLocation.length - 1]
        if (email_id) {
            try {
                const { data } = await axios.get(`http://localhost:9000/api/singleUser/${email_id}`);
                setName(data[0]?.name)
                setEmail(data[0]?.email)
            } catch (err) {
                alert(err?.response?.data || 'Something went wrong...');
            }
        }
    }, [])

    return (<Head>
        <h1>{splitedLocation?.length <= 1 ? 'Add User' : 'Edit User'}</h1>
        <form onSubmit={addUpdateUserAction}>
            <InputDiv>
                <input value={name} onChange={(e) => setName(e.target.value)} type="text" placeholder="Enter Name" />
            </InputDiv>

            <InputDiv>
                <input value={email} onChange={(e) => setEmail(e.target.value)} type="email" placeholder="Enter Email ID" />
            </InputDiv>

            <InputDiv>
                {splitedLocation?.length <= 1 && <input value={password} onChange={(e) => setPassword(e.target.value)} type="password" placeholder="Enter Password" />}
            </InputDiv>

            <InputDiv>
                <input type="submit" />
            </InputDiv>
        </form>
    </Head>);
}