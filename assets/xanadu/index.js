let text = document.querySelector(".text");
const LINEHEIGHT = 18;

let dynamicObjects = [];

// ex: call _.marginLeft on returned object
function getStyles(element) {
	return element.currentStyle || window.getComputedStyle(element);
}

function generateDynamicImage(d) {
	let newNode = h("img", {
		src: d["image"],
	});
	return newNode;
}

function generateTimeline(d) {
	const timelineElementWidth = 230;
	const timelineSpacer = 20;

	// Handle margins for fixed element based on parent
	let styleText = getStyles(text);
	let marginLeft = styleText.marginLeft;

	let timeline = d.timeline;

	// (margin + elementWidth) * timeline.length
	let SVGWidth = (timelineElementWidth + timelineSpacer) * timeline.length;

	let sortedTimeline = Object.assign([], timeline);

	sortedTimeline.sort((a, b) => {
		return new Date(a.date) - new Date(b.date);
	});

	let newNode = h(
		"div.svg-history",
		{
			style: {
				height: "150px",
				left: `${marginLeft}px`,
				"overflow-x": "scroll",
				"overflow-y": "hidden",
			},
		},
		[
			svg("svg", { width: `${SVGWidth}px`, height: "150px" }, [
				svg("path", { d: `M 10 130 H ${SVGWidth - 20} V 132 H 10 ` }),
				sortedTimeline.map((time, i) => {
					let positioning =
						40 + timelineElementWidth * i + timelineSpacer * (i - 1);
					let node = time["node"];
					return [
						svg("path", {
							d: `M ${positioning} 128 H ${
								positioning + 2
							} V 134 H ${positioning}`,
						}),
						svg(
							"foreignObject",
							{
								x: 20 + (timelineElementWidth + timelineSpacer) * i,
								y: 20,
								width: timelineElementWidth,
								height: 200,
							},
							h(
								"p",
								{
									style: "color:grey;font-size:14px",
									xmnls: "http://www.w3.org/2000/svg",
								},
								[time["date"]]
							)
						),
						svg(
							"foreignObject",
							{
								x: 20 + (timelineElementWidth + timelineSpacer) * i,
								y: 40,
								width: timelineElementWidth,
								height: 200,
								"font-size": "18px",
							},
							h(
								"p",
								Object.assign(
									{
										class: "timeline-text",
										style: "color:black",
										xmnls: "http://www.w3.org/2000/svg",
									},
									node
										? {
												"data-node": node,
												"data-id": time["id"],
										  }
										: null
								),
								[time["description"]]
							)
						),
					];
				}),
			]),
		]
	);

	return newNode;
}

function scrollHorizontal(node, position) {
	let currentScrollPosition = node.scrollLeft;
	let change = currentScrollPosition + position;

	node.scrollLeft = change;
}

