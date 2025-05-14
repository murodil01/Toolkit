import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  addDebtor,
  toggleDebtorStatus,
  deleteDebtor,
} from "../redux/debtSlice";
import Sidebar from "../components/Sidebar";

import {
  Input,
  Button,
  Card,
  List,
  Typography,
  message,
  Tag,
  Space,
} from "antd";
import {
  CheckCircleOutlined,
  CloseCircleOutlined,
  DeleteOutlined,
} from "@ant-design/icons";

const { Title } = Typography;

const Tolovlar = () => {
  const [name, setName] = useState("");
  const [amount, setAmount] = useState("");
  const dispatch = useDispatch();
  const debtors = useSelector((state) => state.debt.debtors);
  const total = useSelector((state) => state.debt.total);

  const handleAddDebtor = () => {
    if (!name || !amount) {
      message.error("Iltimos, ism va miqdorni to‘ldiring.");
      return;
    }

    const newDebtor = { name, amount };
    dispatch(addDebtor(newDebtor));
    setName("");
    setAmount("");
    message.success("Qarzdor muvaffaqiyatli qo‘shildi!");
  };

  const handleToggleDebtorStatus = (id) => {
    dispatch(toggleDebtorStatus(id));
  };

  const handleDeleteDebtor = (id) => {
    dispatch(deleteDebtor(id));
    message.info("Qarzdor o‘chirildi.");
  };

  return (
    <div className="flex bg-[#f0f2f5] min-h-screen">
      <Sidebar/>
      <div className="p-6 w-full">
        <Title level={2}>Qarzdorlarni Boshqarish</Title>

        <div className="w-[1450px] p-8">
          <Card title="Qarzdor qo'shish" className="mb-6">
            <Space direction="vertical" style={{ width: "100%" }}>
              <Input
                className="mb-6"
                placeholder="Qarzdor ismi"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
              <Input
                className="mb-6"
                type="number"
                placeholder="Qarz miqdori (so'm)"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
              />
              <Button type="primary" onClick={handleAddDebtor}>
                Qo‘shish
              </Button>
            </Space>
          </Card>
        </div>

        <div className="w-[1450px] p-8">
          <Card
            title={`Jami qarz: ${total} so'm`}
            bordered={false}
            style={{ background: "#fff" }}
          >
            {debtors.length === 0 ? (
              <p>Hozircha hech qanday qarzdor mavjud emas.</p>
            ) : (
              <List
                itemLayout="horizontal"
                dataSource={debtors}
                renderItem={(debtor) => (
                  <List.Item
                    actions={[
                      <Button
                        type="link"
                        icon={
                          debtor.paid ? (
                            <CheckCircleOutlined />
                          ) : (
                            <CloseCircleOutlined />
                          )
                        }
                        onClick={() => handleToggleDebtorStatus(debtor.id)}
                      >
                        {debtor.paid ? "To'langan" : "To'lanmagan"}
                      </Button>,
                      <Button
                        danger
                        type="link"
                        icon={<DeleteOutlined />}
                        onClick={() => handleDeleteDebtor(debtor.id)}
                      >
                        O‘chirish
                      </Button>,
                    ]}
                  >
                    <List.Item.Meta
                      title={<strong>{debtor.name}</strong>}
                      description={
                        <div>
                          {debtor.amount} so'm{" "}
                          {debtor.paid ? (
                            <Tag color="green">To'langan</Tag>
                          ) : (
                            <Tag color="red">To'lanmagan</Tag>
                          )}
                        </div>
                      }
                    />
                  </List.Item>
                )}
              />
            )}
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Tolovlar;
