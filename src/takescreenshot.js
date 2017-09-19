// Currently not used but I don't want to get rid of it just yet
// From https://github.com/mozilla-services/screenshots/tree/master/addon/webextension

export function screenshotPartialPage(pos, scroll) {
	pos = {
		top: pos.top - scroll.scrollY,
		left: pos.left - scroll.scrollX,
		bottom: pos.bottom - scroll.scrollY,
		right: pos.right - scroll.scrollX
	};
	pos.width = pos.right - pos.left;
	pos.height = pos.bottom - pos.top;

	return browser.tabs.captureVisibleTab(null, {format: "png"}).then((dataUrl) => {
		let image = new Image();
		image.src = dataUrl;
		return new Promise(resolve => {
			image.onload = () => {
				let xScale = image.width / scroll.innerWidth;
				let yScale = image.height / scroll.innerHeight;

				let canvas = document.createElement("canvas");
				canvas.height = pos.height * yScale;
				canvas.width = pos.width * xScale;

				let context = canvas.getContext("2d");
				context.drawImage(image,
					pos.left * xScale,
					pos.top * yScale,
					pos.width * xScale,
					pos.height * yScale,
					0,
					0,
					pos.width * xScale,
					pos.height * yScale
				);

				let result = canvas.toDataURL();

				resolve(result);
			};
		});
	});
}
