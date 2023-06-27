import React, { memo } from "react";
import jwt_decode from "jwt-decode";

import axios from "../../libraries/axiosClient";
import { Input, message } from "antd";
import styles from "./profile.module.css";

function Profile() {
  const [customer, setCustomer] = React.useState([]);
  const [firstName, setFirstName] = React.useState("");
  const [lastName, setLastName] = React.useState("");
  const [address, setAddress] = React.useState("");
  const [phoneNumber, setPhoneNumber] = React.useState("");
  const [birthday, setBirthday] = React.useState("");

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString();
  };

  React.useEffect(() => {
    const token = localStorage.getItem("token");
    const decoded = jwt_decode(token);
    const customerId = decoded._id;
    axios
      .get(`/customers/${customerId}`)
      .then((response) => {
        const { data } = response;
        setCustomer(data.result);
        setFirstName(data.result.firstName);
        setLastName(data.result.lastName);
        setAddress(data.result.address);
        setPhoneNumber(data.result.phoneNumber);
        setBirthday(data.result.birthday);
      })
      .catch((err) => {
        console.error(err);
      });
  }, []);

  const handleSave = () => {
    const token = localStorage.getItem("token");
    const decoded = jwt_decode(token);
    const customerId = decoded._id;

    axios
      .patch(`/customers/${customerId}`, {
        firstName,
        lastName,
        address,
        phoneNumber,
        birthday,
      })
      .then(() => {
        axios.get(`/customers/${customerId}`).then((response) => {
          const { data } = response;
          setCustomer(data.result);
          message.success("Cập nhật thông tin thành công!", 1.5);
        });
      })
      .catch((err) => {
        console.error(err);
      });
  };

  return (
    <>
      {customer ? (
        <div key={customer._id} className={styles.profile_container}>
          <h1 className={styles.profile_heading}>Thông tin cá nhân</h1>
          <div className={styles.flex}>
            <div className={styles.profile_field}>
              <p className={styles.profile_label}>Họ</p>
              <Input
                className={styles.profile_input}
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
              ></Input>
            </div>
            <div className={styles.profile_field}>
              <p className={styles.profile_label}>Tên</p>
              <Input
                className={styles.profile_input}
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
              ></Input>
            </div>
          </div>

          <div className={styles.profile_field}>
            <p className={styles.profile_label}>Email</p>
            <Input
              className={styles.profile_input}
              value={customer.email}
              disabled={true}
            ></Input>
          </div>
          <div className={styles.profile_field}>
            <p className={styles.profile_label}>Số điện thoại</p>
            <Input
              className={styles.profile_input}
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
            ></Input>
          </div>
          <div className={styles.profile_field}>
            <p className={styles.profile_label}>Ngày sinh</p>
            <Input
              className={styles.profile_input}
              value={formatDate(customer.birthday)}
              onChange={(e) => setBirthday(e.target.value)}
            ></Input>
          </div>
          <div className={styles.profile_field}>
            <p className={styles.profile_label}>Địa chỉ</p>
            <Input
              className={styles.profile_input}
              value={address}
              onChange={(e) => setAddress(e.target.value)}
            ></Input>
          </div>
          <div className={styles.flex}>
            <div className={styles.profile_field}>
              <p className={styles.profile_label}>Ngày tạo tài khoản</p>
              <Input
                className={styles.profile_input}
                value={formatDate(customer.createdAt)}
                disabled={true}
              ></Input>
            </div>
            <div className={styles.profile_field}>
              <p className={styles.profile_label}>
                Ngày sửa thông tin gần nhất
              </p>
              <Input
                className={styles.profile_input}
                value={formatDate(customer.updatedAt)}
                disabled={true}
              ></Input>
            </div>
          </div>
          <button className={styles.btn} onClick={handleSave}>
            Lưu
          </button>
        </div>
      ) : (
        <div>Loading...</div>
      )}
    </>
  );
}

export default memo(Profile);
