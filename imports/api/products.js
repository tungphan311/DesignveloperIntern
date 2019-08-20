import { Mongo } from 'meteor/mongo';
import { Meteor } from 'meteor/meteor';
import { check } from 'meteor/check';
import { SimpleSchema } from 'meteor/aldeed:simple-schema'

export const Products = new Mongo.Collection('products');

ProductSchema = new SimpleSchema({
    name: { type: String },
    price: { type: Number },
    images: { type: [String] },
    brandId: { type: Number },
    categoryId: { type: Number },
    description: { type: String },
    createAt: { type: Date }
}) 

Meteor.methods({
    'products.remove'(users, productId) {
        check(productId, String);

        if (!users || users.emails[0].address !== 'tungpt@dgroup.co') {
            alert("You don't have permissions to do this action!!!");
            return;
        }

        Products.remove(productId);
    },

    'products.insert'(users, product) {
        // check

        if (!users || users.emails[0].address !== 'tungpt@dgroup.co') {
            alert("You don't have permissions to do this action!!!");
            return;
        }

        const { name, price, images, brandId, categoryId, description } = product;
        Products.insert({
            name, price, images, brandId, categoryId, description
        });
    }
})