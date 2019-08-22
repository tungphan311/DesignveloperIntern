import { Mongo } from 'meteor/mongo';
import { Meteor } from 'meteor/meteor';
import { check } from 'meteor/check';
import { SimpleSchema } from 'meteor/aldeed:simple-schema'

export const Orders = new Mongo.Collection('orders');

OrderSchema = new SimpleSchema({
    createAt: { type: Date },
    detail: { type: Array },
    'detail.$': { type: Object, blackbox: true },
    total: { type: Number, min: 0 },
    status: {
        type: String,
        allowedValues: ['pending', 'completed', 'canceled']
    }
});

Orders.attachSchema(OrderSchema);

if (Meteor.isServer) {
    Meteor.methods({
        'orders.insert'(cart, total) {
    
            console.log(cart)
            const status = 'pending';
    
            const createAt = new Date();
            // const detail = [...cart];
            Orders.insert({
                createAt, detail: cart, total, status
            }, error => {
                if (error) {
                    throw new Meteor.Error('insert-failed', 'Create order failed!!');
                }
            });
        },

        'orders.update'(orderId, status) {
            Orders.update({ _id: { $eq: orderId } }, { $set: { status: status } }, (error) => {
                if (error) {
                    throw new Meteor.Error('update-failed', 'Update status failed!!');
                }
            });
        }
    })
}
