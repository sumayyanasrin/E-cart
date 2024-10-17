import React, { useEffect } from 'react'
import { Col, Row, Spinner } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProductsData } from '../Redux/slice/productSlice';
import { addToWishList } from '../Redux/slice/wishListSlice';
import { addToCart } from '../Redux/slice/cartSlice';
import Header from '../Components/Header';


function Home() {
  const dispatch =useDispatch()
  const {loading,products,error}=useSelector((state)=>state.productReducer)
  const {wishlist}=useSelector((state)=>state.wishListReducer)
  const cart=useSelector((state)=>state.cartReducer)

  console.log(products);
  // console.log(loading);
  // console.log(error);
  


useEffect(()=>{
  dispatch(fetchProductsData())
},[])

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
    <Header insideHome={true}/>
      <div >
       { 
       loading?<div className='mt-5 text-center fw-bolder'>
        <Spinner animation="border" variant="dark" />Loading...
       </div>:<Row className='mt-3 container'>
            {
              products?.length>0?products.map((product,index)=>(
                <Col className="mt-5" sm={12} md={6} lg={4} xl={3}>
                <Card style={{ width: '18rem' }} key={index}>
          <Link to={`/view/${product?.id}`}>
          <Card.Img variant="top" style={{width:"100%",height:"250px"}} src={product?.thumbnail} />
          </Link>
          <Card.Body>
            <Card.Title className='text-danger'>{product?.title.slice(0,10)}</Card.Title>
            <Card.Text>
            {product?.description.slice(0,20)}
            </Card.Text>
    
    <div className="d-flex justify-content-between">
    <Button className="btn btn-light" onClick={()=>handleWishlist(product)}><i class="fa-solid fa-heart text-danger"></i></Button>
    <Button className="btn btn-light" onClick={()=>handleCart(product)}><i class="fa-solid fa-cart-shopping text-warning"></i></Button>
    </div>             
          </Card.Body>
        </Card>
                </Col>
              )):<div className='text-danger text-center mt-5'>Nothing to display</div>
           }
        </Row>        
}
      
    </div>
    </>
      
  
  )
}

export default Home
