import { Mongo } from 'meteor/mongo';

export const Subjects = new Mongo.Collection('subjects');

SubjectSchema = new SimpleSchema({
    id: { type: Number },
    name: { type: String },
    route: { type: String },
    img: { type: String }
});

Subjects.attachSchema(SubjectSchema);
