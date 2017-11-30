import React, { Component } from 'react';
import { Carousel } from 'react-responsive-carousel';
import styles from 'react-responsive-carousel/lib/styles/carousel.min.css';

class MyCarousel extends Component {
    render() {
        return (
          <div className = "container">
          <div className = "row">
              <div className ="col-md-12 text-center">
                <Carousel>
                  <div>
                    <img src="http://via.placeholder.com/350x150" />
                  </div>
                  <div>
                    <img src="http://via.placeholder.com/350x150" />
                  </div>
                  <div>
                    <img src="http://via.placeholder.com/350x150" />
                  </div>
                </Carousel>
              </div>
          </div>
        </div>
        );
    }
};

export default MyCarousel;
