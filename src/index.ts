// Menu data
import { menu } from "./menu.js";
import { allProds } from "./menu.js";

type Language = "en" | "ru" | "uz";
const savedLanguage = localStorage.getItem("siteLanguage") as Language | null;
let currentLanguage: Language = savedLanguage === "ru" || savedLanguage === "uz" ? savedLanguage : "en";
let productTranslationsReady = false;

type mealType = {
  id: number;
  name: string;
  price: number;
  description: string;
};

// Shared menu and order state
let menuItems = menu;

let allProducts = allProds;

// console.log(allProducts);

let ProdGrid = document.querySelector(".product-grid") as HTMLElement;
let Close = document.querySelector(".close__orders") as HTMLHRElement;
let ListBottom = document.querySelector(".list__bottom") as HTMLDivElement;

let products: any[] = [];
let activeMenuProducts: Partial<mealType>[] | null = null;
let NumofOr = document.querySelector(".numOfOrders") as HTMLElement;
let orders: Partial<mealType>[] = JSON.parse(
  localStorage.getItem("data") || "[]",
);

NumofOr.textContent = orders.length.toString();

// Product rendering: show a selection from the full menu.
function renderAllProducts() {
  ProdGrid.innerHTML = "";
  activeMenuProducts = null;
  products = [];
  for (let i = 0; i < 11; i++) {
    let random = Math.floor(Math.random() * allProducts.length);
    products.push(allProducts[random]);
  }
  products.forEach((prod) => {
    const shownProduct = translateProduct(prod);
    let box = document.createElement("div");
    box.classList.add("product__box");
    box.innerHTML = `
            <div class="img__container">
                <img  src="./menu_item_images/${prod.id}.png" alt="${shownProduct.name}">
            </div>
            <div class="product-info">
                <h3>${shownProduct.name}</h3>
                <span>$${prod.price.toFixed(2)}</span>
                <p>${shownProduct.description}</p>
            </div>
            <button class="add__to-cart">🛒 Add to Cart</button>
        `;
    ProdGrid.appendChild(box);

    let AddCart = box.querySelector(".add__to-cart") as HTMLButtonElement;
    AddCart.addEventListener("click", () => {
      if (orders.length == 0) {
        orders.push(prod);
        localStorage.setItem("data", JSON.stringify(orders));

        AddCart.classList.add("addedToCart");
        NumofOr.textContent = orders.length.toString();
      } else {
        let found = orders.find((el?) => el?.id == prod.id);
        if (found) {
          alert(translateText("You have already ordered this meal. If you want to order more of this pleace go to the cart and increase the number of orders there."));
        } else {
          orders.push(prod);
          localStorage.setItem("data", JSON.stringify(orders));

          AddCart.classList.add("addedToCart");
          NumofOr.textContent = orders.length.toString();
        }
      }
      setTimeout(() => {
        AddCart.classList.remove("addedToCart");
      }, 1000);
    });
  });
}

renderAllProducts();

// All-items filter: refresh the product selection.
let allItemsBTN = document.querySelector(".all__items") as HTMLButtonElement;
allItemsBTN.addEventListener("click", () => {
  products = [];
  renderAllProducts();
});

// Product categories used by the menu filters
let burgers = menuItems.categories.burgers;
let sandwiches = menuItems.categories.sandwichesAndWraps;
let pizza = menuItems.categories.pizza;
let friedChicken = menuItems.categories.friedChicken;
let snacks = menuItems.categories.sidesAndSnacks;
let pasta = menuItems.categories.pasta;
let desserts = menuItems.categories.desserts;
let coffee: any[] = [
  menuItems.categories.drinksAndCoffee.hotCoffee,
  menuItems.categories.drinksAndCoffee.coldDrinks,
  menuItems.categories.drinksAndCoffee.otherDrinks,
].flat(Infinity);

// Category filters: render the matching products when selected.
let burgersBTN = document.querySelector(".burgers") as HTMLButtonElement;
burgersBTN.addEventListener("click", () => {
  renderCategoryProducts(burgers);
});
let pastaBTN = document.querySelector(".pasta") as HTMLButtonElement;
pastaBTN.addEventListener("click", () => {
  renderCategoryProducts(pasta);
});
let sandwichesBTN = document.querySelector(".sandwiches") as HTMLButtonElement;
sandwichesBTN.addEventListener("click", () => {
  renderCategoryProducts(sandwiches);
});
let pizzaBTN = document.querySelector(".pizza") as HTMLButtonElement;
pizzaBTN.addEventListener("click", () => {
  renderCategoryProducts(pizza);
});
let friedChickenBTN = document.querySelector(
  ".fried-chicken",
) as HTMLButtonElement;
friedChickenBTN.addEventListener("click", () => {
  renderCategoryProducts(friedChicken);
});
let snacksBTN = document.querySelector(".snacks") as HTMLButtonElement;
snacksBTN.addEventListener("click", () => {
  renderCategoryProducts(snacks);
});
let dessertsBTN = document.querySelector(".desserts") as HTMLButtonElement;
dessertsBTN.addEventListener("click", () => {
  renderCategoryProducts(desserts);
});
let coffeeBTN = document.querySelector(".coffee") as HTMLButtonElement;
coffeeBTN.addEventListener("click", () => {
  renderCategoryProducts(coffee);
});

// Product rendering: show products from one selected category.
function renderCategoryProducts(item: Partial<mealType>[]) {
  activeMenuProducts = item;
  ProdGrid.innerHTML = "";
  item.forEach((prod) => {
    const shownProduct = translateProduct(prod);
    let box = document.createElement("div");
    box.classList.add("product__box");
    box.innerHTML = `
            <div class="img__container">
                <img  src="./menu_item_images/${prod.id}.png" alt="${shownProduct.name}">
            </div>
            <div class="product-info">
                <h3>${shownProduct.name}</h3>
                <span>$${prod.price?.toFixed(2)}</span>
                <p>${shownProduct.description}</p>
            </div>
            <button class="add__to-cart">🛒 Add to Cart</button>
        `;
    ProdGrid.appendChild(box);

    let AddCart = box.querySelector(".add__to-cart") as HTMLButtonElement;
    AddCart.addEventListener("click", () => {
      if (orders.length == 0) {
        orders.push(prod);
        localStorage.setItem("data", JSON.stringify(orders));

        AddCart.classList.add("addedToCart");
        NumofOr.textContent = orders.length.toString();
      } else {
        let found = orders.find((el?) => el?.id == prod.id);
        if (found) {
          alert(translateText("You have already ordered this meal. If you want to order more of this pleace go to the cart and increase the number of orders there."));
        } else {
          orders.push(prod);
          localStorage.setItem("data", JSON.stringify(orders));

          AddCart.classList.add("addedToCart");
          NumofOr.textContent = orders.length.toString();
        }
      }
      setTimeout(() => {
        AddCart.classList.remove("addedToCart");
      }, 1000);
    });
  });
}

// Selected filter styling: keep one filter highlighted at a time.
let arrayOfBtns = [
  burgersBTN,
  sandwichesBTN,
  pizzaBTN,
  friedChickenBTN,
  snacksBTN,
  dessertsBTN,
  coffeeBTN,
  allItemsBTN,
  pastaBTN,
];

function ClassSelToggle() {
  burgersBTN.addEventListener("click", () => {
    arrayOfBtns.forEach((btn) => {
      btn.classList.remove("selected");
    });
    burgersBTN.classList.add("selected");
  });
  pastaBTN.addEventListener("click", () => {
    arrayOfBtns.forEach((btn) => {
      btn.classList.remove("selected");
    });
    pastaBTN.classList.add("selected");
  });
  sandwichesBTN.addEventListener("click", () => {
    arrayOfBtns.forEach((btn) => {
      btn.classList.remove("selected");
    });
    sandwichesBTN.classList.add("selected");
  });
  pizzaBTN.addEventListener("click", () => {
    arrayOfBtns.forEach((btn) => {
      btn.classList.remove("selected");
    });
    pizzaBTN.classList.add("selected");
  });
  friedChickenBTN.addEventListener("click", () => {
    arrayOfBtns.forEach((btn) => {
      btn.classList.remove("selected");
    });
    friedChickenBTN.classList.add("selected");
  });
  snacksBTN.addEventListener("click", () => {
    arrayOfBtns.forEach((btn) => {
      btn.classList.remove("selected");
    });
    snacksBTN.classList.add("selected");
  });
  dessertsBTN.addEventListener("click", () => {
    arrayOfBtns.forEach((btn) => {
      btn.classList.remove("selected");
    });
    dessertsBTN.classList.add("selected");
  });
  coffeeBTN.addEventListener("click", () => {
    arrayOfBtns.forEach((btn) => {
      btn.classList.remove("selected");
    });
    coffeeBTN.classList.add("selected");
  });
  allItemsBTN.addEventListener("click", () => {
    arrayOfBtns.forEach((btn) => {
      btn.classList.remove("selected");
    });
    allItemsBTN.classList.add("selected");
  });
}

