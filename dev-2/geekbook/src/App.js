import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Header from './components/Header';

class App extends Component {
    constructor(){
		super();
		this.state = {
			products: [],
			cart: [],
			totalItems: 0,
			totalAmount: 0,
			term: '',
			category: '',
			cartBounce: false,
			quantity : 1,
			quickViewProduct: {},
			modalActive: false
		};
		this.handleSearch = this.handleSearch.bind(this);
		this.handleMobileSearch = this.handleMobileSearch.bind(this);
		this.handleCategory = this.handleCategory.bind(this);
		this.handleAddToCart = this.handleAddToCart.bind(this);
		this.sumTotalItems = this.sumTotalItems.bind(this);
		this.sumTotalAmount = this.sumTotalAmount.bind(this);
		this.checkProduct = this.checkProduct.bind(this);
		this.updateQuantity = this.updateQuantity.bind(this);
		this.handleRemoveProduct = this.handleRemoveProduct.bind(this);
		this.openModal = this.openModal.bind(this);
		this.closeModal = this.closeModal.bind(this);
	}
	// Fetch Initial Set of Products from external API
	getProducts(){
		//For Localhost use the below url
		const url = "src/products.json";

		// For Production use the below url
		//const url="https://quarkbackend.com/getfile/sivadass/products";

		axios.get(url)
			.then(response => {
				this.setState({
					products : response.data
				})
			})
	}
	componentWillMount(){
		this.getProducts();
	}

	// Search by Keyword
	handleSearch(event){
		this.setState({term: event.target.value});
	}
	// Mobile Search Reset
	handleMobileSearch(){
		this.setState({term: ""});
	}
	// Filter by Category
	handleCategory(event){
		this.setState({category: event.target.value});
		console.log(this.state.category);
	}
	// Add to Cart
	handleAddToCart(selectedProducts){
		let cartItem = this.state.cart;
		let productID = selectedProducts.id;
		let productQty = selectedProducts.quantity;
		if(this.checkProduct(productID)){
			let index = cartItem.findIndex((x => x.id == productID));
			cartItem[index].quantity = Number(cartItem[index].quantity) + Number(productQty);
			this.setState({
				cart: cartItem
			})
		} else {
			cartItem.push(selectedProducts);
		}
		this.setState({
			cart : cartItem,
			cartBounce: true,
		});
		setTimeout(function(){
             this.setState({cartBounce:false});
        }.bind(this),1000);
		this.sumTotalItems(this.state.cart);
		this.sumTotalAmount(this.state.cart);
	}
	handleRemoveProduct(id, e){
		let cart = this.state.cart;
		let index = cart.findIndex((x => x.id == id));
		cart.splice(index, 1);
		this.setState({
			cart: cart
		})
		this.sumTotalItems(this.state.cart);
		this.sumTotalAmount(this.state.cart);
		e.preventDefault();
	}
	checkProduct(productID){
		let cart = this.state.cart;
		return cart.some(function(item) {
			return item.id === productID;
		});
	}
	sumTotalItems(){
        let total = 0;
        let cart = this.state.cart;
		total = cart.length;
		this.setState({
			totalItems: total
		})
    }
	sumTotalAmount(){
        let total = 0;
        let cart = this.state.cart;
        for (var i=0; i<cart.length; i++) {
            total += cart[i].price * parseInt(cart[i].quantity);
        }
		this.setState({
			totalAmount: total
		})
    }
	//Update Quantity
	updateQuantity(qty){
		console.log("hola!")
        this.setState({
            moq: qty
        })
	}
	//Reset Quantity
	updateQuantity(qty){
		console.log("hola!")
        this.setState({
            quantity: qty
        })
	}
	// Open Modal
	openModal(product){
		this.setState({
			quickViewProduct: product,
			modalActive: true
		})
	}
	// Close Modal
	closeModal(){
		this.setState({
			modalActive: false
		})
    }
    render() {
        return (
        <div>
        <div className="jumbotron">
            <div className="container text-center">
                <h1>GeekBook</h1>
                <p>All the best books</p>
            </div>
        </div>

        <div className="container">
				<Header
					cartBounce={this.state.cartBounce}
					total={this.state.totalAmount}
					totalItems={this.state.totalItems}
					cartItems={this.state.cart}
					removeProduct={this.handleRemoveProduct}
					handleSearch={this.handleSearch}
					handleMobileSearch={this.handleMobileSearch}
					handleCategory={this.handleCategory}
					categoryTerm={this.state.category}
					updateQuantity={this.updateQuantity}
					productQuantity={this.state.moq}
                    />
        </div>

  <div className="container">
    <div className="row">
      <div className="col-sm-4">
        <div className="panel panel-primary">
          <div className="panel-heading">BLACK FRIDAY DEAL</div>
          <div className="panel-body"><img src="https://placehold.it/150x80?text=IMAGE" className="img-responsive" alt="Image"/></div>
          <div className="panel-footer">Buy 50 mobiles and get a gift card</div>
        </div>
      </div>
      <div className="col-sm-4">
        <div className="panel panel-danger">
          <div className="panel-heading">BLACK FRIDAY DEAL</div>
          <div className="panel-body"><img src="https://placehold.it/150x80?text=IMAGE" className="img-responsive"  alt="Image"/></div>
          <div className="panel-footer">Buy 50 mobiles and get a gift card</div>
        </div>
      </div>
      <div className="col-sm-4">
        <div className="panel panel-success">
          <div className="panel-heading">BLACK FRIDAY DEAL</div>
          <div className="panel-body"><img src="https://placehold.it/150x80?text=IMAGE" className="img-responsive"  alt="Image"/></div>
          <div className="panel-footer">Buy 50 mobiles and get a gift card</div>
        </div>
      </div>
    </div>
  </div><br></br>

  <div className="container">
    <div className="row">
      <div className="col-sm-4">
        <div className="panel panel-primary">
          <div className="panel-heading">BLACK FRIDAY DEAL</div>
          <div className="panel-body"><img src="https://placehold.it/150x80?text=IMAGE" className="img-responsive"  alt="Image"/></div>
          <div className="panel-footer">Buy 50 mobiles and get a gift card</div>
        </div>
      </div>
      <div className="col-sm-4">
        <div className="panel panel-primary">
          <div className="panel-heading">BLACK FRIDAY DEAL</div>
          <div className="panel-body"><img src="https://placehold.it/150x80?text=IMAGE" className="img-responsive"  alt="Image"/></div>
          <div className="panel-footer">Buy 50 mobiles and get a gift card</div>
        </div>
      </div>
      <div className="col-sm-4">
        <div className="panel panel-primary">
          <div className="panel-heading">BLACK FRIDAY DEAL</div>
          <div className="panel-body"><img src="https://placehold.it/150x80?text=IMAGE" className="img-responsive"  alt="Image"/></div>
          <div className="panel-footer">Buy 50 mobiles and get a gift card</div>
        </div>
      </div>
    </div>
  </div>
        </div>
    );
  }
}

export default App;
