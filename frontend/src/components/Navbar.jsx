import { Box, Flex, Heading, HStack, Button } from '@chakra-ui/react'
import { Link as RouterLink } from 'react-router-dom'
import { useRecoilValue, useSetRecoilState } from 'recoil'
import userAtom from '../atoms/userAtom'

const Navbar = () => {
    const user = useRecoilValue(userAtom);
    const setUser = useSetRecoilState(userAtom);
    const handleLogout = () => {
        localStorage.removeItem('userInfo');
        setUser(null);
    };
    return (
        <Box bg={"blue.400"} px={4}>
            <Flex h={16} alignItems={"center"} justifyContent={"space-between"}>
                <Heading as={"h1"} size={"lg"} color={"white"}>
                    <RouterLink to={"/"}>
                        Product Store
                    </RouterLink>
                </Heading>
                {user && (
                    <HStack>
                        <RouterLink to={"/products"}>
                            <Button colorScheme={"blue"} variant={"solid"}>
                                All Products
                            </Button>
                        </RouterLink>
                        <RouterLink to={"/products/featured"}>
                            <Button colorScheme={"blue"} variant={"solid"}>
                                Featured Products
                            </Button>
                        </RouterLink>
                        <RouterLink to={"/products/specificRating"}>
                            <Button colorScheme={"blue"} variant={"solid"}>
                                Products With Specific Rating
                            </Button>
                        </RouterLink>
                        <RouterLink to={"/products/specificPrice"}>
                            <Button colorScheme={"blue"} variant={"solid"}>
                                Products With Specific Price
                            </Button>
                        </RouterLink>
                        <RouterLink to={"/products/add"}>
                            <Button colorScheme={"blue"} variant={"solid"}>
                                Add Product
                            </Button>
                        </RouterLink>
                        <Button bg={"white"} variant={"solid"} onClick={handleLogout}>
                            Logout
                        </Button>
                    </HStack>
                )}
                {!user && (
                    <HStack>
                        <RouterLink to={"/login"}>
                            <Button colorScheme={"blue"} variant={"solid"}>
                                Login
                            </Button>
                        </RouterLink>
                        <RouterLink to={"/signup"}>
                            <Button bg={"white"} variant={"solid"}>
                                Signup
                            </Button>
                        </RouterLink>
                    </HStack>
                )}
            </Flex>
        </Box>
    );
};

export default Navbar;