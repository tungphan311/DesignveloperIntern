import { Mongo } from 'meteor/mongo';
import { Meteor } from 'meteor/meteor';
import { check } from 'meteor/check';
import { SimpleSchema } from 'meteor/aldeed:simple-schema'
import { ProductDetails } from './product-details';

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
        // regEx: SimpleSchema.RegEx.Id 
    },
    categoryId: { 
        type: String, 
        // regEx: SimpleSchema.RegEx.Id 
    },
    kindOfClothesId: { 
        type: String,
        // regEx: SimpleSchema.RegEx.Id 
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
            throw new Meteor.Error('account-error' ,"You don't have permissions to do this action!!!");
        }

        Products.remove(productId);
    },

    'products.insert'(users, product, sizes, colors) {
        check(product, ProductSchema);

        if (!users || users.emails[0].address !== 'tungpt@dgroup.co') {
            throw new Meteor.Error('account-error', "You don't have permissions to do this action!!!");
        }

        const { name, price, images, brandId, categoryId, kindOfClothesId, quantity, description, createAt } = product;
        // const { id, name, price, images, brandId, categoryId, kindOfClothesId } = product;
        
        Products.insert({
            name, price, images, brandId, categoryId, kindOfClothesId, quantity, description, createAt
        }, (error, response) => {
            if (error) {
                throw new Meteor.Error('add-error' ,error);
            }

            if (response) {
                sizes.map(size => {
                    colors.map(color => {

                        ProductDetails.insert({
                            productId: response, size, colorId: color,
                        }, (error) => {
                            if (error) {
                                Products.remove(response);
                                throw new Meteor.Error('add-detail-error', error);
                            }
                        })
                    })
                })
            }
        });

    },

    'products.update'(productId, amount) {
        Products.update({ _id: productId }, { $inc: { quantity: amount } });
        // Products.update({ _id: productId }, { $set: { quantity: amount } });
    }
})