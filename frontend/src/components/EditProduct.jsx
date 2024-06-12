import React, { useEffect, useState } from 'react';
import { Box, FormControl, FormLabel, Input, Button, Heading, Checkbox, Text, Divider } from '@chakra-ui/react';
import { useNavigate, useParams } from 'react-router-dom';
import useShowToast from '../hooks/useShowToast';
import { useRecoilValue } from 'recoil';
import userAtom from '../atoms/userAtom';

const EditProduct = () => {
    const user = useRecoilValue(userAtom);
    const { id } = useParams();
    const [productId, setProductId] = useState('');
    const [name, setName] = useState('');
    const [price, setPrice] = useState('');
    const [featured, setFeatured] = useState(false);
    const [rating, setRating] = useState('');
    const [company, setCompany] = useState('');
    const [loading, setLoading] = useState(false);
    const toast = useShowToast();
    const navigate = useNavigate();

    const handleUpdate = async (e) => {
        e.preventDefault();
        if (loading) return;
        setLoading(true);
        try {
            const response = await fetch(`https://product-management-cjcw.onrender.com/api/products/update/${id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${user.token}`,
                },
                body: JSON.stringify({ productId, name, price, featured, rating, company })
            });

            const data = await response.json();

            if (response.status !== 200) {
                toast("Error", data.err, "error");
                return;
            }

            toast("Success", data.message, "success");
            navigate('/products');
        } catch (error) {
            toast("Error", error.message, "error");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const response = await fetch(`https://product-management-cjcw.onrender.com/api/products/${id}`, {
                    method: 'GET',
                    headers: {
                        Authorization: `Bearer ${user.token}`,
                    },
                });
                const data = await response.json();
                console.log(data);
                if (response.status !== 200) {
                    toast("Error", data.err, "error");
                    return;
                }
                setProductId(data.productId);
                setName(data.name);
                setPrice(data.price);
                setFeatured(data.featured);
                setRating(data.rating);
                setCompany(data.company);
            } catch (error) {
                toast('Error', error.message, 'error');
            }
        };
        fetchProduct();
    }, [user]);

    return (
        <Box maxW="md" mx="auto" mt="8" p="4" borderWidth="1px" borderRadius="lg" shadow="lg">
            <Heading as="h2" size="xl" mb="2">
                Edit Product
            </Heading>
            <Divider mb="2" />
            <form onSubmit={handleUpdate}>
                <FormControl id="productId" mb="4">
                    <FormLabel>Product Id</FormLabel>
                    <Input type="text" value={productId} placeholder='Enter the name of the product' onChange={(e) => setProductId(e.target.value)} required />
                </FormControl>
                <FormControl id="name" mb="4">
                    <FormLabel>Name</FormLabel>
                    <Input type="text" value={name} placeholder='Enter the name of the product' onChange={(e) => setName(e.target.value)} required />
                </FormControl>
                <FormControl id="price" mb="4">
                    <FormLabel>Price</FormLabel>
                    <Input type="number" value={price} placeholder='Enter the price of the product' onChange={(e) => setPrice(e.target.value)} required />
                </FormControl>
                <FormControl id="featured" mb="4">
                    <FormLabel>Is this is a featured product?</FormLabel>
                    <Checkbox name="featured" isChecked={featured} onChange={(e) => setFeatured(e.target.checked)}>
                        Featured
                    </Checkbox>
                </FormControl>
                <FormControl id="rating" mb="4">
                    <FormLabel>Rating <Text fontWeight={"normal"}>Range: 0 to 5 (both inclusive)</Text></FormLabel>
                    <Input type="number" value={rating} placeholder='Enter a number between 0 and 5' onChange={(e) => setRating(e.target.value)} />
                </FormControl>
                <FormControl id="company" mb="4">
                    <FormLabel>Company</FormLabel>
                    <Input type="text" placeholder="Enter the product's company name" value={company} onChange={(e) => setCompany(e.target.value)} required />
                </FormControl>
                <Button type="submit" colorScheme="teal" width="full" isLoading={loading}>
                    Update Product
                </Button>
            </form>
        </Box>
    );
};

export default EditProduct;
