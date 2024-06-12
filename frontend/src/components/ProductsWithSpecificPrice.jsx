import React, { useEffect, useState } from 'react';
import { Box, List, ListItem, Heading, Text, Button, HStack, VStack, Input, Divider, Flex, Spinner } from '@chakra-ui/react';
import { useRecoilValue } from 'recoil';
import userAtom from '../atoms/userAtom';
import useShowToast from '../hooks/useShowToast';
import { useNavigate } from 'react-router-dom';

const ProductListWithSpecificPrice = () => {
    const user = useRecoilValue(userAtom);
    const toast = useShowToast();
    const [price, setPrice] = useState(0);
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(false);
    const email = user?.email;
    const navigate = useNavigate();

    const handleDelete = async (id) => {
        try {
            const response = await fetch(`https://product-management-cjcw.onrender.com/api/products/delete/${id}`, {
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
        }
    }

    const fetchProducts = async () => {
        if (loading) return;
        setLoading(true);
        try {
            if(!price){
                toast("Error", "Please enter the price", "error")
                return;
            }
            const response = await fetch(`https://product-management-cjcw.onrender.com/api/products/specificPrice/${email}/${price}`, {
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
            console.log(data);
            setProducts(data);
        }
        catch (error) {
            toast('Error', error.message, 'error');
        } finally {
            setLoading(false);
        }
    };

    return (
        <Box maxW="2xl" mx="auto" mt="8">
            <VStack alignItems={"flex-start"} gap={2} mb={4}>
                <Heading as="h2" size="xl" mb="4">
                    Products
                </Heading>
                <HStack>
                    <Text fontSize={"lg"}>Products with price less than</Text>
                    <Input type="number" placeholder="Enter the price" value={price} onChange={(e) => setPrice(e.target.value)} />
                </HStack>
                <Button colorScheme="green" mt={2} onClick={fetchProducts} isLoading={loading}>
                    Fetch Products
                </Button>
            </VStack>
            <Divider mb={4} />
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

export default ProductListWithSpecificPrice;
