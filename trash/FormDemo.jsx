import { PlusOutlined } from "@ant-design/icons";
import { Button, Form, Input, InputNumber, Upload } from "antd";
import { addProduct } from "../src/lib/productService";
import { useState } from "react";

const normFile = (e) => {
  if (Array.isArray(e)) {
    return e;
  }
  return e?.fileList;
};
const formItemLayout = {
  labelCol: {
    span: 4,
  },
  wrapperCol: {
    span: 14,
  },
  layout: "horizontal",
  style: {
    maxWidth: 600,
  },
};

export const FormDemo = () => {
  const [form] = Form.useForm();
  const [products, setProducts] = useState([]);

  const onFinish = (values) => {
    console.log("Received values of form: ", values);
    const file = values.productImage[0].originFileObj;
    console.log("imageFile", file);

    const formData = {
      productName: values.productName,
      productPrice: values.productPrice,
      productImage: file,
      productImageName: file.name,
    };

    console.log(formData);

    form.resetFields();

    addProduct(
      formData.productName,
      formData.productPrice,
      formData.productImageName,
      formData.productImage
    );
  };

  return (
    <>
      <Form {...formItemLayout} onFinish={onFinish} form={form}>
        <Form.Item
          label="Product Name"
          name={"productName"}
          rules={[
            {
              required: true,
              message: "Please add product name!",
            },
          ]}
        >
          <Input
            style={{
              marginLeft: "5px",
            }}
          />
        </Form.Item>
        <Form.Item
          label="Product Price"
          name={"productPrice"}
          rules={[
            {
              required: true,
              message: "Please add product price!",
            },
          ]}
        >
          <InputNumber
            min={1}
            max={1000000}
            style={{
              marginLeft: "5px",
            }}
          />
        </Form.Item>

        <Form.Item
          label="Upload Image"
          name={"productImage"}
          valuePropName="fileList"
          getValueFromEvent={normFile}
          rules={[
            {
              required: true,
              message: "Please add product Imgage!",
            },
          ]}
        >
          <Upload
            action=""
            listType="picture-card"
            beforeUpload={() => false}
            accept="image/*"
          >
            <button
              style={{
                border: 0,
                background: "none",
              }}
              type="button"
            >
              <PlusOutlined />
              <div
                style={{
                  marginTop: 8,
                }}
              >
                Upload
              </div>
            </button>
          </Upload>
        </Form.Item>

        <Button htmlType="submit">Add Product</Button>
      </Form>
    </>
  );
};
