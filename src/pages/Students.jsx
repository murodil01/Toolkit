import React, { useState, useEffect } from "react";
import { Button, Form, Input, Card, Row, Col, message, Modal } from "antd";
import Sidebar from "../components/Sidebar";

const Students = () => {
  const [students, setStudents] = useState([]);
  const [editingStudent, setEditingStudent] = useState(null);
  const [form] = Form.useForm();

  useEffect(() => {
    const stored = localStorage.getItem("students");
    if (stored) {
      setStudents(JSON.parse(stored));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("students", JSON.stringify(students));
  }, [students]);

  const onFinish = (values) => {
    if (editingStudent) {
      const updated = students.map((s) =>
        s.id === editingStudent.id ? { ...s, ...values } : s
      );
      setStudents(updated);
      setEditingStudent(null);
      message.success("Talaba yangilandi");
    } else {
      const newStudent = {
        id: Date.now(),
        ...values,
      };
      setStudents([newStudent, ...students]);
      message.success("Talaba qo‘shildi");
    }

    form.resetFields();
  };

  const handleEdit = (student) => {
    setEditingStudent(student);
    form.setFieldsValue(student);
  };

  const handleDelete = (id) => {
    Modal.confirm({
      title: "Ishonchingiz komilmi?",
      content: "Bu talabani rostdan ham o‘chirmoqchimisiz?",
      okText: "Ha, o‘chir",
      cancelText: "Bekor qilish",
      onOk: () => {
        const filtered = students.filter((s) => s.id !== id);
        setStudents(filtered);
        message.success("Talaba o‘chirildi");
      },
    });
  };

  return (
    <div className="flex min-h-screen">
      <div className="hidden lg:block">
        <Sidebar />
      </div>

      <div className="flex-1 p-4 bg-gray-50">
        <h2 className="text-xl font-bold mb-4">Talabalar Ro'yxati</h2>

        <Card className="mb-6">
          <Form
            layout="vertical"
            form={form}
            onFinish={onFinish}
            autoComplete="off"
          >
            <Row gutter={16}>
              <Col xs={24} md={8}>
                <Form.Item
                  label="Ism"
                  name="firstName"
                  rules={[{ required: true, message: "Ism kiriting!" }]}
                >
                  <Input placeholder="Ismingiz" />
                </Form.Item>
              </Col>

              <Col xs={24} md={8}>
                <Form.Item
                  label="Familiya"
                  name="lastName"
                  rules={[{ required: true, message: "Familiya kiriting!" }]}
                >
                  <Input placeholder="Familiyangiz" />
                </Form.Item>
              </Col>

              <Col xs={24} md={8}>
                <Form.Item
                  label="Kurs"
                  name="course"
                  rules={[{ required: true, message: "Kurs nomini kiriting!" }]}
                >
                  <Input placeholder="Frontend, Backend..." />
                </Form.Item>
              </Col>
            </Row>

            <Form.Item>
              <Button type="primary" htmlType="submit" className="bg-[#0B1C49]">
                {editingStudent ? "Saqlash" : "Qo‘shish"}
              </Button>
              {editingStudent && (
                <Button
                  onClick={() => {
                    form.resetFields();
                    setEditingStudent(null);
                  }}
                  className="ml-2"
                >
                  Bekor qilish
                </Button>
              )}
            </Form.Item>
          </Form>
        </Card>

        {students.length === 0 ? (
          <p className="text-gray-500">Hozircha hech qanday talaba yo‘q.</p>
        ) : (
          <Row gutter={[16, 16]}>
            {students.map((student) => (
              <Col key={student.id} xs={24} sm={12} md={8}>
                <Card
                  title={`${student.firstName} ${student.lastName}`}
                  extra={
                    <div className="space-x-2">
                      <Button type="link" onClick={() => handleEdit(student)}>
                        Tahrirlash
                      </Button>
                      <Button type="link" danger onClick={() => handleDelete(student.id)}>
                        O‘chirish
                      </Button>
                    </div>
                  }
                >
                  <p>
                    <strong>Kurs:</strong> {student.course}
                  </p>
                </Card>
              </Col>
            ))}
          </Row>
        )}
      </div>
    </div>
  );
};

export default Students;
