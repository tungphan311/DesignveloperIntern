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
            const { name, route, img } = menu;
            Subjects.insert({
                name, route, img
            });
        });
    }

    if (!numberOfKind) {
        var kindOfClothes = JSON.parse(Assets.getText("kind-of-clothes.json"));

        kindOfClothes.map(kind => {
            const { name, subjectId } = kind;
            KindOfClothes.insert({
                name, subjectId
            });
        });
    }

    if (!numberOfCategory) {
        var categories = JSON.parse(Assets.getText("categories.json"));

        categories.map(cat => {
            const { name, kindOfClothesId } = cat;
            Categories.insert({
                name, kindOfClothesId
            });
        });
    }

    if (!numberOfProduct) {
        var products = JSON.parse(Assets.getText("products.json"));

        products.map(product => {
            const { name, price, images, brandId, categoryId, kindOfClothesId, quantity, description } = product;
            const createAt = new Date();
            Products.insert({
                name, price, images, brandId, categoryId, kindOfClothesId, quantity, description, createAt
            });
        });
    }

    if(!numberOfBrand) {
        var brands = JSON.parse(Assets.getText("brands.json"));

        brands.map(brand => {
            const { name } = brand;

            Brands.insert({
                name
            });
        });
    }

    if(!numberOfColor) {
        var colors = JSON.parse(Assets.getText("colors.json"));

        colors.map(color => {
            const { name, value } = color;

            Colors.insert({
                name, value
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
                productDetails = ProductDetails.find({ productId: product._id }).fetch();

                const index = productDetails.findIndex(detail => {
                    return detail.size === size;
                });

                if (index > -1) {
                    productIds = [...productIds, product._id];
                }
            });

            if (color) {
                products.filter((product) => {
                    return productIds.includes(product._id);
                });

                console.log(productIds);
            }
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
