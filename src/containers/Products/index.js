import React, { useState } from 'react';
import Layout from '../../components/Layout';
import Input from '../../components/UI/Input';
import Modal from '../../components/UI/Modal';
import { Container, Row, Col, Table } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { addProduct, deleteProductById } from "../../actions";
import './style.css';
import { generatePublicUrl } from '../../urlConfig';


const Products = (props) => {

    const [name, setName] = useState('');
    const [price, setPrice] = useState('');
    const [description, setDescription] = useState('');
    const [categoryId, setCategoryId] = useState('');
    const [productPictures, setProductPictures] = useState([]);
    const [show, setShow] = useState(false);
    const [productDetailModal, setProductDetailModal] = useState(false);
    const category = useSelector(state => state.category);
    const product = useSelector(state => state.product);
    const [productDetails, setProductDetails] = useState(null);
    const dispatch = useDispatch();

    const handleClose = () => {
        const form = new FormData();
        form.append('name', name);
        form.append('price', price);
        form.append('description', description);
        form.append('category', categoryId);

        for (let pic of productPictures) {
            form.append('productPictures', pic);
        }
        dispatch(addProduct(form));
        setShow(false);
    }

    const handleShow = () => setShow(true);

    const createCategoryList = (categories, options = []) => {
        for (let category of categories) {
            options.push({ value: category._id, name: category.name });
            if (category.children.length > 0) {
                createCategoryList(category.children, options)
            }
        }

        return options;
    }

    const handleProductPictures = (e) => {
        setProductPictures([
            ...productPictures,
            e.target.files[0]
        ]);
    }

    const renderProducts = () => {
        return (
            <Table style={{ fontSize: 12 }} responsive="sm">
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Name</th>
                        <th>Fees</th>
                        <th>Description</th>
                        <th>Category</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        product.products.length > 0 ? product.products.map(product =>
                            <tr onClick={() => showProductDetailsModal(product)} key={product._id}>
                            
                                <td>{product.name}</td>
                                <td>{product.price}</td>
                                <td>{product.description}</td>
                                <td>{product.category.name}</td>
                                <td>
                                    <button onClick={() => showProductDetailsModal(product)}>
                                        info
                                    </button>
                                    <button
                                        onClick={() => {
                                            const payload = {
                                                productId: product._id,
                                            };
                                            dispatch(deleteProductById(payload));
                                        }}
                                    >
                                        del
                                    </button>
                                </td>
                            </tr>
                        ) : null
                    }
                </tbody>
            </Table>
        );
    }

    const renderAddProductModal = () => {
        return (
            <Modal show={show} handleClose={handleClose} modalTitle={"Add New Product"}>
                <Input
                    label="Name"
                    value={name}
                    placeholder={'Product Name'}
                    onChange={(e) => setName(e.target.value)}
                />

                <Input
                    label="Price"
                    value={price}
                    placeholder={'Price'}
                    onChange={(e) => setPrice(e.target.value)}
                />
                <Input
                    label="Description"
                    value={description}
                    placeholder={'Description'}
                    onChange={(e) => setDescription(e.target.value)}
                />
                <select value={categoryId} className="form-control" onChange={(e) => setCategoryId(e.target.value)}>
                    <option> select category</option>
                    {
                        createCategoryList(category.categories).map(option =>
                            <option key={option.value} value={option.value}>{option.name}</option>)
                    }
                </select>
                {
                    productPictures.length > 0 ?
                        productPictures.map((pic, index) => <div key={index}>{pic.name}</div>) : null
                }
                <input type="file" name="productPicture" onChange={handleProductPictures} />
            </Modal>
        );
    }

    const handleCloseProductDetailsModal = () => {
        setProductDetailModal(false);
    }

    const showProductDetailsModal = (product) => {
        setProductDetails(product);
        setProductDetailModal(true);
        console.log(product);
    }

    const renderProductDetailsModal = () => {

        if (!productDetails) {
            return null;
        }
        return (
            <Modal size="lg" show={productDetailModal} handleClose={handleCloseProductDetailsModal} modalTitle={'Product Details'} >
                <Row>
                    <Col md="6">
                        <label className="key">Name</label>
                        <p className="value">{productDetails.name}</p>
                    </Col>
                    <Col md="6">
                        <label className="key">Price</label>
                        <p className="value">{productDetails.price}</p>
                    </Col>
                </Row>
                <Row>
                    <Col md="6">
                        <label className="key">Category</label>
                        <p className="value">{productDetails.category.name}</p>
                    </Col>
                    <Col md="6">
                        <label className="key">Description</label>
                        <p className="value">{productDetails.description}</p>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <label className="key"> Pictures</label>
                        <div style={{ display: "flex" }}>
                            {productDetails.productPictures.map(picture =>
                                <div className="productImgContainer">
                                    <img src={generatePublicUrl(picture.img)} />
                                </div>
                            )}
                        </div>
                    </Col>
                </Row>
            </Modal>
        );
    }

    return (
        <Layout sidebar>

            <Container>
                <Row>
                    <Col md={12}>
                        <div style={{ display: 'flex', justifyContent: 'space-around' }}>
                            <h3> Services </h3>
                            <button onClick={handleShow}>Add</button>
                        </div>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        {renderProducts()}
                        {renderProductDetailsModal()}
                    </Col>
                </Row>
            </Container>

            { renderAddProductModal()}
        </Layout>
    )
}

export default Products
