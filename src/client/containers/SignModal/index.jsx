import React, { Component } from 'react';
import { ApolloConsumer } from 'react-apollo';
import Modal from 'react-modal';

import Input from 'components/Input';
import Button from 'components/Button';

import styles from './styles.styl';

import { login as loginQuery, signup, getInfo } from 'lib/graphql/queries/UserQueries';

const initialState = {
	isReg: false,
	login: '',
	password: '',
	confirmPassword: '',
};

export default class SignModal extends Component {
	state = initialState;

	toggleRegistration = () => this.setState(state => ({ isReg: !state.isReg }));

	handleInput = e => this.setState({ [e.target.name]: e.target.value });

	clearInputs = () => this.setState(initialState);

	render() {
		const { closeSignModal, isModalOpened, refetchUserInfo } = this.props;
		const { isReg, login, password, confirmPassword } = this.state;

		const queryOptions = {
			[isReg ? 'mutation' : 'query']: isReg ? signup : loginQuery,
			variables: {
				login,
				password,
			},
			fetchPolicy: 'no-cache',
		};

		return (
			<Modal
				isOpen={isModalOpened}
				onRequestClose={() => {
					closeSignModal();
					this.clearInputs();
				}}
				className={styles.modal}
				overlayClassName={styles.modalOverlay}
			>
				<ApolloConsumer>
					{client => (
						<form
							onSubmit={async e => {
								e.preventDefault();
								const fn = isReg ? client.mutate : client.query;

								await fn({ ...queryOptions });
								await refetchUserInfo();

								closeSignModal();
								this.clearInputs();
							}}
						>
							<Input
								label="Login"
								name="login"
								value={login}
								onChange={this.handleInput}
							/>
							<Input
								label="Password"
								type="password"
								name="password"
								value={password}
								onChange={this.handleInput}
							/>
							{isReg && (
								<Input
									label="Confirm password"
									type="password"
									name="confirmPassword"
									value={confirmPassword}
								/>
							)}
							<div className={styles.buttons}>
								<Button size="wide" type="submit">
									{isReg ? 'Register' : 'Login'}
								</Button>
								<Button
									onClick={this.toggleRegistration}
									secondary
									size="wide"
								>
									{isReg ? 'Login' : 'Registration'}
								</Button>
							</div>
						</form>
					)}
				</ApolloConsumer>
			</Modal>
		);
	}
}