import React, { Component, Fragment } from 'react';
import { ApolloConsumer } from 'react-apollo';

import Heading from 'components/Heading';
import Button from 'components/Button';

import stylus from './styles.styl';

export default class Header extends Component {
	render() {
		return (
			<div className={stylus.container}>
				<Heading type="h1">Project</Heading>
			</div>
		);
	}
}