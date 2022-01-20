import React, { useState, useEffect } from "react";
import { Table, Button, Modal, Form } from "react-bootstrap";
import api from "../api/api";
import "bootstrap/dist/css/bootstrap.min.css";
import "./InventoryPage.css";
import { CSVLink } from "react-csv";

function InventoryPage() {
  const initialValueState = {
    name: "",
    description: "",
    amount: "",
  };

  const [data, setData] = useState({});
  const [loading, setLoading] = useState(true);
  const [values, setValues] = useState(initialValueState);
  const [currentItem, setCurrentItem] = useState({});
  const [show, setShow] = useState(false);
  const [showEdit, setShowEdit] = useState(false);

  const handleClose = () => {
    setShow(false);
    setValues(initialValueState);
  };

  const handleEditClose = () => {
    setShowEdit(false);
    currentItem({});
  };

  const handleShow = () => setShow(true);

  useEffect(() => {
    fetchData();
  }, []);

  async function handleDeleteItem(id) {
    await api.deleteInventoryItem(id);
    fetchData();
  }

  async function fetchData() {
    try {
      const { data: response } = await api.getAllInventory();
      setData(response);
    } catch (error) {
      console.error(error);
    }
    setLoading(false);
  }

  async function handleAddNewItem() {
    if (values.name && values.description && values.amount) {
      const params = new URLSearchParams();
      params.append("name", values.name);
      params.append("description", values.description);
      params.append("amount", values.amount);
      await api.postNewInventoryItem(params);
      setValues(initialValueState);
      setShow(false);
      fetchData();
    }
  }

  const handleNameChange = (event) => {
    setValues({ ...values, name: event.target.value });
  };

  const handleEditNameChange = (event) => {
    setCurrentItem({ ...currentItem, name: event.target.value });
  };

  const handleDescriptionChange = (event) => {
    setValues({ ...values, description: event.target.value });
  };

  const handleEditDescriptionChange = (event) => {
    setCurrentItem({ ...currentItem, description: event.target.value });
  };

  const handleAmountChange = (event) => {
    setValues({ ...values, amount: event.target.value });
  };

  const handleEditAmountChange = (event) => {
    setCurrentItem({ ...currentItem, amount: event.target.value });
  };

  function editButtonClicked(item) {
    setCurrentItem(item);
    setShowEdit(true);
  }

  async function handleEditItem() {
    if (currentItem.name && currentItem.description && currentItem.amount) {
      const params = new URLSearchParams();
      params.append("contact_id", currentItem._id);
      params.append("name", currentItem.name);
      params.append("description", currentItem.description);
      params.append("amount", currentItem.amount);
      await api.postUpdateInventoryItem(currentItem._id, params);
      setCurrentItem({});
      fetchData();
      setShowEdit(false);
    }
  }

  return (
    <div>
      {!loading && (
        <div>
          <h1 className="main-header">Inventory Management System</h1>
          <Table bordered variant="dark">
            <thead>
              <tr>
                <th>ID</th>
                <th>Name</th>
                <th>Description</th>
                <th>Amount</th>
                <th>Date Added</th>
                <th>Date Updated</th>
                <th>Edit</th>
                <th>Delete</th>
              </tr>
            </thead>
            <tbody>
              {data.data.map((item) => (
                <tr>
                  <td>{item._id}</td>
                  <td>{item.name}</td>
                  <td>{item.description}</td>
                  <td>{item.amount}</td>
                  <td>{item.create_date}</td>
                  <td>{item.update_date}</td>
                  <td>
                    <div className="d-grid gap-2">
                      <Button variant="outline-primary" onClick={() => editButtonClicked(item)}>
                        Edit
                      </Button>
                    </div>
                  </td>
                  <td>
                    <div className="d-grid gap-2">
                      <Button variant="outline-danger" onClick={() => handleDeleteItem(item._id)}>
                        Delete
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </div>
      )}
      <div className="bottom-buttons">
        <Button variant="success" size="lg" onClick={handleShow}>
          Add New Item
        </Button>
      </div>
      <div className="bottom-buttons">
        {!loading && (
          <CSVLink className="csv-button" filename={"inventory-export.csv"} data={data.data}>
            Export to CSV
          </CSVLink>
        )}
      </div>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Add New Inventory Item</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3" controlId="formName">
              <Form.Label>Item Name</Form.Label>
              <Form.Control onChange={(e) => handleNameChange(e)} type="name" placeholder="Enter Item Name" />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formDescription">
              <Form.Label>Item Description</Form.Label>
              <Form.Control
                onChange={(e) => handleDescriptionChange(e)}
                type="name"
                placeholder="Enter Item Description"
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formName">
              <Form.Label>Item Amount</Form.Label>
              <Form.Control
                onChange={(e) => handleAmountChange(e)}
                type="name"
                placeholder="Enter Quantity of Item"
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={handleAddNewItem}>
            Submit
          </Button>
        </Modal.Footer>
      </Modal>

      <Modal show={showEdit} onHide={handleEditClose}>
        <Modal.Header closeButton>
          <Modal.Title>Edit Inventory Item</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <fieldset disabled>
              <Form.Group className="mb-3" controlId="formName">
                <Form.Label>Item ID</Form.Label>
                <Form.Control value={currentItem._id} />
              </Form.Group>
            </fieldset>

            <Form.Group className="mb-3" controlId="formName">
              <Form.Label>Item Name</Form.Label>
              <Form.Control
                value={currentItem.name}
                onChange={(e) => handleEditNameChange(e)}
                type="name"
                placeholder="Enter Item Name"
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formDescription">
              <Form.Label>Item Description</Form.Label>
              <Form.Control
                onChange={(e) => handleEditDescriptionChange(e)}
                type="name"
                placeholder="Enter Item Description"
                value={currentItem.description}
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formName">
              <Form.Label>Item Amount</Form.Label>
              <Form.Control
                onChange={(e) => handleEditAmountChange(e)}
                type="name"
                placeholder="Enter Quantity of Item"
                value={currentItem.amount}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={handleEditItem}>
            Submit
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default InventoryPage;
