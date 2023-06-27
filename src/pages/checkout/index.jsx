import React, { memo } from "react";
import Link from "next/link";
import { CheckCircleOutlined } from "@ant-design/icons";

import styles from "./checkout.module.css";

function CheckOut() {
  return (
    <>
      <div className={styles.container}>
        <div>
          <CheckCircleOutlined className={styles.icon} /> Đặt hàng thành công!
        </div>
        <Link href="/">
          <button className={styles.btn}>Trang Chủ</button>
        </Link>
      </div>
    </>
  );
}
export default memo(CheckOut);
