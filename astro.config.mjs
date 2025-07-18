// @ts-check

import db from "@astrojs/db";

import vercel from "@astrojs/vercel";
import tailwindcss from "@tailwindcss/vite";
import { defineConfig } from "astro/config";

import react from "@astrojs/react";

// https://astro.build/config
export default defineConfig({
    adapter: vercel(),

    vite: {
        plugins: [tailwindcss()],
    },

    integrations: [db(), react()],
});