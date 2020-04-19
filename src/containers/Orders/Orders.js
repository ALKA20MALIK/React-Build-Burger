import React, { Component } from 'react'
import Order from '../../components/Order/Order'
import axios from '../../axios';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';

class Orders extends Component {

    state = {
        orders: [],
        loading: true
    }

    componentDidMount() {
        axios.get('/orders.json ')
            .then(response => {
                //console.log(res)
                const fetchOrders = [];

                for (let key in response.data) {
                    fetchOrders.push({
                        ...response.data[key],
                        id: key
                    }
                    );

                }
                //console.log(fetchOrders)
                this.setState({ loading: false, orders: fetchOrders })
            })
            .catch(error => {
                this.setState({ loading: false })
            })
    }

    render() {
        return (
            <div>
                {this.state.orders.map(order => (
                    <Order key={order.id}
                        ingredients={order.ingredients}
                        price={order.price}
                    />
                ))}

            </div>

        )
    }
}
export default Orders