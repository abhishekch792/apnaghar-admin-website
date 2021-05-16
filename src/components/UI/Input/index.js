import React from 'react';
import { Form } from 'react-bootstrap';


const Input = (props) => {
    let input = null;
    switch (props.type) {
        // case 'select':
        //     input = <Form.Group>
        //         <Form.Label>{props.label}</Form.Label>
        //             <select className="form-control form-control-sm" value={props.value} onChange={props.onChange} >
        //                 <option> {props.placeholder} </option>
        //                 {
        //                     props.options.length > 0 ? options.map((option, index) => 
        //                     <option key={index} value={option.value}>{option.name}</option>): null
        //                 }
        //             </select>
        //     </Form.Group>
        //     break;
        // case 'text':
        default:
            input = <Form.Group>
                <Form.Label>{props.label}</Form.Label>
                <Form.Control type={props.type} placeholder={props.placeholder} value={props.value}
                 onChange={props.onChange} {...props} />
                <Form.Text className="text-muted">
                    {props.errorMessage}
                </Form.Text>
            </Form.Group>
    }

    return input;
}

export default Input