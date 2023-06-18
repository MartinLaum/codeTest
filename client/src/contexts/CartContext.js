import { useQuery } from "@apollo/client";
import { createContext, useEffect, useState } from "react";
import { GET_CART } from "../graphql/queries";

export const CartContext = createContext([]);

export const CartContextProvider = ({children})=>{
    const {data} = useQuery(GET_CART,{variables:{
        "cartid": parseInt(localStorage.getItem('cartId'))
    }})
    const [carts, setCart] = useState([]);

    useEffect(()=>{
        if(data?.getCart){
            setCart(data.getCart)
        }
    }, [data])

    const updateCart = (val)=>{
        let isExist = false;
        let newCart = carts.map(cart=>{
            if(cart.productSku === val.productSku){
                isExist = true;
                return val;
            }else {
                return cart;
            }
        })

        if(isExist){
            setCart(newCart);
        }else{
            setCart([...carts, val]);
        }
    }

    const deleteCartItem = ((cartId, productSku)=>{
        const updatedCartItems = carts.filter((cart) => !(cart.cartid === cartId && cart.productSku === productSku));
        setCart(updatedCartItems);
    })

    const value = {
        carts,
        setCart,
        updateCart,
        deleteCartItem
    }

    return <CartContext.Provider value={value}>{children}</CartContext.Provider>
}