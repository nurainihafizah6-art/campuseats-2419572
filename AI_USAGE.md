# AI usage log

Using AI never costs marks; a vague or missing log does.
Add a new section every week, before you tag. Did not use AI? Write "None" under Tool(s).

## Week 1

- Tool(s): ChatGPT
- What I asked for: to guide me setting up CampusEats using React and Vite
- What I kept, changed or rejected, and why: I followed all the instructions from lab and change the vendor details to my own restaurant
- One thing the AI got wrong and how I fixed it: ChatGPT assumed I was using a different project folder. Then, I cralified my project setup and continue working on my project

## Week 2

- Tool(s): ChatGPT
- What I asked for: I asked for help to understand props, display menu items using .map() and use UseState to switch between vendors
- What I kept, changed or rejected, and why: I changed the restaurant details to match with my project
- One thing the AI got wrong and how I fixed it: AI initially provide restaurant data with only a few menu items, which did not fully meet the requirements. I checked the requirements again and update vendors.js file to include more menu items and vendors

## Week 3

- Tool(s): ChatGPT
- What I asked for: I asked ChatGPT to become my learning assistant to understand and implement the Week 3 CampusEats lab requirements step by step
- What I kept, changed or rejected, and why: I made some changes such as adding all 16 IIUM mahallah options and showing the popularity score for each menu item.
- One thing the AI got wrong and how I fixed it: ChatGPT suggested adding min and max for the pickup time but the browser showed its own error message instead of the error that I created. Then, I fixed it by adding noValidate to the form so my own error message could appear

## Week 4

- Tool(s): ChatGPT
- What I asked for: To help me understand well how to use react router and custom hooks for my CampusEats
- What I kept, changed or rejected, and why: I changed cart and checkout layout to be side by side instead of need to select "proceed to checkout" because it will be easy for customer to double check order before checkout
- One thing that AI got wrong and how i fixed it: It change my original vendor card design , so I change it back to the original design

## Week 5

- Tool(s): ChatGPT
- What I asked for: To help me understand Firebase Authentication, React Context, protected routes, and user-specific localStorage preferences
- What I kept, changed or rejected, and why: I modified my existing VendorPage to save sorting preferences using each user's Firebase UID
- One thing that AI got wrong and how I fixed it: The AI provided only four Firebase environment variables, while the lab instructions required six. So, I corrected the configuration by including all six variables

## Week 6

- Tool(s): ChatGPT
- What I asked for: To guide me step by step for Lab 6 which includes displaying live vendor and menu data, and implementing my personal sorting feature using Firestore queries
- What I kept, changed or rejected, and why: I used orderBy() to sort menu items by price and popularity and I adjusted the suggested code to make sure it worked with my existing CampusEats features
- One thing that AI got wrong and how I fixed it: The AI accidentally removed one of my existing sorting options when updating VendorPage.jsx. My dropdown originally had four options but the suggested code only had three. I noticed the mistake and fixed it by adding back the Price: High to Low option and updating the Firestore query in vendors.js
