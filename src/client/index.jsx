import React, { Component } from 'react';

import Header from 'components/Header';
import ChooseScreen from 'containers/ChooseScreen';

export default class App extends Component {
	render() {
		return (
			<div>
				<Header />
				<ChooseScreen />
			</div>
		);
	}
}