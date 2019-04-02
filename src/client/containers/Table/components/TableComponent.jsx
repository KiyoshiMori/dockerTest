import React, { Component, Fragment } from 'react';
import cx from 'classnames';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { Row, Col } from 'components/Grid';
import Heading from 'components/Heading';
import Loader from 'components/Loader';

import styles from './styles.styl';

const TableCells = [
	{
		name: 'Id',
		size: 1,
	},
	{
		name: 'First name',
		size: 2,
	},
	{
		name: 'Last name',
		size: 2,
	},
	{
		name: 'Email',
		size: 4,
	},
	{
		name: 'Phone',
		size: 3,
	},
];

export default class TableComponent extends Component {
	state = {
		sortBy: {
			name: 'Id',
			asc: false,
		},
	};

	translateCelName = name => {
		switch (name) {
		case 'Id':
			return 'id';
		case 'First name':
			return 'firstName';
		case 'Last name':
			return 'lastName';
		case 'Email':
			return 'email';
		case 'Phone':
			return 'phone';
		default:
			return null;
		}
	};

	sortBy = (a, b) => {
		const { sortBy: { name, asc } } = this.state;

		const translatedName = this.translateCelName(name);

		if (asc) {
			return a[translatedName] > b[translatedName] ? 1 : -1;
		} else {
			return b[translatedName] > a[translatedName] ? 1 : -1;
		}
	};

	handleSort = name => this.setState(state => ({
		sortBy: {
			name,
			asc: name === state.sortBy?.name ? !state.sortBy?.asc : false,
		},
	}));

	render() {
		const { loading, data, currentPage } = this.props;
		const { sortBy } = this.state;

		if (loading) return <Loader />;

		return (
			<Fragment>
				<Row>
					{TableCells.map(cell => (
						<Col
							size={cell.size}
							className={cx(styles.tableCol, styles.tableColMain)}
							onClick={() => this.handleSort(cell.name)}
						>
							<Heading type="h1">
								{cell.name}
								{(sortBy.name === cell.name) && (
									<FontAwesomeIcon
										icon="caret-down"
										className={sortBy.asc ? styles.up : ''}
									/>
								)}
							</Heading>
						</Col>
					))}
					{data?.sort(this.sortBy)
						.slice(((currentPage - 1) * 50), (currentPage * 50))
						.map(user => (
							<div className={styles.tableRow}>
								<Col size={TableCells[0].size} className={styles.tableCol}>
									<Heading type="h1">{user.id}</Heading>
								</Col>
								<Col size={TableCells[1].size} className={styles.tableCol}>
									<Heading type="h1">{user.firstName}</Heading>
								</Col>
								<Col size={TableCells[2].size} className={styles.tableCol}>
									<Heading type="h1">{user.lastName}</Heading>
								</Col>
								<Col size={TableCells[3].size} className={styles.tableCol}>
									<Heading type="h1">{user.email}</Heading>
								</Col>
								<Col size={TableCells[4].size} className={styles.tableCol}>
									<Heading type="h1">{user.phone}</Heading>
								</Col>
							</div>
					))}
				</Row>
			</Fragment>
		);
	}
}