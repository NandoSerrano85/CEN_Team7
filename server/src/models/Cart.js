module.exports = function Cart(old){
    this.products = old.products || {};
    this.totalQty = old.totalQty || 0;
    this.totalPrice = old.totalPrice || 0;

    this.add = function(product, id) {
        var inCart = this.products[id];
        if(!inCart) {
            inCart = this.products[id] = {product: product, qty:0, price:0};
        }
        inCart.qty++;
        inCart.price = inCart.product.price * inCart.qty;
        this.totalQty++;
        this.totalPrice += inCart.product.price;
    };

    this.reduceOne = function(id) {
        this.products[id].qty--;
        this.products[id].price -= this.products[id].product.price;
        this.totalQty--;
        this.totalPrice -= this.products[id].product.price;

        if (this.products[id].qty <= 0) {
            delete this.products[id];
        }
    };

    this.removeproduct = function(id) {
        this.totalQty -= this.products[id].qty;
        this.totalPrice -= this.products[id].price;
        delete this.products[id];
    };

    this.generateArray = function() {
        var arr = [];
        for (var id in this.products) {
            arr.push(this.products[id]);
        }
        return arr;
    };
};
