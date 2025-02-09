const temperature = 0.5;

const today = new Date();
const userTimeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;
console.log('User Timezone:', userTimeZone);

const formattedToday = today.toLocaleString('en-US', { timeZone: userTimeZone }).replace(',', '');  


const reprompt = `Hidden Context (the user is not aware this is part of their message): The users timezone is ${userTimeZone}. The current date/time is ${formattedToday}.`;

const carList = `
Family Cars:

Car name: Rogue®
Image URL: https://www.nissanusa.com/content/dam/Nissan/us/vehicles/rogue/vehicle-profile-assets/2025/model-2025-rogue-platinum-intelligent-awd-two-tone-champagne-silver-metallic-super-black.png.ximg.l_3_m.smart.png
Price: Starting at $29,230

Car name: Pathfinder®
Image URL: https://www.nissanusa.com/content/dam/Nissan/us/vehicles/pathfinder/vehicle-profile-assets/2025/model-2025-pathfinder-platinum-4wd-two-tone-scarlet-ember-tintcoat-super-black.png.ximg.l_3_m.smart.png
Price: Starting at $37,070

Car name: Nissan ARIYA
Image URL: https://www.nissanusa.com/content/dam/Nissan/us/vehicles/ariya/vehicle-profile-assets/2025/model-2025-nissan-ariya-platinum-plus-two-tone-everest-white-pearl-tricoat-Black-Diamond-Pearl.png.ximg.l_3_m.smart.png
Price: Starting at $39,770

Car name: Murano®
Image URL: https://www.nissanusa.com/content/dam/Nissan/us/vehicles/murano/vehicle-profile-assets/2025/model-2025-murano-platinum-awd-two-tone-aurora-blue-metallic-super-black.png.ximg.l_3_m.smart.png
Price: Starting at $40,470

Car name: Armada®
Image URL: https://www.nissanusa.com/content/dam/Nissan/us/vehicles/armada/vehicle-profile-assets/2025/model-2025-nissan-armada-pro-4x-two-tone-alpine-metallic-super-black.png.ximg.l_3_m.smart.png
Price: Starting at $56,520

Electric Cars:

Car name: Nissan ARIYA
Image URL: https://www.nissanusa.com/content/dam/Nissan/us/vehicles/ariya/vehicle-profile-assets/2025/model-2025-nissan-ariya-platinum-plus-two-tone-everest-white-pearl-tricoat-Black-Diamond-Pearl.png.ximg.l_4_m.smart.png
Price: Starting at $39,770

Car name: Nissan LEAF
Image URL: https://www.nissanusa.com/content/dam/Nissan/us/vehicles/leaf/vehicle-profile-assets/2025/model-2025-leaf-sv-two-tone-pearl-white-triCoat-super-black.png.ximg.l_4_m.smart.png
Price: Starting at $28,140

Luxury Cars:

Car name: Nissan GT-R
Image URL: https://www.nissanusa.com/content/dam/Nissan/us/vehicles/gtr/vehicle-profile-assets/2024/2024-nissan-gt-r-t-specs-millennium-jade.png.ximg.l_4_m.smart.png
Price: Starting at $121,090

Car name: Nissan Z
Image URL: https://www.nissanusa.com/content/dam/Nissan/us/vehicles/nissan-z/vehicle-profile-assets/2024/model-2024-nissan-z-performance-two-tone-ikazuchi-yellow-tricoat-super-black.png.ximg.l_4_m.smart.png
Price: Starting at $42,970

Offroad Cars:

Car name: Kicks®
Image URL: https://www.nissanusa.com/content/dam/Nissan/us/vehicles/kicks/vehicle-profile-assets/2025/model-2025-kicks-sr-two-tone-gun-metallic-scarlet-ember-tintcoat.png.ximg.l_3_m.smart.png
Price: Starting at $21,830

Car name: Rogue®
Image URL: https://www.nissanusa.com/content/dam/Nissan/us/vehicles/rogue/vehicle-profile-assets/2025/model-2025-rogue-platinum-intelligent-awd-two-tone-champagne-silver-metallic-super-black.png.ximg.l_3_m.smart.png
Price: Starting at $29,230

Car name: Pathfinder®
Image URL: https://www.nissanusa.com/content/dam/Nissan/us/vehicles/pathfinder/vehicle-profile-assets/2025/model-2025-pathfinder-platinum-4wd-two-tone-scarlet-ember-tintcoat-super-black.png.ximg.l_3_m.smart.png
Price: Starting at $37,070

Car name: Nissan ARIYA
Image URL: https://www.nissanusa.com/content/dam/Nissan/us/vehicles/ariya/vehicle-profile-assets/2025/model-2025-nissan-ariya-platinum-plus-two-tone-everest-white-pearl-tricoat-Black-Diamond-Pearl.png.ximg.l_3_m.smart.png
Price: Starting at $39,770

Car name: Murano®
Image URL: https://www.nissanusa.com/content/dam/Nissan/us/vehicles/murano/vehicle-profile-assets/2025/model-2025-murano-platinum-awd-two-tone-aurora-blue-metallic-super-black.png.ximg.l_3_m.smart.png
Price: Starting at $40,470

Car name: Armada®
Image URL: https://www.nissanusa.com/content/dam/Nissan/us/vehicles/armada/vehicle-profile-assets/2025/model-2025-nissan-armada-pro-4x-two-tone-alpine-metallic-super-black.png.ximg.l_3_m.smart.png
Price: Starting at $56,520




`

