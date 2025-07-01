import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  mimeTypes: {
      'text/javascript': ['js', 'jsx'], // Explicitly map .jsx to text/javascript
    },
});
