import React, { Component, Fragment } from 'react';
import { Query, Mutation } from 'react-apollo';
import Modal from 'react-modal';

import { getArticles, postArticle, removeArticle } from 'lib/graphql/queries/ArticlesQueries';

import { Row, Col } from 'components/Grid';
import Heading from 'components/Heading';
import Input from 'components/Input';
import Button from 'components/Button';
import ArticlesList from './components/ArticlesList';

import styles from './styles.styl';

export default class MainPage extends Component {
	state = {
		modalIsOpen: false,
		articleHeader: '',
		articleText: '',
		articleImage: null,
	};

	handleToggleModal = () => this.setState(state => ({ modalIsOpen: !state.modalIsOpen }));

	handleInput = e => this.setState({ [e.target.name]: e.target.value });

	clearArticleFields = () => this.setState({ articleHeader: '', articleText: '', articleImage: null });

	render() {
		const { modalIsOpen, articleHeader, articleText, articleImage } = this.state;

		console.log({ modalIsOpen, articleImage });

		return (
			<Fragment>
				<Mutation
					mutation={removeArticle}
					refetchQueries={[
						{
							query: getArticles,
						},
					]}
				>
					{mutate => (
						<Query
							query={getArticles}
							errorPolicy="all"
							variables={{
								token: 'test',
							}}
						>
							{({ data }) => {
								return (
									<ArticlesList
										data={data?.getArticles}
										openModal={this.handleToggleModal}
										removeArticle={id => mutate({ variables: { id } })}
										{...this.props}
									/>
								)}
							}
						</Query>
					)}
				</Mutation>
				<Modal
					isOpen={modalIsOpen}
					onRequestClose={this.handleToggleModal}
					className={styles.modal}
					overlayClassName={styles.modalOverlay}
				>
					<Mutation
						mutation={postArticle}
						refetchQueries={[
							{
								query: getArticles,
							},
						]}
					>
						{(mutate, { loading }) => (
							<Row>
								<Col size={12} className={styles.modalHeader}>
									<Heading
										type="h2"
										bold
									>
										Post an article
									</Heading>
								</Col>
								<Col size={6} className={styles.modalContent}>
									<form
										onSubmit={async e => {
											e.preventDefault();
											await mutate({
												variables: {
													header: articleHeader,
													text: articleText,
													token: 'test',
													file: articleImage,
												},
											});
											this.handleToggleModal();
											this.clearArticleFields();
										}}
									>
										<Input
											label="Header"
											name="articleHeader"
											value={articleHeader}
											onChange={this.handleInput}
										/>
										<Input
											textarea
											label="Text"
											name="articleText"
											value={articleText}
											onChange={this.handleInput}
										/>
										<Button
											size="small"
											secondary
											type="submit"
											loading={loading}
											disabled={!articleHeader || !articleText}
										>
											Save
										</Button>
									</form>
								</Col>
								<Col size={6} className={styles.modalContent}>
									<label htmlFor="imgUpload" className={styles.modalLabel}>
										<div className={styles.modalImageContainer}>
											<img
												className={styles.modalImage}
												src={articleImage
													? URL.createObjectURL(articleImage)
													: '/static/placeholder.png'
												}
											/>
											{!articleImage && (
												<h1 className={styles.modalImageText}>
													Browse
												</h1>
											)}
										</div>
									</label>
									<input
										className={styles.displayNone}
										name="imgUpload"
										id="imgUpload"
										type="file"
										onChange={({ target: { validity, files: [file] } }) => {
											console.log({ valid: validity.valid, file });
											validity.valid && this.setState({ articleImage: file });
										}}
									/>
								</Col>
							</Row>
						)}
					</Mutation>
				</Modal>
			</Fragment>
		);
	}
}