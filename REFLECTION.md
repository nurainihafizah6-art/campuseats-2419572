# Week 1 reflection

1. What is the difference between building a UI imperatively (plain DOM code) and declaratively (React)?
   I need to write the steps to change the webpage when using plain DOM code. In React, I just need to describe what I want to display and it will handle the updates for me.

2. Why must a component name start with a capital letter?
   So that React can recognize it as a component instead of a normal HTML tag.

3. What does a fragment <>...</> do, and why not just use a <div>?
   A fragment is used to group multiple elements without the need of adding an extra element to the webpage. We use it instead of <div> because it keeps our code structure cleaner.

4. Name one benefit of splitting the UI into small components.
   One benefit is that it makes my code easier to manage and understand. For example, I can edit the VendorCard file separately in my CampusEats project.

## Week 6 reflection

### Question 1: Explain, step by step, what happens from the moment you click Place order until the new order appears on your Orders page. Name the functions in your own code that run, and say why you never call setOrders yourself.

When I click the Place Order button, the handlePlaceOrder() function in CartPage.jsx is called. This function then calls placeOrders() from orders.js to save the order details into Firestore. If the cart contains items from different vendors, placeOrders() separates them and creates an order for each vendor using writeBatch(). After the orders are successfully saved, the clearCart() function clears the cart, and navigate("/orders") redirects me to the Orders page. On this page, the useMyOrders() hook calls subscribeToMyOrders() to retrieve my orders from Firestore. The onSnapshot() listener automatically detects the new orders and updates the React state through setOrders() inside the hook. Therefore, I do not need to call setOrders() myself in CartPage.jsx because the Firestore listener handles the updates automatically.

### Question 2: Why is orders a top-level collection, and why does each order copy vendorName and each item’s name and price instead of storing only IDs?

The orders collection is stored at the top level in Firestore because students can order food from different vendors. This makes it easier to retrieve all orders belongs to a student using their studentUid and without checking each vendor separately. Each order also stores the vendorName, item names and prices instead of only storing their IDs. This is important because the vendor might change their menu information in the future. For example, if a vendor increases the price of Nasi Lemak from RM5 to RM7, the student's previous order should still show the original price of RM5. By copying these details, the system can keep an accurate order history and display the order information without needing to retrieve the menu items again.

### Question 3: Your personal feature: which Firestore path and fields hold its data, and which line of your code reads it? Paste that line.

My personal feature is sorting menu items by price and popularity using Cloud Firestore. The menu data is stored at vendors/{vendorId}/menu/{itemId}, where each menu document contains fields such as price and popularity. In src/services/vendors.js, the subscribeToMenu() function uses Firestore's orderBy() to retrieve the menu items in the selected order. For example, the following line sorts the menu items from the lowest price to the highest price:

menuQuery = query(menuRef, orderBy("price", "asc"));

The application also supports sorting by highest price and highest popularity using different orderBy() queries. Since the function uses onSnapshot(), any changes to the price or popularity in Firestore will automatically update the menu without refreshing the page.
