import React from 'react';
import Header from '../../components/Header/Header';
import Next from '../../components/Next/Next';

import { Section, Building } from '../../styles/grid';

export default () => (
    <Section>
        <Header title='Experience' />
        <Building>Building...</Building>
        <Next to='/projects'/>
    </Section>
);
