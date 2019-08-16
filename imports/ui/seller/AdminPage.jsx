import React, { Component } from 'react';
import { withTracker } from 'meteor/react-meteor-data';
import { Meteor } from 'meteor/meteor';
import { Redirect } from 'react-router-dom';

class AdminPage extends Component {
   
    checkUser = () => {
        const user = this.props.currentUser;
        if (user && user.emails[0].address !== 'tungpt@dgroup.co') {
            Meteor.logout((error) => {
                if (error) {
                    alert(error);
                }
            });
        }
    }
    render() { 
        const user = this.props.currentUser;
        return ( 
            <div>
               { this.checkUser() }

                { !user &&
                    <Redirect to='/admin/login' />
                }
                    
            </div>
        );
    }
}
 
export default withTracker(() => {

    return {
        currentUser: Meteor.user(),
    }
})(AdminPage);