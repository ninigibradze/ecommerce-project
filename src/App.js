import React, { useMemo } from 'react';
import { Outlet, Route, RouterProvider, ScrollRestoration, createBrowserRouter, createRoutesFromElements } from 'react-router-dom';
import Header from './components/header/Header';
import Footer from './components/Footer/Footer';
import Home from './pages/Home';
import Signin from './pages/Signin';
import ProductDetails from './pages/ProductDetails';
import Cart from './pages/Cart';
import { Registration } from './pages/Registration';
import CategorySearch from './pages/CategorySearch';
import About from './pages/about/About';
import './index.css';
import "slick-carousel/slick/slick.css";
import Checkout from './pages/checkout/Checkout';
import { ProtectedRoute } from './routes/ProtextedRoute';
import { useDispatch } from 'react-redux';
import jwtDecode from 'jwt-decode';
import { handleLogin } from './redux/userSlice';
import Account from './pages/Account';
import NotFound from './pages/NotFound';


const Layout = () => {
  return (
    <div>
      <Header />
      <ScrollRestoration />
      <Outlet />
      <Footer />
    </div>
  )
}

function App() {
  const dispatch = useDispatch();

  useMemo(() => {
		const token = localStorage.getItem("token");
		if (token) {
			try {
				const decoded = jwtDecode(token);
				if (decoded.exp * 1000 < Date.now()) {
					return false;
				}

				dispatch(handleLogin(decoded));
				return true;
			} catch (e) {
				return false;
			}
		}

		return false;
	}, []);
  
  const router = createBrowserRouter(createRoutesFromElements(
    <Route>
      <Route path='/ecommerce-project' element={<Layout />}>
        <Route index element={<Home />} ></Route>
        <Route path='/ecommerce-project/product/:id' element={<ProductDetails />}></Route>
        <Route path='/ecommerce-project/category/:id' element={<CategorySearch />}></Route>
        <Route path="/ecommerce-project/about" element={<About />}></Route>
        <Route path="/ecommerce-project/account" element={<Account />}></Route>
        <Route element={<ProtectedRoute />}>
          <Route path='/ecommerce-project/cart' element={<Cart />}></Route>
        </Route>
        <Route path='*' element={<NotFound />} />
      </Route>  
      <Route path='/ecommerce-project/signin' element={<Signin />}></Route>
      <Route path="/ecommerce-project/registration" element={<Registration />}></Route>
      <Route element={<ProtectedRoute />}>
        <Route path="/ecommerce-project/checkout" element={<Checkout />}></Route>     
      </Route>       
    </Route>    
  ))

  return (
    <div className='font-Rubik bg-gray-100'>
      <RouterProvider router={router}>

      </RouterProvider>
    </div>
  );
}

export default App;
