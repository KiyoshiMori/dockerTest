import React from 'react';

import Button from 'components/Button';
import Heading from 'components/Heading';
import { Row, Col } from 'components/Grid';

import styles from './styles.styl';

export default ({ chooseSmall, chooseLarge }) => (
    <Row>
        <Col size={12} className={styles.header}>
            <Heading type="h1">Choose a data size</Heading>
        </Col>
        <Col size={6} className={styles.buttonContainer}>
            <Button
                size="wide"
                onClick={chooseSmall}
            >
                Small
            </Button>
        </Col>
        <Col size={6} className={styles.buttonContainer}>
            <Button
                size="wide"
                onClick={chooseLarge}
            >
                Large
            </Button>
        </Col>
    </Row>
);