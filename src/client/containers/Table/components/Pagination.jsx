import React, { Component } from 'react';

import Button from 'components/Button';
import Heading from 'components/Heading';
import { Row } from 'components/Grid';

import styles from './styles.styl';

export default ({ pages, currentPage, changePage }) => (
	<Row className={styles.container}>
		<div className={styles.pagination}>
			<Button
				size="wide"
				onClick={() => changePage(currentPage - 1)}
				disabled={currentPage === 1}
			>
				Previous
			</Button>
			<Heading type="h2">{currentPage} of {pages}</Heading>
			<Button
				size="wide"
				onClick={() => changePage(currentPage + 1)}
				disabled={currentPage === pages}
			>
				Next
			</Button>
		</div>
	</Row>
);