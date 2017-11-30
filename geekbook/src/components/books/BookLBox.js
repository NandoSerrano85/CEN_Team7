import React, { Component } from 'react';
import Lightbox from 'react-image-lightbox';

class BookLBox extends Component {
    constructor(props) {
        super(props);

        this.state = {
            photoIndex: 0,
            imgSrc: this.props.imgSource
        };
    }

    render() {
        const {
            photoIndex,
            isOpen,
        } = this.state;

        return (
            <div>
                     {this.setState({ isOpen: true })}

                    Open Lightbox


                {isOpen &&
                    <Lightbox
                        mainSrc={this.state.imgSrc}
                        onCloseRequest={() => this.setState({ isOpen: false })}
                    />
                }
            </div>
        );
    }
}

export default BookLBox;
