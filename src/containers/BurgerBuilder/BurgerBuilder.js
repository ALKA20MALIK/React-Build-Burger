import React, { Component } from 'react'
import Auxiliary from '../../hoc/Auxiliary/Auxiliary'
import Burger from '../../components/Burger/Burger'
import BuildControls from '../../components/Burger/BuildControls/BuildControls'
import Modal from '../../components/UI/Modal/Modal'
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary'
import axios from '../../axios';
import LoadSpinner from '../../components/UI/LoadSpinner/LoadSpinner'
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler'

const INGREDIENT_PRICES = {
    salad: 1.5,
    cheese: 1.2,
    meat: 2,
    bacon: .7
}

class BurgerBuilder extends Component {

    state = {
        ingredients: null,
        totalPrice: 0,
        purchasable: false,
        puchasing: false,
        Loading: false,
        error:false
    }

    componentDidMount() {
        axios.get('https://burger-builder-9c141.firebaseio.com/ingredients.json')
            .then(response => {
                this.setState({ ingredients: response.data })
            })
            .catch(error=>{
                this.setState({error:true})
            })
    }
    updatePurchaseState(ingredients) {

        const sum = Object.keys(ingredients)
            .map(igKey => {
                return ingredients[igKey];
            })
            .reduce((sum, el) => {
                return sum + el;
            }, 0)

        this.setState({ purchasable: sum > 0 })
    }

    purchaseHandler = () => {
        this.setState({ puchasing: true })
    }
    purchaseCancelHandler = () => {
        this.setState({ puchasing: false })
    }
    purchaseContinueHandler = () => {
        this.setState({ Loading: true })

        const order = {
            ingredients: this.state.ingredients,
            price: this.state.totalPrice,
            customer: {
                name: 'Alka',
                address: {
                    street: 'street one',
                    zipCode: '201307',
                    country: 'India'
                }
            },
            deliveryMethod: 'fastest'
        }
        axios.post('/orders.json', order)
            .then(response => {
                console.log(response)
                this.setState({ Loading: false, puchasing: false })
            })
            .catch(error => {
                console.log(error)
                this.setState({ Loading: false, puchasing: false })
            })
        //alert("you continue..")
    }
    addIngredientHandler = (type) => {

        const oldCount = this.state.ingredients[type];
        const updatedCount = oldCount + 1;
        const updatedIngredients = {
            ...this.state.ingredients
        }
        updatedIngredients[type] = updatedCount;

        const priceAddition = INGREDIENT_PRICES[type]
        const oldPrice = this.state.totalPrice
        const newPrice = oldPrice + priceAddition

        this.setState({ totalPrice: newPrice, ingredients: updatedIngredients })
        this.updatePurchaseState(updatedIngredients)
    }
    removeIngredientHandler = (type) => {

        const oldCount = this.state.ingredients[type];

        if (oldCount <= 0) {
            return;
        }
        const updatedCount = oldCount - 1;
        const updatedIngredients = {
            ...this.state.ingredients
        }
        updatedIngredients[type] = updatedCount;

        const priceDeduction = INGREDIENT_PRICES[type]
        const oldPrice = this.state.totalPrice
        const newPrice = oldPrice - priceDeduction

        this.setState({ totalPrice: newPrice, ingredients: updatedIngredients })
        this.updatePurchaseState(updatedIngredients)

    }

    render() {

        const disableInfo = { ...this.state.ingredients }

        for (let key in disableInfo) {
            disableInfo[key] = disableInfo[key] <= 0
        }

        let burger =this.state.error?<p>ingredients can't be loaded </p>: <LoadSpinner />
        let orderSummary=null

        if (this.state.ingredients) {
            burger = (
                <Auxiliary>
                    <Burger ingredients={this.state.ingredients} />
                    <BuildControls
                        ingredientAdded={this.addIngredientHandler}
                        ingredientRemoved={this.removeIngredientHandler}
                        disabled={disableInfo}
                        price={this.state.totalPrice}
                        purchasable={this.state.purchasable}
                        ordered={this.purchaseHandler} />
                </Auxiliary>

            )
             orderSummary = <OrderSummary
                ingredients={this.state.ingredients}
                price={this.state.totalPrice}
                purchaeContinued={this.purchaseContinueHandler}
                purchaeCancelled={this.purchaseCancelHandler}
            ></OrderSummary>
        }

        if (this.state.Loading) {
            orderSummary = <LoadSpinner />
        }

        return (
            <Auxiliary>
                <Modal show={this.state.puchasing} modalClosed={this.purchaseCancelHandler}>
                    {orderSummary}
                </Modal>
                {burger}
            </Auxiliary>
        )
    }
}
export default withErrorHandler(BurgerBuilder, axios)