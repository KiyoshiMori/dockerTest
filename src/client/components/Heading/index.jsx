import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';

import styles from './styles.styl';

export default class Header extends PureComponent {
	static propTypes = {
		type: PropTypes.oneOf(['h1', 'h2', 'h3']).isRequired,
		secondary: PropTypes.bool,
		bold: PropTypes.bool,
		color: PropTypes.string,
	};

	static defaultProps = {
		secondary: false,
		bold: false,
		color: null,
	};

	render() {
		const { type, secondary, bold, color, children } = this.props;

		const classes = cx(
			styles[type],
			secondary && styles.secondary,
			bold && styles.bold,
		);

		return (
			<div className={classes} style={{ color }}>
				{children}
			</div>
		);
	}
}