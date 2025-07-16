# **App Name**: CineFile

## Core Features:

- Email OTP Authentication: Implement email OTP login/logout using Firebase Authentication. Note: currently only Google Fonts are supported.
- Movie Data Fetching: Fetch movie data from the OMDb API (http://www.omdbapi.com/?i=tt3896198&apikey=2edba679), appending the API key `2edba679` to movie-related requests.
- Movie Listing and Display: Display movies in a responsive grid or card UI using Shadcn UI components and Tailwind CSS.
- Movie Search: Enable users to search for movies based on title using the OMDb API.
- Genre Filtering: Allow users to filter movies by genre based on data from the OMDb API. Note: the information passed back from OMDb depends on the query. This filter will require multiple queries of the OMDb tool.
- Movie Details Page: Show detailed information about a selected movie, fetched from the OMDb API, on a dedicated movie details page.
- Theme Toggle: Implement a dark/light theme toggle to switch between color modes.

## Style Guidelines:

- Primary color: A deep indigo (#4B0082) to evoke a sense of cinematic drama and sophistication.
- Background color: A dark, desaturated indigo (#1E0036) to provide a high-contrast backdrop that highlights content without distracting the user.
- Accent color: A vibrant purple (#A020F0) to draw attention to key interactive elements, such as call-to-action buttons.
- Body font: 'Inter', a grotesque-style sans-serif for body and headline text, to give the app a modern, machined, objective look. 
- Employ 'lucide-react' icons to maintain a consistent and modern look throughout the interface.
- Utilize a responsive grid layout, enhanced with 'shadcn/ui' components and 'tailwindcss', to ensure optimal viewing experiences across various devices.
- Incorporate page transitions using 'reactbits' to create smooth navigation and enhance the overall user experience.