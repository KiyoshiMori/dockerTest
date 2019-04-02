import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Mutation } from 'react-apollo';
import Modal from 'react-modal';

import Input from 'components/Input';
import Button from 'components/Button';
import Heading from 'components/Heading';

import styles from './styles.styl';

import { addFieldMutation, getDataQuery } from 'lib/graphql/queries/Data';

const initialState = {
	firstName: '',
	lastName: '',
	email: '',
	phone: '',
	touched: [],
};

export default class SignModal extends Component {
	static propTypes = {
		isModalOpened: PropTypes.bool,
		closeModal: PropTypes.func,
		dataSize: PropTypes.oneOf(['small', 'large']),
	};

	static defaultProps = {
		isModalOpened: false,
		closeModal: () => console.log('close modal'),
		dataSize: 'small',
	};

	state = initialState;

	handleInput = e => this.setState({ [e.target.name]: e.target.value });

	handleTouched = e => {
		e.persist();
		this.setState(state => ({
			touched: {
				...state.touched,
				[e.target?.name]: true,
			},
		}));
	};

	/**
	 * Check if input was touched and still empty
	 */
	isError = name => {
		const { touched } = this.state;

		console.log({ touched });

		if (touched[name] && !this.state[name]) {
			return true;
		} else {
			return false;
		}
	};

	clearInputs = () => this.setState(initialState);

	render() {
		const { isModalOpened, closeModal, dataSize } = this.props;
		const {
			firstName,
			lastName,
			email,
			phone,
		} = this.state;

		const disabled = !firstName || !lastName || !email || !phone;

		return (
			<Modal
				isOpen={isModalOpened}
				onRequestClose={() => {
					closeModal();
					this.clearInputs();
				}}
				className={styles.modal}
				overlayClassName={styles.modalOverlay}
			>
				<div className={styles.modalHeader}>
					<Heading
						type="h2"
						bold
					>
						Add new user
					</Heading>
				</div>
				<Mutation
					mutation={addFieldMutation}
					update={(cache, { data: { addField } }) => {
						const data = cache.readQuery({
							query: getDataQuery,
							variables: {
								type: dataSize,
							},
						});

						cache.writeQuery({
							query: getDataQuery,
							data: {
								getData: [
									...data.getData,
									{
										...addField,
										address: null,
										description: '',
									},
								],
							},
							variables: {
								type: dataSize,
							},
						});
					}}
				>
					{(mutate, { loading }) => (
						<form
							onSubmit={async e => {
								if (disabled) return;

								e.preventDefault();
								await mutate({
									variables: {
										id: 1001,
										firstName,
										lastName,
										phone,
										email,
									},
								});
								closeModal();
								this.clearInputs();
							}}
						>
							<Input
								label="First name"
								name="firstName"
								value={firstName}
								onChange={this.handleInput}
								onBlur={this.handleTouched}
								error={this.isError('firstName')}
							/>
							<Input
								label="Last name"
								name="lastName"
								value={lastName}
								onChange={this.handleInput}
								onBlur={this.handleTouched}
								error={this.isError('lastName')}
							/>
							<Input
								label="Email"
								name="email"
								value={email}
								onChange={this.handleInput}
								onBlur={this.handleTouched}
								error={this.isError('email')}
							/>
							<Input
								label="Phone"
								name="phone"
								value={phone}
								onChange={this.handleInput}
								onBlur={this.handleTouched}
								error={this.isError('phone')}
							/>
							<Button
								type="submit"
								loading={loading}
								disabled={disabled}
							>
								Save
							</Button>
						</form>
					)}
				</Mutation>
			</Modal>
		);
	}
}