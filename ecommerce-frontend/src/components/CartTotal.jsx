import { ShopContext } from "../context/ShopContext";
import { useContext } from "react";
import Title from "./Title";

const CartTotal = ({ directBuy }) => {
  const { currency, delivery_fee, getCartAmount } = useContext(ShopContext);

  // If directBuy is passed, use its price * quantity, else use full cart total
  const subtotal = directBuy
    ? directBuy.price * (directBuy.quantity || 1)
    : getCartAmount();

  const total = subtotal === 0 ? 0 : subtotal + delivery_fee;

  return (
    <div className="w-full border-t border-zinc-400">
      <div className="text-2xl">
        <Title text1={'Total'} text2={'Amount'} />
      </div>
      <div className="flex flex-col gap-2 mt-2 text-gray-700 text-sm">
        <div className="flex justify-between">
          <p>Subtotal</p>
          <p>{currency}{subtotal.toFixed(2)}</p>
        </div>
        <hr />
        <div className="flex justify-between">
          <p>Shipping fee</p>
          <p>{currency}{delivery_fee.toFixed(2)}</p>
        </div>
        <hr />
        <div className="flex justify-between">
          <b>Total</b>
          <b>{currency}{total.toFixed(2)}</b>
        </div>
      </div>
    </div>
  );
};

export default CartTotal;