document.addEventListener("scroll", (ev) => {
	let scrollY = window.scrollY;

	dynamicObjects.forEach((ob, index) => {
		let dynamicNode = ob[1];
		let d = ob[0];
		let stay = d["stay"];

		// Get start and body dimensions
		var bodyRect = document.body.getBoundingClientRect(),
			elemStartRect = dynamicNode.getBoundingClientRect(),
			offsetStart = elemStartRect.top - bodyRect.top,
			elemStartHeight = elemStartRect.height,
			// find end node
			endNode = document.getElementById("node" + stay),
			elemEndRect = endNode.getBoundingClientRect(),
			offsetEnd = elemEndRect.top - bodyRect.top,
			dynamicNodeId = dynamicNode.getAttribute("id").replace("dynamicNode", "");

		let fixedNode = document.getElementById(`fixedNode${dynamicNodeId}`);

		if (fixedNode == null) {
			if (dynamicNode.nodeName.toLowerCase() == "img") {
				fixedNode = generateDynamicImage(d);
				let classes = fixedNode.getAttribute("class");
				fixedNode.setAttribute("class", classes + " fixedNode");
			} else if (dynamicNode.getAttribute("class") == "svg-history") {
				fixedNode = generateTimeline(d);
				let classes = fixedNode.getAttribute("class");
				fixedNode.setAttribute("class", classes + " fixedTimeline");

				fixedNode.addEventListener("scroll", (ev) => {
					dynamicNode.scrollLeft = ev.target.scrollLeft;
				});
			}
			fixedNode.setAttribute("id", `fixedNode${dynamicNodeId}`);
			text.appendChild(fixedNode);
		}

		if (dynamicNode.nodeName.toLowerCase() == "img") {
			// Handle fixed image
			if (scrollY > offsetStart && scrollY < offsetEnd - elemStartHeight) {
				dynamicNode.setAttribute("style", "visibility:hidden");
				fixedNode.setAttribute(
					"style",
					`top:0px; left:${dynamicNode.offsetLeft + elemStartRect.width / 2}px`
				);
			} else if (scrollY > offsetEnd - elemStartHeight && scrollY < offsetEnd) {
				fixedNode.setAttribute(
					"style",
					`top:-${elemStartHeight - (offsetEnd - scrollY)}px; left:${
						dynamicNode.offsetLeft + elemStartRect.width / 2
					}px`
				);
			} else {
				dynamicNode.setAttribute("style", "visibility:visible");
				fixedNode.setAttribute("style", "visibility:hidden");
			}
		} else if (dynamicNode.getAttribute("class") == "svg-history") {
			// Handle fixed image
			let width = text.children[0].clientWidth;

			if (scrollY > offsetStart && scrollY < offsetEnd - elemStartHeight) {
				dynamicNode.setAttribute("style", "overflow-x:scroll;");
				fixedNode.setAttribute(
					"style",
					`opacity:1;top:0px;overflow-x:scroll;width:${width}px`
				);
				fixedNode.scrollLeft = dynamicNode.scrollLeft;
			} else if (scrollY > offsetEnd - elemStartHeight && scrollY < offsetEnd) {
				fixedNode.setAttribute(
					"style",
					`opacity:1;top:-${
						elemStartHeight - (offsetEnd - scrollY)
					}px;overflow-x:scroll;width:${width}px`
				);
			} else {
				dynamicNode.setAttribute("style", "overflow-x:scroll;");
				fixedNode.setAttribute("style", "opacity:0");
			}
		}
	});
});

function renderData(data) {
	data.forEach((d, i) => {
		let node = document.createElement("p");
		node.setAttribute("id", `node${i}`);
		node.innerText = d;
		text.append(node);
	});
}

/* Highlight code */

let mouseX = null;
let mouseY = null;

document.addEventListener("mousemove", (ev) => {
	mouseX = ev.clientX;
	mouseY = ev.clientY;
});

document.addEventListener("touchmove", (ev) => {
	mouseX = ev.clientX;
	mouseY = ev.clientY;
});

function addAnnotationContent(highlightNode, annotationNode, annotations) {
	let annotationSection = document.createElement("div");
	annotationSection.setAttribute("class", "highlight-section");

	annotations.forEach((a) => {
		if (a.type == "text") {
			let textNode = document.createElement("span");
			textNode.innerText = a.data;
			textNode.setAttribute("style", "display:block");
			annotationSection.append(textNode);
		}
		if (a.type == "iframe") {
			let iframeNode = document.createElement("iframe");
			iframeNode.src = a.data;
			let windowWidth = window.innerWidth;
			let width = 400;
			let aspectRatio = 0.5625;

			if (windowWidth < width) {
				iframeNode.setAttribute("width", windowWidth);
				iframeNode.setAttribute("height", windowWidth * aspectRatio);
			} else {
				iframeNode.setAttribute("width", width);
				iframeNode.setAttribute("height", width * aspectRatio);
			}

			annotationSection.append(iframeNode);

			highlightNode.addEventListener("click", function () {
				window.open(iframeNode.src, "_blank");
			});
		}

		if (a.type == "image") {
			let imageNode = document.createElement("img");
			imageNode.src = a.data;
			imageNode.setAttribute("height", "300px");
			annotationSection.append(imageNode);
		}
	});

	annotationNode.appendChild(annotationSection);
	return annotationNode;
}

