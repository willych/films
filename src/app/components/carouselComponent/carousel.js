import React from 'react'
import ReactDOM from 'react-dom'
import Slider from 'react-slick'
import CarouselItem from './carouselItem'

const urlForApi = films => 'http://www.snagfilms.com/apis/films.json?limit=10'

class Carousel extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            requestFailed: false
        }
    }

    componentDidMount() {
        this.getData();
    }

    getData() {
        return fetch(urlForApi(this.props.films))
            .then(response => {
                //if there is an error fetching data throw an error
                if (!response.ok) {
                    throw Error("Network request failed")
                }
                return response
            })
            .then(filmsData => filmsData.json())
            .then(filmsData => {
                this.setState({ data: filmsData.films });
            }), () => {
                //if there is an error fetching data catch the thrown error and store it in state to access later
                this.setState({
                    requestFailed: true
                })
            };
    }

    render() {

        //set carousel(slider) settings
        var settings = {
            dots: true,
            infinite: true,
            speed: 500,
            slidesToShow: 2,
            slidesToScroll: 1,
            className: 'carouselItems',
            variableWidth: true
        }

        //if there is an error getting the data let the user know
        if (this.state.requestFailed) return <div className='carousel'><p>Failed to load films</p></div>
        //while data is being fetched show a loading message
        if (!this.state.data) return <div className='carousel'><p>Loading...</p></div>//replace with loading bar
        return (
            <div className='carousel'>
                <Slider {...settings}>

                    {this.state.data.film.map((film) => {
                        return <div key={film.id}><CarouselItem film={film} key={film.id} /></div>
                    })
                    }

                </Slider>
            </div>
        );
    }
}

export default Carousel;