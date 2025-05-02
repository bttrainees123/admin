import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { getProducts } from '../features/productSlice';
import { addTCart, removeTCart } from '../features/cartSlice';
import '../css/custom.css'
import '../css/media.css'
import Sideer from '../sider/Sideer';
import Header from '../Header/Header';

const Product = () => {
    const dispatch = useDispatch()
    const [showButton, setShowButton] = useState(true)
    const { data, isLoading, isError } = useSelector((state) => state.products)
    let checkView = false;
    let checkEditor = false;
    let checkAdd = false;
    let checkDelete = false

    const [viewEdit, setViewEdit] = useState(false)
    const [viewAdd, setViewAdd] = useState(false)

    const addToCart = (val) => {
        dispatch(addTCart(val))
        setShowButton(!showButton)
    }

    useEffect(() => {
        const user = JSON.parse(localStorage.getItem('user'))
        if (user) {
            handleRoles(user.access)
        }
    }, [])

    const handleRoles = (access) => {
        const accessRole = [...access]
        let len = accessRole.length

        for (let i = 0; i < len; i++) {
            if (accessRole[i] === 'View ' && checkView === false) {
                checkView = true
                console.log('heckView', checkView);
            }
            if (accessRole[i] === 'Edit ' && checkEditor === false) {
                checkEditor = true
                console.log('heckEditor', checkEditor);
            }
            if (accessRole[i] === 'Delete ' && checkDelete === false) {
                checkDelete = true
                console.log('heckDelete', checkDelete);
            }
            if (accessRole[i] === 'Add ' && checkAdd === false) {
                checkAdd = true
                console.log('heckAdd', checkAdd);
            }
        }
        handleAccessChange()
    }

    const handleAccessChange = () => {
        if(checkView && checkEditor){
            setViewEdit(true)
            return;
        }
        if(checkView){
            setViewAdd(true)
        }
    }
    const removeCart = (val) => {
        dispatch(removeTCart(val))
        setShowButton(!showButton)
    }
    useEffect(() => {
        dispatch(getProducts())
    }, [dispatch])
    return (
        <div className="main_container">
            <div className="limani_body">
                <Sideer />
                <div className="intersight_content">
                    <div className="body_content">
                        <Header />
                        <div className="contact-profile">
                            {(viewEdit || viewAdd) && 
                            <div className='row pCard'>
                                {data.length > 0 ? (data.map(product => {
                                    return (
                                        <div key={product.id} className="card col-md-4">
                                            <div className='project-card-heading mb-2'>
                                                <img src={product.image} alt="Denim Jeans" style={{ width: "170px", height: "200px", marginLeft: '15px', marginTop: '10px' }} />
                                            </div>
                                            <h6>{product.title.slice(0, 20)}</h6>
                                            <p className="price">${product.price}</p>
                                            <div className='project-card-heading'>
                                                <p>{product.description.slice(0, 40)}</p>
                                            </div>
                                            <button key={product.id} className='cart-btn' onClick={(e) => addToCart(product)}>Add To Cart</button>
                                            <button key={product.id} className='cart-btn' onClick={(e) => removeCart(product)}>Remove from Cart</button>
                                        </div>
                                    )
                                })) : isLoading ? <h5 style={{ textAlign: 'center' }}>Loading...</h5> : <h5 style={{ textAlign: 'center' }}>{'some thing wents wrong' || isError}</h5>}
                            </div>}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Product