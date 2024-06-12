import React, { useState } from 'react';
import { Box, FormControl, FormLabel, Input, Button, Heading } from '@chakra-ui/react';
import useShowToast from '../hooks/useShowToast';
import { useNavigate } from 'react-router-dom';
import { useSetRecoilState } from 'recoil';
import userAtom from '../atoms/userAtom';

const Authentication = ({ type }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const setUser = useSetRecoilState(userAtom);
    const toast = useShowToast();
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            const endpoint = type === 'login' ? 'login' : 'signup';
            const response = await fetch(`https://product-management-cjcw.onrender.com/api/auth/${endpoint}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ email, password })
            });

            const data = await response.json();

            console.log(data);

            if(response.status!==200){
                console.log(data.err);
                toast("Error", data.err, "error");
                return;
            }

            localStorage.setItem('userInfo', JSON.stringify(data.userInfo));
            setUser(data.userInfo);
            toast("Success", data.message, "success");
            navigate('/products');
        } catch (error) {
            console.log(error);
            toast("Error", error.message, "error");
        } finally {
            setLoading(false);
        }
    };

    return (
        <Box maxW="md" mx="auto" mt="8" p="4" borderWidth="1px" borderRadius="lg" shadow="lg">
            <Heading as="h2" size="xl" mb="4">
                {type === 'login' ? 'Login' : 'Signup'}
            </Heading>
            <form onSubmit={handleSubmit}>
                <FormControl id="email" mb="4">
                    <FormLabel>Email</FormLabel>
                    <Input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
                </FormControl>
                <FormControl id="password" mb="4">
                    <FormLabel>Password</FormLabel>
                    <Input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
                </FormControl>
                <Button type="submit" colorScheme="teal" width="full" isLoading = {loading}>
                    {type === 'login' ? 'Login' : 'Signup'}
                </Button>
            </form>
        </Box>
    );
};

export default Authentication;
