import React, { memo } from "react";
import Link from "next/link";
import numeral from "numeral";
import { useRouter } from "next/router";
import jwt_decode from "jwt-decode";
import { Button, message, Result } from "antd";
import { DeleteOutlined } from "@ant-design/icons";

import styles from "./cart.module.css";
import axios from "../../libraries/axiosClient";

function Cart() {
  const router = useRouter();
  const [carts, setCarts] = React.useState([]);

  React.useEffect(() => {
    const fetchCart = async () => {
      try {
        const token = localStorage.getItem("token");
        const decoded = jwt_decode(token);
        const customerId = decoded._id;

        const response = await axios.get(`/carts/${customerId}`);

        const data = response.data;

        setCarts(data.payload.results);
      } catch (error) {
        console.log(error);
      }
    };
    fetchCart();
  }, [router]);

  // Handle quantity change
  const handleQuantityChange = async (id, size, quantity) => {
    try {
      const response = await axios.put(`/carts/${id}`, { size, quantity });
      const updatedCart = response.data;
      const newCarts = carts.map((cart) =>
        cart._id === updatedCart._id ? updatedCart : cart
      );
      setCarts(newCarts);
    } catch (error) {
      console.log(error);
    }
  };

  const handleRemoveCart = async (productId) => {
    if (
      window.confirm("Bạn có chắc chắn muốn xóa sản phẩm này khỏi giỏ hàng?")
    ) {
      try {
        const newCarts = [...carts];
        const cartIndex = newCarts.findIndex((cart) =>
          cart.products.some((product) => product.productId === productId)
        );
        const productIndex = newCarts[cartIndex].products.findIndex(
          (product) => product.productId === productId
        );

        newCarts[cartIndex].products.splice(productIndex, 1);

        setCarts(newCarts);
        const token = localStorage.getItem("token");
        const decoded = jwt_decode(token);
        const customerId = decoded._id;

        await axios.delete(`/carts/${customerId}/${productId}`);
        message.success("Xóa sản phẩm thành công!", 1.5);
      } catch (error) {
        console.log(error);
        message.success("Xóa sản phẩm thất bại!", 1.5);
      }
    }
  };

  const handlePushOrder = async () => {
    router.push({
      pathname: "/order",
    });
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.h1}>Giỏ Hàng</h1>
      <div className={styles.shopping_cart}>
        <div className={styles.column_title}>
          <div className={styles.product_image}>Hình Ảnh</div>
          <div className={styles.product_details}>Sản Phẩm</div>
          <div className={styles.product_price}>Giá Tiền</div>
          <div className={styles.product_discount}>Giảm Giá</div>
          <div className={styles.product_quantity}>Số Lượng</div>
          <div className={styles.product_removal}>Thao Tác</div>
          <div className={styles.product_line_price}>Thành Tiền</div>
        </div>
        <div>
          {carts.length > 0 &&
            carts.map((cart) => (
              <div key={cart._id}>
                {cart.products.length > 0 ? (
                  cart.products.map((product) => (
                    <div class={styles.product} key={product.productId}>
                      <div className={styles.product_image}>
                        <img
                          alt=""
                          src={product.product.img}
                          width="50px"
                          height="50px"
                        />
                      </div>
                      <div className={styles.product_details}>
                        <div className="product_title">
                          {product.product.name}
                        </div>
                      </div>
                      <div className={styles.product_price}>
                        {numeral(product.product.price).format("0,0")} đ
                      </div>
                      <div className={styles.product_discount}>
                        {numeral(product.product.discount).format("0,0")}%
                      </div>
                      <div class={styles.product_quantity}>
                        <input
                          style={{ width: "80%" }}
                          type="number"
                          value={product.quantity}
                          min="1"
                          onChange={(e) =>
                            handleQuantityChange(
                              product.product._id,
                              parseInt(e.target.value)
                            )
                          }
                        />
                      </div>
                      <div class={styles.product_removal}>
                        <Button
                          className={styles.remove_product}
                          danger
                          icon={<DeleteOutlined />}
                          onClick={() => handleRemoveCart(product.product._id)}
                        />
                      </div>
                      <div class={styles.product_line_price}>
                        {numeral(
                          product.quantity *
                            (product.product.price -
                              (product.product.price *
                                product.product.discount *
                                1) /
                                100)
                        ).format("0,0")}{" "}
                        đ
                      </div>
                    </div>
                  ))
                ) : (
                  <Result
                    title="Bạn chưa thêm sản phẩm vào giỏ hàng"
                    extra={
                      <Button
                        type="submit"
                        style={{
                          backgroundColor: "rgb(242, 82, 32)",
                          color: "#fff",
                          height: "30px",
                        }}
                        key="console"
                      >
                        <Link href="/products">Tiếp Tục Mua Sắm</Link>
                      </Button>
                    }
                  />
                )}
              </div>
            ))}
        </div>
        <div className={styles.totals}>
          {carts.length > 0 &&
            carts.map((cart) => {
              let totalPrice = 0; // khởi tạo biến totalPrice bằng 0
              return (
                <div key={cart._id}>
                  {cart.products.map((product) => {
                    // tính giá tiền của từng sản phẩm và cộng dồn vào biến totalPrice
                    totalPrice +=
                      product.quantity *
                      (product.product.price -
                        (product.product.price * product.product.discount * 1) /
                          100);
                  })}
                  <div className={styles.totals_item}>
                    <div className={styles.totals_title}>Tổng Tiền</div>
                    <div className={styles.totals_value}>
                      {numeral(totalPrice).format("0,0")} đ
                    </div>
                  </div>
                </div>
              );
            })}
          <button className={styles.checkout} onClick={() => handlePushOrder()}>
            Đặt hàng
          </button>
        </div>
      </div>
    </div>
  );
}

export default memo(Cart);
