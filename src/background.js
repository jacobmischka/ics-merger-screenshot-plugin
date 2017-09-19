browser.browserAction.onClicked.addListener(tab => {

	browser.tabs.sendMessage(tab.id, {}).then(
		({dataUrl}) => {
			downloadshot(dataUrl, 'calendar.png');
		},
		err => {
			console.error(err);
		}
	);
});

// From https://github.com/mozilla-services/screenshots/tree/master/addon/webextension
function downloadshot(dataUrl, filename) {
	const binary = atob(dataUrl.split(',')[1]); // just the base64 data
	const data = Uint8Array.from(binary, char => char.charCodeAt(0));
	const blob = new Blob([data], {type: "image/png"});
	let url = URL.createObjectURL(blob);

	let downloadId;
	let onChangedCallback = change => {
		if (!downloadId || downloadId !== change.id) {
			return;
		}
		if (change.state && change.state.current !== "in_progress") {
			URL.revokeObjectURL(url);
			browser.downloads.onChanged.removeListener(onChangedCallback);
		}
	};

	browser.downloads.onChanged.addListener(onChangedCallback);

	return browser.downloads.download({
		url,
		filename: filename
	}).then((id) => {
		downloadId = id;
	});
}
