import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getProductByID } from "../src/lib/productService";
import { PlusOutlined } from "@ant-design/icons";
import { Button, Form, Input, InputNumber, Upload } from "antd";
import { addProduct } from "../src/lib/productService";

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

const ProductEdit = () => {
  const [productDetail, setProductDetail] = useState([]);
  const [loading, setLoading] = useState(true);
  const [form] = Form.useForm();
  const { id } = useParams();
  const navigate = useNavigate();

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

    addProduct(
      formData.productName,
      formData.productPrice,
      formData.productImageName,
      formData.productImage
    );

    navigate("/");
  };

  useEffect(() => {
    console.log("useEffect in action");
    const getDetail = async () => {
      try {
        await getProductByID(id, productDetail, setProductDetail);

        setLoading(false);
      } catch (error) {
        console.log("eerror", error);
        setLoading(false);
      }
      //   setLoading(false);
    };
    getDetail();

    // setFileList(defaultFileList);
  }, []);

  return (
    <>
      {loading ? (
        <h1>Loading...</h1>
      ) : (
        <Form {...formItemLayout} onFinish={onFinish} form={form}>
          <Form.Item
            label="Product Name"
            name={"productName"}
            initialValue={productDetail[0].ProductName}
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
            initialValue={productDetail[0].ProductPrice}
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

          <Button htmlType="submit">Update Product</Button>
        </Form>
      )}
    </>
  );
};

export default ProductEdit;
