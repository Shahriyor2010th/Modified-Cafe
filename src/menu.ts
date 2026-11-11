// Menu data: product categories used by the menu filters and product cards.
export const menu = {
  restaurant: "L'Aurora Artisan Café",
  currency: "USD",

  // Product records grouped by the filters shown on the menu page.
  categories: {
    burgers: [
      { id: 1, name: "Classic Burger", price: 9.5, description: "Juicy beef patty with fresh lettuce, tomato and house sauce." },
      { id: 2, name: "Cheeseburger", price: 11.0, description: "Grilled beef patty topped with melted cheddar and pickles." },
      { id: 3, name: "Double Cheeseburger", price: 14.5, description: "Two juicy beef patties with double cheddar cheese and special sauce." },
      { id: 4, name: "Bacon Burger", price: 13.5, description: "Beef patty topped with crispy bacon, cheddar and smoky sauce." },
      { id: 5, name: "BBQ Burger", price: 12.5, description: "Grilled beef, caramelized onions and rich BBQ sauce." },
      { id: 6, name: "Crispy Chicken Burger", price: 10.5, description: "Golden fried chicken with lettuce and creamy mayonnaise." },
      { id: 7, name: "Spicy Chicken Burger", price: 11.5, description: "Crispy chicken fillet with jalapeños and spicy sauce." },
      { id: 8, name: "Mushroom Swiss Burger", price: 13.0, description: "Beef patty with sautéed mushrooms and melted Swiss cheese." },
      { id: 9, name: "Truffle Wagyu Burger", price: 21.0, description: "Premium Wagyu beef with aged cheddar and truffle aioli." },
    ],

    pizza: [
      { id: 10, name: "Margherita Pizza", price: 12.0, description: "Classic tomato sauce, mozzarella and fresh basil." },
      { id: 11, name: "Pepperoni Pizza", price: 15.0, description: "Mozzarella cheese topped with spicy pepperoni slices." },
      { id: 12, name: "BBQ Chicken Pizza", price: 16.0, description: "Grilled chicken, BBQ sauce, red onions and mozzarella." },
      { id: 13, name: "Four Cheese Pizza", price: 17.0, description: "A rich combination of mozzarella, parmesan, cheddar and gorgonzola." },
      { id: 14, name: "Meat Lovers Pizza", price: 19.0, description: "Loaded with beef, pepperoni, sausage and melted mozzarella." },
      { id: 15, name: "Hawaiian Pizza", price: 15.0, description: "Sweet pineapple, savory ham and mozzarella cheese." },
      { id: 16, name: "Vegetarian Pizza", price: 14.0, description: "Fresh mushrooms, bell peppers, olives and onions." },
      { id: 17, name: "Prosciutto & Hot Honey Pizza", price: 23.5, description: "Italian prosciutto, mozzarella, fresh arugula and spicy honey." },
    ],

    sandwichesAndWraps: [
      { id: 18, name: "Club Sandwich", price: 11.0, description: "Toasted bread layered with chicken, bacon, lettuce and tomato." },
      { id: 19, name: "Chicken Sandwich", price: 10.0, description: "Grilled chicken breast with cheese and fresh vegetables." },
      { id: 20, name: "Philly Cheesesteak", price: 14.0, description: "Tender sliced beef with melted cheese and caramelized onions." },
      { id: 21, name: "Tuna Melt", price: 10.5, description: "Creamy tuna filling with melted cheddar on toasted bread." },
      { id: 22, name: "Crispy Chicken Wrap", price: 9.5, description: "Crispy chicken, fresh lettuce and creamy ranch dressing." },
      { id: 23, name: "Spicy Beef Wrap", price: 11.0, description: "Seasoned beef, bell peppers and homemade spicy sauce." },
      { id: 24, name: "Veggie Wrap", price: 8.5, description: "Fresh seasonal vegetables, hummus and mixed greens." },
    ],

    friedChicken: [
      { id: 25, name: "Classic Fried Chicken (2 pcs)", price: 7.5, description: "Two pieces of juicy chicken with a crispy golden coating." },
      { id: 26, name: "Fried Chicken (4 pcs)", price: 13.0, description: "Four pieces of freshly fried, seasoned chicken." },
      { id: 27, name: "Chicken Wings (6 pcs)", price: 9.0, description: "Six crispy wings with our signature seasoning." },
      { id: 28, name: "Spicy Wings (8 pcs)", price: 12.0, description: "Eight crispy wings tossed in a hot and spicy sauce." },
      { id: 29, name: "Chicken Tenders (4 pcs)", price: 8.5, description: "Four tender chicken strips with a crunchy coating." },
      { id: 30, name: "Chicken Nuggets (8 pcs)", price: 7.0, description: "Bite-sized golden chicken pieces served with dipping sauce." },
      { id: 31, name: "BBQ Wings (8 pcs)", price: 12.0, description: "Crispy chicken wings coated in smoky BBQ sauce." },
    ],

    // Side dishes, pasta, and desserts.
    sidesAndSnacks: [
      { id: 32, name: "Classic French Fries", price: 4.0, description: "Golden, crispy potato fries lightly seasoned with salt." },
      { id: 33, name: "Cheese Fries", price: 5.5, description: "Crispy fries covered with warm melted cheddar cheese." },
      { id: 34, name: "Loaded Fries", price: 8.0, description: "French fries topped with cheese, crispy bacon and special sauce." },
      { id: 35, name: "Potato Wedges", price: 5.0, description: "Thick-cut potato wedges with a crispy seasoned exterior." },
      { id: 36, name: "Onion Rings", price: 5.0, description: "Sweet onion rings coated in a golden crispy batter." },
      { id: 37, name: "Mozzarella Sticks (6 pcs)", price: 7.0, description: "Six crispy sticks filled with melted mozzarella." },
      { id: 38, name: "Garlic Bread", price: 4.5, description: "Toasted bread brushed with garlic butter and herbs." },
      { id: 39, name: "Chicken Popcorn", price: 7.5, description: "Small crispy chicken bites served with dipping sauce." },
    ],

    pasta: [
      { id: 40, name: "Chicken Alfredo", price: 14.0, description: "Creamy parmesan sauce with grilled chicken and fettuccine." },
      { id: 41, name: "Spaghetti Bolognese", price: 13.0, description: "Spaghetti served with rich slow-cooked beef and tomato sauce." },
      { id: 42, name: "Penne Arrabbiata", price: 11.0, description: "Penne pasta tossed in a spicy garlic and tomato sauce." },
      { id: 43, name: "Creamy Mushroom Pasta", price: 13.5, description: "Tender pasta with sautéed mushrooms and creamy parmesan sauce." },
      { id: 44, name: "Carbonara", price: 14.5, description: "Classic creamy pasta with crispy bacon, egg and parmesan." },
      { id: 45, name: "Seafood Pasta", price: 18.0, description: "Pasta with shrimp, mussels and a rich garlic cream sauce." },
    ],

    desserts: [
      { id: 46, name: "New York Cheesecake", price: 7.0, description: "Smooth and creamy cheesecake on a buttery biscuit base." },
      { id: 47, name: "Chocolate Lava Cake", price: 8.5, description: "Warm chocolate cake with a rich molten chocolate center." },
      { id: 48, name: "Tiramisu", price: 8.0, description: "Italian dessert layered with coffee-soaked biscuits and mascarpone cream." },
      { id: 49, name: "Chocolate Brownie", price: 6.0, description: "Rich, fudgy chocolate brownie with a soft center." },
      { id: 50, name: "Basque Cheesecake", price: 12.0, description: "Creamy vanilla cheesecake with a beautifully caramelized top." },
      { id: 51, name: "Belgian Waffles", price: 9.0, description: "Freshly made waffles served with berries and maple syrup." },
      { id: 52, name: "French Toast", price: 10.0, description: "Golden brioche slices topped with fresh berries and maple syrup." },
      { id: 53, name: "Ice Cream (3 scoops)", price: 5.5, description: "Three scoops of your favorite classic ice cream flavors." },
    ],

    // Hot coffee, cold drinks, and other beverages.
    drinksAndCoffee: {
      hotCoffee: [
        { id: 54, name: "Espresso", price: 3.0, description: "A rich and concentrated shot of freshly brewed coffee." },
        { id: 55, name: "Americano", price: 3.5, description: "Espresso diluted with hot water for a smooth coffee flavor." },
        { id: 56, name: "Cappuccino", price: 4.5, description: "Espresso topped with steamed milk and a thick layer of foam." },
        { id: 57, name: "Caffè Latte", price: 4.75, description: "Smooth espresso blended with steamed milk and light foam." },
        { id: 58, name: "Flat White", price: 4.5, description: "Strong espresso balanced with silky microfoam milk." },
        { id: 59, name: "Mocha", price: 5.0, description: "Espresso combined with chocolate and steamed milk." },
        { id: 60, name: "Spanish Latte", price: 5.5, description: "Espresso mixed with creamy milk and sweet condensed milk." },
      ],

      coldDrinks: [
        { id: 61, name: "Iced Americano", price: 4.0, description: "Refreshing espresso served over ice and cold water." },
        { id: 62, name: "Iced Latte", price: 4.75, description: "Chilled espresso mixed with fresh milk and ice." },
        { id: 63, name: "Iced Caramel Macchiato", price: 5.5, description: "Iced milk layered with espresso and sweet caramel." },
        { id: 64, name: "Iced Spanish Latte", price: 5.75, description: "Chilled espresso with creamy milk and condensed milk." },
        { id: 65, name: "Strawberry Smoothie", price: 6.0, description: "Blended fresh strawberries with a creamy fruit base." },
        { id: 66, name: "Mango Smoothie", price: 6.0, description: "Sweet tropical mango blended into a refreshing smoothie." },
        { id: 67, name: "Chocolate Milkshake", price: 6.5, description: "Thick milkshake blended with rich chocolate ice cream." },
        { id: 68, name: "Vanilla Milkshake", price: 6.0, description: "Creamy vanilla ice cream blended with fresh milk." },
      ],

      otherDrinks: [
        { id: 69, name: "Fresh Orange Juice", price: 4.5, description: "Freshly squeezed oranges served chilled." },
        { id: 70, name: "Fresh Lemonade", price: 4.0, description: "Refreshing homemade lemonade with freshly squeezed lemons." },
        { id: 71, name: "Green Tea", price: 3.0, description: "Light and refreshing freshly brewed green tea." },
        { id: 72, name: "Black Tea", price: 2.5, description: "Classic aromatic black tea served hot." },
        { id: 73, name: "Mineral Water", price: 2.0, description: "Refreshing bottled mineral water." },
        { id: 74, name: "Coca-Cola", price: 2.5, description: "Classic chilled Coca-Cola served with ice." },
      ],
    },
  },
};



// Flat product list used by the randomized "All Items" view.
export const allProds = [
  menu.categories.burgers,
  menu.categories.pizza,
  menu.categories.sandwichesAndWraps,
  menu.categories.friedChicken,
  menu.categories.sidesAndSnacks,
  menu.categories.pasta,
  menu.categories.desserts,
  menu.categories.drinksAndCoffee.hotCoffee,
  menu.categories.drinksAndCoffee.coldDrinks,
  menu.categories.drinksAndCoffee.otherDrinks,
].flat();
