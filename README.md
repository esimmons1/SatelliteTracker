NASA Satellite Tracker
===============================

Made by: Ellis Simmons, June 2025  
Language: React, TypeScript, Three.js

What is this?
--------------
An interactive 3D visualization showing NASA satellites orbiting around a realistic Earth model. You can rotate the view, zoom in/out, and click on satellites to view their information.

How it works:
--------------
The visualization uses Three.js and React Three Fiber to create a realistic 3D Earth with satellite positions based on NASA's Satellite Situation Center Web (SSCWeb) data format. The Earth is rendered as a textured sphere with:
- High-resolution NASA Blue Marble imagery for the surface
- Realistic normal mapping for topographical detail
- Semi-transparent cloud layer that rotates independently
- Subtle atmospheric glow effect

Satellites are positioned in orbit around the Earth and can be interacted with to display their information.

How to run:
-----------
- Clone this repository to your local machine
- Run `npm install` to install dependencies
- Run `npm start` to start the development server
- Open `http://localhost:3000` in your web browser
- Also open: **Put link here**

You can tweak:
--------------
- Satellite data in `src/components/Satellites.tsx` to add or modify satellites
- Earth appearance by adjusting textures in the `public/textures` directory
- Camera controls and lighting in `src/components/Scene.tsx`
- The visuals by editing CSS files to change the layout and styling

Inspired by:
------------
- NASA's Satellite Situation Center Web (SSCWeb) service
- NASA's Blue Marble and Earth observation imagery
- Interactive space visualizations that make orbital data accessible

Notes:
------
This is a demonstration of how satellite position data can be visualized in an interactive 3D environment. The current implementation uses mock data, but it can be connected to live NASA APIs for real-time tracking.

---
As per usual, if you're going to steal or use it at least credit me please. Thank you for reading and have a nice day.
