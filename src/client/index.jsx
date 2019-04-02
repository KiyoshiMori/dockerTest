import React, { Component, Fragment } from 'react';
import { Switch, Route } from 'react-router';
import { Query } from 'react-apollo';

import Header from 'components/Header';

import MainPage from 'containers/MainPage';
import SignModal from 'containers/SignModal';

import { getInfo } from 'lib/graphql/queries/UserQueries';

export default class extends Component {
	state = {
		loginModalOpened: false,
	};

	handleToggleModal = () => this.setState(state => ({ loginModalOpened: !state.loginModalOpened }));

	render() {
		const { loginModalOpened } = this.state;

		return (
			<Query
				query={getInfo}
			>
				{({ data: { getInfo = {} }, refetch }) => {
					const { authorized, username } = getInfo;

					return (
						<Fragment>
							<Header
								loggined={authorized}
								username={username}
								openSignModal={this.handleToggleModal}
								refetchUserInfo={refetch}
							/>
							<Switch>
								<Route
									render={() => (
										<MainPage
											username={username}
											loggined={authorized}
										/>
									)}
								/>
							</Switch>
							<SignModal
								isModalOpened={loginModalOpened}
								closeSignModal={this.handleToggleModal}
								refetchUserInfo={refetch}
							/>
						</Fragment>
					)
				}}
			</Query>
		);
	}
}
