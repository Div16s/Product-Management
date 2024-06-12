import React from 'react';
import { Box, Heading, Text } from '@chakra-ui/react';

const HomePage = () => {
    return (
        <Box p={4}>
            <Heading as="h1" size="xl" mb={4}>
                Welcome to the Product Management App!
            </Heading>
            <Text fontSize="xl" color='green.500'>
                Start managing your products with ease.
            </Text>
            <Text fontSize="lg">
                <strong>Login</strong> or <strong>Signup</strong> to get started.
            </Text>
        </Box>
    );
};

export default HomePage;