import React, { useState, memo } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { Menu } from "antd";
import {
  ShoppingCartOutlined,
  SearchOutlined,
  UserOutlined,
} from "@ant-design/icons";

import styles from "./header.module.css";

function Header() {
  const router = useRouter();
  const { SubMenu } = Menu;
  const [isLogin, setIsLogin] = useState(false);

  React.useEffect(() => {
    const token = localStorage.getItem("token");

    if (token) {
      setIsLogin(true);
    }
  }, [router]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    setIsLogin(false);

    router.push("/");
  };

  return (
    <header className={styles.header_container}>
      <div className={styles.left_nav_links}>
        <div>
          <Link href="/">
            <img
              className={styles.logo}
              src="https://www.milanoplatinum.com/wp-content/uploads/2015/11/THE-MALL_logo_MilanoPlatinum.png"
              alt="Logo"
            />
          </Link>
          <Link href="/" className={styles.home}>
            Trang chủ
          </Link>
          <Link href="/search-products" className={styles.home}>
            Sản phẩm
          </Link>
        </div>
      </div>

      <div className={styles.right_nav_links}>
        <div>
          <div className={styles.search}>
            <Link href="/search-products">
              <SearchOutlined />
            </Link>
          </div>

          {isLogin ? (
            <>
              <div setIsLogin={setIsLogin}>
                <div>
                  <Link href="/cart" className={styles.cart_container}>
                    <ShoppingCartOutlined />
                  </Link>
                </div>
                <Menu mode="horizontal">
                  <SubMenu
                    key="sub1"
                    title={<UserOutlined style={{ fontSize: 20 }} />}
                  >
                    <Menu.Item key="1">
                      <Link href="/profile">Trang cá nhân</Link>
                    </Menu.Item>
                    <Menu.Item key="2">
                      <Link href="/purchase-order">Lịch sử mua hàng</Link>
                    </Menu.Item>
                    <Menu.Item key="3" onClick={handleLogout}>
                      Đăng xuất
                    </Menu.Item>
                  </SubMenu>
                </Menu>
              </div>
            </>
          ) : (
            <>
              <div className={styles.authentication_links}>
                <Link href="/login" className={styles.link}>
                  Đăng nhập
                </Link>
                <div className={styles.line}>|</div>
                <Link href="/register" className={styles.link}>
                  Đăng ký
                </Link>
              </div>
            </>
          )}
        </div>
      </div>
    </header>
  );
}

export default memo(Header);
