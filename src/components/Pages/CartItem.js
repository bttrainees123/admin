import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getCartItem } from '../features/cartSlice'


const CartItem = () => {
    const items = useSelector((state) => state.cart.localStorageItems)


    return (
        <div>
            {items.map((it) => {
                console.log("Cart Items", it.title);
                <p>{it.title}</p>
            })}
        </div>

        // <>
        // <div>
        //     {items[1].price}

        //    {items.forEach((it) => {
        //         <div className="card-body">
        //             {console.log("Items", it.title)}
        //             <img src={it.image} alt='' />
        //             <p>{it.category}</p>
        //             <p>{it.description}</p>
        //             <p>{it.price}</p>
        //             <p>{it.title}</p>
        //         </div>
        //     }) }
        //     </div>
            
        // </>
    )
}

export default CartItem