import { Meteor } from 'meteor/meteor';
import '../imports/api/subjects';
import { Subjects } from '../imports/api/subjects';
import { KindOfClothes, Categories } from '../imports/api/kind-of-clothes';
import { Products } from '../imports/api/products';
import { Brands } from '../imports/api/brands';
import { Colors } from '../imports/api/colors';
import { ProductDetails } from '../imports/api/product-details';
import { publishComposite } from 'meteor/reywood:publish-composite';
import { Orders } from '../imports/api/orders';

 
Meteor.startup(() => {
    // process.env.MAIL_URL = 'smtps://thanhtunga1lqd@gmail.com:Tung66709398@smtp.gmail.com:465/';

    // check to see if data exists in menus collection
    const numberOfSubject = Subjects.find({}).count();  
    const numberOfKind = KindOfClothes.find({}).count();
    const numberOfCategory = Categories.find({}).count();
    const numberOfProduct = Products.find({}).count();
    const numberOfBrand = Brands.find({}).count();
    const numberOfColor = Colors.find({}).count();
    const numberOfProductDetail = ProductDetails.find({}).count();

    console.log(numberOfColor);
 
    if (!numberOfSubject) {
        // Generate data when it's empty
        var subjects = JSON.parse(Assets.getText("subjects.json"));

        subjects.map(menu => {
            const { _id, name, route, img } = menu;
            Subjects.insert({
                _id, name, route, img
            });
        });
    }

    if (!numberOfKind) {
        var kindOfClothes = JSON.parse(Assets.getText("kind-of-clothes.json"));

        kindOfClothes.map(kind => {
            const { _id, name, subjectId } = kind;
            KindOfClothes.insert({
                _id, name, subjectId
            });
        });
    }

    if (!numberOfCategory) {
        var categories = JSON.parse(Assets.getText("categories.json"));

        categories.map(cat => {
            const { _id, name, kindOfClothesId } = cat;
            Categories.insert({
                _id, name, kindOfClothesId
            });
        });
    }

    if (!numberOfProduct) {
        var products = JSON.parse(Assets.getText("products.json"));

        products.map(product => {
            const { id, name, price, images, brandId, categoryId, kindOfClothesId, quantity, description } = product;
            const createAt = new Date();
            Products.insert({
                _id: id, name, price, images, brandId, categoryId, kindOfClothesId, quantity, description, createAt
            });
        });
    }

    if(!numberOfBrand) {
        var brands = JSON.parse(Assets.getText("brands.json"));

        brands.map(brand => {
            const { _id, name } = brand;

            Brands.insert({
                _id, name
            });
        });
    }

    if(!numberOfColor) {
        var colors = JSON.parse(Assets.getText("colors.json"));

        colors.map(color => {
            const { _id, name, value } = color;

            Colors.insert({
                _id, name, value
            });
        });
    }

    if(!numberOfProductDetail) {
        var productDetails = JSON.parse(Assets.getText("product-details.json"));

        productDetails.map(detail => {
            const { productId, size, colorId } = detail;

            ProductDetails.insert({
                productId, size, colorId
            });
        });
    }

    Meteor.publish('subjects', function () {
        return Subjects.find({});
    });

    Meteor.publish('kindOfClothes', function () {
        return KindOfClothes.find({});
    });

    Meteor.publish('categories', function (id) {
        let categories = null;
        if (id) {
            categories = Categories.find({ kindOfClothesId: id });
        } else {
            categories = Categories.find({});
        }
        return categories;
    });

    Meteor.publish('products', function (size, color) {
        let products = Products.find({}).fetch();
        let productDetails = [];
        let productIds = [];

        if (!size && !color) {
            return Products.find({});
        }

        if (size) {
            products.map(product => {
                productDetails = ProductDetails.find({ productId: product._id, size: size }).count();

                if (productDetails > 0) {
                    if (!productIds.includes(product._id)) {
                        productIds = [...productIds, product._id];
                    }
                }
            });

            if (color) {
                products = [];
                productIds.map((productId) => {
                    const product = Products.findOne({ _id: productId });

                    products = [...products, product];
                });

                products.map(product => {
                    productDetails = ProductDetails.find({ productId: product._id, colorId: color }).count();
                    productIds = [];

                    if (productDetails > 0) {
                        if (!productIds.includes(product._id)) {
                            productIds = [...productIds, product._id];
                        }
                    }
                });
            } 
        }

        if (color) {
            products.map(product => {
                productDetails = ProductDetails.find({ productId: product._id, colorId: color }).count();

                if (productDetails > 0) {
                    if (!productIds.includes(product._id)) {
                        productIds = [...productIds, product._id];
                    }
                }
            })
        }
        
        return Products.find({ _id: { $in: productIds } });
    });

    Meteor.publish('productWithId', function (id) {
        return Products.find({
            _id: id,
        })
    });

    publishComposite('productWithBrand', function (id) {
        return {
            find() {
                return Products.find({ _id: id });
            }, 
            children() {
                return [{
                    find(product) {
                        return Products.find({ brandId: product.brandId });
                    }
                }]
            }
        }
    });

    Meteor.publish('brands', function () {
        return Brands.find({});
    });

    Meteor.publish('colors', function () {
        const colors = Colors.find({});
        return colors;
    });

    // Meteor.publish('productDetails', function (productId) {
    //     if (productId) {
    //         return ProductDetails.find({ productId: productId });
    //     } else {
    //         return ProductDetails.find({});
    //     }
    // });

    publishComposite('productDetails', function (productId) {
        return {
            find() {
                if (productId) {
                    return ProductDetails.find({ productId: productId });
                } else {
                    return ProductDetails.find({});
                }
            },
            children() {
                return [{
                    find(productDetail) {
                        return Products.find({ _id: productDetail.productId });
                    }
                }]
            }
        }
    });

    Meteor.publish('details', function () {
        return ProductDetails.find({});
    })

    Meteor.publish('productList', function () {
        return Products.find({});
    });

    Meteor.publish('orders', function () {
        return Orders.find({});
    })
});