ClassSelToggle();

// Cart controls and display
let CartBTN = document.querySelector(".bag") as HTMLButtonElement;
let Cart = document.querySelector(".cart__container") as HTMLDivElement;
let CartBottom = document.querySelector(".cart__bottom") as HTMLDivElement;
let dishList = document.querySelector(".list__bottom") as HTMLDivElement;

// Cart rendering: show the empty state or the current order layout.
function renderCartContents() {
  if (orders.length == 0) {
    CartBottom.classList.add("an__emptyOne");
    CartBottom.innerHTML = `
        <h1>You have not ordered anything yet.</h1>
        <p>Make sure to check out our menu.</p>
    `;
  } else {
    CartBottom.classList.remove("an__emptyOne");
    CartBottom.innerHTML = `
          <div class="left">
            <div class="dish__list">
              <div class="list__top">
                <h4>Meals</h4>
                <button class="order__clear">🗑️Clear Orders</button>
              </div>
              <div class="list__bottom"></div>
            </div>
            <div class="additionals"></div>
            <div class="other__meals"></div>
          </div>
          <div class="right">
            <div class="total__price">
              <h1>Total Price:</h1><span class='sum__price'>0$</span>
            </div>
            <div class="dashed__line"></div>
            <div class="discounts">
              <h1>Discount: <span>0</span>%</h1>
            </div>
            <div class="dashed__line"></div>
            <div class="button__box">
              <button class="book__orders">Confirm Orders✔️</button>
            </div>
          </div>
        `;

    let OrdersList = document.querySelector(".list__bottom") as HTMLDivElement;
    let SumPrice = CartBottom.querySelector(".sum__price") as HTMLSpanElement;
    let ClearAll = CartBottom.querySelector(
      ".order__clear",
    ) as HTMLButtonElement;
    let BookOrders = CartBottom.querySelector(
      ".book__orders",
    ) as HTMLButtonElement;

    BookOrders.onclick = () => {
      alert(translateText("You have been scammed. There is no cafe, so no orders😂"));
      orders = [];
      localStorage.setItem("data", JSON.stringify(orders));

      CartBottom.classList.add("an__emptyOne");
      CartBottom.innerHTML = `
        <h1>You have not ordered anything yet.</h1>
        <p>Make sure to check out our menu.</p>
    `;
      NumofOr.textContent = orders.length.toString();
    };

    let priceAllMeals = 0;

    orders.forEach((el) => {
      if (el.price) {
        priceAllMeals = priceAllMeals + el.price;
      }
    });

    SumPrice.textContent = `${priceAllMeals}$`;

    ClearAll.onclick = () => {
      orders = [];
      localStorage.setItem("data", JSON.stringify(orders));

      CartBottom.classList.add("an__emptyOne");
      CartBottom.innerHTML = `
        <h1>You have not ordered anything yet.</h1>
        <p>Make sure to check out our menu.</p>
    `;
      NumofOr.textContent = orders.length.toString();
    };

    orders.forEach((el) => {
      const shownOrder = translateProduct(el);
      let box = document.createElement("div");
      box.innerHTML = `
        <div class='left'>
          <img src="./menu_item_images/${el.id}.png" width= "100" height="100">
        <div class="order__info">
          <h1>${shownOrder.name}</h1>
          <p>${shownOrder.description}</p>
          <div class="dish__count">
          <button class= 'plus__port' >+</button>
          <span class='num__port'>1</span>
          <button class='minus__port'>-</button>
          </div>
        </div>
        </div>
        <div>
          <strong class='all__price'>${el.price}$</strong>
        <button class="delt__btn">🗑️</button>
        </div>
      `;

      box.classList.add("cart__order");
      let delt = box.querySelector(".delt__btn") as HTMLButtonElement;

      let plus = box.querySelector(".plus__port") as HTMLButtonElement;
      let minus = box.querySelector(".minus__port") as HTMLButtonElement;
      let num = box.querySelector(".num__port") as HTMLSpanElement;
      let price = box.querySelector(".all__price") as HTMLSpanElement;

      let count = 1;

      plus.onclick = () => {
        count = count + 1;
        let priceAll = 0;
        if (el.price) {
          let priceAll = count * el.price;
          price.textContent = `${priceAll.toString()}$`;
          priceAllMeals = priceAllMeals + el.price;
          SumPrice.textContent = `${priceAllMeals}$`;
        }
        num.textContent = count.toString();
      };
      minus.onclick = () => {
        if (count > 0) {
          count = count - 1;
          let priceAll = 0;
          if (el.price) {
            let priceAll = count * el.price;
            price.textContent = `${priceAll.toString()}$`;
            priceAllMeals = priceAllMeals - el.price;
            SumPrice.textContent = `${priceAllMeals}$`;
          }
          num.textContent = count.toString();
        }
        if (count <= 0) {
          orders = orders.filter((dish) => dish.id !== el.id);
          NumofOr.textContent = orders.length.toString();
          localStorage.setItem("data", JSON.stringify(orders));
          if (el.price) {
            priceAllMeals =
              priceAllMeals - Number((price.textContent || "0").slice(0, -1));
            SumPrice.textContent = `${priceAllMeals}$`;
          }

          box.remove();
          if (orders.length == 0) {
            CartBottom.classList.add("an__emptyOne");
            CartBottom.innerHTML = `
        <h1>You have not ordered anything yet.</h1>
        <p>Make sure to check out our menu.</p>
    `;
          }
        }
      };

      delt.onclick = () => {
        orders = orders.filter((dish) => dish.id !== el.id);
        NumofOr.textContent = orders.length.toString();
        localStorage.setItem("data", JSON.stringify(orders));
        if (el.price) {
          priceAllMeals =
            priceAllMeals - Number((price.textContent || "0").slice(0, -1));
          SumPrice.textContent = `${priceAllMeals}$`;
        }

        box.remove();
        if (orders.length == 0) {
          CartBottom.classList.add("an__emptyOne");
          CartBottom.innerHTML = `
        <h1>You have not ordered anything yet.</h1>
        <p>Make sure to check out our menu.</p>
    `;
        }
      };

      OrdersList.appendChild(box);
    });
  }
}

CartBTN.onclick = () => {
  Cart.classList.remove("display__off");
  renderCartContents();
};
Close.onclick = () => {
  Cart.classList.add("display__off");
};

// reservations

let NumG1 = document.querySelector(".numG1") as HTMLSpanElement;
let NumG2 = document.querySelector(".numG2") as HTMLSpanElement;
let NumG4 = document.querySelector(".numG4") as HTMLSpanElement;
let NumG6 = document.querySelector(".numG6") as HTMLSpanElement;
let NumG8 = document.querySelector(".numG8") as HTMLSpanElement;

let GArr: HTMLElement[] = [NumG1, NumG2, NumG4, NumG6, NumG8];

function NumGSel() {
  NumG1.onclick = () => {
    GArr.forEach((el) => {
      el.classList.remove("chosen");
    });
    NumG1.classList.add("chosen");
  };
  NumG2.onclick = () => {
    GArr.forEach((el) => {
      el.classList.remove("chosen");
    });
    NumG2.classList.add("chosen");
  };
  NumG4.onclick = () => {
    GArr.forEach((el) => {
      el.classList.remove("chosen");
    });
    NumG4.classList.add("chosen");
  };
  NumG6.onclick = () => {
    GArr.forEach((el) => {
      el.classList.remove("chosen");
    });
    NumG6.classList.add("chosen");
  };
  NumG8.onclick = () => {
    GArr.forEach((el) => {
      el.classList.remove("chosen");
    });
    NumG8.classList.add("chosen");
  };
}

NumGSel();

let Time1 = document.querySelector(".time1") as HTMLSpanElement;
let Time2 = document.querySelector(".time2") as HTMLSpanElement;
let Time3 = document.querySelector(".time3") as HTMLSpanElement;
let Time4 = document.querySelector(".time4") as HTMLSpanElement;
let Time5 = document.querySelector(".time5") as HTMLSpanElement;

let timeArr: HTMLSpanElement[] = [Time1, Time2, Time3, Time4, Time5];

function TimeSel() {
  Time1.onclick = () => {
    timeArr.forEach((el) => {
      el.classList.remove("chosen");
    });
    Time1.classList.add("chosen");
  };
  Time2.onclick = () => {
    timeArr.forEach((el) => {
      el.classList.remove("chosen");
    });
    Time2.classList.add("chosen");
  };
  Time3.onclick = () => {
    timeArr.forEach((el) => {
      el.classList.remove("chosen");
    });
    Time3.classList.add("chosen");
  };
  Time4.onclick = () => {
    timeArr.forEach((el) => {
      el.classList.remove("chosen");
    });
    Time4.classList.add("chosen");
  };
  Time5.onclick = () => {
    timeArr.forEach((el) => {
      el.classList.remove("chosen");
    });
    Time5.classList.add("chosen");
  };
}

