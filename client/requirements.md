## Packages
framer-motion | Page transitions and complex animations
three | Required for 3D constellation
@react-three/fiber | React renderer for Three.js (3D constellation)
@react-three/drei | Three.js helpers
react-markdown | Rendering markdown blog posts
remark-gfm | Markdown tables and formatting support

## Notes
- Gamification state is persisted using localStorage
- Projects constellation uses lazy loading to optimize bundle size
- 3D features gracefully degrade to 2D on smaller screens/if WebGL fails
- Custom cursor is hidden on mobile devices for better UX
