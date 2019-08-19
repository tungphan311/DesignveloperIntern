import { Mongo } from 'meteor/mongo';
import { Meteor } from 'meteor/meteor';
import { check } from 'meteor/check';

export const Products = new Mongo.Collection('products');

// Products.allow({
//     remove: function(users, doc) {
//         console.log(users);
//         return false;
//     }
// });

Meteor.methods({
    'products.remove'(users, productId) {
        check(productId, String);

        if (!users) {
            alert("You don't have permissions to do this action!!!");
            return;
        }

        if (users.emails[0].address == 'tungpt@dgroup.co') {
            console.log('allow remove');
            Products.remove(productId);
        }
    }
})