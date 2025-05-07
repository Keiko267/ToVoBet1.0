import generatePDF, { Margin, Options } from 'react-to-pdf';

const options: Options = {
	// default is `save`
	method: 'open',
	page: {
		// margin is in MM, default is Margin.NONE = 0
		margin: Margin.SMALL,
		// default is 'A4'
		format: 'A4',
	},
	canvas: {
		// default is 'image/jpeg' for better size performance
		mimeType: 'image/jpeg',
		qualityRatio: 1,
	},
};

// you can use a function to return the target element besides using React refs
const getTargetElement = (targetId: string) => document.getElementById(targetId);

export const PDFMaker = (targetId: string) => {
	const pdfContent = getTargetElement(targetId);
	if (pdfContent) generatePDF(() => pdfContent, options);
};
