import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Modal, Button, Form } from 'react-bootstrap';





const DataTable = ({ data }) => {
  const [categoryDetail, setCategoryDetail] = useState({ id: '', category: '', is_active: true });
  const [productDetail, setProductDetail] = useState({ id: '', product: '', product_image: '', original_price: '', selling_price: '', description: '', is_active: true });
  const [showCategoryModal, setShowCategoryModal] = useState(false);
  const [showProductModal, setShowProductModal] = useState(false);
  const [fileChange, setFileChange] = useState(false);

  // useEffect(()=> {
  //   console.log(productDetail)
  // }, [productDetail])


  const handleActiveClick = () => {
    setProductDetail((prevDetail) => ({
      ...prevDetail,
      is_active: true
    }));
  };

  const handleInactiveClick = () => {
    setProductDetail((prevDetail) => ({
      ...prevDetail,
      is_active: false
    }));
  };

  const handleActiveClickCat = () => {
    setCategoryDetail((prevDetail) => ({
      ...prevDetail,
      is_active: true
    }));
  };

  const handleInactiveClickCat = () => {
    setCategoryDetail((prevDetail) => ({
      ...prevDetail,
      is_active: false
    }));
  };



  const handleCategoryEdit = (category) => {
    setCategoryDetail({ id: category.id, category: category.category, is_active: category.is_active || false });
    setShowCategoryModal(true);
};

const handleProductEdit = (product) => {
  setProductDetail({
      id: product.id,
      product: product.title,
      product_image: product.product_image,
      original_price: product.original_price,
      selling_price: product.selling_price,
      description: product.description,
      is_active: product.is_active || false
  });
  setShowProductModal(true);
};

const handleCategorySave = () => {
  axios.put(`https://ba5c-117-213-103-13.ngrok-free.app/feed/category/${categoryDetail.id}/`, categoryDetail)
      .then(response => {
          console.log('Category updated successfully:', response.data);
          setShowCategoryModal(false);
      })
      .catch(error => {
          console.error('There was an error updating the category!', error);
      });
};

const handleProductSave = () => {
  const formData = new FormData();
  formData.append('product', productDetail.product);
  fileChange && formData.append('product_image', productDetail.product_image);
  formData.append('original_price', productDetail.original_price);
  formData.append('selling_price', productDetail.selling_price);
  formData.append('description', productDetail.description);
  formData.append('is_active', productDetail.is_active);

  axios.put(`https://ba5c-117-213-103-13.ngrok-free.app/feed/products/${productDetail.id}/`, formData, {
      headers: {
          'Content-Type': 'multipart/form-data',
      },
  })
      .then(response => {
          console.log('Product updated successfully:', response.data);
          setShowProductModal(false);
      })
      .catch(error => {
          console.error('There was an error updating the product!', error);
      });
};

const handleFileChange = (e) => {
  setFileChange(true);
  setProductDetail({ ...productDetail, product_image: e.target.files[0] });
};


  return (
      <div>
          <table className="table table-bordered">
              <thead className="thead-dark">
                  <tr>
                      <th>Title</th>
                      <th>Product Image</th>
                      <th>Original Price</th>
                      <th>Selling Price</th>
                      <th>Description</th>
                      <th></th>
                  </tr>
              </thead>
              <tbody>
                  {Array.isArray(data) && data.map(category => (
                      <React.Fragment key={category.id}>
                          <tr>
                              <td colSpan="5" className="font-weight-bold bg-secondary text-light font-weight-bold text-center"><h4>{category.category}</h4></td>
                              <td className='bg-secondary'><button className="btn btn-primary btn-sm" onClick={() => handleCategoryEdit(category)}>Edit</button></td>
                          </tr>
                          {category.product.map(product => (
                              <tr key={product.id}>
                                  <td>{product.title}</td>
                                  <td><img src={product.product_image} alt={product.title} width="50" /></td>
                                  <td>{product.original_price}</td>
                                  <td>{product.selling_price}</td>
                                  <td>{product.description}</td>
                                  <td><button className="btn btn-secondary btn-sm" onClick={() => handleProductEdit(product)}>Edit</button>
                                  </td>
                              </tr>
                          ))}
                      </React.Fragment>
                  ))}
              </tbody>
          </table>



{/* Category Edit Modal */}
<Modal show={showCategoryModal} onHide={() => setShowCategoryModal(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>Edit Category</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group controlId="formCategoryName">
                            <Form.Label>Category Name</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Enter category name"
                                value={categoryDetail.category}
                                onChange={e => setCategoryDetail({ ...categoryDetail, category: e.target.value })}
                            />
                        </Form.Group>

                        <Button
        onClick={handleActiveClickCat}
        style={{
          padding: '10px 20px',
          fontSize: '16px',
          borderRadius: '5px',
          margin:'10px',
          border: categoryDetail.is_active ? '2px solid green' : '2px solid lightgreen',
          backgroundColor: categoryDetail.is_active ? 'green' : 'transparent',
          color: categoryDetail.is_active ? 'white' : 'green',
          boxShadow: categoryDetail.is_active ? '0px 0px 10px green' : 'none', // glow when active
          transition: 'all 0.3s ease-in-out'
        }}
      >
        Active
      </Button>

      <Button
        onClick={handleInactiveClickCat}
        style={{
          padding: '10px 20px',
          fontSize: '16px',
          borderRadius: '5px',
          border: !categoryDetail.is_active ? '2px solid red' : '2px solid lightcoral',
          backgroundColor: !categoryDetail.is_active ? 'red' : 'transparent',
          color: !categoryDetail.is_active ? 'white' : 'red',
          boxShadow: !categoryDetail.is_active ? '0px 0px 10px red' : 'none', 
          transition: 'all 0.3s ease-in-out'
        }}
      >
        Inactive
      </Button>


                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => setShowCategoryModal(false)}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={handleCategorySave}>
                        Save Changes
                    </Button>
                </Modal.Footer>
            </Modal>

            {/* Product Edit Modal */}
            <Modal show={showProductModal} onHide={() => setShowProductModal(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>Edit Product</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group controlId="formProductTitle">
                            <Form.Label>Title</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Enter product title"
                                value={productDetail.product}
                                onChange={e => setProductDetail({ ...productDetail, product: e.target.value })}
                            />
                        </Form.Group>
                        <Form.Group controlId="formProductImage">
                            <Form.Label>Product Image</Form.Label>
                            <Form.Control
                                type="file"
                                onChange={handleFileChange}
                            />
                            
                        </Form.Group>
                        <Form.Group controlId="formOriginalPrice">
                            <Form.Label>Original Price</Form.Label>
                            <Form.Control
                                type="number"
                                placeholder="Enter original price"
                                value={productDetail.original_price}
                                onChange={e => setProductDetail({ ...productDetail, original_price: e.target.value })}
                            />
                        </Form.Group>
                        <Form.Group controlId="formSellingPrice">
                            <Form.Label>Selling Price</Form.Label>
                            <Form.Control
                                type="number"
                                placeholder="Enter selling price"
                                value={productDetail.selling_price}
                                onChange={e => setProductDetail({ ...productDetail, selling_price: e.target.value })}
                            />
                        </Form.Group>
                        <Form.Group controlId="formProductDescription">
                            <Form.Label>Description</Form.Label>
                            <Form.Control
                                as="textarea"
                                rows={3}
                                placeholder="Enter product description"
                                value={productDetail.description}
                                onChange={e => setProductDetail({ ...productDetail, description: e.target.value })}
                            />
                        </Form.Group>
      <Button
        onClick={handleActiveClick}
        style={{
          padding: '10px 20px',
          fontSize: '16px',
          borderRadius: '5px',
          margin:'10px',
          border: productDetail.is_active ? '2px solid green' : '2px solid lightgreen',
          backgroundColor: productDetail.is_active ? 'green' : 'transparent',
          color: productDetail.is_active ? 'white' : 'green',
          boxShadow: productDetail.is_active ? '0px 0px 10px green' : 'none', // glow when active
          transition: 'all 0.3s ease-in-out'
        }}
      >
        Active
      </Button>

      <Button
        onClick={handleInactiveClick}
        style={{
          padding: '10px 20px',
          fontSize: '16px',
          borderRadius: '5px',
          border: !productDetail.is_active ? '2px solid red' : '2px solid lightcoral',
          backgroundColor: !productDetail.is_active ? 'red' : 'transparent',
          color: !productDetail.is_active ? 'white' : 'red',
          boxShadow: !productDetail.is_active ? '0px 0px 10px red' : 'none', 
          transition: 'all 0.3s ease-in-out'
        }}
      >
        Inactive
      </Button>
                      
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => setShowProductModal(false)}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={handleProductSave}>
                        Save Changes
                    </Button>
                </Modal.Footer>
            </Modal>


           

      </div>
  );
};




























const AddProduct = () => {
  const [category, setCategory] = useState('');
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [actualPrice, setActualPrice] = useState('');
  const [originalPrice, setOriginalPrice] = useState('');
  const [image, setImage] = useState(null);
  const [categories, setCategories] = useState([]);
  const [categoryName, setCategoryName] = useState('');
  const [orders, setOrders] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [showProducts, setShowProducts] = useState(false);
  const [productData, setProductData] = useState({});


  const handleCategoryChange = (e) => {
    setCategory(e.target.value);
  };
  const handleCategoryNameChange = (e) => {
    setCategoryName(e.target.value);
  };

  useEffect(() => {

    axios.get('https://ba5c-117-213-103-13.ngrok-free.app/feed/item/', {
      headers: {
        Accept: "application/json",
        "ngrok-skip-browser-warning": "98547",
      },
    })
      .then(response => {
        const data = response.data.data;
        console.log(data);
        setProductData(data);
        const categoriesData = data.map(item => {
          return { "id": item.id, "text": item.id + " - " + item.category };
        });
        setCategories(categoriesData);
      })
      .catch(error => {
        console.error('Error fetching categories:', error);
      });
  }, []);

  const handleTitleChange = (e) => {
    setTitle(e.target.value);
  };
  
  const handleDescriptionChange = (e) => {
    setDescription(e.target.value);
  };
  const fetchProducts = () => {
    
  };

  const handleActualPriceChange = (e) => {
    setActualPrice(e.target.value);
  };

  const handleOriginalPriceChange = (e) => {
    setOriginalPrice(e.target.value);
  };

  const handleImageChange = (e) => {
    setImage(e.target.files[0]);
  };

  const handleAddCategory = () => {
    axios.post('https://ba5c-117-213-103-13.ngrok-free.app/feed/categories/', { category: category, original_price: 0, selling_price: 0 }, {
      headers: {
        Accept: "application/json",
        "ngrok-skip-browser-warning": "98547",
      },
    })
      .then(response => {
        console.log('Category added successfully:', response.data);
        setCategory('');
        window.location.reload();
      })
      .catch(error => {
        console.error('Error adding category:', error);
      });
  };

  const handleAddProduct = () => {
    const formData = new FormData();
    if (!categoryName || !title || !actualPrice || !description || !originalPrice) {
      alert("Please fill all required fields");
      return;
    }
    if (!image) {
      alert("Please select product image");
      return;
    }
    formData.append('product', categoryName);
    formData.append('title', title);
    formData.append('description', description);
    formData.append('original_price', actualPrice);
    formData.append('selling_price', originalPrice);
    formData.append('total_price', 0);
    formData.append('product_image', image);
    formData.append('is_active', true);

    axios.post('https://ba5c-117-213-103-13.ngrok-free.app/feed/create/', formData, {
      headers: {
        Accept: "application/json",
        "ngrok-skip-browser-warning": "98547",
      },
    })
      .then(response => {
        console.log('Product added successfully:', response.data);
        setCategory('');
        setTitle('');
        setDescription('');
        setActualPrice('');
        setOriginalPrice('');
        setImage(null);
      })
      .catch(error => {
        console.error('Error adding product:', error);
      });
  };

  const fetchOrders = () => {
    axios.get('https://ba5c-117-213-103-13.ngrok-free.app/feed/orderlist/', {
      headers: {
        Accept: "application/json",
        "ngrok-skip-browser-warning": "98547",
      },
    })
      .then(response => {
        setOrders(response.data);
        setShowModal(true);
      })
      .catch(error => {
        console.error('Error fetching orders:', error);
      });
  };

  const closeModal = () => {
    setShowModal(false);
  };

  return (
    <div className="container">

      {
        showProducts && 
        <div>

            <h1>Product Data Table</h1>
            <DataTable data={productData} />

            <div className="mt-3">
            <button className="btn btn-secondary" onClick={() => {setShowProducts(false)}}>Add Products</button>
          </div>

        </div> || 
        <div className="row">
        <div className="col-md-6 offset-md-3">
          <div className="mb-3">
            <h2>Add Category</h2>
            <div className="input-group">
              <input
                type="text"
                className="form-control"
                value={category}
                onChange={handleCategoryChange}
                placeholder="Enter category"
              />
              <button className="btn btn-primary" onClick={handleAddCategory}>Add Category</button>
            </div>
          </div>
          <div>
            <h2>Add Product</h2>
            <select className="form-select mb-3" value={categoryName} onChange={handleCategoryNameChange}>
              <option value="">Select category *</option>
              {categories.map((element, index) => (
                <option key={index} value={element.id}>{element.text}</option>
              ))}
            </select>
            <input
              type="text"
              className="form-control mb-3"
              value={title}
              onChange={handleTitleChange}
              placeholder="Enter product title *"
            />
            <textarea
              className="form-control mb-3"
              value={description}
              onChange={handleDescriptionChange}
              placeholder="Enter product description *"
            />
            <input
              type="number"
              className="form-control mb-3"
              value={actualPrice}
              onChange={handleActualPriceChange}
              placeholder="Enter actual price/ MRP *"
            />
            <input
              type="number"
              className="form-control mb-3"
              value={originalPrice}
              onChange={handleOriginalPriceChange}
              placeholder="Enter original price *"
            />
            <input
              type="file"
              className="form-control mb-3"
              onChange={handleImageChange}
            />
            <button className="btn btn-primary" onClick={handleAddProduct}>Add Product</button>
          </div>
          <div className="mt-3">
            <button className="btn btn-secondary" onClick={fetchOrders}>Orders</button>
          </div>
          <div className="mt-3">
            <button className="btn btn-secondary" onClick={() => {setShowProducts(true)}}>Products</button>
          </div>
        </div>
      </div>
      
      }

      {/* Orders Modal */}
      {showModal && (
        <div className="modal show d-block" tabIndex="-1">
          <div className="modal-dialog modal-lg">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Orders</h5>
                <button type="button" className="btn-close" onClick={closeModal}></button>
              </div>
              <div className="modal-body">
                {orders.map(order => (
                  <div key={order.id} style={{ border: '1px solid #ccc', margin: '10px', padding: '10px' }}>
                    <h2>Order ID: {order.id}</h2>
                    <p>Name: {order.name}</p>
                    <p>Email: {order.email}</p>
                    <p>Address: {order.address}</p>
                    <p>Phone: {order.phone}</p>
                    <p>Landmark: {order.land_mark}</p>
                    <p>Payment: {order.payment == '0' ? "Success" : order.payment}</p>
                    <div>
                      {Array.isArray(order.details) && order.details.map(detail => (
                        <div key={detail.id} style={{ marginBottom: '10px' }}>
                          <h3>Category: {detail.category}</h3>
                          <p>Quantity: {detail.quantity}</p>
                          <p>Total Price: ₹ {detail.total_price}</p>
                          <div>
                            {detail.product.map(product => (
                              <div key={product.id} style={{ paddingLeft: '20px' }}>
                                <h4>Product Title: {product.title}</h4>
                                <p>Unit Price: ₹ {product.selling_price}</p>
                                <p>Quantity: {product.quantity}</p>
                                <p>Total Price: ₹ {product.total_price}</p>
                              </div>
                            ))}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-secondary" onClick={closeModal}>Close</button>
              </div>
            </div>
          </div>
        </div>
      )}
      

    </div>
  );
};

export default AddProduct;