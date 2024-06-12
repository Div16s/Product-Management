import React, { useEffect, useState } from 'react';
import { Box, List, ListItem, Heading, Text, Button, HStack, Divider, Flex, Spinner } from '@chakra-ui/react';
import { useRecoilValue } from 'recoil';
import userAtom from '../atoms/userAtom';
import useShowToast from '../hooks/useShowToast';
import { useNavigate } from 'react-router-dom';

const FeaturedProductList = () => {
    const user = useRecoilValue(userAtom);
    const toast = useShowToast();
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleDelete = async (id) => {
        if (loading) return;
        setLoading(true);
        try {
            const response = await fetch(`http://localhost:5000/api/products/delete/${id}`, {
                method: 'DELETE',
                headers: {
                    Authorization: `Bearer ${user.token}`,
                },
            });
            const data = await response.json();
            if (response.status !== 200) {
                toast("Error", data.err, "error");
                return;
            }
            console.log(data);
            toast('Success', data.message, 'success');
            if (response.status !== 200) {
                toast('Error', data.err, 'error');
                return;
            }
            setProducts(products.filter((product) => product._id !== id));
        } catch (error) {
            toast('Error', error.message, 'error');
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        const fetchProducts = async () => {
            if (loading) return;
            setLoading(true);
            try {
                const response = await fetch(`http://localhost:5000/api/products/featured/${user.email}`, {
                    method: 'GET',
                    headers: {
                        Authorization: `Bearer ${user.token}`,
                    },
                });
                const data = await response.json();
                if (response.status !== 200) {
                    toast("Error", data.err, "error");
                    return;
                }
                setProducts(data);
            } catch (error) {
                toast('Error', error.message, 'error');
            } finally {
                setLoading(false);
            }
        };
        fetchProducts();
    }, [user]);

    return (
        <Box maxW="2xl" mx="auto" mt="8">
            <Heading as="h2" size="xl" mb="4">
                Featured Products
            </Heading>
            <Divider mb="4" />
            {loading && (
                <Flex alignItems={"center"} justifyContent={"center"}>
                    <Spinner mt={8} size={"lg"} />
                </Flex>
            )}
            {!loading && (
                <>
                    {products.length === 0 && (
                        <Text fontSize={"lg"} bg={"red.500"} color={"white"} p={2}>No products found.</Text>
                    )}
                    {products.length > 0 && (
                        <List spacing={4}>
                            {products && products.map((product) => (
                                <ListItem key={product._id} p="4" borderWidth="1px" borderRadius="lg" shadow="md">
                                    <HStack flex={"row"} justifyContent={"space-between"}>
                                        <Heading as="h3" size="md">{product.name}</Heading>
                                        <Text fontWeight={"bold"} color={"green.500"}>{product.featured ? 'Featured' : ''}</Text>
                                    </HStack>
                                    <Box mt={2}>
                                        <Text>Id: {product.productId}</Text>
                                        <Text>Price: ${product.price}</Text>
                                        <Text>Rating: {product.rating}</Text>
                                        <Text>Company: {product.company}</Text>
                                    </Box>
                                    <HStack flex={"row"} justifyContent={"flex-end"}>
                                        <Button
                                            mt="2"
                                            colorScheme="blue"
                                            onClick={() => navigate(`/products/${product._id}`)}
                                        >
                                            Edit
                                        </Button>
                                        <Button
                                            mt="2"
                                            colorScheme="red"
                                            onClick={() => {
                                                if (window.confirm('Are you sure you want to delete this product?')) {
                                                    handleDelete(product._id);
                                                }
                                            }}
                                        >
                                            Delete
                                        </Button>
                                    </HStack>
                                </ListItem>
                            ))}
                        </List>
                    )}
                </>
            )}
        </Box>
    );
};

export default FeaturedProductList;
