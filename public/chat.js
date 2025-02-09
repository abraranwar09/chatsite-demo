const temperature = 0.5;

const today = new Date();
const userTimeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;
console.log('User Timezone:', userTimeZone);

const formattedToday = today.toLocaleString('en-US', { timeZone: userTimeZone }).replace(',', '');  



const reprompt = `Hidden Context (the user is not aware this is part of their message): The users timezone is ${userTimeZone}. The current date/time is ${formattedToday}.`;








const systemPrompt = `Your are an assistant for Inova AI Solutions. You will take the user through a guided journey that allows them to find relevant AI products and services that suit them or suggest new products that Inova can build for them. 


#Description of Inova: Inova is a company specializing in customized AI solutions to transform business interactions with technology. Their products include BLDR and AI Avatar, which streamline operations, enhance customer engagement, and drive growth.

The objective of the Inova AI Assistant is to be conversational, engage with users and ask them questions about their business to inform users about Inova's products and services, answer any questions, undrestand the problems the users are facin, suggest solutions based on what Inova can provideand and facilitate meeting bookings with Inova's founder, Youssef Jalloul

Always reassure the client that Inova will help them build a custom solution to streamline operations, reduce costs and increase profits.

You are InovaAI Assistant, an AI chat agent designed to provide users with comprehensive information and support related to Inova's AI solutions. Your role includes assisting users with details about BLDR and AI Avatar, explaining how these solutions can streamline operations, enhance customer engagement, and drive growth. Additionally, you act as a prompt engineering guru, guiding users in creating effective AI prompts. Your primary objective is to inform, support, and facilitate meeting bookings with Inova's founder, Youssef Jalloul. Address business professionals and decision-makers. Your tone should be friendly, professional, and insightful. provide information in full paragraphs with clear, concise details. Encourage users to explore Inova's resources, ask specific questions, or book a meeting for detailed consultations.

#Website URL for Inova: Visit https://inovasolutions.ai/


#Your first message to the user
Hello! I’m Inova's AI Assistant. Ask me anything! :) Tip: Ask me a specific question related to a problem you want to solve in your business and then ask me to list at least 15-30 solutions specific to the problem you want to solve! :) Enjoy! 



#Components
You have access to tools to display components. You can use the display_component tool to display a component. The component_id is the id of the component you want to display. The message is the message to display before the component. The data is an array of objects that contain data to display in the component.

#Component Ids"
Button Component:
677b876a3f242ae7554c18bd

iFrame Component:
679c55c5c1331be222f62456


#Journey of the User for This Campaign:

How to start: Show option buttons for the following using your button component with the display_component tool:
"I am new here. Tell me more!"
"Book a meet with Inova"
"Show me something"

Send only button_text in your data array.

In the message with the component, send the first message. Do not use any headers. SAY ONLY THE FIRST MESSAGE.

If the user selects Book a meet with Inova, show the iframe component with the display_component tool. Send only the url (https://calendly.com/youssefjalloul/inova-ai-solutions) as main_text in your data array. In your message with the component say: "Book a meeting with Inova's founder, Youssef Jalloul."

If the user selects "Show me something" then show the iframe component with the display_component tool. Send only the url (https://www.youtube.com/embed/kpoFATxofjA?si=phFNf29xfxgtXj-g) as main_text in your data array. In your message with the component say: "Here is a video about Inova AI Solutions."


If the user selects "I'm new here. Tell me more!" then show the hero section using the show_hero_section tool.

If the user says "See our products" then show the product section using the show_product_section tool.

If the user says "Get your own Chat-Site" then show the following url in an iframe using the display_component tool. Send only the url (https://api.inovasolutions.ai/chatsite-waitlist/) as main_text in your data array. In your message with the component say: "Please sign up for the waitlist to get your own Chat-Site."

Your goal is to get the user to sign up for the waitlist to get their own Chat-Site.

#Notes about journey:
The user may deviate from any of these steps and ask you further questions. You can reply to those questions but always try and eventually bring the conversation back to these steps to continue/complete the journey. 

When asked to show a video for a case study, simply show the video in a responsive iframe on an new line. Do not add any further details after the video. Ensure there is a padding of 20px before the video. If there is no video for the case study, tell the user that there is no video for that case study.

Do not use markdown in your response.
`;


async function sendMessage(message) {
    // Step 1: Get session_id from local storage
    const session_id = localStorage.getItem('session_id');
    const userId = localStorage.getItem('userId'); // Assuming user_id is stored in local storage

    // Step 2: Send a request to the AI
    const requestBody = {
        session_id: session_id,
        user_id: userId,
        message: message + reprompt,
        tools: tools,
        custom_prompt: systemPrompt,
        custom_temp: temperature
    };

    try {
        console.log('Sending message:', requestBody);
        const response = await fetch('/ai/chat', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(requestBody)
        });

        const data = await response.json();
        console.log('Received response:', data);

        if (data.finish_reason === 'stop') {
            console.log('Response finished with reason: stop');
            return data;
        } else if (data.finish_reason === 'tool_calls') {
            console.log('Response finished with reason: tool_calls');
            return data;
            // await handleToolCalls(data);
        }
    } catch (error) {
        console.error('Error sending message:', error);
    }
}

//expose sendMessage globally
window.sendMessage = sendMessage;

document.addEventListener('DOMContentLoaded', () => {
    // Create a session ID using the current timestamp
    const timestamp = Date.now();
    const sessionId = `session_${timestamp}`;
    
    // Save the session ID to local storage
    localStorage.setItem('session_id', sessionId);

    const sendButton = document.getElementById('sendButton');
    const messageInput = document.getElementById('messageInput');


    // Function to handle sending message
    async function handleSendMessage(message) {
        if (message) {
            console.log('Handling message:', message);
            if (message === 'Start') {
                console.log('Start message received, no display action taken.');
            } else {
                displayMessage(message, 'user');  
                console.log('Displayed user message:', message);
            }

            // Create and display the skeleton loader
            const skeletonLoader = document.createElement('div');
            skeletonLoader.className = 'skeleton-loader';
            document.querySelector('.chat-messages').appendChild(skeletonLoader);
            console.log('Skeleton loader added to chat messages.');

            try {
                const data = await sendMessage(message);
                console.log('Data received from sendMessage:', data);

                if (data.finish_reason === 'tool_calls') {
                    console.log('Handling tool calls:', data);
                    await handleToolCalls(data, skeletonLoader);
                } else if (data.finish_reason === 'stop') {
                    // Remove the skeleton loader
                    skeletonLoader.remove();
                    console.log('Skeleton loader removed.');
                    displayMessage(data.response, 'ai');
                    console.log('Displayed AI response:', data.response);
                }
            } catch (error) {
                console.error('Error handling message:', error);
                skeletonLoader.remove();
                console.log('Skeleton loader removed due to error.');
            }
        }
    }

    // Expose handleSendMessage globally
    window.handleSendMessage = handleSendMessage;

    handleSendMessage('Start');
    var firstMessage = document.getElementsByClassName('user-message')[0];


    // Event listener for send button click
    sendButton.addEventListener('click', sendMessageHandler);
    sendButton.addEventListener('touchend', sendMessageHandler);

    // Event listener for Enter key press
    messageInput.addEventListener('keypress', (event) => {
        if (event.key === 'Enter') {
            event.preventDefault(); // Prevents new line in textarea
            sendMessageHandler();
        }
    });

    function sendMessageHandler() {
        const message = messageInput.value.trim();
        if (message) {
            messageInput.value = '';
            handleSendMessage(message);
        }
    }
});
