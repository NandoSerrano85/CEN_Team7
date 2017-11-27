module.exports = function Cart(old){
    this.product = old.product || {};
    this.totalQty = old.totalQty || 0;
    this.totalPrice = old.totalPrice || 0;


    this.add = function(product, id) {
        var inCart = this.product[id];
        if(!inCart) {
            inCart = this.product[id] = {product: product, qty:0, price:0};
        }
        inCart.qty++;
        inCart.price = inCart.product.price * inCart.qty;
        this.totalQty++;
        this.totalPrice += inCart.product.price;
    };

    this.reduceOne = function(id) {
        console.log(this.product);
        this.product[id].qty--;
        this.product[id].price -= this.product[id].product.price;
        this.totalQty--;
        this.totalPrice -= this.product[id].product.price;

        if (this.product[id].qty <= 0) {
            delete this.product[id];
        }
    };

    this.remove = function(id) {
        this.totalQty -= this.product[id].qty;
        this.totalPrice -= this.product[id].price;
        delete this.product[id];
    };

    this.generateArray = function() {
        var arr = [];
        for (var id in this.product) {
            arr.push(this.product[id]);
        }
        return arr;
    };
};
