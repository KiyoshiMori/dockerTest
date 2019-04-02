import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';

import styles from './styles.styl';

export default class Col extends PureComponent {
	static propTypes = {
		/** default */
		size: PropTypes.oneOf([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]),
		/** desc */
		sizeL: PropTypes.number,
		/** tablet */
		sizeMd: PropTypes.number,
		/** mobile */
		sizeSm: PropTypes.number,
		/** left offset */
		offsetSize: PropTypes.number,
		stretchHeight: PropTypes.bool,
		children: PropTypes.node.isRequired,
		className: PropTypes.string,
	};

	static defaultProps = {
		size: 12,
		sizeL: null,
		sizeMd: null,
		sizeSm: null,
		offsetSize: null,
		stretchHeight: false,
		className: null,
	};

	render() {
		const {
			size,
			sizeL,
			sizeMd,
			sizeSm,
			offsetSize,
			stretchHeight,
			children,
			className,
		} = this.props;

		const classes = cx(
			styles.col,
			styles[`col-${size}`],
			sizeL && styles[`col-l-${sizeL}`],
			sizeMd && styles[`col-md-${sizeMd}`],
			sizeSm && styles[`col-sm-${sizeSm}`],
			offsetSize && styles[`col-offset-${offsetSize}`],
			stretchHeight && styles.colFlex,
			className,
		);

		return <div className={classes}>{children}</div>;
	}
}
