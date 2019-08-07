import { Meteor } from 'meteor/meteor';
import '../imports/api/subjects';
import { Subjects } from '../imports/api/subjects';
import { KindOfClothes, Categories } from '../imports/api/kind-of-clothes';

Meteor.startup(() => {

    getSubjects = () => {
        return [
            { id: 1, name: "Men", route: "/men", img: "/men.png" },
            { id: 2, name: "Ladies", route: "/ladies/dresses", img: "/ladies.png" },
            { id: 3, name: "Girls", route: "/girls", img: "/girls.png" },
            { id: 4, name: "Boys", route: "/boys", img: "/boys.png" }
        ];
    }

    getKindOfClothes = () => {
        return [
            { id: 1, name: "T-Shirts", subjectId: 1 },
            { id: 2, name: "Pants", subjectId: 1 },
            { id: 3, name: "Jeans", subjectId: 1 },
            { id: 4, name: "Shorts", subjectId: 1 },
            { id: 5, name: "Shoes", subjectId: 1 },
            { id: 6, name: "Sales", subjectId: 1 },
            { id: 7, name: "Tops", subjectId: 2 },
            { id: 8, name: "Bottoms", subjectId: 2 },
            { id: 9, name: "Dresses", subjectId: 2 },
            { id: 10, name: "Jackets", subjectId: 2 },
            { id: 11, name: "Shoes", subjectId: 2 },
            { id: 12, name: "Accessories", subjectId: 2 },
            { id: 13, name: "Sales", subjectId: 2 },
            { id: 14, name: "Skirts", subjectId: 3 },
            { id: 15, name: "Dresses", subjectId: 3 },
            { id: 16, name: "Shoes", subjectId: 3 },
            { id: 17, name: "Sales", subjectId: 3 },
            { id: 18, name: "Accessories", subjectId: 3 },
            { id: 19, name: "Accessories", subjectId: 3 },
            { id: 20, name: "T-Shirts", subjectId: 4 },
            { id: 21, name: "Shorts", subjectId: 4 },
            { id: 22, name: "Shoes", subjectId: 4 },
            { id: 23, name: "Sales", subjectId: 4 },
        ];
    }

    getCategories = () => {
        return [
            { id: 1, name: "Rompers/Jumpsuits", kindOfClothesId: 9 },
            { id: 2, name: "Casual dresses", kindOfClothesId: 9 },
            { id: 3, name: "Going out dresses", kindOfClothesId: 9 },
            { id: 4, name: "Party/Occasion dresses", kindOfClothesId: 9 },
            { id: 5, name: "Mini dresses", kindOfClothesId: 9 },
            { id: 6, name: "Maxi/Midi dresses", kindOfClothesId: 9 },
            { id: 7, name: "Sets", kindOfClothesId: 9 },
            { id: 8, name: "Casual T-Shirts", kindOfClothesId: 1 },
        ];
    }

    // check to see if data exists in menus collection
    const numberOfSubject = Subjects.find({}).count();  
    const numberOfKind = KindOfClothes.find({}).count();
    const numberOfCategory = Categories.find({}).count();
 
    if (!numberOfSubject) {
        // Generate data when it's empty
        this.getSubjects().map(menu => {
            const { id, name, route, img } = menu;
            Subjects.insert({
                id, name, route, img
            });
        });
    }

    if (!numberOfKind) {
        this.getKindOfClothes().map(kind => {
            const { id, name, subjectId } = kind;
            KindOfClothes.insert({
                id, name, subjectId
            });
        });
    }

    if (!numberOfCategory) {
        this.getCategories().map(cat => {
            const { id, name, kindOfClothesId } = cat;
            Categories.insert({
                id, name, kindOfClothesId
            });
        });
    }

    Meteor.publish('subjects', function () {
        return Subjects.find({});
    });

    Meteor.publish('kindOfClothes', function () {
        return KindOfClothes.find({});
    });

    Meteor.publish('categories', function (id) {
        return Categories.find({ kindOfClothesId: id });
    });
});
