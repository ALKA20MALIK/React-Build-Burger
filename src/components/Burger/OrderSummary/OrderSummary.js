import React, { Component } from 'react'
import Auxiliary from '../../../hoc/Auxiliary/Auxiliary'
import Button from '../../UI/Button/Button'

const orderSummary =(props)=>{
    const ingredientsSummary = Object.keys(props.ingredients)
            .map(igkey => {
                return (<li key={igkey}>
                    <span style={{ textTransform: "capitalize" }}> {igkey} </span>: {props.ingredients[igkey]}
                </li>)
            })

        return  (
                <Auxiliary>
                    <h3>Your Order </h3>
                    <p>A delicious burger with the following ingredients: </p>
                    <ul>
                        {ingredientsSummary}
                    </ul>
                    <p> <strong>Price : {props.price.toFixed(2)}</strong></p>
        
                    <p>continue to checkout ?</p>
        
                    <Button btnType="Danger" clicked={props.purchaseCancelled}>Cancel</Button>
                    <Button btnType="Success" clicked={props.purchaseContinued}>Continue</Button>
        
                </Auxiliary>
            )
}

export default orderSummary;