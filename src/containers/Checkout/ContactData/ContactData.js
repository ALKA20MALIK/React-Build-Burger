import React, { Component } from 'react';
import {connect} from 'react-redux';
import Button from '../../../components/UI/Button/Button';
import Spinner from '../../../components/UI/LoadSpinner/LoadSpinner';
import classes from './ContactData.css';
import axios from '../../../axios';
import Input from '../../../components/UI/Input/Input';
import withErrorHandler from '../../../hoc/withErrorHandler/withErrorHandler';
import * as actions from '../../../store/actions/index'

class ContactData extends Component {
    state = {
        orderForm: {
            name: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'your name'
                },
                value: '',
                validation: {
                    required: true
                },
                valid: false,
                touched:false
            },
            street: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'your street'
                },
                value: '',
                validation: {
                    required: true
                },
                valid: false,
                touched:false

            },
            zipCode: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'your zipCode'
                },
                value: '',
                validation: {
                    required: true,
                    minLength:5,
                    maxLength:5
                },
                valid: false,
                touched:false

            },
            country: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'your country'
                },
                value: '',
                validation: {
                    required: true
                },
                valid: false,
                touched:false

            },
            email: {
                elementType: 'input',
                elementConfig: {
                    type: 'email',
                    placeholder: 'your email'
                },
                value: '',
                validation: {
                    required: true
                },
                valid: false,
                touched:false

            },
            deliveryMethod: {
                elementType: 'select',
                elementConfig: {
                    options: [
                        { value: 'Fastest', displayValue: 'Fastest' },
                        { value: 'Cheapest', displayValue: 'Cheapest' }
                    ]
                },
                value: 'Fastest',
                validation:{},
                valid: true,
            },
        },
        formIsValid:false
    }

    orderHandler = ( event ) => {
        event.preventDefault();

        const formData = {};
        for (let formElementIdentifier in this.state.orderForm) {
            formData[formElementIdentifier] = this.state.orderForm[formElementIdentifier].value;
        }
        const order = {
            ingredients: this.props.ings,
            price: this.props.price,
            orderData: formData
        }

        this.props.onOrderBurger(order);
        this.props.history.goBack();
    }

    inputChangedHandler = (event, inputIdentifier) => {
        //console.log(event.target.value)
        const updatedOrderForm = {
            ...this.state.orderForm
        }
        const updatedFormElement ={
            ...updatedOrderForm[inputIdentifier]
        }

        updatedFormElement.value = event.target.value;

        updatedFormElement.valid=this.checkValidity(updatedFormElement.value,updatedFormElement.validation)
        updatedFormElement.touched=true;
        updatedOrderForm[inputIdentifier] = updatedFormElement;

        let formIsValid=true;
        for(let inputIdentifier in updatedOrderForm){
            formIsValid=updatedOrderForm[inputIdentifier].valid && formIsValid;
        }

        this.setState({ orderForm: updatedOrderForm,formIsValid: formIsValid})

    }
    checkValidity(value, rules) {
        let isValid = true;

        if (rules.required) {
            isValid = value.trim() !== '' && isValid;
        }
        if(rules.minLength){
            isValid=value.length>=rules.minLength && isValid;
        }
        if(rules.maxLength){
            isValid=value.length<=rules.maxLength && isValid;
        }
        return isValid;
    }
    render() {
        const formElementArray = [];
        for (let key in this.state.orderForm) {
            formElementArray.push({ id: key, config: this.state.orderForm[key] });
        }

        let form = (
            <form onSubmit={this.orderHandler}>
                {formElementArray.map(formElement => (
                    <Input
                        key={formElement.id}
                        label={formElement.id}
                        elementType={formElement.config.elementType}
                        elementConfig={formElement.config.elementConfig}
                        value={formElement.config.value}
                        invalid={!formElement.config.valid}
                        shouldValidate={formElement.config.validation}
                        touched={formElement.config.touched}
                        changed={(event) => this.inputChangedHandler(event, formElement.id)} />
                ))}

                <Button disabled={!this.state.formIsValid} btnType="Success">ORDER</Button>
            </form>
        );
        if (this.props.loading) {
            form = <Spinner />;
        }
        return (
            <div className={classes.ContactData}>
                <h4>Enter your Contact Data</h4>
                {form}
            </div>
        );
    }
}

const mapStateToProps=state=>{
    return{
        ings:state.burgerBuilder.ingredients,
        price:state.burgerBuilder.totalPrice,
        loading: state.order.loading,
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onOrderBurger: (orderData) => dispatch(actions.purchaseBurger(orderData))
    };
};
export default connect(mapStateToProps,mapDispatchToProps)(withErrorHandler(ContactData,axios));
