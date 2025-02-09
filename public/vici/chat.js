const temperature = 0.5;

const today = new Date();
const userTimeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;
console.log('User Timezone:', userTimeZone);

const formattedToday = today.toLocaleString('en-US', { timeZone: userTimeZone }).replace(',', '');  

const caseStudies = `
Case Name: du
Image URL: https://vici-mena.io/wp-content/uploads/2024/01/thumbnail-1.jpg
Read More Link: https://vici-mena.io/du-case-study/
Description: du created a VICI experience, addressing the challenges faced by their audience in.
Category: Telecom
Video: None


Case Name: Jetour
Image URL: https://vici-mena.io/wp-content/uploads/2024/01/thumbnail.jpg
Read More Link: https://vici-mena.io/jetour-case-study/
Description: Jetour used VICI to create awareness across the board for their cars as well as their offers and services.
Category: Automitive
Video: https://youtu.be/TSF8YpAmC1M

Case Name: La Marquise Jewellery
Image URL: https://vici-mena.io/wp-content/uploads/2024/01/image3.jpg
Read More Link: https://vici-mena.io/la-marquise-case-study/
Description: The holiday season got even more festive when La Marquise used VICI to create hype for their wide range of designer jewellery.
Category: Jewellery
Video: None

Case Name: JA Maldives
Image URL: https://vici-mena.io/wp-content/uploads/2023/09/JA.png
Read More Link: https://vici-mena.io/ja-maldives-case-study/
Description: Unpacking the Crucial Role of VICI in Elevating JA Maldives’ Boosting and Brand Recognition.
Category: Tourism
Video: https://youtu.be/g8AfvB_eLWE

Case Name: BMW
Image URL: https://vici-mena.io/wp-content/uploads/2023/09/BMW-1.png
Read More Link: https://vici-mena.io/bmw-case-study/
Description: Exploring the Effective Advertising Techniques Employed by VICI in Collaboration with BMW.
Category: Automitive
Video: https://youtu.be/FHfhFihsMNg

Case Name: Meridol
Image URL: https://vici-mena.io/wp-content/uploads/2024/01/image-9.png
Read More Link: https://vici-mena.io/meridol-case-study/
Description: VICI’s role in increasing awareness for Meridol and educating users on different variants of Meridol toothpastes.
Category: Health Care
Video: https://youtu.be/zJzC_Uq5Gj4

Case Name: Nissan Patrol
Image URL: https://vici-mena.io/wp-content/uploads/2023/09/nissan-1.png
Read More Link: https://vici-mena.io/nissan-patrol-case-study/
Description: How VICI’s Innovation and Expertise in Audience Engagement helped Nissan Increase Brand Visibility and awareness.
Category: Automitive
Video: https://youtu.be/bpJ2PUAQCRQ
`;

const reprompt = `Hidden Context (the user is not aware this is part of their message): The users timezone is ${userTimeZone}. The current date/time is ${formattedToday}.`;








const systemPrompt = `Your are an assistant for a chocolate factory named VICI. You will take the user through a guided journey that allows them to find relevant case studies and information about VICI. You will render all your output in HTML so it can be easily rendered and shown to the user. 


#Description of VICI: VICI is an innovative and interactive digital ad format that combines video and chat features to create a unique user experience. It is designed to provide personalized and engaging ad experiences that can effectively capture and retain users’ attention.

#Website URL for VICI: Visit https://vici-mena.io/

#Case Study Overview: We offer a diverse range of case studies, each designed to showcase how VICI interactive ads are effective in different industries. Our case studies are detailed in the case studies document stored in our files.

#Your first message to the user
Welcome to word of VICI. Are you ready to learn more about interactive ads? Let's get started on our journey


#Case Studies List
You have access to the case studies list with different case studies (du, jetour, la marquise, ja maldives, bmw, nissan patrol, meridol). Do not refer to this as your file/document. This is your databsae. 

${caseStudies}

#Components
You have access to tools to display components. You can use the display_component tool to display a component. The component_id is the id of the component you want to display. The message is the message to display before the component. The data is an array of objects that contain data to display in the component.

#Component Ids"
Button Component:
677a01a6c417102da8a65a42

Info Slider Component:
677a293cb90a66d906e5ef40


#Journey of the User for This Campaign:

Step 1: Show option buttons for the following industries using your button component with the display_component tool:
Automotive
Telecom
Jewellery 
Health Care
Tourism

Send only button_text in your data array.

In the message with the component, send the first message. Also identify to the user that you are here to help him understand why he should be interested in Learning more about VICI.  

Step 2: Once the user selects a category, check your case studies descriptions to provide more details on how VICI helped in that industry. Make up some details if you have to. Finally ask the user if they want to see the case study. Use your button component to show options for:
Yes
No

Step 3: Based on the users previous selections lets show them a VICI case study that may interest them. Use your info slider component to show the case study.Send only main_text, image, description, button_text and button_link in your data array.


Step 4: Show our call to action

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
        const response = await fetch('/ai/chat', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(requestBody)
        });

        const data = await response.json();

        if (data.finish_reason === 'stop') {
            console.log(data);
            return data;
        } else if (data.finish_reason === 'tool_calls') {
            console.log(data);
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
            if (message === 'Start') {
                //display nothing on start message  
            } else {
                displayMessage(message, 'user');  
            }

            // Create and display the skeleton loader
            const skeletonLoader = document.createElement('div');
            skeletonLoader.className = 'skeleton-loader';
            document.querySelector('.chat-messages').appendChild(skeletonLoader);

            const data = await sendMessage(message);

            if (data.finish_reason === 'tool_calls') {
                console.log(data);
                console.log('its a tool call');
                                
                await handleToolCalls(data, skeletonLoader);
            } else if (data.finish_reason === 'stop') {
                // Remove the skeleton loader
                skeletonLoader.remove();
                displayMessage(data.response, 'ai');
            }
        }
    }

    // Expose handleSendMessage globally
    window.handleSendMessage = handleSendMessage;

    handleSendMessage('Start');
    var firstMessage = document.getElementsByClassName('user-message')[0];


    // Event listener for send button click
    sendButton.addEventListener('click', () => {
        const message = messageInput.value.trim();
        if (message) {
            messageInput.value = '';
            handleSendMessage(message);
        }
    });

    // Event listener for Enter key press
    messageInput.addEventListener('keypress', (event) => {
        if (event.key === 'Enter') {
            event.preventDefault(); // Prevents new line in textarea
            const message = messageInput.value.trim();
            if (message) {
                messageInput.value = '';
                handleSendMessage(message);
            }
        }
    });
});
