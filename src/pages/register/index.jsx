import React, { useState, memo } from "react";
import { message } from "antd";

import axios from "../../libraries/axiosClient";
import styles from "./index.module.css";

function SignUp() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [address, setAddress] = useState("");
  const [birthday, setBrithday] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    const payload = {
      firstName,
      lastName,
      phoneNumber,
      address,
      email,
      password,
      birthday,
    };

    try {
      axios.post("/customers", payload);
      message.success("Đăng kí thành công!", 1.5);
      window.location.href = "/login";
    } catch (error) {
      console.error(error);
      message.warning("Đăng kí thât bại!", 1.5);
    }
  };

  return (
    <div className={styles.container}>
      <form className={styles.form_1}>
        <h3 className={styles.login}>Đăng kí</h3>
        <label htmlFor="name" className={styles.label}>
          Họ
        </label>
        <input
          type="firstName"
          name="firstName"
          id="firstName"
          required
          className={styles.input}
          onChange={(e) => setFirstName(e.target.value)}
        />
        <label htmlFor="name" className={styles.label}>
          Tên
        </label>
        <input
          type="lastName"
          name="lastName"
          id="lastName"
          required
          className={styles.input}
          onChange={(e) => setLastName(e.target.value)}
        />
        <label htmlFor="email" className={styles.label}>
          Email
        </label>
        <input
          type="email"
          name="email"
          id="email"
          required
          className={styles.input}
          onChange={(e) => setEmail(e.target.value)}
        />
        <label htmlFor="password" className={styles.label}>
          Mật khẩu
        </label>
        <input
          type="password"
          name="password"
          id="password"
          required
          className={styles.input}
          onChange={(e) => setPassword(e.target.value)}
        />
        <label htmlFor="address" className={styles.label}>
          Địa chỉ
        </label>
        <input
          type="address"
          name="address"
          id="address"
          required
          className={styles.input}
          onChange={(e) => setAddress(e.target.value)}
        />
        <label htmlFor="phoneNumber" className={styles.label}>
          Số điện thoại
        </label>
        <input
          type="phoneNumber"
          name="phoneNumber"
          id="phoneNumber"
          required
          className={styles.input}
          onChange={(e) => setPhoneNumber(e.target.value)}
        />
        <label htmlFor="birthday" className={styles.label}>
          Ngày sinh
        </label>
        <input
          type="birthday"
          name="birthday"
          id="birthday"
          required
          className={styles.input}
          onChange={(e) => setBrithday(e.target.value)}
        />
        <button className={styles.button} onClick={(e) => handleSubmit(e)}>
          Đăng kí
        </button>
      </form>
    </div>
  );
}

export default memo(SignUp);
