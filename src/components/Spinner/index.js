import React from 'react'
import Loader from 'react-loader-spinner'

export default class Spinner extends React.Component {
    render() {
        return (
            <Loader
                type="Bars"
                color="rgb(113, 89, 193)"
                height={80}
                width={80}
                className="spinner-container"
            />
        );
    }
}