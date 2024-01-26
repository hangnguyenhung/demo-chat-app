# DEMO CHAT APP

Start:

-   server: cd server > npm install > npm run dev
-   client: cd client > npm install > npm run dev

Technologies Used (client) :

> ReactJS
> Next.js
> Socket-io
> Tailwindcss

Description of Files & Folders in the Directory Structure:
/components: Contains reusable React components used in the application.
/pages: Pages of the Next.js application, with each file corresponding to a route.
/services: Contains modules and utility functions to interact with the API and WebSocket.

--- FEATURE

1. Login:
   Users can enter login information, such as username and password.
   Sends a login request to the server through the API.
   Server verifies the information and creates a new session.
2. Socket Connection Using Singleton Pattern:
   Utilizes the Singleton Pattern to manage a single SocketManager object.
   Ensures only one WebSocket connection is maintained globally within the application.
3. Initialize and Save Session ID:
   Upon successful connection, the server provides a session ID.
   Client stores the session ID for use in subsequent requests and session persistence.
4. Private Chat Channels and Message Control:
   Users can create and join private chat channels with other users.
   Access control system ensures messages are only sent to participants within that channel.
5. New and Unread Message Notifications:
   Displays notifications when there are new messages.
   Unread messages are marked for easy identification.
6. Online and Offline User Notifications:
   Shows the online or offline status of users.
   Updates user status when they connect or disconnect.
7. Declaration of Separate Functions for Each Listening Action:
