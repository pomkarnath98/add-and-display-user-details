import React, { useEffect, useState } from 'react';
import { useNavigate } from "react-router-dom";
import styled from 'styled-components';
import axios from 'axios';

const Heading1 = styled.h1`
    text-align: center;
`;

const Head = styled.div`
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    justify-content: space-around;
`;

const UserBox = styled.div`
    margin: 20px 0;
    padding: 10px;
    border-radius: 5px;
    box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
    transition: transform .5s;
    :hover {
        transform: scale(1.05);
    }
`;

const Flex = styled.div`
    display: flex;
    justify-content: space-around;
    margin: 10px 0 0 0;
`;

export default function AddUser() {

    const navigate = useNavigate();
    const [data, setData] = useState([]);

    const editUser = async (email) => {
        navigate(`/?email_id=${email}`)
    }

    const removeUser = async (id) => {
        try {
            const res = await axios.delete(`http://localhost:9000/api/user/${id}`);
            alert(res.data || 'User Deleted Successfully!');
            setData(() => data.filter(user => user._id !== id));
        } catch (err) {
            alert(err?.response?.data || 'Something went wrong...');
        }
    }

    useEffect(async () => {
        const res = await axios.get("http://localhost:9000/api/users");
        console.log(res.data)
        setData(res.data)
    }, [])

    return (<>
        <Heading1>View User</Heading1>
        <Head>
            {data?.map(user => (
                <UserBox key={user._id}>
                    <div><b>Name:</b> {user.name}</div>
                    <div><b>Email:</b> {user.email}</div>
                    <div><b>Date of Joining:</b> {user.email}</div>
                    <Flex>
                        <button onClick={() => editUser(user.email)}>EDIT</button>
                        <button onClick={() => removeUser(user._id)}>DELETE</button>
                    </Flex>
                </UserBox>
            ))}
        </Head></>);
}