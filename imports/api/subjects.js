import { Mongo } from 'meteor/mongo';

export const Subjects = new Mongo.Collection('subjects');

SubjectSchema = new SimpleSchema({
    name: { type: String },
    route: { type: String },
    img: { type: String }
});

Subjects.attachSchema(SubjectSchema);
