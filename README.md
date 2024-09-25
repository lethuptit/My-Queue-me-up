## Project: Queue Me Up
### Members: Lin Lin, Monika, Thu Le, Tina Tang
### Demo Link


# I. Introduction

As businesses expand and attract more customers, owners often encounter challenges in efficiently serving them and maintaining high customer satisfaction. One key issue is managing customer wait times. In today's tech-driven world, people are less willing to tolerate physical waiting. Additionally, managing in-person queues can be resource-intensive, costing businesses time, money, and staff, while also increasing the risk of errors that frustrate customers and discourage repeat visits. Queue Me Up is a web application designed to enhance the waiting experience for customers and help businesses improve service quality and strengthen their market reputation. It is versatile and can be implemented in various service environments such as retail, restaurants, banking, hospitals, and events allowing guests select the queue they want to join by entering its queue code and then receiving real-time update and notification when their status or position changed. The queue owners have full rights to manage and monitor their queues.

## 1. The primary goal

Queue Me Up is a web application that brings customers to a delightful waiting experience and helps business owners increase the service quality as well as their reputation on the market by providing a virtual queueing tool. This tool can be used in many service environments like retails, restaurants, banking, hospitals or events allowing guests select the queue they want to join by entering its queue code and then receiving real-time update and notification when their status or position changed. The queue owner have full rights to manage and monitor their queues.

This virtual queue management system is built with Node, React, Firebase, and more libraries else.

## 2. Goals and Objectives
The main requirements for this project as below:

- Build UI interaction allows guests to join any queue by its ueue code.​

- Support real-time updates and notifications for guests in their waiting sessions.​

- Allow host user sign up and sign in to the application using Firebase authentication.​

- Allow host users to create, manage and monitor multiple queues of events.​

- Build setting page for every queue (optional)

- Analytics on queue statistics: average wait time, total guests, served guests, and canceled guests.​

- A landing page for the app (optionnl)​

## 3. Achievements:

Queue Me Up has successfully achieved all of the required objectives above and 1 optional goal (building Landing page for the application). It provides a seamless experience for guests to follow their waiting session and hosts to manage and monitor their queues. The UI interface and range of features are attractive enought ti users contributing and improved waiting experience and business services.
​
## 4. Features

### 4.1. For guests
From the landing page of the Queue Me Up application, users can click on "Get started" button or the "Guest button" on the navigationa menu on the top to navigate to the guest page where they can input a queue code to join a queue

•	Guests self-Check-In: Users can join a queue by scanning a QR code to find the queue they want to join.

•	Guests can enter some basic information like name, phone number, email to join the queue they chose.

•	Guests also choose leave the queue when they don't want to stay in that queue.

•	When guest are in a queu, they can receive real-time update status and notifications when their position changed

### 4.2. For admins/hosts 

•	User Registration/Login: Secure accounts for users to manage their profiles and queue statuses. Host users can click on the "Host" button to sign up for a new account or use the existing account to sign in to go to "Home" screen of a logged in user.

A sidebar menu on the left-hand side allow:

•	Queue Creation: Admin interface for businesses owners allow to create and customize queues with service details (name, description), maximum wait times for each guest, and capacity limits. They also get the automatically generated queue code and QR code for every queue.

•	Queue Management: Admin of business is able to edit or change basic information of her/his queues, change status or delete them permanently.

•	Queue Monitor: Admin of businesses can monitor real-time queue status, customer counts, and service efficiency, users in every queue. They can move guest positions in case they don’t show up or cancel their turns if knowing they never come, call and send notifications when their turn is up. Finally, they can mark guests as checked in if guests get the service.

•	Data insight: Admin of businesses can see the data analytics of their operation by graphs (bar chart and line chart) as well as some statistics that help them improve their service in the future.	

## 5. Target Audience:
  This app can be used by:

•	End users like customers who want to take a turn for any service without waiting in a physical line for a long time, who want to do something else while waiting.

•	Business owners in many fields (Restaurants, retail stores, healthcare facilities, and event organizers) who want to look for improving customer flow, organize the user waiting list, improve the customer waiting experience for their services

•	Developers: This project highlights key aspects of web UI design while utilizing NoSQL services such as Firebase Realtime Database, along with Authentication, Node.js, React, Bootstrap, and various library packages. These tools assist web developers in demonstrating how to integrate their applications with modern technologies


# II. Setup Instructions

