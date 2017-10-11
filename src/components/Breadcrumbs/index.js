import React, { Component } from 'react';
import { connect } from 'react-redux';
import './styles.css';

class Breadcrumbs extends Component {
  constructor(props) {
    super(props);

    this.state = {
      breadcrumbs: this.props.breadcrumbs
    }
  }

  render() {
  	let breadcrumbs = this.props.breadcrumbs;

    if(!breadcrumbs) {
      return <div className="hidden-breadcrumbs" />
    }

    return (
      <p className="ML-breadcrubs">
   			{breadcrumbs.map((crumb, index) => {
					if(index === breadcrumbs.length - 1) return <span key={index}><b> {crumb}</b></span>
					return <span key={index}> {crumb} ></span>
				})}
			</p>
    );
  }
};

function mapStateToProps(state, ownProps) {
  return {
    breadcrumbs: state.breadcrumbs.categories
  };
}


export default connect(mapStateToProps)(Breadcrumbs);
