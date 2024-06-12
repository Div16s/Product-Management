import { ChakraProvider, Box } from '@chakra-ui/react'
import Navbar from './components/Navbar'
import Authentication from './components/Authentication'
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import HomePage from './components/HomePage'
import ProductList from './components/ProductList'
import FeaturedProductList from './components/FeaturedProducts'
import ProductListWithSpecificRating from './components/ProductsWithSpecificRating'
import ProductListWithSpecificPrice from './components/ProductsWithSpecificPrice'
import ProductForm from './components/AddProduct'
import EditProduct from './components/EditProduct'
import userAtom from './atoms/userAtom'
import { useRecoilValue } from 'recoil'

function App() {
  const user = useRecoilValue(userAtom);
  return (
    <BrowserRouter>
      <ChakraProvider>
        <Navbar />
        <Box p="8">
          <Routes>
            <Route path='/login' element={
              !user ? <Authentication type="login" />
                : <Navigate to="/" />
            } />
            <Route path='/signup' element={
              <Authentication type="signup" />
            } />
            <Route path='/' element={!user ? <HomePage /> : <Navigate to="/products" />}/>
            <Route path='/products' element={
              user ? <ProductList /> : <Navigate to="/login" />  
            } />
            <Route path='/products/featured' element={
              user ? <FeaturedProductList /> : <Navigate to="/login" />  
            } />
            <Route path='/products/specificRating' element={
              user ? <ProductListWithSpecificRating /> : <Navigate to="/login" />  
            } />
            <Route path='/products/specificPrice' element={
              user ? <ProductListWithSpecificPrice /> : <Navigate to="/login" />  
            } />
            <Route path='/products/add' element={
             user ? <ProductForm /> : <Navigate to="/login" /> 
            }/>
            <Route path='/products/:id' element={
              user ? <EditProduct /> : <Navigate to="/login" />
            } />
          </Routes>
        </Box>
      </ChakraProvider>
    </BrowserRouter>
  )
}

export default App
