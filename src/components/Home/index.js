import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as breadcrumbsActions from '../../actions/breadcrumbsActions';

const endpoint = 'http://localhost:3001/api';

class Home extends Component {
	componentDidMount() {
		this.props.actions.updateBreadcrumbs([]);
	}

  render() {
    return (<span />);
  }
};

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(breadcrumbsActions, dispatch)
  };
}

export default connect(null, mapDispatchToProps)(Home);
