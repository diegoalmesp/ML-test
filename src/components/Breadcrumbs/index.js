import React from 'react';
import './index.scss';

const Breadcrumbs = ({list}) => (
	<p className="ML-breadcrubs">
		{list.map((crumb, index) => {
			if(index === list.length - 1) return <span key={index}><b> {crumb}</b></span>
			return <span key={index}> {crumb} ></span>
		})}
	</p>
);

export default Breadcrumbs;
