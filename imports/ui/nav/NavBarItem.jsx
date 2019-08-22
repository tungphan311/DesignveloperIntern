import React, { Component } from 'react';
import { withTracker } from 'meteor/react-meteor-data';
import { Meteor } from 'meteor/meteor';
import { Subjects } from '../../api/subjects';

class NavBarItem extends Component {
    constructor(props) {
        super(props);
        this.wrapperRef = React.createRef()
    }

    onBlur = () => {
        this.props.showDropdown(false);
    }

    componentDidUpdate = () => {
        if (this.props.show) {
            document.getElementById('dropdown').focus();
        }
    }

    renderDropdown = () => {
        return this.props.item.map(child => (
            <React.Fragment key={child._id}>
                <button id={child.name} className="btn-group-item" name="btnNavbar" onClick={this.toProductList}>
                    {child.name}
                </button>
            </React.Fragment>
        ));
    }

    toProductList = (e) => {
        let kind = e.target.id;
        // kind = kind.toLowerCase();
        const { subject, history } = this.props;
        
        history.push('/products/' + subject.name + '/' + kind);
        window.location.reload();
    }

    render() {
        return (
            <div className="dropdown" id="dropdown" ref={this.wrapperRef} name="bavbarItem">
                { this.props.show &&
                    <div className="btn-group" role="group">
                        {this.renderDropdown()}
                    </div>
                }
            </div>
        );
    }
}

export default withTracker((props) => {
    Meteor.subscribe('subjects');

    const { subjectId } = props;

    return {
        subject: Subjects.findOne({ _id: subjectId }),
    }
})(NavBarItem);