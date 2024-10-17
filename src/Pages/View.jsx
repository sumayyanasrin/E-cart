import React, { useEffect, useState } from 'react'
import { Button, Spinner } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { addToWishList } from '../Redux/slice/wishListSlice';
import { addToCart } from '../Redux/slice/cartSlice';
import Header from '../Components/Header';




function View() {

  const[product,setProduct]=useState({}) 
  const {loading}=useSelector((state)=>state.productReducer)
  const{id}=useParams()
  const {wishlist}=useSelector((state)=>state.wishListReducer)
  const dispatch=useDispatch()
  // console.log(id);
  const cart=useSelector((state)=>state.cartReducer)

  useEffect(()=>{
    const products= JSON.parse(localStorage.getItem("products"))
    setProduct(products?.find(product=>product?.id==id))

  },[])
  console.log(product);


  const handleWishlist=(product)=>{
    const existingProduct= wishlist.find(item=>item.id==product.id)
    if(existingProduct){
      alert("product already exist")
    }else{
      dispatch(addToWishList(product))
    }
  
  
  }

  const handleCart=(product)=>{
    const existingProduct= cart?.find(item=>item.id==product.id)
    if(existingProduct){
      dispatch(addToCart(product))
      alert("items added")
    }else{
      dispatch(addToCart(product))
      alert("item added successfully")
    }
  }
  
  
  

  return (
   <>
   <Header/>
    <div className="mt-5">
      {
        loading?<div className='mt-5 text-center fw-bolder'>
          <Spinner animation="border" variant="dark" />Loading...
        </div>:
        <div className='container row' style={{marginTop:"100px"}}>
        <div className="col-lg-4">
          <img style={{width:"100%",height:"400px"}} src={product?.thumbnail} alt="" />
        </div>
        <div className="col-lg-2"></div>
        <div className="col-lg-6">
          <p>pid:{product?.id}</p>
          <h1>{product?.title}</h1>
          <h5 className='fw-bolder'>Price: <span style={{color:"red"}}>${product?.price}</span></h5>
          <p>{product?.description}</p>
          <div className='d-flex justify-content-between mt-4'>
            <Button className='btn btn-outline-dark' onClick={()=>handleWishlist(product)}><i class="fa-solid fa-heart text-danger"></i>Wishlist</Button>
            <Button className='btn btn-outline-light' onClick={()=>handleCart(product)}><i class="fa-solid fa-cart-shopping text-warning"></i>Cart</Button>
            
  
          </div>
        </div>
        
      </div>
      }
    </div>
   </>
  )
}

export default View
