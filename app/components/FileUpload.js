"use client";

import axios from "axios";

const FileUpload = () => {
  const formData = new FormData();
  const fileUplodHandler = async (e) => {
    formData.append("file", e.target.files[0]);
    try {
      const res = await axios.post(
        `${process.env.BACKEND_URL}/files/upload`,
        formData,
      );
      const data = await res.json();
      consol.log(data);
    } catch (error) {
      consol.log(error);
    }
  };
  return (
    <form enctype="multipart/form-data">
      <input type="file" name="file" onChange={fileUplodHandler} />
    </form>
  );
};

export default FileUpload;
