/** @type {import('tailwindcss').Config} */
export default {
	content: ['./src/**/*.{html,js,svelte,ts}'],
	theme: {
		extend: {
			colors: {
				bg: '#faf7f2',
				surface: '#ffffff',
				ink: '#1a1208',
				muted: '#7a6a58',
				hint: '#a09080',
				line: '#e0d8cc',
				accent: '#c0392b',
				'accent-bg': '#fde8e0',
				'accent-text': '#922b1a',
				// Legacy aliases for admin pages
				primary: {
					main: '#c0392b',
					light: '#d44637',
					dark: '#922b1a'
				},
				background: '#faf7f2',
				heading: '#1a1208',
				gray: '#7a6a58',
				nav: '#faf7f2'
			},
			fontFamily: {
				display: ['"DM Serif Display"', 'Georgia', 'serif'],
				body: ['Lora', 'Georgia', 'serif'],
				sans: ['"DM Sans"', 'system-ui', 'sans-serif']
			},
			borderRadius: {
				sm: '4px',
				md: '8px',
				lg: '12px'
			}
		}
	},
	plugins: []
};