function positionHighlight(annotationNode, ev) {
	let { x, y, height, width } = ev.target.getBoundingClientRect();

	let annotationDimensions = ev.target.children[0].getBoundingClientRect();

	let container = getStyles(text);
	let containerMarginLeft = container.marginLeft.replace("px", "");
	let containerWidth = container.width.replace("px", "");

	let annotationX = mouseX;
	let annotationY = mouseY;
	let left = annotationX - annotationDimensions.width / 2 - containerMarginLeft;

	if (left < 0) {
		left = containerMarginLeft;
	} else if (left + annotationDimensions.width > containerWidth) {
		left =
			parseInt(containerWidth) +
			parseInt(containerMarginLeft) -
			parseInt(annotationDimensions.width);
	}

	annotationNode.setAttribute(
		"style",
		`left:${left}px;top:${
			annotationY +
			(annotationY - y < LINEHEIGHT ? LINEHEIGHT - (annotationY - y) : 0) +
			window.scrollY
		}px;visibility:visible;z-index:1;`
	);
}

// Multimedia annotations on
function createHighlight(highlightText, annotations) {
	let highlightNode = document.createElement("span");

	if (annotations.length == 0) {
		highlightNode.setAttribute("class", "highlight");
		highlightNode.insertAdjacentHTML("afterbegin", highlightText);
	} else if (annotations.length > 0) {
		highlightNode.setAttribute("class", "highlight-annotation");
		highlightNode.insertAdjacentHTML("afterbegin", highlightText);

		// Create annotation if it exists
		let annotationNode = document.createElement("span");
		annotationNode.setAttribute("class", "tooltip");

		annotationNode = addAnnotationContent(
			highlightNode,
			annotationNode,
			annotations
		);

		highlightNode.addEventListener("mouseover", (ev) => {
			const highlightNodeController = new AbortController();

			function resetIframes(node) {
				let annotationElements = node.children[0].children;
				for (let element of annotationElements) {
					if (element.nodeName.toLowerCase() == "iframe") {
						element.src = element.src;
					}
				}
			}

			function highlight2annotation() {
				let remove = true;
				const highlightNodeControllerInner = new AbortController();

				annotationNode.addEventListener(
					"mouseover",
					function () {
						// console.log("highlight->annotation:mouseover " + remove)
						remove = false;
					},
					{ signal: highlightNodeController.signal }
				);

				function handleEnd() {
					// console.log("highlight->annotation:complete " + remove)
					if (remove) {
						resetIframes(annotationNode);
						annotationNode.setAttribute("style", `visibility:hidden;`);
					}
					highlightNodeController.abort();
					highlightNodeControllerInner.abort();
				}

				setTimeout(handleEnd, 300);
			}

			const annotationNodeController = new AbortController();

			function annotation2highlight() {
				let remove = true;
				const annotationNodeControllerInner = new AbortController();

				highlightNode.addEventListener(
					"mouseover",
					function (ev) {
						// console.log("annotation->highlight:mouseover " + remove)
						remove = false;
					},
					{ signal: annotationNodeControllerInner.signal }
				);

				setTimeout(function () {
					// console.log("annotation->highlight:complete " + remove)
					if (remove) {
						resetIframes(annotationNode);
						annotationNode.setAttribute("style", `visibility:hidden;`);
					}
					annotationNodeController.abort();
					annotationNodeControllerInner.abort();
				}, 300);
			}

			// Add highlight
			if (ev.target.getAttribute("class") == "highlight-annotation") {
				positionHighlight(annotationNode, ev);
			}
			highlightNode.addEventListener("mouseout", highlight2annotation, {
				signal: highlightNodeController.signal,
			});
			annotationNode.addEventListener("mouseout", annotation2highlight, {
				signal: annotationNodeController.signal,
			});
		});

		highlightNode.appendChild(annotationNode);
	}

	return highlightNode;
}

