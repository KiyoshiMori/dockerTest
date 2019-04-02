import React, { Component } from 'react';

import { Row } from 'components/Grid';
import Input from 'components/Input';

import styles from './styles.styl';

export default ({ value, onChange }) => (
	<Row className={styles.container}>
		<div className={styles.searchBar}>
			<Input
				name="searchValue"
				value={value}
				onChange={onChange}
				icon="search"
			/>
		</div>
	</Row>
);