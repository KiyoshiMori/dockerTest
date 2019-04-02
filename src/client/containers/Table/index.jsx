import React, { Component } from 'react';
import { Row, Col } from 'components/Grid';

import styles from './styles.styl';

const TableCols = ['Id', 'First name', 'Last name', 'email', 'phone'];

export default class Table extends Component {
	render() {
		return (
			<Row>
				{TableCols.map(colName => (
					<Col size={2} className={styles.col}>
						{colName}
					</Col>
				))}
			</Row>
		);
	}
}
