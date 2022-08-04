import {defaultTheme, defineUserConfig, NavbarConfig, PluginConfig, SidebarConfig} from "vuepress";

import {backToTopPlugin} from "@vuepress/plugin-back-to-top";
import {googleAnalyticsPlugin} from "@vuepress/plugin-google-analytics";

import * as path from "path";

const navbar = (): NavbarConfig => {
	return [
		{
			text: "Guide",
			children: [
				{
					text: "Introduction",
					link: "/guide/introduction/",
				},
				{
					text: "Getting Started",
					link: "/guide/getting-started/",
				}, {
					text: "Utilities",
					link: "/guide/utilities/",
				}, {
					text: "Contributing",
					link: "/guide/contributing/",
				}, {
					text: "License",
					link: "/guide/license/",
				}
			],
		},
		{
			text: "Utilities",
			children: [
				{
					text: "TypeOf",
					link: "/utilities/typeof/",
				},
			],
		},
	];
};
const sidebar = (): SidebarConfig => {
	return {
		"/guide/": [
			{
				text: "Guide",
				children: [
					"/guide/introduction/",
					"/guide/getting-started/",
					"/guide/utilities.md/",
					"/guide/contributing.md/",
					"/guide/license.md/",
				]
			}
		],
		"/utilities/": [
			{
				text: "Utilities",
				children: [
					"/utilities/typeof/",
				]
			}
		],
	};
};

const layouts = (): Record<string, string> => {
	return {
		404: path.resolve(__dirname, "layouts/404.vue"),
	};
};
const plugins = (): PluginConfig => {
	return [
		backToTopPlugin(),
		googleAnalyticsPlugin({
			id: "G-RWHVBGF3N7"
		}),
	];
};

export default defineUserConfig({
	title: "Validan",
	description: "Validan is simple, yet powerful for validating data types and schemas.",

	theme: {
		name: "theme",
		extends: defaultTheme({
			logo: "/images/hero.svg",

			repo: "meslzy/validan",
			editLinkText: "Suggest changes to this page",

			docsRepo: "https://github.com/meslzy/validan",
			docsBranch: "main",
			docsDir: "docs",
			editLinkPattern: ":repo/edit/:branch/:path",

			navbar: navbar(),

			sidebar: sidebar(),
			sidebarDepth: 4,
		}),

		layouts: layouts(),
	},

	plugins: plugins(),
});