TimeSel();

let Date = document.querySelector("#date") as HTMLInputElement;
let FullName = document.querySelector("#name") as HTMLInputElement;
let Email = document.querySelector("#email") as HTMLInputElement;
let PhoneNum = document.querySelector("#phone") as HTMLInputElement;
let Requests = document.querySelector("#requests") as HTMLTextAreaElement;
let SubmitRes = document.querySelector(".submit-button") as HTMLButtonElement;

SubmitRes.onclick = () => {
  Date.value = "";
  FullName.value = "";
  Email.value = "";
  PhoneNum.value = "";
  Requests.value = "";
  alert(translateText("No reservation LOL😂"));
};

// search

let searchBTN = document.querySelector(".search") as HTMLButtonElement;
let SearchCont = document.querySelector(".search__container") as HTMLDivElement;
let CloseSearch = document.querySelector(".close__search") as HTMLButtonElement;
let SearchInput = document.querySelector(".search__input") as HTMLInputElement;
let ListSearch = document.querySelector('.list__search') as HTMLDivElement;

searchBTN.onclick = () => {
  SearchCont.classList.remove("display__off");
};
CloseSearch.onclick = () => {
  SearchCont.classList.add("display__off");
};

SearchInput.addEventListener("input", (val) => {
  let e = val.target as HTMLInputElement;
  ListSearch.innerHTML = ``

  allProducts.forEach((el) => {
    if (el.name.toLowerCase().includes(e.value.toLowerCase()) || String(translateProduct(el).name).toLowerCase().includes(e.value.toLowerCase())) {
      const shownProduct = translateProduct(el);
      let box = document.createElement("div");
      box.classList.add("result__box");
      box.innerHTML = `
            <div class="resultimg__container">
                <img  src="./menu_item_images/${el.id}.png" alt="${shownProduct.name}">
            </div>
            <div class="product-info">
                <h3>${shownProduct.name}</h3>
                <span>$${el.price?.toFixed(2)}</span>
                <p>${shownProduct.description}</p>
            </div>
            <button class="add__to-cart">🛒 Add</button>
        `;
      ListSearch.appendChild(box);

      let AddCart = box.querySelector(".add__to-cart") as HTMLButtonElement;
    AddCart.addEventListener("click", () => {
      if (orders.length == 0) {
        orders.push(el);
        localStorage.setItem("data", JSON.stringify(orders));

        AddCart.classList.add("addedToCart");
        NumofOr.textContent = orders.length.toString();
      } else {
        let found = orders.find((em?) => em?.id == el.id);
        if (found) {
          alert(translateText("You have already ordered this meal. If you want to order more of this pleace go to the cart and increase the number of orders there."));
        } else {
          orders.push(el);
          localStorage.setItem("data", JSON.stringify(orders));

          AddCart.classList.add("addedToCart");
          NumofOr.textContent = orders.length.toString();
        }
      }
      setTimeout(() => {
        AddCart.classList.remove("addedToCart");
      }, 1000);
    });
    }
  });
  if (e.value == ''){
    ListSearch.innerHTML=``
  }
});


const languageSelect = document.querySelector("#language-select") as HTMLSelectElement;