## 1. Sysytem requirements:
This application is built on Node and React and npm for managing dependencies and running build scripts and many other libraries. To make sure it can be built and run seamlessly, system must have:
•	Processor: Any modern multi-core processor.
•	Hardware: At least 4GB of RAM and 10GB of storage space are required to run React and its associated tools smoothly.
•	Operating System: Compatible with Windows, macOS, and Linux, recommend for Windows 10 or 11, macOS 10.10, or Ubuntu 16 are recommended for the best compatibility and performance.
•	A web browser and Internet access: A modern web browser (such as Google Chrome, Mozilla Firefox, or Microsoft Edge) and Internet access are necessary for viewing and testing your React applications.
•	Firebase: Queue App Project on Firebase more details are provided in the file `FirebaseConfig.js`
•	Node.js: version 18.x or later
•	Npm:  Version 7.x or later
•	ReactJs (at least version 18)
•	IDE tool:  A code editor such as Visual Studio Code

## 2. How to build & run

### 2.1.	Check out project source code:
The final source code of this project is stored at GitHub, branch Dev-1.0. Follow these following instructions to build and run this project successfully:

•	Clone the repository from GitHub using the command:
    `git clone --branch Dev-1.0 https://github.com/nageeb-damani/queue-app.git`

### 2.2.	For serverless functions:
This project uses some serverless functions for sending notifications (email, web notification, SMS) and are hosting at:
    `https://my-node-server.netlify.app/.netlify/functions/api.`

However, following below steps can help run these functions locally:

•	Open a new terminal, change the working directory to the folder containing the project’s source.
•	Then run “cd server-functions”
•	Create an “.env” file with the content of  the “.env_template” file.
•	Run “npm install” to install dependencies.
•	Run “node “src/index” to start server at port 5000 (as default)

There are three main modules running on this server:

•	webNotification: Send notification through web when receiving a post request for a web notification. This feature uses Firebase Messaging with configuration below:
•	smsNotification: Send notification through phone number when receiving a post request for a sms. The Twilio account is used in this application to send SMS with configuration:
    o	TWILIO_ACCOUNT_SID=AC6e9ab5217038d9d45ee2e8fb7ceeb45f
    o	TWILIO_AUTH_TOKEN=cba5426f7edc8ab05f5ed816de8cc4f2
    o	TWILIO_PHONE_NUMBER=+17624224677
•	email: Send an email when receiving a post request for an email notification. This app uses an email account to receive messages from users and send emails to guests. The email account is using in this application:
    o	USERNAME = queuemeupteam@gmail.com
    o	PASSWORD = WITqueuemeup

### 2.3.	Install the web client application locally:

•	In case building server locally, make sure having file ”. env” with this line:
    `REACT_APP_SERVER_URL=http://localhost:5000`

(The port 5000 can be changed to the actual port running the server on the local machine.)

If the local server is not built, using this instead:

    `REACT_APP_SERVER_URL=https://my-node-server.netlify.app/.netlify/functions/api`

•	Open a terminal on your computer and change working directory to the folder containing the source code
•	Run “npm install” to install the dependencies
•	Then run “npm start” to run the client web application. The web application will run at localhost:3000 as default


# III.	Project Structure
## 1.	  Directory Layout:  
   ├── cypress/
