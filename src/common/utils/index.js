'use client'

import React, { useEffect, useState } from 'react';

// Re-export pure utility functions
export { slugify, removeDuplicates, SortingByDate } from './functions';

// Client-only hooks
export const HoverActiveClass = function(hoverRef) {
	const [refLists, setrefLists] = useState([]);

	useEffect(() => {
		const refContainer = hoverRef.current.childNodes;
		setrefLists(refContainer);
	}, []);

	refLists.forEach((f) => {
		f.addEventListener("mouseenter", function () {
			refLists.forEach((e) => {
				var div = e.querySelector(".content-block");
				div.classList.add("axil-control");
				div.classList.remove("is-active");
			});
			this.querySelector(".content-block").classList.add("is-active");
		})
	});
}
