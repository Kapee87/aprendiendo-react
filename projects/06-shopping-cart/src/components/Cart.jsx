import { useId } from "react"
import { CartIcon, ClearCartIcon, RemoveFromCartIcon } from "./Icons"
import './Cart.css'
import { useCart } from "../hooks/useCart"

export function Cart() {
    const cartCheckBoxId = useId()
    const { cart, clearCart, addToCart } = useCart()

    function CartItem({ thumbnail, price, title, quantity, addToCart }) {
        return (
            <li>
                <img
                    src={thumbnail}
                    alt={title}
                />
                <div>
                    <strong>{title}</strong> - ${price}
                </div>

                <footer>
                    <small >
                        Qty : {quantity}
                    </small>
                    <button onClick={addToCart}>+</button>
                </footer>
            </li>
        )
    }

    return (
        <>
            <label htmlFor={cartCheckBoxId} className="cart-button">
                <CartIcon />
            </label>
            <input id={cartCheckBoxId} type="checkbox" hidden />

            <aside className="cart">
                <ul>
                    {cart.map(product => (
                        <CartItem
                            key={product.id}
                            addToCart={() => addToCart(product)}
                            {...product}
                        />
                    ))}
                </ul>
                <button onClick={clearCart}>
                    <ClearCartIcon />
                </button>
            </aside>
        </>
    )
}