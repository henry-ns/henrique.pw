import React from 'react';

import Icon from 'components/Icon';

import { Section } from './styles';
import { Divider } from 'styles/Divider';
import { Background, Warning } from 'styles/grid';

export default () => (
	<Section>
		<Background />
		<h1>
			Henrique <span>Miranda</span>
		</h1>
		<h2>
			Telematics student, Full Stack Developer <span>&</span> Designer
		</h2>
		<Divider margin='20px 0px 20px 0px' radius />
		<ul>
			<li>
				<a
					href='https://github.com/henry-ns'
					target='_blank'
					rel='noopener noreferrer'
				>
					<Icon name='Github' />
				</a>
			</li>
			<li>
				<a
					href='https://www.linkedin.com/in/henry-ns/'
					target='_blank'
					rel='noopener noreferrer'
				>
					<Icon name='Linkedin' />
				</a>
			</li>
			<li>
				<a
					href='https://instagram.com/h3nry.ns'
					target='_blank'
					rel='noopener noreferrer'
				>
					<Icon name='Instagram' />
				</a>
			</li>
			<li>
				<a
					href='https://twitter.com/h3nry_ns'
					target='_blank'
					rel='noopener noreferrer'
				>
					<Icon name='Twitter' />
				</a>
			</li>
			<li>
				<a href='mailto:enrque.ns@gmail.com'>
					<Icon name='Email' />
				</a>
			</li>
		</ul>
		<Warning>
			Em construção...
		</Warning>
	</Section>
);
