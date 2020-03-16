import api from '../../services/api'
import './styles.css'
import React, { Component } from 'react'
import Spinner from '../../components/Spinner'
import { Link } from 'react-router-dom'

export default class index extends Component {
    state = {
        products: [],
        productInfo: {},
        page: 1,
        loading: true,

    }

    componentDidMount() {
        this.loadProducts();
    }

    loadProducts = async (page = 1) => {
        const res = await api.get(`/products?page=${page}`);
        // console.log(res)
        const { docs, ...productInfo } = res.data
        this.setState({
            products: docs,
            productInfo,
            page
        });
        setTimeout(() => {
            this.setState({
                loading: false,
            });
        }, 4000);
    }

    prevPage = () => {
        const { page } = this.state;

        if (page === 1) return;

        const pageNumber = page - 1;

        this.loadProducts(pageNumber);
    }

    nextPage = () => {
        const { page, productInfo } = this.state;

        if (page === productInfo) return;

        const pageNumber = page + 1;

        this.loadProducts(pageNumber);
    }

    render() {
        const { products, page, productInfo } = this.state
        let {loading} = this.state

        if (loading === false) {
            loading = <>
                {products.map(product => (
                    <article key={product._id}>
                        <strong>{product.title}</strong>
                        <p>{product.description}</p>

                        <Link to={`/products/${product._id}`}>Acessar</Link>
                    </article>
                ))}
                <div className="actions">
                    <button disabled={page === 1} onClick={this.prevPage}>Anterior</button>
                    <button disabled={page === productInfo.pages} onClick={this.nextPage}>Próximo</button>
                </div>
            </>
        }
        else{
            loading = <Spinner />
        }

        return (
            <div className="product-list">
                {loading}
            </div>
        )
    }
}
