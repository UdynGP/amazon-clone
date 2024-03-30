import React from "react";
import { useNavigate } from "react-router-dom";
import "./CartTotal.css";
import { NumericFormat } from "react-number-format";
import { useStateValue } from "../../context/StateProvider";
import { getCartTotal } from "../../Reducer";

function CartTotal() {
  // eslint-disable-next-line no-unused-vars
  const [{ cart }, dispatch] = useStateValue();
  const totalamount = getCartTotal(cart);
  const navigate = useNavigate();

  return (
    <div className="carttotal">
      <NumericFormat
        renderText={(value) => (
          <>
            <p>
              {/* Part of the homework */}
              Total ({cart?.length} item(s)) : <strong>{value}</strong>
            </p>
          </>
        )}
        decimalScale={2}
        value={totalamount}
        displayType="text"
        thousandsGroupStyle="lakh"
        thousandSeparator=","
        prefix={"$"}
      />
      <button onClick={(e) => navigate("/checkout")} disabled={!totalamount}>
        Proceed to Checkout
      </button>
    </div>
  );
}

export default CartTotal;