const translations: Record<Exclude<Language, "en">, Record<string, string>> = {
  ru: {
    "Home":"Главная", "Menu":"Меню", "Signature Dishes":"Фирменные блюда", "Reservations":"Бронирование", "About Us":"О нас", "Reviews":"Отзывы", "Book a Table":"Забронировать столик",
    "made with love":"приготовлено с любовью", "Your Orders":"Ваш заказ", "Handcrafted fresh to order. Review ingredients, choose dining preference, and personalize barista notes.":"Свежеприготовленные блюда на заказ. Ознакомьтесь с составом, выберите формат обслуживания и добавьте пожелания бариста.", "<-- continue exploring menu":"<-- продолжить просмотр меню", "Meals":"Блюда", "Dishes":"Блюда", "🗑️Clear Orders":"🗑️Очистить заказ", "You have not ordered anything yet.":"Вы пока ничего не заказали.", "Make sure to check out our menu.":"Посмотрите наше меню.", "Total Price:":"Итого:", "Discount:":"Скидка:", "Confirm Orders✔️":"Подтвердить заказ ✔️", "🛒 Add to Cart":"🛒 В корзину", "🛒 Add":"🛒 Добавить",
    "Name of the food...":"Название блюда...", "You have already ordered this meal. If you want to order more of this pleace go to the cart and increase the number of orders there.":"Это блюдо уже добавлено. Чтобы заказать больше, измените количество в корзине.",
    "●":"●", "TRIBECA'S PREMIUM ROASTERY & KITCHEN":"ПРЕМИАЛЬНАЯ ОБЖАРКА КОФЕ И КУХНЯ TRIBECA", "Good Food.":"Вкусная еда.", "Great Mood.":"Отличное настроение.", "Discover delicious flavours, freshly prepared meals, and unforgettable moments crafted daily with ethically sourced single-origin coffee and artisanal ingredients.":"Откройте для себя насыщенные вкусы, свежеприготовленные блюда и незабываемые моменты. Каждый день мы используем кофе одного происхождения и отборные натуральные ингредиенты.", "Explore Menu":"Смотреть меню", "⭐ 4.9 / (1,840+ reviews)":"⭐ 4.9 / (1 840+ отзывов)", "♧ 100% Organic Flour":"♧ 100% органическая мука", "♨ Farm-to-Table Daily":"♨ Свежие продукты каждый день", "📍Location":"📍Расположение",
    "SAVOUR THE CRAFT":"ПОЧУВСТВУЙТЕ МАСТЕРСТВО", "Popular Creations & Daily Bakes":"Популярные блюда и свежая выпечка", "Handcrafted selections prepared fresh in our open kitchen.":"Авторские блюда, приготовленные в нашей открытой кухне.", "♙ Kitchen Open: 7:00 AM – 9:30 PM":"♙ Кухня открыта: 07:00–21:30", "Random meals":"Случайные блюда", "Burgers":"Бургеры", "Pasta":"Паста", "Sandwiches & Wraps":"Сэндвичи и роллы", "Fried Chicken":"Жареная курица", "Pizza":"Пицца", "Snacks":"Закуски", "Desserts":"Десерты", "Coffee & Drinks":"Кофе и напитки",
    "MASTERy ON A PLATE":"МАСТЕРСТВО В КАЖДОМ БЛЮДЕ", "Curated Seasonal":"Сезонная подборка", "Specialties":"Особые блюда", "Every dish reflects our obsession with provenance, technique, and harmonious flavors.":"Каждое блюдо отражает наше внимание к происхождению продуктов, технике и гармонии вкусов.", "CHEF'S SIGNATURE":"ФИРМЕННОЕ БЛЮДО ШЕФ-ПОВАРА", "Slow Roasted Porchetta Bowl":"Боул с медленно запечённой поркеттой", "48-HOUR BRINE & SLOW ROASTING":"48 ЧАСОВ МАРИНОВАНИЯ И МЕДЛЕННОГО ЗАПЕКАНИЯ", "A Symphony of Crisp Crackling & Tender Botanicals":"Гармония хрустящей корочки и нежных трав", "FLAVOR PROFILE & BALANCE":"ВКУСОВОЙ ПРОФИЛЬ И БАЛАНС", "Herbal Bitterness":"Травяная горчинка", "Crackling Crunch":"Хрустящая корочка", "Citrus Acidity":"Цитрусовая кислинка", "Reserve a Table to Taste ▣":"Забронировать столик ▣",
    "HOSPITALITY FIRST":"ГОСТЕПРИИМСТВО ПРЕЖДЕ ВСЕГО", "Reserve Your":"Забронируйте", "Experience":"свой визит", "From casual evening bites to celebratory gatherings, our dining spaces are designed for every detail.":"От лёгкого вечернего перекуса до праздничного ужина — мы продумали каждую деталь пространства.", "✦ Instant SMS and email booking confirmation":"✦ Мгновенное подтверждение по SMS и email", "♨ Chef's Table & intimate leather booth seating":"♨ Стол шеф-повара и уютные кожаные кабинки", "♧ Curated zero-proof pairing program available":"♧ Авторские безалкогольные сочетания", "Select your party details below. Walk-ins are always welcomed at the counter.":"Укажите детали визита. Гости без бронирования также могут обратиться к стойке.", "Number of Guests":"Количество гостей", "8+ Private":"8+ Частный зал", "Reservation Date":"Дата бронирования", "Preferred Seating Time":"Удобное время", "Full Name":"Полное имя", "Email Address":"Электронная почта", "Phone Number":"Номер телефона", "Dietary Restrictions or Special Occasions":"Пищевые ограничения или особые пожелания", "♧ Confirm Reservation":"♧ Подтвердить бронирование",
    "Direct Trade":"Прямые поставки", "High & Sustainable Crops":"Высокое качество и устойчивое земледелие", "OUR HERITAGE & PHILOSOPHY":"НАШЕ НАСЛЕДИЕ И ФИЛОСОФИЯ", "The Story Behind Every Cup & Plate":"История каждой чашки и каждого блюда", "♧ Ethically Sourced Coffee Beans":"♧ Кофейные зёрна из ответственных источников", "♨ Daily 5:00 AM Sourdough & Pastry Bake":"♨ Свежая выпечка ежедневно с 05:00", "✧ 0% Artificial Additives or Preservatives":"✧ 0% искусственных добавок и консервантов", "Monthly Coffees Served":"Чашек кофе в месяц", "Average Customer Rating":"Средняя оценка гостей", "Master Roasters & Chefs":"Мастера обжарки и шеф-повара", "COMMUNITY LOVE":"ЛЮБОВЬ ГОСТЕЙ", "Loved by Coffee Enthusiasts &":"Любим ценителями кофе и", "Gourmands":"гурманами", "Food Critic & Tribeca Resident":"Гастрономический критик и житель Tribeca", "Specialty Coffee Q-Grader":"Эксперт по оценке specialty-кофе", "Private Event Host":"Организатор частных мероприятий", "QUICK LINKS":"БЫСТРЫЕ ССЫЛКИ", "Table Booking":"Бронирование столика", "Private Events":"Частные мероприятия", "Catering":"Кейтеринг", "Gift Cards":"Подарочные карты", "Coffee Roastery":"Обжарка кофе", "HOURS & LOCATION":"ЧАСЫ РАБОТЫ И АДРЕС", "◷ Opening Hours":"◷ Часы работы", "NEWSLETTER":"РАССЫЛКА", "Your email address":"Ваш адрес электронной почты", "No spam. Unsubscribe anytime with one tap.":"Никакого спама. Отписаться можно в один клик."
  },
  uz: {
    "Home":"Bosh sahifa", "Menu":"Menyu", "Signature Dishes":"Maxsus taomlar", "Reservations":"Band qilish", "About Us":"Biz haqimizda", "Reviews":"Sharhlar", "Book a Table":"Stol band qilish",
    "made with love":"mehr bilan tayyorlangan", "Your Orders":"Buyurtmalaringiz", "Handcrafted fresh to order. Review ingredients, choose dining preference, and personalize barista notes.":"Buyurtmangiz uchun yangi tayyorlanadi. Tarkib bilan tanishing, xizmat turini tanlang va baristaga istaklaringizni bildiring.", "<-- continue exploring menu":"<-- menyuni ko‘rishda davom etish", "Meals":"Taomlar", "Dishes":"Taomlar", "🗑️Clear Orders":"🗑️Buyurtmalarni tozalash", "You have not ordered anything yet.":"Siz hali hech narsa buyurtma qilmadingiz.", "Make sure to check out our menu.":"Menyumiz bilan tanishib chiqing.", "Total Price:":"Umumiy narx:", "Discount:":"Chegirma:", "Confirm Orders✔️":"Buyurtmani tasdiqlash ✔️", "🛒 Add to Cart":"🛒 Savatga qo‘shish", "🛒 Add":"🛒 Qo‘shish",
    "Name of the food...":"Taom nomi...", "You have already ordered this meal. If you want to order more of this pleace go to the cart and increase the number of orders there.":"Bu taom allaqachon buyurtmaga qo‘shilgan. Yana buyurtma berish uchun savatda miqdorini oshiring.",
    "TRIBECA'S PREMIUM ROASTERY & KITCHEN":"TRIBECA’NING PREMIUM QAHVA QOVURISHI VA OSHXONASI", "Good Food.":"Mazali taom.", "Great Mood.":"Ajoyib kayfiyat.", "Discover delicious flavours, freshly prepared meals, and unforgettable moments crafted daily with ethically sourced single-origin coffee and artisanal ingredients.":"Mazali ta’mlar, yangi tayyorlangan taomlar va unutilmas lahzalarni kashf eting. Har kuni mas’uliyatli manbalardan olingan qahva va saralangan mahsulotlardan foydalanamiz.", "Explore Menu":"Menyuni ko‘rish", "⭐ 4.9 / (1,840+ reviews)":"⭐ 4.9 / (1 840+ sharh)", "♧ 100% Organic Flour":"♧ 100% organik un", "♨ Farm-to-Table Daily":"♨ Har kuni yangi mahsulotlar", "📍Location":"📍Manzil",
    "SAVOUR THE CRAFT":"MAHORAT TA’MINI HIS QILING", "Popular Creations & Daily Bakes":"Mashhur taomlar va kundalik pishiriqlar", "Handcrafted selections prepared fresh in our open kitchen.":"Ochiq oshxonamizda yangi tayyorlangan maxsus taomlar.", "♙ Kitchen Open: 7:00 AM – 9:30 PM":"♙ Oshxona ochiq: 07:00–21:30", "Random meals":"Tasodifiy taomlar", "Burgers":"Burgerlar", "Pasta":"Pasta", "Sandwiches & Wraps":"Sendvich va lavashlar", "Fried Chicken":"Qovurilgan tovuq", "Pizza":"Pitsa", "Snacks":"Yengil tamaddilar", "Desserts":"Shirinliklar", "Coffee & Drinks":"Qahva va ichimliklar",
    "MASTERy ON A PLATE":"LIKOPCHADAGI MAHORAT", "Curated Seasonal":"Mavsumiy tanlov", "Specialties":"Maxsus taomlar", "Every dish reflects our obsession with provenance, technique, and harmonious flavors.":"Har bir taom mahsulot sifati, tayyorlash texnikasi va uyg‘un ta’mlarga bo‘lgan e’tiborimizni aks ettiradi.", "CHEF'S SIGNATURE":"OSHXONABOSHINING MAXSUS TAOMI", "Slow Roasted Porchetta Bowl":"Sekin pishirilgan porchetta kosasi", "48-HOUR BRINE & SLOW ROASTING":"48 SOAT MARINAD VA SEKIN PISHIRISH", "A Symphony of Crisp Crackling & Tender Botanicals":"Qarsildoq qobiq va nafis ko‘katlar uyg‘unligi", "FLAVOR PROFILE & BALANCE":"TA’M PROFILI VA MUVOZANATI", "Herbal Bitterness":"Giyohlar taxirligi", "Crackling Crunch":"Qarsildoq qobiq", "Citrus Acidity":"Sitrus nordonligi", "Reserve a Table to Taste ▣":"Tatib ko‘rish uchun stol band qiling ▣",
    "HOSPITALITY FIRST":"MEHMONDO‘STLIK BIRINCHI O‘RINDA", "Reserve Your":"O‘zingiz uchun", "Experience":"joy band qiling", "From casual evening bites to celebratory gatherings, our dining spaces are designed for every detail.":"Kechki yengil tamaddidan bayramona uchrashuvlargacha — makonimizning har bir jihati siz uchun o‘ylangan.", "✦ Instant SMS and email booking confirmation":"✦ SMS va email orqali tezkor tasdiq", "♨ Chef's Table & intimate leather booth seating":"♨ Oshpaz stoli va shinam charm o‘rindiqlar", "♧ Curated zero-proof pairing program available":"♧ Maxsus alkogolsiz ichimliklar tanlovi", "Select your party details below. Walk-ins are always welcomed at the counter.":"Tashrif tafsilotlarini tanlang. Oldindan band qilmagan mehmonlar ham mamnuniyat bilan kutib olinadi.", "Number of Guests":"Mehmonlar soni", "8+ Private":"8+ Alohida xona", "Reservation Date":"Band qilish sanasi", "Preferred Seating Time":"Qulay vaqt", "Full Name":"To‘liq ism", "Email Address":"Elektron pochta", "Phone Number":"Telefon raqami", "Dietary Restrictions or Special Occasions":"Taom cheklovlari yoki maxsus istaklar", "♧ Confirm Reservation":"♧ Band qilishni tasdiqlash",
    "Direct Trade":"To‘g‘ridan-to‘g‘ri savdo", "High & Sustainable Crops":"Yuqori sifat va barqaror yetishtirish", "OUR HERITAGE & PHILOSOPHY":"MEROSIMIZ VA FALSAFAMIZ", "The Story Behind Every Cup & Plate":"Har bir finjon va taom ortidagi hikoya", "♧ Ethically Sourced Coffee Beans":"♧ Mas’uliyat bilan yetishtirilgan qahva donlari", "♨ Daily 5:00 AM Sourdough & Pastry Bake":"♨ Har kuni 05:00 dan yangi pishiriqlar", "✧ 0% Artificial Additives or Preservatives":"✧ 0% sun’iy qo‘shimchalar va konservantlar", "Monthly Coffees Served":"Oyiga tortiladigan qahvalar", "Average Customer Rating":"Mehmonlarning o‘rtacha bahosi", "Master Roasters & Chefs":"Qahva ustalari va oshpazlar", "COMMUNITY LOVE":"MEHMONLAR MEHR-MUHABBATI", "Loved by Coffee Enthusiasts &":"Qahva ixlosmandlari va", "Gourmands":"gurmanlar sevimlisi", "Food Critic & Tribeca Resident":"Taom tanqidchisi va Tribeca aholisi", "Specialty Coffee Q-Grader":"Maxsus qahva Q-Grader mutaxassisi", "Private Event Host":"Shaxsiy tadbir tashkilotchisi", "QUICK LINKS":"TEZKOR HAVOLALAR", "Table Booking":"Stol band qilish", "Private Events":"Shaxsiy tadbirlar", "Catering":"Keytering", "Gift Cards":"Sovg‘a kartalari", "Coffee Roastery":"Qahva qovurish", "HOURS & LOCATION":"ISH VAQTI VA MANZIL", "◷ Opening Hours":"◷ Ish vaqti", "NEWSLETTER":"YANGILIKLAR", "Your email address":"Elektron pochta manzilingiz", "No spam. Unsubscribe anytime with one tap.":"Spam yo‘q. Istalgan vaqtda bir bosishda obunani bekor qiling."
  }
};

