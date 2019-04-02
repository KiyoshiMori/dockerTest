import React, { Component, Fragment } from 'react';
import { ApolloConsumer } from 'react-apollo';

import Heading from 'components/Heading';
import Button from 'components/Button';

import stylus from './styles.styl';

import { logout } from 'lib/graphql/queries/UserQueries';

export default class Header extends Component {
	render() {
		const {
			loggined,
			username,
			openSignModal,
			refetchUserInfo,
		} = this.props;

		return (
			<div className={stylus.container}>
				<Heading type="h1">simpleCrud</Heading>
				<div className={stylus.buttonsGroup}>
					{loggined
						? (
							<Fragment>
								<Heading type="h2">
									Hello, { username }!
								</Heading>
								<ApolloConsumer>
									{client => (
										<Button
											text
											onClick={async () => {
												await client.query({
													query: logout,
													fetchPolicy: 'no-cache',
												});

												refetchUserInfo();
											}}
										>
											logout
										</Button>
									)}
								</ApolloConsumer>
							</Fragment>
						)
						: (
							<Button
								text
								onClick={openSignModal}
							>
								login
							</Button>
						)
					}
				</div>
			</div>
		);
	}
}