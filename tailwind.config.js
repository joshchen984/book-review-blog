/** @type {import('tailwindcss').Config} */
export default {
	content: ['./src/**/*.{html,js,svelte,ts}'],
	theme: {
		extend: {
			colors: {
				primary: {
					main: '#01550F',
					light: 'rgb(51, 119, 63)',
					dark: 'rgb(0, 59, 10)'
				},
				nav: '#838456',
				background: '#EFEEE3',
				heading: '#27271D',
				gray: '#414141'
			},
			fontFamily: {
				sans: '"Poppins", sans-serif'
			}
		}
	},
	plugins: []
};