// Remaining small labels and input hints used by the static page.
Object.assign(translations.ru, {
  "DD/MM/YYYY":"ДД/ММ/ГГГГ", "Elena Rostova":"Елена Ростова", "elena@example.com":"elena@example.com",
  "+1 (555) 254-9900":"+1 (555) 254-9900", "e.g. Birthday celebration, gluten sensitivity, outdoor patio preference...":"Например: день рождения, непереносимость глютена, столик на террасе...",
  "The Story Behind Every Cup & Plate":"История каждой чашки и каждого блюда", "18k+":"18 тыс.+", "4.9 ★":"4.9 ★", "6":"6",
  "Monthly Coffees Served":"Чашек кофе в месяц", "Average Customer Rating":"Средняя оценка гостей", "Master Roasters & Chefs":"Мастера обжарки и шеф-повара",
  "Reserve Your":"Забронируйте", "Experience":"свой визит", "No spam. Unsubscribe anytime with one tap.":"Никакого спама. Отписаться можно в один клик."
});
Object.assign(translations.uz, {
  "DD/MM/YYYY":"KK/OO/YYYY", "Elena Rostova":"Elena Rostova", "elena@example.com":"elena@example.com",
  "+1 (555) 254-9900":"+1 (555) 254-9900", "e.g. Birthday celebration, gluten sensitivity, outdoor patio preference...":"Masalan: tug‘ilgan kun, gluten cheklovi, ochiq ayvonda joy...",
  "The Story Behind Every Cup & Plate":"Har bir finjon va taom ortidagi hikoya", "18k+":"18 ming+", "4.9 ★":"4.9 ★", "6":"6",
  "Monthly Coffees Served":"Oyiga tortiladigan qahvalar", "Average Customer Rating":"Mehmonlarning o‘rtacha bahosi", "Master Roasters & Chefs":"Qahva ustalari va oshpazlar",
  "Reserve Your":"O‘zingiz uchun", "Experience":"joy band qiling", "No spam. Unsubscribe anytime with one tap.":"Spam yo‘q. Istalgan vaqtda bir bosishda obunani bekor qiling."
});

// Additional long-form content and form labels.
Object.assign(translations.ru, {
  "Infused with wild fennel pollen, rosemary, and Hudson Valley garlic, our heritage pork belly undergoes a precision 48-hour cure followed by a 6-hour slow confit before high-heat blistering.": "Наша свиная грудинка маринуется 48 часов с диким фенхелем, розмарином и чесноком из долины Гудзона, затем медленно томится 6 часов и обжаривается до хрустящей корочки.",
  "Reserve Your": "Забронируйте", "From casual evening bites to celebratory gatherings, our dining spaces are designed for every detail.": "От лёгкого вечернего перекуса до праздничных встреч — наше пространство продумано до мелочей.",
  "L'Aurora was born from a singular passion: elevating daily cafe rituals into sensory art. Founded in Tribeca in 2018, we bridge micro-lot roasting with chef-driven farm-to-table cuisine.": "L'Aurora родилась из стремления превратить повседневные кофейные ритуалы в настоящее искусство. Основанная в Tribeca в 2018 году, кофейня объединяет обжарку небольших партий кофе и авторскую кухню из фермерских продуктов.",
  "We partner directly with smallholder farmers in Colombia and Ethiopia, paying 2x fair trade minimums.": "Мы напрямую сотрудничаем с небольшими фермерскими хозяйствами Колумбии и Эфиопии, выплачивая вдвое больше минимальных ставок Fair Trade.",
  "Wild fermented sourdough loaves and laminated AOP French butter pastries rolled fresh every morning.": "Хлеб на натуральной закваске и слоёная французская выпечка на сливочном масле AOP готовятся каждое утро.",
  "Clean whole ingredients, natural honeys, unrefined sugars, and organic dairy from local regenerative farms.": "Натуральные цельные продукты, мёд, нерафинированный сахар и органические молочные продукты с местных экологичных ферм.",
  "Pulled on our customized Slayer espresso gear":"Приготовлено на нашей кофемашине Slayer", "Over 1,840 verified Google & Yelp reviews":"Более 1 840 подтверждённых отзывов в Google и Yelp", "Culinary talents dedicated to uncompromising craft":"Мастера кулинарии, преданные своему делу",
  "Discover why our guests make L'Aurora their cherished culinary ritual.":"Узнайте, почему гости сделали L'Aurora своей любимой гастрономической традицией.",
  "“The Spanish Saffron Latte paired with their Truffle Burger is culinary perfection. L'Aurora has completely transformed our weekend brunch routine.”":"«Испанский латте с шафраном в сочетании с трюфельным бургером — настоящее гастрономическое совершенство. L'Aurora полностью изменила наши традиции воскресного бранча». ",
  "“A coffee roaster myself, their Ethiopian single origin pour-over is arguably the cleanest cup in Manhattan. The pastry laminate is textbook French mastery.”":"«Я сам обжариваю кофе, и их фильтр-кофе из эфиопских зёрен — один из лучших на Манхэттене. Слоёная выпечка — образец французского мастерства». ",
  "“We hosted our private anniversary dinner in their back atrium. The Slow Roasted Porchetta and natural wine pairings left all twelve of our guests speechless.”":"«Мы отметили годовщину в их уютном атриуме. Медленно запечённая поркетта и подобранные напитки впечатлили всех двенадцать гостей». ",
  "Good Food. Great Mood. Crafting exceptional artisanal coffee, slow-fermented bakery, and gourmet culinary experiences since 2018.":"Вкусная еда. Отличное настроение. С 2018 года создаём исключительный авторский кофе, выпечку на закваске и гастрономические впечатления.",
  "Mon–Fri: 7:00 AM – 10:00 PM":"Пн–Пт: 07:00–22:00", "Sat–Sun: 8:00 AM – 11:00 PM":"Сб–Вс: 08:00–23:00", "♧ Roastery & Café":"♧ Обжарка кофе и кафе", "482 Artisan Way, Tribeca, NY":"482 Artisan Way, Tribeca, NY", "♧ +1 (555) 382-9014":"♧ +1 (555) 382-9014",
  "Subscribe for seasonal tasting flights, roastery drops, and event invitations.":"Подпишитесь, чтобы получать новости о сезонных дегустациях, свежей обжарке и мероприятиях.", "© 2024 L'Aurora Artisan Café & Roastery. All rights reserved.":"© 2024 L'Aurora Artisan Café & Roastery. Все права защищены.", "Dietary & Allergen Statement: Our kitchen and roastery handle dairy, nuts, gluten, and sesame seeds.":"Информация об аллергенах: на нашей кухне используются молочные продукты, орехи, глютен и кунжут."
});
Object.assign(translations.uz, {
  "Infused with wild fennel pollen, rosemary, and Hudson Valley garlic, our heritage pork belly undergoes a precision 48-hour cure followed by a 6-hour slow confit before high-heat blistering.": "Cho‘chqa go‘shti yovvoyi arpabodiyon, rozmarin va Hudson vodiysi sarimsoq bilan 48 soat marinadlanadi, so‘ng 6 soat past haroratda pishirilib, qarsildoq holga keltiriladi.",
  "L'Aurora was born from a singular passion: elevating daily cafe rituals into sensory art. Founded in Tribeca in 2018, we bridge micro-lot roasting with chef-driven farm-to-table cuisine.": "L'Aurora kundalik qahva marosimlarini san’at darajasiga olib chiqish ishtiyoqidan tug‘ilgan. 2018-yilda Tribeca’da tashkil etilgan maskan kichik partiyalarda qahva qovurish va oshpazlar tayyorlaydigan fermer mahsulotlariga asoslangan taomlarni uyg‘unlashtiradi.",
  "We partner directly with smallholder farmers in Colombia and Ethiopia, paying 2x fair trade minimums.": "Kolumbiya va Efiopiyadagi kichik fermerlar bilan bevosita hamkorlik qilamiz va Fair Trade minimal narxidan ikki baravar haq to‘laymiz.",
  "Wild fermented sourdough loaves and laminated AOP French butter pastries rolled fresh every morning.": "Tabiiy achitqili non va AOP fransuz sariyog‘idan tayyorlangan qatlama pishiriqlar har tong yangidan pishiriladi.",
  "Clean whole ingredients, natural honeys, unrefined sugars, and organic dairy from local regenerative farms.": "Tabiiy mahsulotlar, asal, qayta ishlanmagan shakar va mahalliy ekologik fermalardan olingan organik sut mahsulotlari.",
  "Pulled on our customized Slayer espresso gear":"Maxsus Slayer qahva mashinamizda tayyorlanadi", "Over 1,840 verified Google & Yelp reviews":"Google va Yelp’da 1 840 dan ortiq tasdiqlangan sharh", "Culinary talents dedicated to uncompromising craft":"Mukammal mahoratga intiluvchi oshpazlar",
  "Discover why our guests make L'Aurora their cherished culinary ritual.":"Mehmonlar nima uchun L'Aurora’ni sevimli gastronomik maskaniga aylantirganini bilib oling.",
  "“The Spanish Saffron Latte paired with their Truffle Burger is culinary perfection. L'Aurora has completely transformed our weekend brunch routine.”":"“Ispancha za’faronli latte va trufelli burger — haqiqiy ta’m mukammalligi. L'Aurora dam olish kunlaridagi nonushta odatimizni butunlay o‘zgartirdi.”",
  "“A coffee roaster myself, their Ethiopian single origin pour-over is arguably the cleanest cup in Manhattan. The pastry laminate is textbook French mastery.”":"“Men ham qahva qovurish bilan shug‘ullanaman. Ularning Efiopiya qahvasi Manxettendagi eng toza ta’mlardan biri. Qatlama pishiriqlari fransuz mahoratining namunasi.”",
  "“We hosted our private anniversary dinner in their back atrium. The Slow Roasted Porchetta and natural wine pairings left all twelve of our guests speechless.”":"“Yubiley kechamizni ularning ichki ayvonida o‘tkazdik. Sekin pishirilgan porchetta va mos ichimliklar o‘n ikki mehmonimizni ham lol qoldirdi.”",
  "Good Food. Great Mood. Crafting exceptional artisanal coffee, slow-fermented bakery, and gourmet culinary experiences since 2018.":"Mazali taom. Ajoyib kayfiyat. 2018-yildan beri betakror qahva, tabiiy achitqili non va yuqori darajadagi taomlar tayyorlaymiz.",
  "Mon–Fri: 7:00 AM – 10:00 PM":"Du–Ju: 07:00–22:00", "Sat–Sun: 8:00 AM – 11:00 PM":"Sh–Ya: 08:00–23:00", "♧ Roastery & Café":"♧ Qahva qovurish va kafe", "482 Artisan Way, Tribeca, NY":"482 Artisan Way, Tribeca, NY", "♧ +1 (555) 382-9014":"♧ +1 (555) 382-9014",
  "Subscribe for seasonal tasting flights, roastery drops, and event invitations.":"Mavsumiy degustatsiyalar, yangi qovurilgan qahva va tadbirlar haqida xabar olish uchun obuna bo‘ling.", "© 2024 L'Aurora Artisan Café & Roastery. All rights reserved.":"© 2024 L'Aurora Artisan Café & Roastery. Barcha huquqlar himoyalangan.", "Dietary & Allergen Statement: Our kitchen and roastery handle dairy, nuts, gluten, and sesame seeds.":"Allergenlar haqida: oshxonamizda sut mahsulotlari, yong‘oq, gluten va kunjut ishlatiladi."
});

