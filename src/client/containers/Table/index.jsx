import React, { Component, Fragment } from 'react';
import { Query } from 'react-apollo';

import { getDataQuery } from 'lib/graphql/queries/Data';

import { Row, Col } from 'components/Grid';
import Button from 'components/Button';
import TableComponent from './components/TableComponent';
import Pagination from './components/Pagination';
import SearchBar from './components/SearchBar';
import UserAddModal from './components/UserAddModal';

import styles from './styles.styl';

export default class Table extends Component {
	state = {
		currentPage: 1,
		searchValue: '',
		isModalOpened: false,
	};

	changePage = page => this.setState({ currentPage: page });

	handleInput = e => this.setState({ [e.target.name]: e.target.value });

	handleToggleModal = () => this.setState(state => ({ isModalOpened: !state.isModalOpened }));

	tableFilter = data => {
		const { searchValue } = this.state;

		return JSON.stringify(data).toLocaleLowerCase().includes(searchValue);
	};

	render() {
		const { currentPage, searchValue, isModalOpened } = this.state;

		return (
			<Query
				query={getDataQuery}
				variables={{
					type: 'large',
				}}
				errorPolicy="all"
			>
				{({ data, error, loading }) => {
					if (error) return <div>Error</div>;

					const filtredData = data?.getData?.filter(this.tableFilter);

					return (
						<Fragment>
							<Row className={styles.container}>
								{!loading && (
									<Fragment>
										<Button
											onClick={this.handleToggleModal}
										>
											Add new user
										</Button>
										<UserAddModal
											isModalOpened={isModalOpened}
											closeModal={this.handleToggleModal}
										/>
										<SearchBar
											value={searchValue}
											onChange={this.handleInput}
										/>
									</Fragment>
								)}
							</Row>
							<TableComponent
								loading={loading}
								data={filtredData}
								currentPage={currentPage}
								searchText={searchValue}
							/>
							<Pagination
								loading={loading}
								pages={Math.ceil(filtredData?.length / 50)}
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
