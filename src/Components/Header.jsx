import React, { useEffect, useState } from 'react'
import { Badge } from 'react-bootstrap';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { searchProduct } from '../Redux/slice/productSlice';


function Header({insideHome}) {
  const dispatch=useDispatch()
  const[wishlistCount,setWishlistCount]=useState(0)
  const {wishlist}=useSelector((state)=>state.wishListReducer)
  const[cartCount,setCartCount]=useState(0)
  const cart=useSelector((state)=>state.cartReducer)



  useEffect(()=>{
    setWishlistCount(wishlist?.length)
    setCartCount(cart.length)
  },[wishlist,cart])



  return (
    <div>
      <Navbar expand="lg" className="bg-body-tertiary">
      <Container>
        <Navbar.Brand >
        <Link to={'/'} style={{color:"black",fontWeight:"bold",textDecoration:"none"}}>
        <i class="fa-solid fa-truck-fast fa-bounce"></i>E-Cart
         </Link>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto">

          {insideHome&&
            <Nav.Link>
               <input type="text" className='form-control' style={{width:"350px"}} placeholder='Search products' onChange={e=>dispatch(searchProduct(e.target.value.toLowerCase()))}/>
                </Nav.Link>
}

            <Nav.Link className='btn btn-outline-light'>
                <Link to={'/wishlist'} style={{color:"black",fontWeight:"bold",textDecoration:"none"}}>
                <i class="fa-solid fa-heart text-danger"></i>Wishlist
                <Badge bg="success rounded ms-2">{wishlistCount}</Badge>
                </Link> 
                </Nav.Link>


                <Nav.Link className='btn btn-outline-light ms-2'>
                <Link to={'/cart'} style={{color:"black",fontWeight:"bold",textDecoration:"none"}}>
                <i class="fa-solid fa-cart-shopping text-warning"></i>Cart
                <Badge bg="success rounded ms-2">{cartCount}</Badge>
                </Link> 
                </Nav.Link>
            
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
    </div>
  )
}

export default Header
