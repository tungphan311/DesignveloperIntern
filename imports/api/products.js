import { Mongo } from 'meteor/mongo';
import { Meteor } from 'meteor/meteor';
import { check } from 'meteor/check';
import { SimpleSchema } from 'meteor/aldeed:simple-schema'

export const Products = new Mongo.Collection('products');

ProductSchema = new SimpleSchema({
    name: { type: String },
    price: { type: Number },
    images: { 
        type: [String], 
        minCount: 1, 
        maxCount: 5 
    },
    brandId: { 
        type: String, 
        regEx: SimpleSchema.RegEx.Id 
    },
    categoryId: { 
        type: String, 
        regEx: SimpleSchema.RegEx.Id 
    },
    kindOfClothesId: { 
        type: String,
        regEx: SimpleSchema.RegEx.Id 
    },
    quantity: { type: Number, min: 0 },
    description: { 
        type: String, 
        optional: true 
    },
    createAt: { type: Date }
});

Meteor.methods({
    'products.remove'(users, productId) {
        check(productId, String);

        if (!users || users.emails[0].address !== 'tungpt@dgroup.co') {
            throw new Error("You don't have permissions to do this action!!!");
        }

        Products.remove(productId);
    },

    'products.insert'(users, product) {
        check(product, ProductSchema);

        if (!users || users.emails[0].address !== 'tungpt@dgroup.co') {
            throw new Meteor.Error('account-error', "You don't have permissions to do this action!!!");
        }

        // const { name, price, images, brandId, categoryId, quantity, description, createAt } = product;
        const { id, name, price, images, brandId, categoryId, kindOfClothesId } = product;
        
        return Products.insert({
            id, name, price, images, brandId, categoryId, kindOfClothesId
        }, (error) => {
            if (error) {
                throw new Meteor.Error('add-error' ,error);
            }
        });

    }
})