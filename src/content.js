browser.runtime.onMessage.addListener((message, sender, sendResponse) => {
	let dataUrl = screenshotCalendar();

	sendResponse({dataUrl});
});

const padding = 5;

function screenshotCalendar() {
	let calendarContainer = document.querySelector('.fullcalendar-container .fc-view-container');
	let calendarLegendContainer = document.querySelector('.calendar-legend-container');

	if (calendarContainer && calendarLegendContainer) {
		let top = calendarContainer.getBoundingClientRect().top + window.scrollY - padding;
		let bottom = calendarLegendContainer.getBoundingClientRect().bottom + window.scrollY + padding;
		let left = 0 + window.scrollX;
		let right = window.innerWidth + window.scrollX;

		return screenshotPage({ top, bottom, left, right });
	}
}

function screenshotPage(selectedPos) {
	let height = selectedPos.bottom - selectedPos.top;
    let width = selectedPos.right - selectedPos.left;
    let canvas = document.createElement('canvas');

    let ctx = canvas.getContext('2d');
	canvas.width = width;
	canvas.height = height;

	ctx.drawWindow(window, selectedPos.left, selectedPos.top, width, height, "#fff");

	return canvas.toDataURL();
}
