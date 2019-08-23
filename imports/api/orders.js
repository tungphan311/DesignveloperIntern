import { Mongo } from 'meteor/mongo';
import { Meteor } from 'meteor/meteor';
import { check } from 'meteor/check';
import { SimpleSchema } from 'meteor/aldeed:simple-schema';
import { Email } from 'meteor/email';

const nodemailer = require('nodemailer');
const xoauth2 = require('xoauth2');

export const Orders = new Mongo.Collection('orders');

OrderSchema = new SimpleSchema({
    createAt: { type: Date },
    detail: { type: Array },
    'detail.$': { type: Object, blackbox: true },
    total: { type: Number, min: 0 },
    status: {
        type: String,
        allowedValues: ['pending', 'completed', 'canceled']
    },
    username: { 
        type: String,
        regEx: SimpleSchema.RegEx.Email,
    }
});

Orders.attachSchema(OrderSchema);

if (Meteor.isServer) {
    Meteor.methods({
        'orders.insert'(cart, total, username) {
            const status = 'pending';
    
            const createAt = new Date();
            // const detail = [...cart];
            return Orders.insert({
                createAt, detail: cart, total, status, username
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
        },

        sendEmail(to, from, subject, html) {
            check([to, from, subject], [String]);

            this.unblock();

            let transporter = nodemailer.createTransport({
                host: 'smtp.gmail.com',
                port: 465,
                secure: true,
                auth: {
                    user: "tungpt@dgroup.co",
                    pass: "tung3101",
                }
            });
        
            transporter.verify(function(error, success) {
                if (error) {
                  console.log(error);
                } else {
                  console.log("Server is ready to take our messages");
                }
            });
            
            console.log(html);

            const mailData = {
                from, to, subject, html
            }

            // Email.send(to, from, subject, text);
            transporter.sendMail(mailData, function(error, info) {
                if (error) {
                    console.log(error);
                    return;
                }
                console.log('Message sent');
                transporter.close();
            });
        }
    })
}
