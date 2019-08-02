import { Meteor } from 'meteor/meteor';
import '../imports/api/menus';
import { Menus } from '../imports/api/menus';

Meteor.startup(() => {
    getMenus = () => {
        return [
            { name: "Men", children: [ "T-Shirts", "Pants", "Jeans", "Shorts", "Shoes", "Sales" ], route: "/men", img: './men.png'  },
            { name: "Ladies", children: [ "Tops", "Bottoms", "Dresses", "Jackets", "Shoes", "Accessories", "Sales" ], route: "/ladies", img: "./ladies.png" },
            { name: "Girls", children: [ "Skirts", "Dresses", "Shoes", "Sales", "Accessories" ], route: "/girls", img: "./girls.png" },
            { name: "Boys", children: [ "T-Shirts", "Shorts", "Shoes", "Sales" ], route: "/boys", img: "./boys.png" }
        ];
    }

    // check to see if data exists in menus collection
    const numberRecords = Menus.find({}).count();  
 
    if (!numberRecords) {
        // Generate data when it's empty
        this.getMenus().map(menu => {
            const { name, children, route, img } = menu;
            Menus.insert({
                name, children, route, img
            });
        });
    }

    Meteor.publish('menus', function menuPublishcation() {
        return Menus.find();
    });
});
