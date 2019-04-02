import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';

import Heading from 'components/Heading';

import styles from './styles.styl';

export default class Row extends PureComponent {
	static propTypes = {
		children: PropTypes.node.isRequired,
		className: PropTypes.string,
		textarea: PropTypes.bool,
	};

	static defaultProps = {
		className: null,
		textarea: false,
	};

	Component = props => {
		const { textarea } = this.props;

		if (textarea) {
			return (
				<textarea
					{...props}
					className={cx(styles.inputArea, props.className)}
					rows={4}
					cols={20}
				/>
			);
		} else {
			return (
				<input
					{...props}
				/>
			);
		}
	};

	render() {
		const { Component } = this;
		const {
			className,
			label,
			...rest
		} = this.props;

		const classes = cx(
			className,
		);

		return (
			<div className={classes}>
				{label && <Heading type="h2" color="gray">{label}</Heading>}
				<Component
					className={styles.input}
					{...rest}
				/>
			</div>
		);
	}
}
