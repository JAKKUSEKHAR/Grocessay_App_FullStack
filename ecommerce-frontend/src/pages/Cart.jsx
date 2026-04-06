import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { placeOrder } from "../api/orderApi";


function Cart({ products, increaseQty, decreaseQty , clearCart ,isLoggedIn}) {
  const navigate = useNavigate();
  
  useEffect(() => {
  console.log("CART products:", products);
}, [products]);       /////////


  // only items added to cart
  const cartItems = products.filter(p => p.qty > 0);
  
  let totalPrice = cartItems.reduce(
    (sum, p) => sum + p.qty * p.price,
    0
  );     
  let actualPrice = totalPrice;
  let discount=0;
     
  if(totalPrice>100 && totalPrice<=200)
  { 
    discount = actualPrice*10/100;
    totalPrice = actualPrice-actualPrice*10/100;
  }
    else if(totalPrice>200 && totalPrice <=300)
  {
    discount = actualPrice*20/100;
    totalPrice = actualPrice-actualPrice*20/100;
    console.log(totalPrice);
    console.log(discount);
  }
    else if(totalPrice>300)
  {
    discount = actualPrice*30/100;
    totalPrice = actualPrice-actualPrice*30/100;
  }

  
const handlePlaceOrder = async () => {

  if (!isLoggedIn) {
    alert("Please login before placing order");
    navigate("/login");
    return;
  }

  try {
    await placeOrder(cartItems);
    alert("Order placed successfully!");
    clearCart();
    navigate("/");
  } catch (err) {
    alert("Order failed.");
  }
};
  return (
    <div className="app-shell">
      <div className="cart-page">
        <h2>Your Cart</h2>

        {cartItems.length === 0 && (
          <p>Your cart is empty</p>
        )}

        {cartItems.map(item => (
          <div key={item.id} className="cart-item">
            <img
              src={`/images/${item.imageName}`}
              alt={item.name}
            />

            <div className="cart-info">
              <div className="cart-name">{item.name}</div>
              <div className="cart-price">₹{item.price}</div>
            </div>

            <div className="qty-controls">
              <button onClick={() => decreaseQty(item.id)}>−</button>
              <span>{item.qty}</span>
              <button onClick={() => increaseQty(item.id)}>+</button>
            </div>
          </div>
        ))}

        {cartItems.length > 0 && (
          <div className="cart-summary">
            <div> 
              <strong>Actaul Price : {actualPrice}</strong> 
              <br />
               <strong> Discount :{discount}</strong><br />
              <strong>Total: ₹{totalPrice}</strong>

            </div>
            <button
              className="place-order"
              onClick={handlePlaceOrder}
            >
              Place Order
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default Cart;
