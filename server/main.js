import { Meteor } from 'meteor/meteor';
import '../imports/api/subjects';
import { Subjects } from '../imports/api/subjects';
import { KindOfClothes, Categories } from '../imports/api/kind-of-clothes';
import { Products, Brands } from '../imports/api/products';
import { Colors } from '../imports/api/colors';
import { ProductDetails } from '../imports/api/product-details';
import { publishComposite } from 'meteor/reywood:publish-composite';

Meteor.startup(() => {
    // check to see if data exists in menus collection
    const numberOfSubject = Subjects.find({}).count();  
    const numberOfKind = KindOfClothes.find({}).count();
    const numberOfCategory = Categories.find({}).count();
    const numberOfProduct = Products.find({}).count();
    const numberOfBrand = Brands.find({}).count();
    const numberOfColor = Colors.find({}).count();
    const numberOfProductDetail = ProductDetails.find({}).count();
 
    if (!numberOfSubject) {
        // Generate data when it's empty
        var subjects = JSON.parse(Assets.getText("subjects.json"));

        subjects.map(menu => {
            const { id, name, route, img } = menu;
            Subjects.insert({
                id, name, route, img
            });
        });
    }

    if (!numberOfKind) {
        var kindOfClothes = JSON.parse(Assets.getText("kind-of-clothes.json"));

        kindOfClothes.map(kind => {
            const { id, name, subjectId } = kind;
            KindOfClothes.insert({
                id, name, subjectId
            });
        });
    }

    if (!numberOfCategory) {
        var categories = JSON.parse(Assets.getText("categories.json"));

        categories.map(cat => {
            const { id, name, kindOfClothesId } = cat;
            Categories.insert({
                id, name, kindOfClothesId
            });
        });
    }

    if (!numberOfProduct) {
        var products = JSON.parse(Assets.getText("products.json"));

        products.map(product => {
            const { id, name, price, images, brandId, categoryId, kindOfClothesId } = product;
            Products.insert({
                id, name, price, images, brandId, categoryId, kindOfClothesId
            });
        });
    }

    if(!numberOfBrand) {
        var brands = JSON.parse(Assets.getText("brands.json"));

        brands.map(brand => {
            const { id, name } = brand;

            Brands.insert({
                id, name
            });
        });
    }

    if(!numberOfColor) {
        var colors = JSON.parse(Assets.getText("colors.json"));

        colors.map(color => {
            const { id, name, value } = color;

            Colors.insert({
                id, name, value
            });
        });
    }

    if(!numberOfProductDetail) {
        var productDetails = JSON.parse(Assets.getText("product-details.json"));

        productDetails.map(detail => {
            const { productId, size, colorId, amountInStock } = detail;

            ProductDetails.insert({
                productId, size, colorId, amountInStock
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
        return Categories.find({ kindOfClothesId: id });
    });

    Meteor.publish('products', function (filter, page) {
        return Products.find({ 
            kindOfClothesId: filter.kindOfClothesId,
            categoryId: filter.categoryId
        }, { limit: 20, skip: 20*(page - 1) });
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
        return Colors.find({});
    });

    Meteor.publish('productDetails', function (productId) {
        return ProductDetails.find({ productId: productId });
    });

    Meteor.publish('productList', function () {
        return Products.find({});
    });
});
