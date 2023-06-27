import React, { useState, memo } from "react";
import Link from "next/link";
import {
  SlSocialFacebook,
  SlSocialGoogle,
  SlSocialTwitter,
} from "react-icons/sl";
import { message } from "antd";

import axios from "../../libraries/axiosClient";
import styles from "./Login.module.css";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    const token = {
      email,
      password,
    };

    try {
      const response = await axios.post("/customers/login", token);

      localStorage.setItem("token", response.data.token);
      axios.defaults.headers.Authorization = `Bearer ${response.data.token}`;
      message.success("Đăng nhập thành công!", 1.5);
      window.location.href = "/";
    } catch (error) {
      message.warning("Đăng nhập thât bại!", 1.5);
    }
  };

  return (
    <div className={styles.container}>
      <form className={styles.form_1}>
        <h3 className={styles.login}>Đăng nhập</h3>
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
        <span className={styles.span}>Quên mật khẩu?</span>
        <button className={styles.button} onClick={(e) => handleSubmit(e)}>
          Đăng nhập
        </button>
        <div className="d-flex justify-content-center ">
          <p className={styles.text}>Bạn chưa có tài khoản ?</p>
          <Link href="/register" className={styles.text2}>
            Đăng kí
          </Link>
        </div>
      </form>
    </div>
  );
}

export default memo(Login);