Object.assign(translations.ru, {
  "No reservation LOL😂":"Бронирование пока недоступно 😂",
  "You have been scammed. There is no cafe, so no orders😂":"Это шутка! Кафе и реальные заказы пока недоступны 😂"
});
Object.assign(translations.uz, {
  "No reservation LOL😂":"Hozircha bron qilish ishlamaydi 😂",
  "You have been scammed. There is no cafe, so no orders😂":"Bu hazil! Hozircha kafe va haqiqiy buyurtmalar mavjud emas 😂"
});

// Product cards, search results, and cart items use these translated descriptions.
const productText: Record<number, { ru: [string, string]; uz: [string, string] }> = {
  1:{ru:["Классический бургер","Сочная говяжья котлета со свежим салатом, томатом и фирменным соусом."],uz:["Klassik burger","Yangi salat bargi, pomidor va maxsus sous qo‘shilgan shirali mol go‘shti kotleti."]},
  2:{ru:["Чизбургер","Говяжья котлета на гриле с расплавленным чеддером и маринованными огурцами."],uz:["Chizburger","Grilda pishirilgan mol go‘shti kotleti, erigan cheddar pishlog‘i va tuzlangan bodring."]},
  3:{ru:["Двойной чизбургер","Две сочные говяжьи котлеты, двойной чеддер и фирменный соус."],uz:["Double chizburger","Ikki dona shirali mol go‘shti kotleti, ikki barobar cheddar va maxsus sous."]},
  4:{ru:["Бургер с беконом","Говяжья котлета с хрустящим беконом, чеддером и копчёным соусом."],uz:["Bekonli burger","Qarsildoq bekon, cheddar va dudlangan sousli mol go‘shti kotleti."]},
  5:{ru:["BBQ-бургер","Говядина на гриле, карамелизированный лук и насыщенный BBQ-соус."],uz:["BBQ burger","Grilda pishirilgan mol go‘shti, karamel piyoz va mazali BBQ sous."]},
  6:{ru:["Бургер с хрустящей курицей","Золотистая жареная курица, салат и нежный майонез."],uz:["Qarsildoq tovuqli burger","Oltinrang qovurilgan tovuq, salat bargi va mayin mayonez."]},
  7:{ru:["Острый куриный бургер","Хрустящее куриное филе с халапеньо и острым соусом."],uz:["Achchiq tovuqli burger","Qarsildoq tovuq filesi, jalapeno va achchiq sous."]},
  8:{ru:["Бургер с грибами и швейцарским сыром","Говяжья котлета с обжаренными грибами и расплавленным швейцарским сыром."],uz:["Qo‘ziqorinli shveysar burger","Qovurilgan qo‘ziqorin va erigan shveysar pishlog‘i qo‘shilgan mol go‘shti kotleti."]},
  9:{ru:["Трюфельный бургер Wagyu","Премиальная говядина Wagyu, выдержанный чеддер и трюфельный айоли."],uz:["Trufelli Wagyu burger","Premium Wagyu mol go‘shti, yetiltirilgan cheddar va trufelli aioli."]},
  10:{ru:["Пицца Маргарита","Классический томатный соус, моцарелла и свежий базилик."],uz:["Margarita pitsasi","Klassik pomidor sousi, mozzarella va yangi rayhon."]},
  11:{ru:["Пицца Пепперони","Моцарелла с ломтиками острой пепперони."],uz:["Pepperoni pitsasi","Achchiq pepperoni bo‘laklari solingan mozzarella pishlog‘i."]},
  12:{ru:["Пицца BBQ с курицей","Курица на гриле, BBQ-соус, красный лук и моцарелла."],uz:["BBQ tovuqli pitsa","Grilda pishgan tovuq, BBQ sous, qizil piyoz va mozzarella."]},
  13:{ru:["Пицца с четырьмя сырами","Изысканное сочетание моцареллы, пармезана, чеддера и горгонзолы."],uz:["To‘rt pishloqli pitsa","Mozzarella, parmesan, cheddar va gorgonzolaning ajoyib uyg‘unligi."]},
  14:{ru:["Мясная пицца","Говядина, пепперони, колбаски и расплавленная моцарелла."],uz:["Go‘shtli pitsa","Mol go‘shti, pepperoni, kolbasa va erigan mozzarella."]},
  15:{ru:["Гавайская пицца","Сладкий ананас, ароматная ветчина и моцарелла."],uz:["Gavayi pitsasi","Shirin ananas, mazali vetchina va mozzarella pishlog‘i."]},
  16:{ru:["Вегетарианская пицца","Свежие грибы, сладкий перец, оливки и лук."],uz:["Vegetarian pitsa","Yangi qo‘ziqorinlar, bulg‘or qalampiri, zaytun va piyoz."]},
  17:{ru:["Пицца с прошутто и острым мёдом","Итальянское прошутто, моцарелла, свежая руккола и пряный мёд."],uz:["Prosciutto va achchiq asalli pitsa","Italiya prosciutto, mozzarella, yangi rukola va achchiq asal."]},
  18:{ru:["Клаб-сэндвич","Поджаренный хлеб с курицей, беконом, салатом и томатом."],uz:["Klub sendvich","Tovuq, bekon, salat va pomidor solingan qizartirilgan non."]},
  19:{ru:["Куриный сэндвич","Куриная грудка на гриле с сыром и свежими овощами."],uz:["Tovuqli sendvich","Pishloq va yangi sabzavotlar bilan grilda pishirilgan tovuq filesi."]},
  20:{ru:["Филадельфийский чизстейк","Нежные ломтики говядины с расплавленным сыром и карамелизированным луком."],uz:["Filadelfiya chizsteyki","Erigan pishloq va karamel piyozli mayin mol go‘shti bo‘laklari."]},
  21:{ru:["Тунец с расплавленным сыром","Нежная начинка из тунца с чеддером на поджаренном хлебе."],uz:["Pishloqli tunets","Qizartirilgan non ustidagi mayin tunets va cheddarli nachinka."]},
  22:{ru:["Ролл с хрустящей курицей","Хрустящая курица, свежий салат и нежный соус ранч."],uz:["Qarsildoq tovuqli lavash","Qarsildoq tovuq, yangi salat va mayin ranch sousi."]},
  23:{ru:["Острый ролл с говядиной","Приправленная говядина, сладкий перец и домашний острый соус."],uz:["Achchiq mol go‘shtli lavash","Ziravorli mol go‘shti, bulg‘or qalampiri va uy achchiq sousi."]},
  24:{ru:["Овощной ролл","Свежие сезонные овощи, хумус и зелень."],uz:["Sabzavotli lavash","Yangi mavsumiy sabzavotlar, hummus va ko‘katlar."]},
  25:{ru:["Классическая жареная курица (2 шт.)","Два сочных кусочка курицы в хрустящей золотистой панировке."],uz:["Klassik qovurilgan tovuq (2 dona)","Qarsildoq oltinrang qoplamadagi ikki bo‘lak shirali tovuq."]},
  26:{ru:["Жареная курица (4 шт.)","Четыре свежеприготовленных кусочка курицы с приправами."],uz:["Qovurilgan tovuq (4 dona)","Ziravorlar bilan yangi qovurilgan to‘rt bo‘lak tovuq."]},
  27:{ru:["Куриные крылышки (6 шт.)","Шесть хрустящих крылышек с фирменной приправой."],uz:["Tovuq qanotlari (6 dona)","Maxsus ziravorli oltita qarsildoq qanotcha."]},
  28:{ru:["Острые крылышки (8 шт.)","Восемь хрустящих крылышек в остром соусе."],uz:["Achchiq qanotchalar (8 dona)","Achchiq sousga aralashtirilgan sakkizta qarsildoq qanotcha."]},
  29:{ru:["Куриные стрипсы (4 шт.)","Четыре нежные куриные полоски в хрустящей панировке."],uz:["Tovuq stripslari (4 dona)","Qarsildoq qoplamadagi to‘rtta mayin tovuq bo‘lagi."]},
  30:{ru:["Куриные наггетсы (8 шт.)","Золотистые кусочки курицы с соусом для макания."],uz:["Tovuq naggets (8 dona)","Sous bilan tortiladigan oltinrang tovuq bo‘lakchalari."]},
  31:{ru:["Крылышки BBQ (8 шт.)","Хрустящие куриные крылышки в копчёном BBQ-соусе."],uz:["BBQ qanotchalar (8 dona)","Dudlangan BBQ sousidagi qarsildoq tovuq qanotlari."]},
  32:{ru:["Классический картофель фри","Золотистый хрустящий картофель фри с лёгкой солью."],uz:["Klassik fri kartoshka","Yengil tuzlangan oltinrang qarsildoq fri kartoshka."]},
  33:{ru:["Картофель фри с сыром","Хрустящий картофель фри с тёплым расплавленным чеддером."],uz:["Pishloqli fri","Iliq erigan cheddar bilan qoplangan qarsildoq fri."]},
  34:{ru:["Фри с добавками","Картофель фри с сыром, хрустящим беконом и фирменным соусом."],uz:["Qo‘shimchali fri","Pishloq, qarsildoq bekon va maxsus sousli fri kartoshka."]},
  35:{ru:["Картофельные дольки","Крупные дольки картофеля с хрустящей пряной корочкой."],uz:["Kartoshka bo‘laklari","Qarsildoq ziravorli qobiqdagi yirik kartoshka bo‘laklari."]},
  36:{ru:["Луковые кольца","Сладкие луковые кольца в золотистой хрустящей панировке."],uz:["Piyoz halqalari","Oltinrang qarsildoq qoplamadagi shirin piyoz halqalari."]},
  37:{ru:["Палочки моцареллы (6 шт.)","Шесть хрустящих палочек с расплавленной моцареллой внутри."],uz:["Mozzarella tayoqchalari (6 dona)","Ichida erigan mozzarella bo‘lgan oltita qarsildoq tayoqcha."]},
  38:{ru:["Чесночный хлеб","Поджаренный хлеб с чесночным маслом и травами."],uz:["Sarimsoqli non","Sarimsoq yog‘i va ko‘katlar surtilgan qizartirilgan non."]},
  39:{ru:["Куриный попкорн","Небольшие хрустящие кусочки курицы с соусом."],uz:["Tovuqli popkorn","Sous bilan tortiladigan mayda qarsildoq tovuq bo‘laklari."]},
  40:{ru:["Куриная Альфредо","Сливочный соус с пармезаном, курицей на гриле и феттучини."],uz:["Tovuqli Alfredo","Parmezanli qaymoq sousi, grilda pishgan tovuq va fettuchini."]},
  41:{ru:["Спагетти Болоньезе","Спагетти с насыщенным соусом из томатов и долго тушёной говядины."],uz:["Spagetti Bolognese","Pomidor va uzoq dimlangan mol go‘shti sousidagi spagetti."]},
  42:{ru:["Пенне Араббьята","Паста пенне в остром чесночно-томатном соусе."],uz:["Penne Arrabbiata","Achchiq sarimsoq va pomidor sousidagi penne makaron."]},
  43:{ru:["Сливочная паста с грибами","Нежная паста с обжаренными грибами и сливочным соусом с пармезаном."],uz:["Qo‘ziqorinli qaymoqli pasta","Qovurilgan qo‘ziqorin va parmezanli qaymoq sousidagi mayin pasta."]},
  44:{ru:["Карбонара","Классическая сливочная паста с хрустящим беконом, яйцом и пармезаном."],uz:["Carbonara","Qarsildoq bekon, tuxum va parmezanli klassik qaymoqli pasta."]},
  45:{ru:["Паста с морепродуктами","Паста с креветками, мидиями и насыщенным чесночно-сливочным соусом."],uz:["Dengiz mahsulotli pasta","Krevetka, midiya va mazali sarimsoq-qaymoq sousli pasta."]},
  46:{ru:["Нью-Йоркский чизкейк","Нежный сливочный чизкейк на песочной основе."],uz:["Nyu-York chizkeyki","Qumoq pechenye asosidagi mayin qaymoqli chizkeyk."]},
  47:{ru:["Шоколадный фондан","Тёплый шоколадный кекс с насыщенной жидкой начинкой."],uz:["Shokoladli lava-kek","Ichida quyuq suyuq shokoladli nachinkasi bor iliq kek."]},
  48:{ru:["Тирамису","Итальянский десерт с пропитанным кофе печеньем и кремом маскарпоне."],uz:["Tiramisu","Qahvaga botirilgan pechenye va mascarpone kremli italyan shirinligi."]},
  49:{ru:["Шоколадный брауни","Насыщенный шоколадный брауни с нежной серединкой."],uz:["Shokoladli brauni","Mayin ichki qismli quyuq shokoladli brauni."]},
  50:{ru:["Баскский чизкейк","Нежный ванильный чизкейк с карамелизированной верхушкой."],uz:["Bask chizkeyki","Karamellangan ustki qismli mayin vanilli chizkeyk."]},
  51:{ru:["Бельгийские вафли","Свежие вафли с ягодами и кленовым сиропом."],uz:["Belgiya vaflilari","Yangi pishirilgan vaflilar rezavorlar va zarang siropi bilan."]},
  52:{ru:["Французские тосты","Золотистые ломтики бриоши со свежими ягодами и кленовым сиропом."],uz:["Fransuzcha tost","Yangi rezavorlar va zarang siropili oltinrang briosh bo‘laklari."]},
  53:{ru:["Мороженое (3 шарика)","Три шарика любимого классического мороженого."],uz:["Muzqaymoq (3 sharik)","Sevimli klassik muzqaymoqning uchta sharigi."]},
  54:{ru:["Эспрессо","Насыщенная концентрированная порция свежесваренного кофе."],uz:["Espresso","Yangi damlangan quyuq va konsentrlangan qahva."]},
  55:{ru:["Американо","Эспрессо с горячей водой и мягким кофейным вкусом."],uz:["Amerikano","Yumshoq ta’mli, issiq suv qo‘shilgan espresso."]},
  56:{ru:["Капучино","Эспрессо с горячим молоком и плотной молочной пеной."],uz:["Kapuchino","Issiq sut va qalin sut ko‘pigiga ega espresso."]},
  57:{ru:["Кофе латте","Мягкий эспрессо с горячим молоком и лёгкой пеной."],uz:["Latte qahva","Issiq sut va yengil ko‘pik bilan aralashtirilgan mayin espresso."]},
  58:{ru:["Флэт уайт","Крепкий эспрессо, сбалансированный шелковистой микропеной."],uz:["Flat white","Ipakdek mayin sut ko‘pigi bilan uyg‘unlashgan kuchli espresso."]},
  59:{ru:["Мокко","Эспрессо с шоколадом и горячим молоком."],uz:["Mokko","Shokolad va issiq sut bilan aralashtirilgan espresso."]},
  60:{ru:["Испанский латте","Эспрессо со сливочным молоком и сладким сгущённым молоком."],uz:["Ispancha latte","Qaymoqli sut va shirin quyultirilgan sutli espresso."]},
  61:{ru:["Айс-американо","Освежающий эспрессо со льдом и холодной водой."],uz:["Muzli amerikano","Muz va sovuq suv bilan tortiladigan tetiklantiruvchi espresso."]},
  62:{ru:["Айс-латте","Охлаждённый эспрессо со свежим молоком и льдом."],uz:["Muzli latte","Yangi sut va muz bilan aralashtirilgan sovutilgan espresso."]},
  63:{ru:["Айс-карамель макиато","Молоко со льдом, слоями эспрессо и сладкой карамели."],uz:["Muzli karamel makkiato","Muzli sut, espresso va shirin karamel qatlamlari."]},
  64:{ru:["Айс-испанский латте","Охлаждённый эспрессо со сливочным и сгущённым молоком."],uz:["Muzli ispancha latte","Qaymoqli va quyultirilgan sutli sovutilgan espresso."]},
  65:{ru:["Клубничный смузи","Свежая клубника, взбитая до нежной фруктовой текстуры."],uz:["Qulupnayli smuzi","Yangi qulupnaydan tayyorlangan mayin mevali ichimlik."]},
  66:{ru:["Манговый смузи","Сладкое тропическое манго в освежающем смузи."],uz:["Mangoli smuzi","Tetiklantiruvchi smuzidagi shirin tropik mango."]},
  67:{ru:["Шоколадный молочный коктейль","Густой коктейль с насыщенным шоколадным мороженым."],uz:["Shokoladli milkshake","Quyuq shokoladli muzqaymoqdan tayyorlangan kokteyl."]},
  68:{ru:["Ванильный молочный коктейль","Нежное ванильное мороженое со свежим молоком."],uz:["Vanilli milkshake","Yangi sut bilan aralashtirilgan mayin vanilli muzqaymoq."]},
  69:{ru:["Свежий апельсиновый сок","Свежевыжатые апельсины, подаются охлаждёнными."],uz:["Yangi apelsin sharbati","Yangi siqilgan apelsin sharbati sovutilgan holda tortiladi."]},
  70:{ru:["Свежий лимонад","Освежающий домашний лимонад из свежих лимонов."],uz:["Yangi limonad","Yangi limonlardan tayyorlangan uy limonadi."]},
  71:{ru:["Зелёный чай","Лёгкий и освежающий свежезаваренный зелёный чай."],uz:["Ko‘k choy","Yengil va tetiklantiruvchi yangi damlangan ko‘k choy."]},
  72:{ru:["Чёрный чай","Классический ароматный чёрный чай, подаётся горячим."],uz:["Qora choy","Issiq holda tortiladigan klassik xushbo‘y qora choy."]},
  73:{ru:["Минеральная вода","Освежающая бутилированная минеральная вода."],uz:["Mineral suv","Tetiklantiruvchi idishdagi mineral suv."]},
  74:{ru:["Кока-Кола","Классическая охлаждённая Coca-Cola со льдом."],uz:["Coca-Cola","Muz bilan tortiladigan klassik sovutilgan Coca-Cola."]}
};
productTranslationsReady = true;


