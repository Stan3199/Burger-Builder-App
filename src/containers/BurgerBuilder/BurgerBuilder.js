import React, { Component } from 'react';
import Aux from '../../hoc/Auxx';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary'

const INGREDIENT_PRICES={
    salad:10,
    cheese:20,
    bacon:30,
    meat:40
}

class BurgerBuilder extends Component{
    // constructor(props){
    //     super(props);
    //     this.state={}
    // }
    state={
        ingredients:{
            salad:0,
            bacon:0,
            cheese:0,
            meat:0
        },
        totalPrice:0,
        purchasable:false,
        purchasing:false,
    }

    addingredientHandler =(type)=>{
        // const oldCount=this.state.ingredients[type];
        // const updatedCount=oldCount+1;
        const updatedIngredient={
            ...this.state.ingredients
        };
        updatedIngredient[type]+=1;
        // updatedIngredient[type]=updatedCount;
        this.setState({ingredients:updatedIngredient});

        // const priceAddition=INGREDIENT_PRICES[type];
        // const oldPrice=this.state.totalPrice;
        // const newPrice=oldPrice+priceAddition;
        this.setState({totalPrice:this.state.totalPrice+INGREDIENT_PRICES[type]});

        this.updatePurchaseState(updatedIngredient)
    }

    removeIngredientHandler=(type)=>{
        if(this.state.ingredients[type]===0) {return;}
        const upgradedIngredient={
            ...this.state.ingredients
        }
        upgradedIngredient[type]-=1;
        this.setState({ingredients:upgradedIngredient});
        this.setState({totalPrice:this.state.totalPrice-INGREDIENT_PRICES[type]})
        this.updatePurchaseState(upgradedIngredient);
    }

    updatePurchaseState(ingredients){
       
        const sum=Object.keys(ingredients)
        .map(igkey=>{
            return ingredients[igkey]
        })
        .reduce((sum,el)=>(
            sum+=el
        ),0)
        this.setState({purchasable:sum>0});
    }

    purchaseHandler=()=>{
        this.setState({purchasing:true});
    }

    purchaseCancelHandler=()=>{
        this.setState({purchasing:false})
    }

    purchaseContinueHandler=()=>{
        alert("continue");
    }

    render(){
        const disableInfo={
            ...this.state.ingredients
        };
        for(let key in disableInfo){
            disableInfo[key]=disableInfo[key]<=0;
        } 
        return(
            <Aux>
            <Modal show={this.state.purchasing} modalClosed={this.purchaseCancelHandler}>
                <OrderSummary
                purchaseCancelled={this.purchaseCancelHandler}
                purchaseContinued={this.purchaseContinueHandler}
                price={this.state.totalPrice}
                ingredients={this.state.ingredients}/>
            </Modal>
                <Burger ingredients={this.state.ingredients}></Burger>
                <BuildControls 
                    ingredientAdded={this.addingredientHandler}
                    ingredientRemoved={this.removeIngredientHandler}
                    disabled={disableInfo}
                    purchasable={this.state.purchasable}
                    price={this.state.totalPrice}
                    ordered={this.purchaseHandler}
                />
            </Aux>
        );
    }
}
export default BurgerBuilder;