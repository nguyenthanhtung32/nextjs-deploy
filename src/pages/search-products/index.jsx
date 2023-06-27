import React, { useState, memo } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import Image from "next/image";
import numeral from "numeral";
import { UnorderedListOutlined } from "@ant-design/icons";
import { Button, Card, Col, Input, message, Row } from "antd";

import axios from "../../libraries/axiosClient";
import styles from "./search-products.module.css";

const apiName = "/products";

const initialState = {
  productName: "",
  stockStart: "",
  stockEnd: "",
  priceStart: "",
  priceEnd: "",
  discountStart: "",
  discountEnd: "",
};

function AllProducts({ products: initialProducts }) {
  const router = useRouter();
  const nameCategory = router.query.nameCategory;

  const [filter, setFilter] = useState(initialState);
  const [products, setProducts] = useState(initialProducts);
  const [category, setCategory] = useState(nameCategory);

  const onChangeFilter = (e) => {
    setFilter((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const onSearch = () => {
    const checkInputData = (input, name) => {
      if ((input && isNaN(input)) || (input && input < 0)) {
        message.error(`Dữ liệu nhập vào ô ${name} không hợp lệ!`);
        return true;
      }

      return false;
    };

    // Kiểm tra dữ liệu nhập vào từng ô tìm kiếm
    const isInvalidData =
      checkInputData(filter.stockStart, "Tồn kho") ||
      checkInputData(filter.stockEnd, "Tồn kho") ||
      checkInputData(filter.priceStart, "Giá bán") ||
      checkInputData(filter.priceEnd, "Giá bán") ||
      checkInputData(filter.discountStart, "Giảm giá") ||
      checkInputData(filter.discountEnd, "Giảm giá");

    if (isInvalidData) return;

    // Lọc các trường có giá trị để tạo query params
    const filterFields = Object.keys(filter).filter(
      (key) => filter[key] !== undefined && filter[key] !== ""
    );

    // Tạo query params từ các trường đã lọc
    const a = filterFields.map((key) => {
      return [key, filter[key]];
    });

    // Thêm trường tên danh mục vào query params
    const searchParams = new URLSearchParams();
    a.forEach(([key, value]) => {
      if (key === "category") {
        searchParams.append(key, category);
      } else {
        searchParams.append(key, value);
      }
    });

    const queryString = searchParams.toString();

    // Gọi API với các query params đã tạo
    axios
      .get(`${apiName}?${queryString}`)
      .then((response) => {
        const { data } = response;
        setProducts(data.payload);
      })
      .catch((err) => {
        console.error(err);
      });
  };

  return (
    <div style={{ padding: 24, display: "flex" }}>
      <div className={styles.search_category}>
        <div
          style={{
            display: "flex",
            marginTop: "10px",
            justifyContent: "center",
            marginBottom: "10px",
          }}
        >
          <div className={styles.icon}>
            <UnorderedListOutlined />
          </div>
          <div className={styles.text}>Tìm kiếm</div>
        </div>
        <Input
          placeholder="Tìm kiếm sản phẩm"
          name="productName"
          onChange={onChangeFilter}
          value={filter.productName}
          allowClear
          className={styles.input_search}
        />
        <Input
          placeholder="Tồn kho thấp nhất"
          name="stockStart"
          value={filter.stockStart}
          onChange={onChangeFilter}
          allowClear
          className={styles.input_search}
        />
        <Input
          placeholder="Tồn kho cao nhất"
          name="stockEnd"
          value={filter.stockEnd}
          onChange={onChangeFilter}
          allowClear
          className={styles.input_search}
        />
        <Input
          placeholder="Giá thấp nhất"
          name="priceStart"
          value={filter.priceStart}
          onChange={onChangeFilter}
          allowClear
          className={styles.input_search}
        />
        <Input
          placeholder="Giá cao nhất"
          name="priceEnd"
          value={filter.priceEnd}
          onChange={onChangeFilter}
          allowClear
          className={styles.input_search}
        />
        <Input
          placeholder="Giảm giá thấp nhất"
          name="discountStart"
          value={filter.discountStart}
          onChange={onChangeFilter}
          allowClear
          className={styles.input_search}
        />
        <Input
          placeholder="Giảm giá cao nhất"
          name="discountEnd"
          value={filter.discountEnd}
          onChange={onChangeFilter}
          allowClear
          className={styles.input_search}
          style={{ borderBottom: "1px solid black" }}
        />
        <div className={styles.button}>
          <Button onClick={onSearch}>Tìm Kiếm</Button>
        </div>
      </div>
      <div className={styles.card}>
        <Row gutter={[4, 4]} style={{ display: "flex" }}>
          {products.map((item) => (
            <Col
              key={item._id}
              xs={24}
              sm={9}
              md={9}
              lg={4}
              style={{ marginBottom: "12px" }}
            >
              <Link href={`/products/${item._id}`}>
                <Card
                  key={item._id}
                  title={item.name}
                  bordered={false}
                  style={{
                    height: "100%",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "space-between",
                    // borderRadius: "8px",
                    borderRadius: "0px",
                    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
                    width: "100%",
                  }}
                  hoverable
                  cover={
                    <Image
                      alt=""
                      style={{ maxHeight: "250px", objectFit: "contain" }}
                      src={item.img}
                    />
                  }
                >
                  <div
                    style={{
                      flexGrow: 1,
                      display: "flex",
                      flexDirection: "column",
                      overflow: "hidden",
                    }}
                  >
                    <div
                      style={{
                        textOverflow: "ellipsis",
                        overflow: "hidden",
                        whiteSpace: "nowrap",
                        marginBottom: "16px",
                        fontSize: "18px",
                      }}
                    >
                      {item.description}
                    </div>
                    <div className={styles.price}>
                      <span
                        style={{
                          color: "#ff3300",
                          fontWeight: "bold",
                          fontSize: "15px",
                        }}
                      >
                        {numeral(
                          item.price - (item.price * item.discount * 1) / 100
                        ).format("0,0")}
                        ₫
                      </span>
                      {item.discount > 0 && (
                        <span
                          style={{
                            textDecoration: "line-through",
                            marginLeft: "4px",
                            fontSize: "11px",
                          }}
                        >
                          {numeral(item.price).format("0,0")}₫
                          <div className={styles.off_info}>
                            <div className={styles.giam}>
                              <h2 className={styles.sm_title}>
                                {item.discount}% Giảm
                              </h2>
                            </div>
                          </div>
                        </span>
                      )}
                    </div>
                  </div>
                </Card>
              </Link>
            </Col>
          ))}
        </Row>
      </div>
    </div>
  );
}

export default memo(AllProducts);

export async function getServerSideProps(context) {
  let products = context.query;

  try {
    const response = await axios.get(`${apiName}`);
    products = response.data.payload || null;
    return {
      props: {
        products,
      },
    };
  } catch (e) {
    return {
      notFound: true,
    };
  }
}
