import React from 'react'

class CarouselItem extends React.Component {
    render() {
        return (
            <div className="carouselItem">
                <div className="container">
                    <img src={this.props.film.images.image[0].src} alt={this.props.film.title} className="image"/>
                    <a>
                        <div className="middle">
                            <div className="text">
                                <h4>{this.props.film.title}</h4>
                                <h5>{this.props.film.durationMinutes} Minutes</h5>
                            </div>
                        </div>
                    </a>
                </div>
            </div>
        );
    }
}

export default CarouselItem;