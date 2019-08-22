import { Mongo } from 'meteor/mongo';
import { Meteor } from 'meteor/meteor';
import { check } from 'meteor/check';
import { SimpleSchema } from 'meteor/aldeed:simple-schema'

export const Orders = new Mongo.Collection('orders');

OrderSchema = new SimpleSchema({
    createAt: { type: Date },
    detail: { type: [Object] },
    total: { type: Number, min: 0 },
    status: {
        type: String,
        allowedValues: ['pending', 'completed', 'canceled']
    }
});

Orders.attachSchema(OrderSchema);

Meteor.methods({
    ordersInsert: (order) => {
        const { createAt, detail, total } = order;

        const status = 'pending';

        Orders.insert({
            createAt, detail, total, status
        });
    }
})