// ============================================================
// TRANSLATION ENGINE: updates static text, placeholders, and
// dynamically created product/cart/search content in place.
// ============================================================
const originalText = new WeakMap<Text, string>();
const originalAttributes = new WeakMap<Element, Map<string, string>>();

function translateText(value: string): string {
  if (currentLanguage === "en") return value;
  return translations[currentLanguage][value] || value;
}

function translateProduct(product: Partial<mealType>): Partial<mealType> {
  if (!productTranslationsReady || currentLanguage === "en" || !product.id || !productText[product.id]) return product;
  const translated = productText[product.id][currentLanguage];
  return { ...product, name: translated[0], description: translated[1] };
}

function translateDocument(root: ParentNode = document): void {
  const walker = document.createTreeWalker(root as Node, NodeFilter.SHOW_TEXT);
  let textNode: Text | null;
  while ((textNode = walker.nextNode() as Text | null)) {
    if (!originalText.has(textNode)) originalText.set(textNode, textNode.nodeValue || "");
    const original = originalText.get(textNode) || "";
    const leading = original.match(/^\s*/)?.[0] || "";
    const trailing = original.match(/\s*$/)?.[0] || "";
    const content = original.trim();
    if (content) textNode.nodeValue = `${leading}${translateText(content)}${trailing}`;
  }

  root.querySelectorAll("input[placeholder], textarea[placeholder]").forEach((element) => {
    const field = element as HTMLInputElement | HTMLTextAreaElement;
    let stored = originalAttributes.get(field);
    if (!stored) {
      stored = new Map<string, string>();
      originalAttributes.set(field, stored);
    }
    if (!stored.has("placeholder")) stored.set("placeholder", field.placeholder);
    field.placeholder = translateText(stored.get("placeholder") || "");
  });
}

