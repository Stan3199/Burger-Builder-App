import React from 'react';
import Aux from '../../../hoc/Auxx';
import Button from '../../UI/Button/Button';

const orderSummary=(props)=>{
    const ingreidentSummary = Object.keys(props.ingredients)
    .map(igkey=>{
        return <li key={igkey}>
         <span style={{textTransform: 'capitalize'}}>
        {igkey}: {props.ingredients[igkey]} </span>
        </li>
    })
    return <Aux>
            <h3>Your Order</h3>
            <p>A delecious Burger with following ingreidents</p>
            <ul>
                {ingreidentSummary}
            </ul>
            <p>Continue to Checkout</p>
            <p><strong>Total Price: {props.price}</strong></p>
            <Button btnType="Danger" clicked={props.purchaseCancelled}>CANCEL</Button>
            <Button btnType="Success" clicked={props.purchaseContinued}>CONTINUE</Button>
        </Aux>
};

export default orderSummary;