│   ├── e2e/
│   │   ├── TestDashboardDisplay
│   │   ├── SignUp
│   ├── support/
│   │   ├── commands/
├── public/
│   ├── fonts/
│   ├── images/
│   ├── favicon.ico
│   ├── favicon_org.ico
│   ├── firebase-messaging-sw.js
│   ├── index.html
│   ├── logo.svg
│   ├── logo192.png
│   ├── logo512.png
│   ├── manifest. json
│   └── robots.txt
├── src/
│   ├── Components/
│   │   ├── Pages/
│   │   │   ├── Guest/
│   │   │   │   ├── ChooseQueue
│   │   │   │   ├── EventSwiper
│   │   │   │   ├── GuestPage
│   │   │   │   ├── GuestWaitingPage
│   │   │   │   ├── JoinQueue
│   │   │   ├── Home/
│   │   │   │   ├── Dashboard/
│   │   │   │   │   ├── Analytics
│   │   │   │   └── QueueManagement/
│   │   │   │   │   ├── QueueCreate
│   │   │   │   │   ├── QueueList
│   │   │   │   └── QueueMonitor/
│   │   │   │   │   ├── AddMember
│   │   │   │   │   ├── PauseQueue
│   │   │   │   │   ├── QueueMonitor
│   │   │   │   │   ├── QueueSidePanel
│   │   │   │   │   ├── Token
│   │   │   │   └── Sidebar
│   │   │   ├── LandingPage/
│   │   │   │   └── AboutTeam/
│   │   │   │   │   ├── Introduction
│   │   │   │   │   ├── AppFeatures
│   │   │   │   │   ├── Contact
│   │   │   │   │   ├── LandingPage
│   │   │   └── SignIn/
│   │   │   │   │   ├── SignUp
│   │   │   │   │   ├── Login
│   │   └── common/
│   │   │   │   │   ├── Button
│   │   │   │   │   ├── Checkbox
│   │   │   │   │   ├── Footer
│   │   │   │   │   ├── Header
│   │   │   │   │   ├── Modal
│   │   │   │   │   ├── Nav
│   │   │   │   │   ├── Pagination
│   │   │   │   │   ├── PhoneInput
│   │   │   │   │   ├── ProgressBar
│   │   │   │   │   ├── QrCode
│   │   │   │   │   ├── QueueInfo
│   │   │   │   │   ├── Ribbon
│   │   │   │   │   ├── TopButton
│   │   │   │   │   ├── SidePanel
│   ├── api/
│   │   ├── notify
│   │   ├── queue
│   ├── utils/
│   │   ├── dateFunction
│   │   ├── evenHandling
│   │   ├── filterDataByDateRange
│   │   ├── index
│   │   ├── textOperations
│   ├── App.css
│   ├── App.js
│   ├── App.test.js
│   ├── FirebaseConfig.js
│   ├── index.css
│   ├── index.js
│   ├── logo.svg
│   ├── reportWebVitals.js
│   └── setupTests.js
|── server-functions/
│   ├── src/
│   │   ├── functions/
│   │   │   ├── modules/
│   │   │   │   ├── email
│   │   │   │   ├── smsNotification
│   │   │   │   ├── webNotification
│   │   │   │   ├── fcmServiceAccountKey_queue-app.json
│   │   │   │   ├── JoinQueue
│   │   │   ├── api/
│   │   │   ├── app/
│   │   ├── index
│   │    .env
├──. env
├──. gitignore
├── README.md
├── cypress.config.js
└── package. json

The project follows a consistent set of naming conventions and organizational standards to make sure it is easy to maintain, clarity, consistency, and readability. Here are the key conventions and standards being followed:

**Directory Structure:** The project follows a modular structure, with directories organized by functionality or component type. This promotes separation of concerns and reusability. Components are grouped under the /Components directory, making it clear where to find and manage UI elements.
    
**Component Naming:** Component directories under /Components are named after the specific functionality they represent, such as burger-menu, buttons, course-card, etc. This makes it easy to identify and locate components based on their purpose. It also follows these rule that is useful for reuse and read code purposes:
    o	The main react components named in PascalCase format with the capitalized first letter in every word (like FirstName, LastName...). 
    o	Some component’s folders are in PascalCase format that means they are very specific for this project.
    o	Other folder/file names follow the lower camelCase (like firstName, lastName...) to let developers know they are reuseable functions.
    Within component directories, there are script and style files named similarly, maintaining consistency.

**HTML Files:** HTML files are named after the primary purpose or content they pepresent, such as index.html

**Configuration Files:** Configuration files like .env, cypress.config.js, .gitignore and package.json have followed common conventional names, making it evident that they are configuration or setup files for specific tools and dependencies.

**Dependency Management:** Dependencies are managed using Node.js and npm, as evidenced by the presence of the /node_modules directory and package.json. This is a common standard for JavaScript projects.

**Build Output:** The /build directory contains the output of the build process, possibly with minified and optimized code ready for deployment. This follows the convention of separating source code from the production-ready code.

## 2.	Module Descriptions:

### 2.1.	cypress/ 
   **Purpose:** Contains end-to-end test files and configurations.
   **Key subdirectories:** 
    o	e2e/ TestDashboardDisplay
    o	e2e/ signup

### 2.2.	public/ 
   **Purpose:** Stores static assets and the main HTML file.
   **Key components:** 
    o	index.html: The main HTML file.
    o	firebase-messaging-sw.js: Service worker for Firebase messaging.
   **Subdirectories:**
    o	public/fonts: contains all of the font resources are used in this application
    o	public/images: contains all of the images are used in this application

