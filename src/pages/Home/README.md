# Home Page Documentation

### Purpose:

The Home component fetches all recipes from the backend and displays them in a responsive grid layout. Each recipe is presented as a clickable card showing the image and name, linking to its individual recipe detail page.

---

### Features:

- Data Fetching: Fetches all recipes from /api/recipes on component mount using useEffect

- State Management: Tracks recipes, loading state, and error state

- Responsive Grid Layout: Uses Grid2 to display recipe cards that adapt to screen size

#### Recipe Card UI:

- - White background with shadow and border radius

- - Image displayed at the top with fixed height and rounded corners

- - Recipe name centered below the image

- - Hover animation for interactive feedback

- Loading & Error Handling: Shows spinner while loading, and error message if fetch fails

#### Component Imports:

- Material UI components: Box, Typography, Card, CardMedia, CardContent, Grid2, CircularProgress

- Custom component: HamburgerMenu

- Routing: Link from react-router-dom

---

### Visual Layout Overview:

<pre>
+------------------------------+
|         HamburgerMenu       |
+------------------------------+

+---------------------------------------------+
|      Discover Delicious Recipes (title)     |
|                                             |
|  [ Recipe Card ]  [ Recipe Card ]  [ ... ]  |
|  [ Recipe Card ]  [ Recipe Card ]  [ ... ]  |
|                                             |
+---------------------------------------------+

</pre>

#### Notes:

- The image field in each recipe is a base64 string stored in MongoDB, rendered using a Box with component="img"

- Uses mimeType to set the correct image format (image/jpeg, image/png, etc.)

- Designed to scale and support future features like filtering, search, and categories
