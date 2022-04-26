**Express backend for custom verification of users before signing up to the system and being persisted in the users table as supabase users.**
Technologies used.
1. Express
2. Supabase

Services provided by the API
1. Generation of a six digit random one time password(OTP). 
2. An SMS service that consumes the africastalking API. Used to send the OTP to a user via SMS.
3. Verification of the OTP.

To get you up and running. 
1. Visit africastalking api at [africastalking]('https://africastalking.com/')
    >- Create an account with africa's talking. 
    >- Generate an API key, a sendersID and a username and replace where appropriate in the sendCodeToPhone.js file. 
    The Africastalking sendersID, API_KEY and username can be generated using just a few clicks by checking out the menu on their site. 
2. Initalize the supabase client in the backend using your anon key and supabase url in the src/helpers/supabase.js. 
    >- **Note:** *Its advisable keep* **africastalking API key, username, and sendersID, and supabaseURL, supabase_anon_key** as ***environment variables**.* And ignore them when publishing your work on Github for security reasons. 
3. You can also modify the message in the supabase client.
5. Open the terminal in your project directory and run the following 
commands.
    *Prerequisites:* Ensure that you have node installed on your computer before running anything.
    To intall node checkout the [node]('https://nodejs.dev/') website and follow instructions on how to install node on your operating system.
    1. To intall the necessary packages run 
        >npm install 

    2. To run the server in the developer environment run:
        >npm run dev