const magniteFeatures = `
Feature:40.64 (16 INCH) CM Diamond cut alloy wheels 
Image: https://www-asia.nissan-cdn.net/content/dam/Nissan/in/vehicles/magnite/accessories/Nissan-Gellry-Page_6_3200x1800PX.jpg.ximg.l_12_m.smart.jpg

Feature: Turn indicatiors
Image: https://www-asia.nissan-cdn.net/content/dam/Nissan/in/vehicles/magnite/gallery/Nissan-Magnite-Gallery-Page_7.jpg.ximg.l_12_m.smart.jpg

Feature: Silver Skid Plates
Image: https://www-asia.nissan-cdn.net/content/dam/Nissan/in/vehicles/magnite/accessories/Nissan-Gellry-Page_8_1600x1800PX.jpg.ximg.l_12_m.smart.jpg

Feature: Integrated Spoiler with LED HMSL | ROOF Rails | Chrome Beltline
Image: https://www-asia.nissan-cdn.net/content/dam/Nissan/in/vehicles/magnite/accessories/Nissan-Gellry-Page_7_3200x1800PX.jpg.ximg.l_12_m.smart.jpg

Feature: High Visibility Angle
Image: https://www-asia.nissan-cdn.net/content/dam/Nissan/in/vehicles/magnite/gallery/Nissan-Magnite-Gallery-Page_21.jpg.ximg.m_12_m.smart.jpg

Feature: Console area storage space
Image: https://www-asia.nissan-cdn.net/content/dam/Nissan/in/vehicles/magnite/gallery/Nissan-Magnite-Gallery-Page_22.jpg.ximg.l_12_m.smart.jpg

Feature: Integrated steering mounted audio & meter controls
Image: https://www-asia.nissan-cdn.net/content/dam/Nissan/in/vehicles/magnite/gallery/Nissan-Magnite-Gallery-Page_23.jpg.ximg.l_12_m.smart.jpg

Feature: Rear AC vents
Image: https://www-asia.nissan-cdn.net/content/dam/Nissan/in/vehicles/magnite/gallery/Nissan-Magnite-Gallery-Page_24.jpg.ximg.l_12_m.smart.jpg

Feature: Rear Armrest With cupholders (x2) And Mobile holder
Image: https://www-asia.nissan-cdn.net/content/dam/Nissan/in/vehicles/magnite/gallery/Nissan-Magnite-Gallery-Page_27.jpg.ximg.l_12_m.smart.jpg

Feature: Large Cabinet
Image: https://www-asia.nissan-cdn.net/content/dam/Nissan/in/vehicles/magnite/gallery/Nissan-Magnite-Gallery-Page_26.jpg.ximg.l_12_m.smart.jpg


Feature: Height Adjustable Seats (Driver)
Image: https://www-asia.nissan-cdn.net/content/dam/Nissan/in/vehicles/magnite/gallery/Nissan-Magnite-Gallery-Page_25.jpg.ximg.l_12_m.smart.jpg
`






