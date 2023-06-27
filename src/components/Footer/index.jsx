import React, { memo } from "react";
import Link from "next/link";
import { Col, Container, Nav, Row } from "react-bootstrap";
import { CiFacebook, CiInstagram, CiTwitter, CiYoutube } from "react-icons/ci";
import { AiOutlineCreditCard } from "react-icons/ai";
import { RiVisaLine } from "react-icons/ri";
import { TbTruckDelivery } from "react-icons/tb";
import { MdOutlineDeliveryDining } from "react-icons/md";

const style = { textDecoration: "none", marginTop: "10px" };

function Footer() {
  return (
    <footer
      className="border-top mt-3"
      style={{ lineHeight: "20px", backgroundColor: "#262626", color: "white" }}
    >
      <Container className="mt-3 mb-3">
        <Row>
          <Col>
            <h5>Thông tin chúng tôi</h5>
            <strong>The Mall</strong>
            <p>38 Yên Bái - Đà Nẵng</p>
            <p>
              <span>Call:</span>
              <span>+09770123777</span>
            </p>
            <p>
              <span>Email:</span>
              <span>themall@gmail.com</span>
            </p>
          </Col>
          <Col>
            <h5>Giúp đỡ</h5>
            <Nav className="flex-column">
              <Link style={style} href={"#"}>
                FAQ
              </Link>
              <Link style={style} href={"#"}>
                Vận chuyển
              </Link>
              <Link style={style} href={"#"}>
                Tình trạng đặt hàng
              </Link>
              <Link style={style} href={"#"}>
                24/7 Hổ trợ
              </Link>
            </Nav>
          </Col>
          <Col>
            <h5>Thanh toán và vận chuyển</h5>
            <span>Thanh toán</span>
            <p style={{ fontSize: "2em" }}>
              <AiOutlineCreditCard />
              <RiVisaLine />
            </p>
            <span>Vận chuyển</span>
            <p style={{ fontSize: "2em", color: "white" }}>
              <TbTruckDelivery />
              <MdOutlineDeliveryDining />
            </p>
          </Col>
          <Col>
            <h5>Kết nối với chúng tôi</h5>
            <p style={{ fontSize: "2em" }}>
              <Link
                className="me-3"
                href="https://www.facebook.com/profile.php?id=100044424131873"
              >
                <CiFacebook />
              </Link>
              <Link className="me-3" href={"#"}>
                <CiTwitter />
              </Link>
              <Link className="me-3" href={"#"}>
                <CiInstagram />
              </Link>
              <Link className="me-3" href={"#"}>
                <CiYoutube />
              </Link>
            </p>
          </Col>
        </Row>
      </Container>
      
      <div className="text-center p-4" style={{ backgroundColor: "#333333" }}>
        <span style={{ color: "white" }}>© 2023 Aptech :</span>
        <strong style={{ color: "#bab6b6" }}>@HoangVinh-ThanhTung</strong>
      </div>
    </footer>
  );
}
export default memo(Footer);