### 2.3.	src/Components/ 
   **Purpose:** Houses all React components organized by functionality.
   **Subdirectories:** 
    o	Pages/: Contains page-level components.
    o	common/: Stores reusable components used across multiple pages.

### 2.4.	src/Components/common/ 
   **Purpose:** Reusable UI components.
   **Key components:** 
    o	Button: building a standard button used in this application. This exports two type of buttons: standard and special one for login.
    o	Checkbox: customized the common checkbox with the primary color for background
    o	Footer & Header: components for header and footer of the landing page.
    o	JoinForm: An informative form that collects information of every guest showed when guest joining a queue and when the host user wants to add a new guest manually.
    o	Model: a popup component is used for showing confirmation dialog, QR code or scanning QR code screen.
    o	Nav: Navbar menu component used in main Header component.
    o	Pagination: the paging component for any list has items that can be shown all in the same screen like: waiting user list, queue list...
    o	PhoneInput: a component handles phone number input
    o	ProgressBar: a timing progress used in pages/Guest/GuestWaitingPage to show how many minutes elapsed when a guest in waiting session.
    o	QrCode: contains two components for showing QR code of a queue and showing the screen to scan QR code image.
    o	QueueInfo: show some basic information of a queue by row.
    o	Ribbon: A highlight message with close button.
    o	SidePanel: This component shows a Panel with a list of children items.
    o	TopButton: This shows a button at the bottom right of the landing page, scroll the page to the top when users click on.

### 2.5.	 src/Components/Pages/Guest/ 
   **Purpose:** Components related to guest side interface.
   **Key components:** 
    o	GuestPage: is the first page when user click on GUETS button on the Landing page. It includes 2 components:
        	EventSwiper: shows a carousel of some events in the platform (now using demo data.)
        	ChooseQueue: This component shows 1 input allowing users to enter the queue code and 2 buttons to select a queue to join or open the QR code scanner window.
    o	JoinQueue: includes two components: QueueInfoDetails and JoinForm that show the queue information and the form collecting the guest information.
    o	GuestWaitingPage: This page shows some status information when a guest totally joining the selected queue

### 2.6.	/Components/Pages/Home/ 

**Purpose:** contains all components to build the main interfaces for a host user’s interaction.
**Key components:**
    o	Dashboard/: 
        	Analytics component generates a line chart displaying the average wait time for different queues, bar chart showing the number of guests served, canceled, and waiting for a selected queue and simple card with a title and a value, useful for showing key statistics over a specified date range
        	Dashboard component: fetches and displays data related to queues hosted by the logged-in user. Displays statistics such as guests served, average wait time, canceled guests, and guests waiting for selected queues. Visualizes data trends over time for multiple selected queues. Shows data for a selected queue in a bar chart format. select queues for different visualizations and statistics
    o	Sidebar: provides a navigational sidebar for a dashboard application, renders individual navigation items with an icon and label, highlighting the active link
    o	QueueManagement: This component contains the Queue create and Queue list features:        
        	QueueCreate: the Queue Creation feature allows the host to easily create queues. The host can define key parameters like: Queue name, Queue description, CreatedOn, Duration(min), limit, Queue status. Once created, the queue is instantly available for guests to join through the app. 
        	QueueList: the Queue List is a component where the host can view and manage all queues. It provides a clear, organized layout, displaying essential information in a column format for each queue. The host can edit the queue and delete the queue Following are the columns of queue list such as: Queue name, Queue description, CreatedOn, Duration(min), limit, Queue status
    o	QueueMonitor: contains components for monitoring active queues of specific users.
        	QueueMonitor: This component shows the whole screen of queue monitor feature. It includes many components inside, such as:
            -QueueViewHeader: shows header section (src/Component/common/HeaderSection) and the dropdown box of an active queue list (QueueList component)
            -QueueSidePanel: is a component showing menu action realting the current queue like: QueueInfo, AddQueue, PauseQueue component
            -List of user information in the current queue. This shows a list of Token components
        	Token: shows guest information like id, position, and a context menu to mark as check on, no show, or call, notify, cancel.

