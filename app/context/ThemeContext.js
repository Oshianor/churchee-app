import React from 'react';

export const themes = {
	light: {
		mode: false,
		icon: 'black',
		primary: "black",
		background: 'white',
		surface: 'white',
		text: 'black',
	},
	dark: {
		mode: true,
		primary: "white",
		icon: 'white',
		background: '#3c3d3d',
		surface: 'black',
		text: 'white',
	},
};

// export const baseColor = '#4cd964';
export const baseColor = '#48b6e8';
export const fontSize = 14;

export const ThemeContext = React.createContext({
	theme: themes.dark,
	baseColor,
	fontSize
});