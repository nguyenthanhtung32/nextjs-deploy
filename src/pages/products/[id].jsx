import React, { memo } from "react";
import numeral from "numeral";
import { useRouter } from "next/router";
import jwt_decode from "jwt-decode";
import { message } from "antd";

import styles from "./products.module.css";
import axiosClient from "../../libraries/axiosClient";

function ProductDetail(props) {
  const router = useRouter();

  const { product } = props;

  const [quantity, setQuantity] = React.useState(1);
  const [isLoading, setIsLoading] = React.useState(false);

  const handleQuantityChange = (action) => {
    if (action === "increase") {
      if (quantity + 1 <= product.stock) {
        setQuantity(quantity + 1);
      }
    } else if (action === "decrease") {
      if (quantity - 1 >= 1) {
        setQuantity(quantity - 1);
      }
    }
  };

  const handleAddToCart = async () => {
    setIsLoading(true);
    const token = localStorage.getItem("token");
    if (!token) {
      message.warning("Bạn chưa đăng nhập!", 1.5);
      router.push("/login");
      return;
    }
    try {
      const decoded = jwt_decode(token);
      const customerId = decoded._id;

      await axiosClient.post(`/carts`, {
        customerId: customerId,
        productId: product._id,
        quantity: quantity,
      });
      setIsLoading(false);

      axiosClient.get(`/carts/${customerId}`);

      message.success("Thêm sản phẩm vào giỏ hàng thành công!", 1.5);
    } catch (error) {
      console.log("error", error);
      setIsLoading(false);
      message.warning("Thêm sản phẩm vào giỏ hàng thất bại!", 1.5);
    }
  };

  const handlePushBuyNow = async () => {
    setIsLoading(true);
    const token = localStorage.getItem("token");
    if (!token) {
      message.warning("Bạn chưa đăng nhập!", 1.5);
      router.push("/login");
      return;
    }

    const orderDetails = [
      {
        productId: product._id,
        quantity: quantity,
        price: product.price - (product.price * product.discount) / 100,
        discount: product.discount,
      },
    ];

    router.push({
      pathname: "/buy-now",
      query: {
        orderDetails: JSON.stringify(orderDetails),
      },
    });
  };

  return (
    <>
      {product ? (
        <div key={product._id} className={styles.product}>
          <img className={styles.product_images} alt="" src={product.img}></img>
          <div className={styles.product_details}>
            <h2 className={styles.h2}>{product.name}</h2>
            <h3 className={styles.h3}>
              Giá :
              <span
                style={{
                  color: "#ff3300",
                  fontWeight: "bold",
                  marginLeft: "5px",
                }}
              >
                {numeral(
                  product.price - (product.price * product.discount * 1) / 100
                ).format("0,0")}
                ₫
              </span>
              {product.discount > 0 && (
                <span
                  style={{
                    textDecoration: "line-through",
                    marginLeft: "8px",
                  }}
                >
                  {numeral(product.price).format("0,0")}₫
                </span>
              )}
            </h3>
            <h4 className={styles.h4}>
              Giảm giá : <span>{numeral(product.discount).format("0,0")}</span>{" "}
              %
            </h4>

            <div className={styles.about}>
              <p className={styles.p}>
                Tồn kho: <span>{product.stock}</span>
              </p>
              <p className={styles.p}>
                Mã sản phẩm: <span>{product._id}</span>
              </p>
              <p className={styles.p}>
                Nhà cung cấp: <span>{product.supplier.name}</span>
              </p>
            </div>
            <p className={styles.p}>{product.description}</p>
            <div className={styles.quantity}>
              <span>Số lượng:</span>
              <div className={styles.quantity_btn}>
                <div
                  className={`${styles.btn} ${styles.btn_outline}`}
                  onClick={() => handleQuantityChange("decrease")}
                >
                  -
                </div>
                <input
                  className={styles.quantity_input}
                  type="number"
                  min="1"
                  max={product.stock}
                  value={quantity}
                  onChange={(e) => setQuantity(parseInt(e.target.value))}
                />
                <div
                  className={`${styles.btn} ${styles.btn_outline}`}
                  onClick={() => handleQuantityChange("increase")}
                >
                  +
                </div>
              </div>
            </div>
            <div className={styles.cta}>
              <div
                className={`${styles.btn} ${styles.btn_primary}`}
                style={{ marginRight: "10px" }}
                onClick={handleAddToCart}
              >
                {isLoading ? "Loading..." : "add to cart"}
              </div>
              <div
                className={`${styles.btn} ${styles.btn_primary}`}
                onClick={handlePushBuyNow}
              >
                {isLoading ? "Loading..." : "Mua Ngay"}
              </div>
            </div>
          </div>
        </div>
      ) : (
        <span>Loading...</span>
      )}
    </>
  );
}

export default memo(ProductDetail);

export async function getStaticPaths() {
  return {
    paths: [],
    fallback: true,
  };
}

export async function getStaticProps(req) {
  try {
    const { params } = req;
    const response = await axiosClient.get(`/products/${params.id}`);

    return {
      props: {
        product: response.data.result,
      },
      revalidate: 10,
    };
  } catch (error) {
    console.log("err", error);
    return {
      notFound: true,
    };
  }
}
