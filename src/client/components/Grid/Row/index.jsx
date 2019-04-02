import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';

import styles from './styles.styl';

export default class Row extends PureComponent {
	static propTypes = {
		children: PropTypes.node.isRequired,
		className: PropTypes.string,
		verticalCenter: PropTypes.bool,
	};

	static defaultProps = {
		className: null,
		verticalCenter: false,
	};

	render() {
		const { verticalCenter, children, className } = this.props;
		const classes = cx(
			styles.row,
			className,
			verticalCenter && styles.rowVerticalCenter,
		);

		return <div className={classes}>{children}</div>;
	}
}
