import React, { useEffect, useState } from 'react';
import { Col, Container, Row} from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { addCategory, getAllCategory } from '../../actions/category.action';
import Layout from '../../components/Layout';
import Input from '../../components/UI/Input';
import Modal from '../../components/UI/Modal';
import CheckboxTree from 'react-checkbox-tree';
import 'react-checkbox-tree/lib/react-checkbox-tree.css';


const Category = (props) => {
    const category = useSelector(state => state.category);
    const [categoryName, setCategoryName] = useState('');
    const [parentCategoryId, setParentCategoryId] = useState('');
    //const [categoryImage, setCategoryImage] = useState('');
    const [show, setShow] = useState(false);
    const dispatch = useDispatch();
    const [checked, setChecked] = useState([]);
    const [expanded, setExpanded] = useState([]);



const handleClose = () => {
        const cat = {
            categoryName
        };
        dispatch(addCategory(cat));
        setShow(false);
    }
    
    const handleShow = () => setShow(true);

    const renderCategories = (categories) => {

        let myCategories = [];

        for (let category of categories) {
            console.log(category.name);
            myCategories.push(
                <li key={category.name}>
                    {category.name}
                    {category.children.length > 0 ? (<ul>renderCategories(category.children)</ul>): null}
                </li>
            );
        }

        return myCategories;
    }

    const createCategoryList = (categories, options = []) => {
        for (let category of categories) {
            options.push({ value: category._id, name: category.name });
            if (category.children.length > 0) {
                createCategoryList(category.children, options)
            }
        }

        return options;
    }


    return (
        <Layout sidebar>
            <Container>
                <Row>
                    <Col md={12}>
                        <div style={{ display: 'flex', justifyContent: 'space-around' }}>
                            <h3> Category </h3>
                            <button onClick={handleShow}>Add</button>
                        </div>
                    </Col>
                </Row>
                <Row>
                    <Col md={12}>
                         <ul>
                            {renderCategories(category.categories)}
                        </ul> 

                    </Col>
                </Row>
            </Container>


            <Modal show={show} handleClose={handleClose} modalTitle={"Add New Category"} >
                <Input
                    type="text"
                    value={categoryName}
                    placeholder={'Category Name'}
                    onChange={(e) => setCategoryName(e.target.value)}
                />
            </Modal>


        </Layout>
    )
}

export default Category