function changeLanguage(language: Language): void {
  currentLanguage = language;
  localStorage.setItem("siteLanguage", language);
  document.documentElement.lang = language;
  document.title = language === "ru" ? "L'Aurora — Ремесленное кафе" : language === "uz" ? "L'Aurora — Hunarmandchilik kafesi" : "L'Aurora Artisan Café";
  translateDocument();
  if (activeMenuProducts) renderCategoryProducts(activeMenuProducts);
  else renderAllProducts();
  if (languageSelect) languageSelect.value = language;
  const searchButton = document.querySelector(".search") as HTMLButtonElement | null;
  const bagButton = document.querySelector(".bag") as HTMLButtonElement | null;
  if (searchButton) searchButton.setAttribute("aria-label", language === "ru" ? "Поиск" : language === "uz" ? "Qidirish" : "Search");
  if (bagButton) bagButton.setAttribute("aria-label", language === "ru" ? "Корзина" : language === "uz" ? "Savat" : "Shopping bag");
  if (languageSelect) languageSelect.setAttribute("aria-label", language === "ru" ? "Выбрать язык" : language === "uz" ? "Tilni tanlash" : "Select language");
  // Re-render open/dynamic areas so product names and descriptions change too.
  if (Cart && !Cart.classList.contains("display__off")) renderCartContents();
  if (SearchCont && !SearchCont.classList.contains("display__off") && SearchInput.value.trim()) {
    SearchInput.dispatchEvent(new Event("input"));
  }
}

if (languageSelect) {
  languageSelect.value = currentLanguage;
  languageSelect.addEventListener("change", () => {
    const selected = languageSelect.value as Language;
    if (selected === "en" || selected === "ru" || selected === "uz") changeLanguage(selected);
  });
}

// Observe newly rendered cards and modal content so they use the active language.
const languageObserver = new MutationObserver((records) => {
  records.forEach((record) => record.addedNodes.forEach((node) => {
    if (node.nodeType === Node.TEXT_NODE) {
      const textNode = node as Text;
      if (!originalText.has(textNode)) originalText.set(textNode, textNode.nodeValue || "");
      const original = originalText.get(textNode) || "";
      const trimmed = original.trim();
      if (trimmed) textNode.nodeValue = original.replace(trimmed, translateText(trimmed));
    } else if (node instanceof HTMLElement) {
      translateDocument(node);
    }
  }));
});
languageObserver.observe(document.body, { childList: true, subtree: true });

// Apply the saved language after all initial page elements are available.
changeLanguage(currentLanguage);


export {};
