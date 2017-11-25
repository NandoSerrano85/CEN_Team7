port React, {Component} from 'react';
import AddRemoveCart from './AddRemoveCart';

class Product extends Component{
	constructor(props){
		super(props);
        this.state = {
            selectedProduct: {},
            quickViewProdcut: {},
            buttonLabel: "ADD TO CART"
        }
	}

    addToCart(images, id, title, isbn, author, description, price, in_stock, genres){
        this.setState({
            selectedProduct: {
                image: image,
                title: title,
                price: price,
                id: id,
                in_stock: in_stock,
                isbn: isbn,
                author: author,
                description: description,
                genres: genres,

            }
        }, function(){
            this.props.addToCart(this.state.selectedProduct);
        })
        this.setState({
            buttonLabel: "✔ ADDED"
        }, function(){
            setTimeout(() => {
                this.setState({ buttonLabel: "ADD TO CART" });
            }, 5000);
        });
    }
    quickView(image, name, price, id){
        this.setState({
            quickViewProdcut: {
                image: image,
                name: name,
                price: price,
                id: id
            }
        }, function(){
            this.props.openModal(this.state.quickViewProdcut);
        })
    }
    render(){
        let image = this.props.image;
        let name = this.props.name;
        let price = this.props.price;
        let id = this.props.id;
        let quantity = this.props.productQuantity;
        return(
            <div className="product">
                <div className="product-image">
                    <img src={image} alt={this.props.name} onClick={this.quickView.bind(this, image, name, price, id, quantity)}/>
                </div>
                <h4 className="product-name">{this.props.name}</h4>
                <p className="product-price">{this.props.price}</p>
                <AddRemoveCart productQuantity={quantity} updateQuantity={this.props.updateQuantity}/>
                <div className="product-action">
                    <button type="button" onClick={this.addToCart.bind(this, image, name, price, id, quantity)}>{this.state.buttonLabel}</button>
                </div>
            </div>
        )
    }
}

export default Product;
