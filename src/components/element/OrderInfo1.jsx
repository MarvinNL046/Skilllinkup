"use client";
import shopStore from "@/store/shopStore";

export default function OrderInfo1() {
  const products = shopStore((state) => state.products);

  let total = 0;
  products.forEach((item) => {
    const price = item.qty * item.price;
    total = total + price;
  });

  return (
    <>
      <div className="order_sidebar_widget mb-8 default-box-shadow1">
        <h4 className="title">Your Order</h4>
        <ul className="p-0 mb-0">
          <li className="bdrb1 mb-5">
            <h6>
              Product
              <span className="float-end">Subtotal</span>
            </h6>
          </li>
          {products?.map((item,i) => (
            <li key={ i } className="mb-5">
              <p className="body-color">
                {item.title.substring(0, 10) + "..."} x {item.qty}
                <span className="float-end">${item.qty * item.price}</span>
              </p>
            </li>
          ))}
          <li className=" bdrb1 mb-4">
            <h6>
              Subtotal
              <span className="float-end">${total.toFixed(2)}</span>
            </h6>
          </li>
          <li className=" bdrb1 mb-4">
            <h6>
              Shipping
              <span className="float-end">
                {products?.length !== 0 ? "$100" : "$0.00"}
              </span>
            </h6>
          </li>
          <li>
            <h6>
              Total
              <span className="float-end">
                $
                {products?.length !== 0
                  ? (Number(total) + 100).toFixed(2)
                  : "$0.00"}
              </span>
            </h6>
          </li>
        </ul>
      </div>
    </>
  );
}
