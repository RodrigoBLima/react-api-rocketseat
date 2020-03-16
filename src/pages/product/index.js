import React, { Component } from 'react';
import Spinner from '../../components/Spinner/index'

import api from '../../services/api'
import './styles.css'

class Product extends Component {
    state = {
        product: [],
        loading: true,
    }

    async  componentDidMount() {
        const { id } = this.props.match.params;
        const res = await api.get(`/products/${id}`)
        this.setState({
            product: res.data
        })
        setTimeout(() => {
            this.setState({
                loading: false,
            });
        }, 4000);
    }

    render() {
        const { product } = this.state
        let { loading } = this.state

        if (loading === false) {
            loading = <div className="product-info">
                <h1>{product.title}</h1>
                <p>{product.description}</p>

                <p>
                    URL: <a href={product.url}>{product.url}</a>
                </p>
            </div>
        } else {
            loading = <Spinner />
        }


        return (
            <>
                {loading}
            </>
        );
    }
}

export default Product;