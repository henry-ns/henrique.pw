import styled, { css } from 'styled-components';

import Media from './media';
import Colors from './colors';

const Container = styled.section`
	width: 100%;
	height: 100vh;

	display: flex;
	flex-direction: column;
	justify-content: center;

	color: ${Colors.primaryTextColor};

	align-items: center;
`;

const Section = styled.section`
	display: grid;
	box-sizing: border-box;
	height: 100%;

	grid-template-columns: 1fr;
	grid-template-rows: auto 1fr;

	${({ height }) =>
		height &&
		css`
			height: ${height};
		`}

	${({ center }) =>
		center &&
		css`
			grid-template-columns: 1fr auto 1fr;
		`}
`;

const Center = styled.div`
	display: flex;
	align-items: center;
	justify-content: center;

	width: 100%;

	${({ padding }) =>
		padding &&
		css`
			padding: ${padding};
		`}
`;

const Background = styled.div`
	display: none;
	visibility: hidden;

	${Media.desktop`
        visibility: visible;
        display: block;
        position: fixed;

        top: 80px;
        background-image: url(${require('../assets/background2.png')});
        background-repeat: no-repeat;
        background-position: center;
        opacity: 0.4;

        width: 90vw;
        height: 90vh;

        margin: auto;

        z-index: -99;
    `}
`;

const Building = styled.h1`
	color: ${Colors.primaryColor};
	height: 100%;

	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
`;

export { Section, Container, Background, Building, Center };