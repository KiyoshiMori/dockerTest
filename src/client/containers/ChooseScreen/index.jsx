import React, { Component } from 'react';

import Table from 'containers/Table';
import ChooseScreenComponent from './components/ChooseScreenComponent';

export default class ChooseScreen extends Component {
	state = {
		dataSize: null,
	};

	handleChoose = type => this.setState({ dataSize: type });

	render() {
		const { dataSize } = this.state;

		if (!dataSize) {
			return (
				<ChooseScreenComponent
					chooseSmall={() => this.handleChoose('small')}
					chooseLarge={() => this.handleChoose('large')}
				/>
			);
		}

		return <Table dataSize={dataSize} />;
	}
}