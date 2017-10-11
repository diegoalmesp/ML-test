import React from 'react';

const Breadcrumbs = ({list}) => (
	<p className="ML-breadcrubs">
		{list.map((crumb, index) => {
			if(index == list.length - 1) return <span><b> {crumb}</b></span>
			return <span> {crumb} ></span>
		})}
	</p>
);

export default Breadcrumbs;