###	src/Components/Pages/LandingPage/ 
   **Purpose:** Components for the public-facing landing page.
   **Key components:**
    o	AboutTeam.jsx: showcases a team section on a webpage, a brief paragraph     introducing   the team, each team member’s profile introducing the team. Contains   	links to the member’s LinkedIn and GitHub profiles, with corresponding icons
    o	Introduction.jsx: wraps the content within a responsive layout that has Text content includes a main heading, a typewriter effect subtitle, and call-to-action buttons, “Get Started” button and “Watch Video” button with an embedded YouTube link, and hero image displays an image on larger screens for visual appeal.
    o	AppFeatures.jsx: highlights key features of the application includes relevant icon, clickable title, a brief description for each feature
    o	ContactPage.jsx: provides a contact form for users to reach out to the development team, manages form inputs for name, email, subject, and message, and handles form submission with an asynchronous function to send emails. Upon successful submission, it resets the form fields and displays a confirmation message. The layout includes a section for contact information and a form for user input

### 2.8.	src/Components/Pages/SignIn/ 
   **Purpose:**   the Login page serves as the entry point for authenticated users to access secure areas of the application. The SignUp page is designed to allow new users to create an account and register with the application. 
   **Key components:**
    o	Login.js: Handles user input, form submission, and authentication logic. It interacts with Firebase to check the credentials and manages navigation upon success or failure.
    o	SignUp.js: Manages the sign-up form, handles user input, and performs the logic for creating a new user account in Firebase Authentication. It also stores user information in the Firebase Realtime Database.
    
### 2.9.	src/api/:
   **Purpose:**  contains API integration functions
   **Key components:**
    o	 notify: including some functions connected to serverless functions to send notifications to guest        
    o	 queue: including function interact with Firebase Realtime database

### 2.10.	src/utils/ 
   **Purpose:** Utility functions used across the application.
   **Key components:**
    o	dateFunction.js: a React-based date range picker that allows users to select a start and end date for filtering data. It includes two DatePicker inputs for selecting dates and an "Apply Filter" button that triggers a callback function with the selected date range, formatted as ISO strings
 eventHandling.js: includes handleEnterPress function triggers a callback when the Enter key is pressed, while the windowScroll function checks if the page has been scrolled more than 150 pixels vertically and returns a Boolean accordingly.
    o	filterDataByDateRange.js: filters a dataset of queue information, retaining only the data that falls within a specified date range
    o	textOperations.js: check if a given code contains only letters, numbers, and hyphens. Converts a given text to sentence case, capitalizing the first letter and making the rest lowercase. Format a number to ensure it has at least three digits, adding leading zeros if necessary

### 2.11.	src/App.js 
   **Purpose:** defines the main structure of the app using React components. It includes a fixed header, a container for the main content, and a footer. The Routes component manages navigation, directing users to different pages such as the landing page, guest pages, login, signup, and dashboard. It also includes a fallback route that redirects any unknown paths to the dashboard.

### 2.12.	src/FirebaseConfig.js 
   **Purpose:** initializes Firebase with the provided configuration and sets up various Firebase services, including authentication, database, and messaging. It exports constants for database references and authentication methods. The getLoggedInUserEmail function returns a promise that resolves with the logged-in user’s email or rejects if no user is logged in. Additionally, it exports functions for user authentication, such as creating a user, signing in, and signing out.

### 2.13.	server-functions
   **Purpose:** Handle server functions for some features that need to be run on server side.
   **Key components:**
    o	server-functions/functions/modules/email: call a send email action when a request of sending email coming.
    o	server-functions/functions/modules/smsNotification: call a sending sms action when a request of sending sms coming.
    o	server-functions/functions/modules/webNotification: call a sending web notification action when a request of sending notificationcoming.
    o	server-functions/functions/modules/fcmServiceAccountKey_queue-app.json: A configuration file for Firebase Message service account using for sending a web notification.
    o	server-functions/functions/api: This module helps to config serverless functions when hosting on Netlify.
    o	server-functions/functions/app & server-functions/index: the main module to build server locally.

# IV.	Future Development Ideas  

## 1.	 Refactoring:
•	Removing unnecessary code: There are some commented code lines due to testing or trying to many approaches before the final solution. These codes need to be clean.
•	Category code functions and put them in the same place: Now the functions working with firebase are in every component need to interact with queues data. Firebase interacting functions should be put in the same place in “src/api/queue.js”, then they are called from other components.
•	Consistent style throughout the web site. Now there are some pages use different color/button style (Login, Signup, QueueCreate, QueueList, Analytics) from the theme of the application
•	Improve responsive feature. Some pages of the application work well with different screen sizes but not all. The remaining (Dashboard, Queue Create, Queue List, Queue Monitor) need to be changed to fix well with the different sizes.
•	Export a logging file: currently, this application handles errors at a basic level and prints all caught errors that are useful for troubleshooting in the console. This is inconvenient. In future, it is necessary to log all errors and application information to a log file.