function renderHighlights() {
	// Get all sections with a highlight
	let highlightedSections = [];

	highlights.forEach((h, i) => {
		if (!highlightedSections.includes(h["node"])) {
			highlightedSections.push(h["node"]);
		}
	});

	highlightedSections.forEach((section, i) => {
		let highlightsInSection = highlights.filter((el) => el["node"] == section);
		let updatedSections = [];
		let node = document.querySelector(`#node${section}`);

		let innerHTML = node.innerHTML;

		// latest to earliest highlight in a node
		let reversedHighlights = Object.assign([], highlightsInSection);
		reversedHighlights.sort((a, b) => b.highlight[0] - a.highlight[0]);

		// Create all the sections with highlights
		// ASSUME: highlights for a section in order of latest to earliest
		reversedHighlights.forEach((h, i) => {
			let highlight = h["highlight"];

			let endText = innerHTML.substring(highlight[1], innerHTML.length);
			let beginText = innerHTML.substring(0, highlight[0]);
			let highlightedText = innerHTML.substring(highlight[0], highlight[1]);

			let annotations = h["annotation"];
			let highlightNode = createHighlight(highlightedText, annotations);

			// Timeline highlight
			if ("color" in h) {
				highlightNode.setAttribute("class", "highlight-timeline");
				highlightNode.setAttribute("id", h["id"]);

				highlightNode.addEventListener("mouseover", function () {
					let dynamicNodeIndex = h["dynamicIndex"];
					let dynamicNode = document.getElementById(
						`dynamicNode${dynamicNodeIndex}`
					);
					let fixedNode = document.getElementById(
						`fixedNode${dynamicNodeIndex}`
					);

					let paragraphsFixed = fixedNode.querySelectorAll(`.timeline-text`);
					let paragraphFixed;
					paragraphsFixed.forEach((el) => {
						if (el.getAttribute("data-id") == h["id"]) {
							paragraphFixed = el;
						} else {
							el.setAttribute("style", "color:black");
						}
					});

					let paragraphsDynamic =
						dynamicNode.querySelectorAll(`.timeline-text`);
					let paragraphDynamic;
					paragraphsDynamic.forEach((el) => {
						if (el.getAttribute("data-id") == h["id"]) {
							paragraphDynamic = el;
						} else {
							el.setAttribute("style", "color:black");
						}
					});
					let { x, width } = paragraphDynamic.getBoundingClientRect();

					let styleText = getStyles(text);
					let marginLeft = parseInt(styleText.marginLeft.replace("px", ""));
					scrollHorizontal(fixedNode, x - marginLeft - width / 2);
					scrollHorizontal(dynamicNode, x - marginLeft - width / 2);

					paragraphFixed.setAttribute("style", "color:green");
					paragraphDynamic.setAttribute("style", "color:green");
				});
				highlightNode.addEventListener("mouseout", function () {
					let dynamicNodeIndex = h["dynamicIndex"];
					let dynamicNode = document.getElementById(
						`dynamicNode${dynamicNodeIndex}`
					);
					let fixedNode = document.getElementById(
						`fixedNode${dynamicNodeIndex}`
					);

					let paragraphsFixed = fixedNode.querySelectorAll(`.timeline-text`);
					paragraphsFixed.forEach((el) => {
						if (el.getAttribute("data-id") == h["id"]) {
							el.setAttribute("style", "color:black");
						}
					});

					paragraphsFixed = dynamicNode.querySelectorAll(`.timeline-text`);
					paragraphsFixed.forEach((el) => {
						if (el.getAttribute("data-id") == h["id"]) {
							el.setAttribute("style", "color:black");
						}
					});
				});
			}

			// Add end text and highlight
			updatedSections.unshift(document.createTextNode(endText));
			updatedSections.unshift(highlightNode);

			// If this is the last section, also add beginText
			// Else set as text for next loop. Remaining text to process
			if (i == highlightsInSection.length - 1)
				updatedSections.unshift(document.createTextNode(beginText));
			else innerHTML = beginText;
		});

		// Reset node and add all sections
		node.innerHTML = "";
		updatedSections.forEach((section) => node.appendChild(section));
	});
}
