import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import Heading from 'components/Heading';

import styles from './styles.styl';

export default class Row extends PureComponent {
	static propTypes = {
		children: PropTypes.node.isRequired,
		className: PropTypes.string,
		textarea: PropTypes.bool,
		icon: PropTypes.oneOf(['search']),
		error: PropTypes.bool,
	};

	static defaultProps = {
		className: null,
		textarea: false,
		icon: null,
		error: false,
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
			icon,
			error,
			...rest
		} = this.props;

		const classes = cx(
			styles.input,
			icon && styles.inputWithIcon,
			error && styles.inputError,
			className,
		);

		return (
			<div>
				{label && <Heading type="h2" color="gray">{label}</Heading>}
				<div className={styles.iconContainer}>
					<Component
						className={classes}
						{...rest}
					/>
					{icon && (
						<FontAwesomeIcon
							icon={icon}
							className={styles.icon}
						/>
					)}
				</div>
			</div>
		);
	}
}
