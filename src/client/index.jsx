import React, { Component } from 'react';

import Header from 'components/Header';
import Table from 'containers/Table';

export default class App extends Component {
	render() {
		return (
			<div>
				<Header />
				<Table />
			</div>
		);
	}
}