## 2.	New features:

### 2.1.	Search guest session by email or phone number:
**User story:** As a guest user, I joined a queue and am waiting for my turn. After that, I changed to a new device and was faced with an issue: I am not able access my current waiting session. I need a function that helps me find my current session. 
**Value:** The search function is needed to help a guest user get back to their waiting session by entering the phone number or email address and queue code.  Users don’t need to create another joining ID which can make the queue more crowded and waste the queue resources.
**Scenario:** 
-	After joining to a queue, the user will switch to another device
-	The user visits the main page of Queue Me Up app again and click on the search button near to the queue code input field
-	The new window will show some input fields, a search and a cancel button.
-	The user can enter for queue code, phone number or email.
-	If the users hit search button, the application will send back the waiting session for user if all info they input is valid and the session is still active. If not, showing can’t find any session. 
-	If users hit the cancel button, go back to the previous page.
**Technique:** besides all of techniques used in this application
-	Firebase Realtime database: to query data by some fields

### 2.2.	Build queue setting page

**User story:** As a host user, I want to show my event slogan, picture representing my event, or changing the text color...
**Value:** guests are easy to recognize our event when they want to join
**Scenario:**
-	The host user logs into the application using their credentials.
-	He/she can click on “Setting” the sidebar menu on the left-hand side to navigate to the setting page. Or they can go to this setting page from a button go along with every queue in queue list section.
-	In the setting page, he/she can choose their specific queue from a list and allow to upload an image for the event’s background, set font size, font color, slogan.
-	They are also set a message template used to send to guest in that queue

**Technique:** besides all of techniques used in this application
-	Firebase Storage: to store uploaded files
-	Firebase Realtime database: to store additional information in every queue.

### 2.3.	Build user profile page

**User Story:** As a host user, I want to create and manage my profile on the Queue Me Up application so that I can personalize my experience and easily access my information.
**Value:** Users can tailor their profiles to reflect their identities
**Scenario:**
-	The user navigates to the web app and logs in using their email and password.
-	After logging in, the user clicks on their profile icon in the top right of the navigation bar where showing their name and avatar, which redirects them to their profile page.
-	The profile page displays and allow to edit:
    o	Profile Picture: Will show as a circular avatar at the top right of the navigation bar. If not exist, the user can choose one from their local storage. If exist, the user can change to a different one.
    o	Username: Displayed prominently.
    o	Contact Information: Email and phone number fields.
-	If the user is in editing mode, they can save the new changes.
**Technique:** Used the same current technology, including:
-	Firebase storage

### 2.4.	Multilingual Support

**User Story:** As a customer, I want to use the app in my preferred language so that I can understand all the information easily. 
**Value:** Makes the app accessible to a broader audience. 
**Scenario:** A customer selects their preferred language from a dropdown menu, and the app content updates accordingly. 
**Technical Overview:**
    	Technologies: i18next, React-i18next.
    	Implementation: Integrate i18next for internationalization and provide translations for all text content.
    	Challenges: Managing translations and ensuring consistency.
    	Solution: Use a translation management tool and involve native speakers for accuracy.

### 2.5.	Customer Feedback System

**User Story:** As a business owner, I want to collect feedback from customers about their waiting experience to improve my service. 
**Value:** Provides insights into customer satisfaction and areas for improvement. 
**Scenario:** After their turn, customers receive a prompt to rate their experience and leave comments. 
**Technical Overview:**
    	Technologies: Firebase Firestore, React.
    	Implementation: Create a feedback form component and store responses in Firebase Firestore.
    	Challenges: Encouraging customers to provide feedback and analyzing the data.
    	Solution: Offer incentives for feedback and use data analytics tools to derive insights.

# V.	Known Bugs and Issues  
## 1.	List of Known Bugs:
  We try to fix all of bugs we awared. If there are some bugs happening, we are happy to receive information about them.

## 2.	Troubleshooting  

There is a common issue:

**Issue 1:**
When working on Firebase Realtime database, sometimes the application faces an error relating to not being able to do query on data. Please close the error screen and repeat the action. And/or open the inspection window to see what and where errors come from.

### Notes
- This is a fairly basic application with minimal built-in error handling. More details are available from the server log on the command line and browser console log.

