import React, { memo } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import numeral from "numeral";
import { Card, Col, Row, Pagination } from "antd";

import axios from "../libraries/axiosClient";
import styles from "@/styles/Home.module.css";

const apiName = "/products";

function Home() {
  const [categories, setCategories] = React.useState([]);
  const [products, setProducts] = React.useState([]);

  const [refresh] = React.useState(0);
  const router = useRouter();

  const [currentPage, setCurrentPage] = React.useState(1);
  const pageSize = 6;
  const totalProduct = products.filter((item) => item.discount > 0).length;
  const totalPages = Math.ceil(totalProduct / pageSize);

  const onClickFilter = (_id) => {
    router.push({
      pathname: "/products",
      query: {
        _id: _id,
      },
    });
  };

  React.useEffect(() => {
    axios
      .get(apiName)
      .then((response) => {
        const { data } = response;
        setProducts(data.payload);
      })
      .catch((err) => {
        console.error(err);
      });
  }, [refresh]);

  React.useEffect(() => {
    axios
      .get("/categories")
      .then((response) => {
        const { data } = response;
        setCategories(data.payload);
      })
      .catch((err) => {
        console.error(err);
      });
  }, [refresh]);

  return (
    <>
      <div>
        <img
          style={{ height: "auto", width: "100%" }}
          src="https://lh3.googleusercontent.com/fife/APg5EOY7GY-2BTAXQYPnUJHugyDtF76AWu__t3GOkBgCPLKa5deG3xphC-4ugEDrDjT5SWNyPkCpR86pdKQGQlTL8uAyH4gCn23Utevrqf9Ecve-HDMxpTBo2ekbbSa7dc7qS5kc0IzDfJA92r1scAPal_1i66DMZBa4fR8x1jP0xa_Eatyaj9-3zDRrKvkTres974Nv3Z7QsRXPnVTOuMtmEOMIzvYLndE6achiv3rHEoWr49onWiXFtK7umMDinroX7imyPNn82GhMujscytC109LJ7eqEhmOvp9ansvCWinh6QDt1PoFoNLPDy_krHrmTIJmU6oo1lPmqir1NMzx4-mUC5QTTlKhVrO9Cvu8X1pAY6G0qaoFGtxfHq1uYtyhxiTSlc5D2EFld2UakbKXhhI3xFQxhO3i8Pp_Otr-eF_ajzfDRxEt_W5GqEFRp-UVN39UKgJh0Qt2IcZeALBaNFIiD0JVFQGyr03HBb5P4pqKmhk7Otnjt5RogCBcxRhM-o8Zomrqq_FhmfQMferTjYV6yBhQgW4PGkUCS1SJ5vE2kc1-b468yAMgbnEzvM60k6G0GL05E-N-pcnCGbzB2qcNzLtOIYU20VSG5eLyjIepj4Cy_RAOaN2qdmmtYJIqMr8KbHnpuBvbZ4V2MrnAbvbDYYKfrYClrWZ7xOY0J7j6Qf9jlkQxJ2V_sslAi1Mv2SdhIEfdIOrrwa8P_wEkKiRH4JvEsIeEPqzY-GfMzWttQxIEYt9AlBH9UqJyhuMleORv9kFaTm-GEhuce4p_WUSlmv3sErYDtSGt7xZG_GIsweOrlK4pPztBvtu8jFsl_I85ehU1sZsDgSeKbavIFDH3ITr08LG7lPFEqEUoTQiPGx8GPEMCMh-XQidZIYUiX7XYYVvuIXizThOnbWaGI2tN0a9KxMrYXJTcXeGKKGzRi8BEBOKwS4hgfPLTWpBM1B2EArGUjFdIe92NeTGeIlLm84NQ9LdCVJNws2t_F25rX4BrqLZm81hKFqaCVqoCdwyjNXZbT9KgM3vavifADQb3q00sLd42hu_LFPWTEw9rRABLPv8Q_tdX8NE-3KbhdQNAn_qpgJn191PBKPXGVVv462PUqIS4Bch1W62MovLjKLO1gy5_3AltWQPbdTR_E2dkbjXLnan68KVB3EZucN3LPnnIiRX-80DiTXWiDWHMDYTDXpMa34p_xqbcuG-I-96FuUVIfTjPDYcAMaiRlIRSAJiK-zNS6XieUl4z7-NRNmyP276yjjtR5UMJu05sH3-8EhxpknOAZuv2qaHaG3Kzz8xnXJ85Hf-9W9mCY4pfXUA1ozga8wngBgghj5foMBfoUoe-1aRlyWLtK3P4reftX8L9jjBVAL-xmhXiRP0HTBw341yzhcV7itQ8cbtgVATB46eXoGchZ2iteQbtSJ86HagYnigbaOlL_mvWbNoKmMyCGcnVuV_5mTwENg3yFgD2RtLPiIrYGctlMNEZxcdgeC_wk0SaQvfozCg2n7i1WJk_MA0JMaPaf5yij8UB0HZx_GyMws3tuRX_fLCowgPJVQeJFsRqVXPseYFcrBZtWPtC1ihweHWS1noXJV2l_7NOUANOm-BeDuGfsI1HfYWuS9-0rBF9s-a2IlwT1i0lEECNOjAuNMGKUl2Jl3RRungGciQ9SJIHP4gDMruBV8J362papqH99s0rI8oluhZKsWzN8Np2Ttfs-T9enPlHzixqdHJjZm8unB-S8uELxlRRl5nu5WUEWwJpNSpuc=w1868-h932"
        />
        <div
          style={{
            border: "1px solid #ccc",
            margin: "20px 50px 0px 50px",
            background: "white",
          }}
        >
          <h2 style={{ marginLeft: "10px" }}>Danh Mục</h2>
          <Row gutter={[16, 16]} style={{ display: "flex", flexWrap: "wrap" }}>
            {categories.map((item) => {
              return (
                <Col
                  key={item._id}
                  xs={12}
                  sm={9}
                  md={6}
                  lg={3}
                  style={{ marginBottom: "16px" }}
                >
                  <Card
                    onClick={() => {
                      onClickFilter(item._id);
                    }}
                    hoverable
                    style={{
                      height: 200,
                      display: "flex",
                      flexDirection: "column",
                      justifyContent: "center",
                      alignItems: "center",
                      transform: "scale(0.8)",
                      border: "1px solid #ccc",
                    }}
                    cover={
                      <img
                        alt=""
                        style={{
                          width: "100%",
                          height: "100px",
                          margin: "10px 0 10px 0",
                        }}
                        src={item.img}
                      />
                    }
                  >
                    <strong>{item.name}</strong>
                  </Card>
                </Col>
              );
            })}
          </Row>
        </div>

        <div
          style={{
            border: "1px solid #ccc",
            margin: "20px 50px 0px 50px",
            padding: "10px",
            background: "white",
          }}
        >
          <h2 style={{ marginLeft: "10px" }}>
            <img src="https://deo.shopeemobile.com/shopee/shopee-pcmall-live-sg/fb1088de81e42c4e538967ec12cb5caa.png"></img>
          </h2>
          <Row gutter={[16, 16]} style={{ display: "flex", flexWrap: "wrap" }}>
            {products
              .filter((item) => item.discount > 0)
              .slice((currentPage - 1) * pageSize, currentPage * pageSize)
              .map((item) => (
                <Col
                  key={item._id}
                  xs={12}
                  sm={9}
                  md={6}
                  lg={4}
                  style={{ marginBottom: "16px" }}
                >
                  <Link href={`/products/${item._id}`}>
                    <Card
                      style={{ height: "100%", border: "1px solid #ccc" }}
                      hoverable
                      cover={
                        <img
                          alt=""
                          style={{
                            width: "100%",
                            height: "100px",
                            margin: "10px 0 10px 0",
                            objectFit: "contain",
                          }}
                          src={item.img}
                        />
                      }
                    >
                      <div
                        style={{
                          textAlign: "center",
                          whiteSpace: "nowrap",
                          overflow: "hidden",
                          textOverflow: "ellipsis",
                        }}
                      >
                        <strong>{item.name}</strong>
                      </div>
                      <div
                        style={{
                          textAlign: "center",
                          whiteSpace: "nowrap",
                          overflow: "hidden",
                          textOverflow: "ellipsis",
                          marginTop: "10px",
                        }}
                      >
                        <span style={{ color: "#ff3300", fontWeight: "bold" }}>
                          {numeral(
                            item.price - (item.price * item.discount * 1) / 100
                          ).format("0,0")}
                          ₫
                        </span>
                        {item.discount > 0 && (
                          <span
                            style={{
                              textDecoration: "line-through",
                              marginLeft: "8px",
                            }}
                          >
                            {numeral(item.price).format("0,0")}₫
                          </span>
                        )}
                        <div className={styles.off_info}>
                          <div className={styles.giam}>
                            <h2 className={styles.sm_title}>
                              Giảm {item.discount}%
                            </h2>
                          </div>
                        </div>
                      </div>
                    </Card>
                  </Link>
                </Col>
              ))}
          </Row>
          {totalPages > 1 && (
            <Pagination
              style={{ marginTop: "16px", textAlign: "center" }}
              current={currentPage}
              pageSize={pageSize}
              total={totalProduct}
              onChange={(page) => setCurrentPage(page)}
            />
          )}
        </div>
      </div>

      <section className={styles.contact}>
        <div className={`${styles.contact} ${styles.container}`}>
          <div class="map">
            <iframe
              className={styles.iframe}
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d904.6861084836736!2d108.22204402373808!3d16.069331231775447!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x314219ca4f97c919%3A0x24a85e2091f793fc!2zVHJ1bmcgVMOibSDEkMOgbyBU4bqhbyBM4bqtcCBUcsOsbmggVmnDqm4gUXXhu5FjIFThur8gLSBTb2Z0ZWNoIEFwdGVjaCAtIMSQw6BvIFThuqFvIE3hu7kgVGh14bqtdCDEkGEgUGjGsMahbmcgVGnhu4duIFF14buRYyBU4bq_IC0gU29mdGVjaCBBcmVuYQ!5e0!3m2!1svi!2s!4v1685118183538!5m2!1svi!2s"
              width="100%"
              height="450"
            ></iframe>
          </div>
          <form action="https://formspree.io/f/xzbowpjq" method="POST">
            <div className={styles.form}>
              <div className={styles.form_txt}>
                <h2>Thông tin</h2>
                <h1>Liên hệ với chúng tôi</h1>
                <span>
                  Như bạn có thể mong đợi của một công ty, chúng tôi chú trọng
                  đến việc chăm sóc và quản lý chặt chẽ.
                </span>
                <h3>Nguyễn Thanh Tùng</h3>
                <p>
                  Đà Nẵng<br></br>+84 905875294
                </p>
                <h3>Phan Thị Hoàng Vinh</h3>
                <p>
                  Quảng Nam.<br></br>+84 906428501
                </p>
              </div>
              <div class={styles.form_details}>
                <input
                  type="text"
                  name="name"
                  id="name"
                  placeholder="Name"
                  required
                  style={{ marginRight: "15px" }}
                ></input>
                <input
                  type="email"
                  name="email"
                  id="email"
                  placeholder="Email"
                  required
                ></input>
                <textarea
                  name="message"
                  id="message"
                  cols="52"
                  rows="7"
                  placeholder="Message"
                  required
                ></textarea>
                <button>SEND MESSAGE</button>
              </div>
            </div>
          </form>
        </div>
      </section>
    </>
  );
}

export default memo(Home);