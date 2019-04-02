import React, { Component, Fragment } from 'react';
import { Query } from 'react-apollo';

import { getDataQuery } from 'lib/graphql/queries/Data';

import { Row, Col } from 'components/Grid';
import TableComponent from './components/TableComponent';
import Pagination from './components/Pagination';
import SearchBar from './components/SearchBar'

import styles from './styles.styl';

export default class Table extends Component {
	state = {
		currentPage: 1,
		searchValue: '',
	};

	changePage = page => this.setState({ currentPage: page });

	handleInput = e => this.setState({ [e.target.name]: e.target.value });

	render() {
		const { currentPage, searchValue } = this.state;

		return (
			<Query
				query={getDataQuery}
				variables={{
					type: 'large',
				}}
				errorPolicy="all"
			>
				{({ data: { getData: data }, error }) => {
					if (error) return <div>Error</div>;
					return (
						<Fragment>
							<SearchBar
								value={searchValue}
								onChange={this.handleInput}
							/>
							<TableComponent
								data={data}
								currentPage={currentPage}
								searchText={searchValue}
							/>
							<Pagination
								pages={data?.length / 50}
								currentPage={currentPage}
								changePage={this.changePage}
							/>
						</Fragment>
					);
				}}
			</Query>
		);
	}
}
