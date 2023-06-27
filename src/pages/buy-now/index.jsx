import React, { memo } from "react";
import { useRouter } from "next/router";
import Image from "next/image";
import numeral from "numeral";
import jwt_decode from "jwt-decode";
import { Input, message } from "antd";

import styles from "../order/order.module.css";
import axios from "../../libraries/axiosClient";

function BuyNow() {
  const router = useRouter();
  const { orderDetails } = router.query;
  const [shippingAddress, setShippingAddress] = React.useState("");
  const [paymentType, setPaymentType] = React.useState("CASH");
  const [description, setDescription] = React.useState("");

  const [product, setProduct] = React.useState([]);

  React.useEffect(() => {
    if (orderDetails) {
      const parsedOrderDetails = JSON.parse(orderDetails);
      const productData = parsedOrderDetails[0];
      setProduct(productData);
    }
  }, [orderDetails]);

  const handleBuyNow = async () => {
    const token = localStorage.getItem("token");
    if (!token) {
      message.warning("Bạn chưa đăng nhập!", 1.5);
      router.push("/login");
      return;
    }
    const decoded = jwt_decode(token);
    const customerId = decoded._id;

    // Lấy dữ liệu từ query orderDetails
    const orderDetails = JSON.parse(router.query.orderDetails);
    const createDate = new Date();
    const shippedDate = new Date(createDate);
    shippedDate.setDate(createDate.getDate() + 3);

    const order = {
      createdDate: new Date(),
      shippedDate: shippedDate,
      paymentType: paymentType,
      shippingAddress: shippingAddress,
      status: "WAITING",
      description: description,
      customerId: customerId,
      employeeId: null,
      orderDetails: orderDetails,
    };

    try {
      const response = await axios.post("/orders", order);

      if (response) {
        message.success("Đặt hàng thành công!", 1.5);
        router.push("/checkout");
      }
    } catch (error) {
      message.error("Đặt hàng thất bại!", 1.5);
    }
  };

  return (
    <>
      <div className={styles.container}>
        <h1 className={styles.h1}>Thanh Toán</h1>
        <Input
          style={{ marginTop: "10px" }}
          placeholder="Nhập địa chỉ giao hàng"
          value={shippingAddress}
          onChange={(e) => setShippingAddress(e.target.value)}
        />
        <div className={styles.column_title}>
          <div className={styles.product_image}>Hình Ảnh</div>
          <div className={styles.product_details}>Sản Phẩm</div>
          <div className={styles.product_price}>Giá Tiền</div>
          <div className={styles.product_discount}>Giảm Giá</div>
          <div className={styles.product_quantity}>Số Lượng</div>
          <div className={styles.product_line_price}>Thành Tiền</div>
        </div>
        {product ? (
          <div class={styles.product} key={product.productId}>
            <div className={styles.product_image}>
              <Image alt="" src={product.img} width="50px" height="50px" />
            </div>
            <div className={styles.product_details}>
              <div className="product_title">{product.name}</div>
            </div>
            <div className={styles.product_price}>
              {numeral(product.price).format("0,0")}đ
            </div>
            <div className={styles.product_discount}>
              {numeral(product.discount).format("0,0")}%
            </div>
            <div class={styles.product_quantity}>
              <input
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

            <div class={styles.product_line_price}>
              {numeral(
                product.quantity *
                  (product.price - (product.price * product.discount * 1) / 100)
              ).format("0,0")}{" "}
              đ
            </div>
          </div>
        ) : (
          <span>Loading...</span>
        )}
        <Input
          style={{ marginTop: "10px" }}
          placeholder="Lời nhắn cho người bán"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <div className={styles.payment}>
          Quý khách vui lòng thanh toán khi nhận hàng
        </div>

        <button className={styles.checkout} onClick={() => handleBuyNow()}>
          Đặt hàng
        </button>
      </div>
    </>
  );
}
export default memo(BuyNow);
