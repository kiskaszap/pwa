**UWS Adventure App – React PWA**

A mobile-first Progressive Web App (PWA) designed for University of the West of Scotland students. Built using React.js, Leaflet.js, and Tailwind CSS, this app offers an interactive experience where students complete geolocation-based tasks around the Paisley campus.

**Overview**

The app allows students to:

- Register with their UWS email
- Take a selfie that becomes their avatar on the map
- View an interactive campus map
- Complete campus-based tasks (quiz/photo/text input)
- Track completed or failed tasks

The app works offline using IndexedDB (via Dexie.js), and can be installed as a PWA on mobile and desktop.

Live Demo: <https://incandescent-mousse-06ec77.netlify.app/>

**Features**

- React PWA with offline capabilities
- Geolocation task triggering
- Leaflet maps with custom icons
- Local task storage
- Toast notifications via React Hot Toast
- Tailwind CSS + DaisyUI for fast design

**Local Development Setup**

**Prerequisites**

| **Requirement** | **Version** | **Verification Command** |
| --- | --- | --- |
| Node.js | 16.x+ | node -v |
| npm | 8.x+ | npm -v |
| Git | Latest | git --version |

**Step-by-Step Setup**

\# Clone repository (include SSH alternative)

git clone <https://github.com/kiskaszap/pwa.git> || git clone <git@github.com>:kiskaszap/pwa.git

\# Navigate to project directory

cd pwa

\# Install dependencies (with clean install option)

npm ci || npm install

\# Start development server (with auto-port selection)

npm start -- --port=3000

**Expected Output**

Compiled successfully!

You can now view pwa in the browser.

Local: <http://localhost:3000>

On Your Network: <http://192.168.x.x:3000>

**Troubleshooting Local Setup**

| Issue | Solution |
| --- | --- |
| EACCES errors | Prepend commands with sudo or fix npm permissions |
| Legacy peer deps | Use npm install --legacy-peer-deps |
| Port conflicts | Run npm start -- --port=5000 |

**Folder Structure**

**src/db ( Red Border)**

**db.js**

This file handles the offline storage logic using Dexie.js, which is a wrapper over IndexedDB.  
It is responsible for:

- Creating a new Dexie database instance.
- Defining the schema for storing completed and failed tasks.
- Exporting functions to add, retrieve, or clear data from IndexedDB.

Used to persist data when users are offline and synchronize when they return online.

**src/modal ( Light Blue Border)**

**TaskModals.jsx**

This file contains reusable modal components for tasks.  
It is used to:

- Display modal dialogs conditionally based on task types.
- Show task-specific details (quiz results, submission confirmations).
- Enhance the UX with custom overlays or popups.

**src/pages ( Green Border)**

This folder contains all major views/pages that the user interacts with:

**CompletedTask.jsx**

Displays a list of all successfully completed tasks, showing location, type, and timestamps.  
Includes filtering and minimal UX for progress tracking.

**Map.jsx**

Main interactive map interface:

- Uses React Leaflet to render the UWS campus map.
- Displays user’s real-time position.
- Shows geofenced task locations.
- Triggers navigation to /task/:id when within 10 meters of a task point.
- Shows custom markers based on task state (default, failed, completed).
- Provides a “Navigate” button with route line.
- Handles toast notifications for position, task availability, etc.

**Register.jsx**

Simple registration form:

- Accepts only UWS email addresses.
- Stores user info in localStorage.

**Selfie.jsx**

Allows the user to:

- Capture a selfie using device camera.
- Store it in localStorage as a base64 image.
- This image is later used as the user icon on the map.

**Splash.jsx**

- Initial loading screen (3.5s delay).
- Checks if user is logged in and has a selfie.
- Redirects to /login, /selfie, or /map accordingly.
- Registers the PWA install prompt using useRef.

**TasksPage.jsx**

- Handles individual task rendering depending on type (photo, text, quiz).
- Camera access for photo tasks.
- Textarea input for text tasks.
- Multiple choice for quiz tasks.
- Includes Toast messages for completion or failure.

**Trophy.jsx**

- Displays rewards earned (e.g., badges or trophies).
- May show stats like number of tasks completed, success rate.

**src/utils (🟡 Yellow Border)**

Utility functions used throughout the project:

**geoUtils.js**

- Contains geolocation-related helper functions.
- Used to:
  - Calculate distances between coordinates.
  - Check if user is within a geofenced polygon.
  - Normalize coordinates and simplify complex turf.js logic.

**tasks.js**

- Static array of task definitions.
- Includes:
  - ID, type, name, description.
  - Geolocation coordinates.
  - Quiz options and correct answers (if applicable).
  - Fun facts and hints.

This file is essential for dynamic task rendering across the app.

