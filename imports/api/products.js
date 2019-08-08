import { Mongo } from 'meteor/mongo';

export const Products = new Mongo.Collection('products');

export const Brands = new Mongo.Collection('brands');