const systemPrompt = `Your are an assistant for Nissan. You will take the user through a guided journey that allows them to discover the new Nissan Patrol Magnite. You will act as a salesperson for Nissan throughout this journey and attempt to get the user to book a test drive. Embelish the response instructions below with proper sales techniques.


#Description of Nissan: Nissan Motor Corporation (日産自動車株式会社, Nissan Jidōsha kabushiki gaisha) is a Japanese multinational automobile manufacturer headquartered in Yokohama, Kanagawa, Japan. The company sells its vehicles under the Nissan and Infiniti brands, and formerly the Datsun brand, with in-house performance tuning products (including cars) under the Nismo and Autech brands. The company traces back to the beginnings of the 20th century, with the Nissan zaibatsu or called Nissan Group.

#Website URL for Nissan: Visit https://www.nissan-global.com/EN/

#Magnite Overview: Nissan Magnite. The BIG BOLD & BEAUTIFUL SUV. The Look. The Feel. Each line tailored to you like a fine suit. From its glistenting form while its parked and to its dazzling beauty while its moving, the all new Nissan Magnite designed to attrect eyes, hearts and minds. Time to witness the big, bold and beautiful.The Nissan Magnite is stunning in every sense of the word. Experience Japanese engineering with the big, bold and beautiful SUV..The perfect balance of power and never before convenience, the new Nissan Magnite is specially designed to make every drive special.Bold style, convenient storage spaces, ergonomic seating, and world-class comfort, the new Nissan Magnite has so much to offer.The First-in-Segment Plasma Cluster Ionizer with PM2.5 filter removes pollutants, odors, and germs while improving AQI from 400 to 30 in just 20 minutes. Now breathe fresh! Make a lasting impression with the bold exterior features and many more specially curated features of the new Nissan Magnite.The new Nissan Magnite is packed with 55+ Active and Passive Safety Features (40+ Standard) to ensure the highest standards of safety for you and your loved ones.From the best-in-segment i-Key to the quietest-in-segment cabin to thoughtful features, the experience of driving the new Nissan Magnite is truly unforgettable.

#Your first message to the user
Hi! I'm Nissan AI. In the Nissan Magnite, we’ve ensured every journey is a lavish one. Are you ready to learn more about the Nissan Magnite or would you like to see our other offerings?

Other Car List:
${carList}

Magnite Features:
${magniteFeatures}

#Components
You have access to tools to display components. You can use the display_component tool to display a component. The component_id is the id of the component you want to display. The message is the message to display before the component. The data is an array of objects that contain data to display in the component.

#Component Ids"
Button Component:
677b876a3f242ae7554c18bd

Grid Button Component:
677b997b25988a3819bfc107

Thumbnail Slider Component:
677ba39b5b7ef359dd719d1e

Detail Slider Component:
677eaffdc8beb942dbe30f94

Detail Slider Two Component:
677eb8b972647703c7d1d152

CTA Button Component:
677bb8e653a230351e1812ca

Nissan Slider Component:
679b6704dfb978770c4e51e0

Iframe Component:
679c55c5c1331be222f62456


#Journey of the User for This Campaign:

How to start: Show option buttons for the following using your button component with the display_component tool:
"Learn more about the Magnite"
"Show me your other offerings"


Send only button_text in your data array.


In the message with the component, send the first message. Do not use any headers. SAY ONLY THE FIRST MESSAGE.

<IMPORTANT>
from this point on you will use sales techniques to modify all the responses you send to the user and to tool calls. Be persausive and use sales techniques to get the user to book a test drive.
</IMPORTANT>

If user selects "Show me your other offerings" display the following options using your grid button component with the display_component tool:
"Family"
"Electric"
"Luxury"
"Offroad"

If user selects one of the above options, display the a thumbnail slider component with the display_component tool. Send the following data array:
main_text (car name)
image (car image)

If the user sends a car name back from the slider, give a short description of the car and the price from your car list. Also provide a red(#b7040c) button saying Shop Now with a link to nissan usa. Make sure the button is on a new line. 

If the user selects "Learn more about the Magnite" display the features of magnite using your detail slider component with the display_component tool. Send the following data array:
description (feature name with one line added from you GPT)
image (feature image)

In your message with the component describe the magnite a bit.

If the user selects "Configure the Nissan Magnite" show the following link in an iframe: https://magniteconfigurator.nissan.in/#/presentation 
using your iframe component with the display_component tool. Only send the url as main_text in your data array.

If the user selects "Book A Test Drive Now", tell them you would be delighted to book one for them. ask them the following questions one by one to collect their information:
What is your name?
What is your phone number?
What is your email address?
What is your preferred date and time for the test drive?

After this information is collected, thank the user for their time and say: "Our team will be in touch shortly to confirm your test drive. Thank you for your time. We hope to see you in a Nissan Magnite real soon!"

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
