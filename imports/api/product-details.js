import { Mongo } from 'meteor/mongo';
import { check } from 'meteor/check';
import { Meteor } from 'meteor/meteor';
import { SimpleSchema } from 'meteor/aldeed:simple-schema'

export const ProductDetails = new Mongo.Collection('productDetails');

// ProductDetailsSchema = new SimpleSchema({
//     productId: { 
//         type: String, 
//         regEx: SimpleSchema.RegEx.Id 
//     },
//     size: { 
//         type: String,  
//         allowedValues: ['S', 'M', 'L']
//     },
//     colorId: {
//         type: String,
//         regEx: SimpleSchema.RegEx.Id 
//     },
// });

// ProductDetails.attachSchema(ProductDetailSchema);