**Global Files**

**App.js**

- Root component that includes all page routing.
- Contains the ToastProvider and handles route-level protection.

**index.css**

- Global styles.
- Tailwind CSS utilities.

**index.js**

- ReactDOM entry point.
- Renders &lt;App /&gt; and includes global configuration for toast messages (e.g., styles, positions, durations).

!\[Directory Structure\](<https://github.com/kiskaszap/pwa/blob/main/mdImages/Picture1.png>)

**Sitemap**

!\[Sitemap\](<https://raw.githubusercontent.com/kiskaszap/pwa/main/mdImages/Picture2.png>)

**2\. PWA Installation - iOS (Safari)**

**Detailed Steps with Visual Aids**

**Initial Access**

1. Open Safari on iOS 14.3+
2. Navigate to: <https://incandescent-mousse-06ec77.netlify.app>

**Add to Home Screen**

1. **Click on the share button in the middle of the screen**

**!\[Share button\](<https://raw.githubusercontent.com/kiskaszap/pwa/main/mdImages/Picture3.png>)**

1. **Select the “Add to Home Screen”**

**!\[Add to Home\](<https://raw.githubusercontent.com/kiskaszap/pwa/main/mdImages/Picture4.png>)**

1. **Click on the “Add” button**

**!\[Add Button\](<https://raw.githubusercontent.com/kiskaszap/pwa/main/mdImages/Picture5.png>)**

1. **Now you can launch the app**

**!\[Display on Home Screen\](<https://raw.githubusercontent.com/kiskaszap/pwa/main/mdImages/Picture6.png>)**

**Post-Installation**

- App appears with custom icon
- Launches in standalone mode (no browser UI)

**Troubleshooting**

- If "Add to Home Screen" is missing:
  - Ensure full page load
  - Avoid Private Browsing mode
  - Check iOS version supports PWAs

**3\. PWA Installation - Android (Chrome/Edge)**

**Step-by-Step Process**

**Initial Requirements**

- Chrome 72+ or Edge 79+
- Android 8.0+ (Oreo)

**Installation Flow**

1. Visit app URL

!\[Visit url\](<https://raw.githubusercontent.com/kiskaszap/pwa/main/mdImages/Picture7.png>)

1. Click on the three dots

**!\[Dots\](**[**https://raw.githubusercontent.com/kiskaszap/pwa/main/mdImages/Picture8.png**](https://raw.githubusercontent.com/kiskaszap/pwa/main/mdImages/Picture8.png)**)**

1. Click on “Add to Home Screen”

!\[Add to Home\](<https://raw.githubusercontent.com/kiskaszap/pwa/main/mdImages/Picture9.png>)

1. After click on “Add”

!\[Click on Add\](<https://raw.githubusercontent.com/kiskaszap/pwa/main/mdImages/Picture10.png>)

1. After click on “Add authomatically”

!\[Add automatically\](<https://raw.githubusercontent.com/kiskaszap/pwa/main/mdImages/Picture11.png>)

**Post-Install Checklist:**

- App appears in app drawer
- Runs in full-screen mode
- Location permission granted

**User Guide**

**End-User Interaction Guide**

This comprehensive section explains how users interact with the UWS Adventure Progressive Web App (PWA). It covers everything from login and camera permissions to dynamic task activation, toast notifications, and task completion ensuring users have a smooth and guided experience.

**Splash Screen**

When the app launches, users are greeted by an animated splash screen displaying the UWS logo. Behind the scenes:

- A 3.5-second timer is initiated via setTimeout.
- After this period, the app checks:
  - If uws_user is not present in localStorage → redirect to /login
  - If email exists, but no selfie found → redirect to /selfie
  - If both are present → redirect to /map

A hidden installation prompt (for PWA support) is captured via useRef and triggered on user interaction (logo click).

**!\[Splash\](<https://raw.githubusercontent.com/kiskaszap/pwa/main/mdImages/Picture12.png>)**

**Login (Email Registration)**

- Users must enter their UWS email address.
- Validation ensures the email field is not empty.
- On successful input:
  - Email is stored in localStorage as uws_user
  - Toast message appears:  
        Email saved successfully!
- If the input is invalid or empty:  
    Please enter a valid email address.

**!\[Login\](<https://raw.githubusercontent.com/kiskaszap/pwa/main/mdImages/Picture13.png>)**

**Selfie Page**

After login, the user is prompted to take a selfie. The image is used later as a custom marker icon on the map.

**Key Features:**

- The front camera is activated (facingMode: "user")
- Users can:
  - View live video
  - Capture image → shown as preview
  - Retake image if needed
  - Save selfie to localStorage as userSelfie-{email}

**Permissions & Errors:**

- If camera permission is denied:
  - User sees message:  
        Camera access is denied. Please enable permissions and refresh the page.
  - A retry button is provided

On successful save:

- Toast appears: Selfie saved successfully!
- User is redirected to the map view.

**!\[Selfie\](<https://raw.githubusercontent.com/kiskaszap/pwa/main/mdImages/Picture14.png>)**

**Bottom Navigation Drawer**

**!\[Drawer\](<https://raw.githubusercontent.com/kiskaszap/pwa/main/mdImages/Picture15.png>)**

Visible on all pages except:  
/, /login, /selfie

Includes:

- Trophies
- Map
- Completed Tasks
- Logout

Navigation icons are powered by react-icons.

**Map Page**

This is the main interface of the app.

!\[Map\](<https://raw.githubusercontent.com/kiskaszap/pwa/main/mdImages/Picture16.png>)

Features:

- Displays a Leaflet map centered on UWS campus
- Geofence is drawn using a Polygon around campus
- Shows:
  - User location (with selfie avatar)
  - All available tasks (custom markers)

Live Location & Permissions:

- Requests user’s geolocation using navigator.geolocation.getCurrentPosition
- If denied, toast appears: Failed to fetch location
- If outside geofence:
  - Toast: Outside UWS
- If inside UWS campus:
  - Toast: Inside UWS area

Task Proximity Activation:

- If user moves within 10 meters of a task:
  - Toast appears: Task available at \[task name\]
  - User is redirected to the corresponding /task/:id route

Interactive Map Options:

- Tap task marker → popup opens
- "Navigate" button calculates direction using Polyline

!\[Navigate\](<https://raw.githubusercontent.com/kiskaszap/pwa/main/mdImages/Picture17.png>)

!\[Direction\](<https://raw.githubusercontent.com/kiskaszap/pwa/main/mdImages/Picture18.png>)

- User icon includes their selfie as a custom marker
- Colour differentiation of available tasks (marked by blue), finished tasks (marked by green) and failed tasks (marked by red)

!\[Map screen\](<https://raw.githubusercontent.com/kiskaszap/pwa/main/mdImages/Picture19.png>)

**Task Page**

**Tasks are divided into three types:**

**Quiz**

- Multiple-choice answers
- On selection:
  - If correct: Correct! → Task marked as completed
  - If incorrect: Wrong answer → Task marked as failed

!\[Quiz task\](<https://raw.githubusercontent.com/kiskaszap/pwa/main/mdImages/Picture20.png>)

**Text Input**

- User enters free-form answer
- On submission:
  - Text is saved in localStorage
  - Toast: Response submitted

!\[Input task\](<https://raw.githubusercontent.com/kiskaszap/pwa/main/mdImages/Picture21.png>)

**Photo Task**

- Back camera is used (facingMode: "environment")
- Users can:
  - Flip camera between front/back
  - Capture photo → displayed in preview
  - Retake photo if needed
  - Submit photo to mark task as completed

!\[Photo task\](<https://raw.githubusercontent.com/kiskaszap/pwa/main/mdImages/Picture22.png>)

**Additional Features:**

- If photo taken successfully:
  - Toast: Task completed!
- If skipped:
  - Task is marked as failed
  - Toast: Task marked as failed

**Completed Tasks**

- Displays all successfully completed tasks for the logged-in user
- Pulled from localStorage under completedTasks-{email}
- Displays task names in a list
- Available to view in completed task screen, accessible from drawer menu

**Trophy Page**

- Visual, motivational trinket page
- Celebrates user progress
- Accessible from bottom navigation drawer

**!\[Trophies page\](<https://raw.githubusercontent.com/kiskaszap/pwa/main/mdImages/Picture23.png>)**

**Logout**

Tapping logout clears all user-specific local storage values:

- uws_user
- userSelfie-{email}
- completedTasks-{email}
- failedTasks-{email}
- photo-{email}-{taskId}
- text-{email}-{taskId}

Redirects user back to /login.

Accessible from drawer menu.

**Permissions Overview**

| **Feature** | **Permission Prompted** | **When Triggered** |
| --- | --- | --- |
| **Camera** | **navigator.mediaDevices.getUserMedia()** | **On Selfie page and Photo tasks** |
| **Geolocation** | **navigator.geolocation.getCurrentPosition()** | **On Map load** |
| **PWA Install** | **beforeinstallprompt event** | **When app is visited in browser** |

**License & Credits**

This project is submitted by **Balint Kaszap-Nagy** as part of the **Dynamic Web Technologies** coursework at **University of the West of Scotland (UWS)**.

**GitHub Repository**

Access the full source code here: <https://github.com/kiskaszap/pwa>

**Contribution**

This is a coursework submission. Contributions not accepted for academic purposes.
