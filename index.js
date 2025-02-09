// Purpose: To display the properties and user details on the webpage
var propertyContainer = document.querySelector('.properties');
var reviewTotalDisplay = document.querySelector('#reviews');
var returningUserDisplay = document.querySelector('#returning-user');
var userNameDisplay = document.querySelector('#user');
var footer = document.querySelector('.footer');
var button = document.querySelector('button');
var reviewContainer = document.querySelector('.reviews');
// 
function makeMultiple(value) {
    if (value > 1 || value == 0) {
        return 's';
    }
    else
        return '';
}
// Function to display the total number of reviews and the last reviewer
function showReviewTotal(value, reviewer, isLoyalty) {
    var iconDisplay = isLoyalty === loyaltyUser.GOLD_USER ? '⭐' : '';
    reviewTotalDisplay.innerHTML = "".concat(value.toString(), " Review").concat(makeMultiple(value), " | Last Reviewed by ").concat(reviewer, " ").concat(iconDisplay);
}
// Function to display the user's name and status
function populateUser(isReturning, userName) {
    if (isReturning == true) {
        returningUserDisplay.innerHTML = 'back';
    }
    userNameDisplay.innerHTML = userName;
}
// Function to show details if authority status is passed
var isLoggedIn;
var authorityStatus;
isLoggedIn = true;
function showDetails(authorityStatus, element, price) {
    if (authorityStatus) {
        var priceDisplay = document.createElement('div');
        priceDisplay.innerHTML = price.toString() + '/night';
        element.appendChild(priceDisplay);
    }
}
// Function to show the top 2 reviews
function getTopTwoReviews(reviews) {
    var sortedReviews = reviews.sort(function (a, b) { return b.stars - a.stars; });
    return sortedReviews.slice(0, 2);
}
// Function to get top 2 reviews
var count = 0;
function addReviews(array) {
    if (!count) {
        count++;
        var topTwo = getTopTwoReviews(array);
        for (var i = 0; i < topTwo.length; i++) {
            var card = document.createElement('div');
            card.classList.add('review-card');
            card.innerHTML = topTwo[i].stars + ' stars from ' + topTwo[i].name;
            reviewContainer.appendChild(card);
        }
        reviewContainer.removeChild(button);
    }
}
button.addEventListener('click', function () { return addReviews(reviews); });
// Enum of loyalty users and user types
var loyaltyUser;
(function (loyaltyUser) {
    loyaltyUser["GOLD_USER"] = "GOLD_USER";
    loyaltyUser["SILVER_USER"] = "SILVER_USER";
    loyaltyUser["BRONZE_USER"] = "BRONZE_USER";
})(loyaltyUser || (loyaltyUser = {}));
var userType;
(function (userType) {
    userType["ADMIN"] = "ADMIN";
    userType["READ_ONLY"] = "READ_ONLY";
})(userType || (userType = {}));
// Object of user reviews
var reviews = [
    {
        name: "Sheia",
        stars: 5,
        loyaltyUser: loyaltyUser.GOLD_USER,
        date: "01-04-2021",
    },
    {
        name: "Andrzej",
        stars: 3,
        loyaltyUser: loyaltyUser.BRONZE_USER,
        date: "28-03-2021",
    },
    {
        name: "Omar",
        stars: 4,
        loyaltyUser: loyaltyUser.SILVER_USER,
        date: "27-03-2021",
        description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Illum nobis mollitia, iure reiciendis accusamus amet quae laudantium perspiciatis facere sint modi nisi deleniti in qui alias, iste ratione, saepe consequatur!'
    },
];
// Array of property objects
var properties = [
    {
        image: 'images/colombia-property.jpg',
        title: 'Columbian Shack',
        price: 45,
        location: {
            firstLine: 'shack 37',
            city: 'Bogota',
            code: 5757,
            country: 'Columbia'
        },
        contact: [+1234567890, 'joshuakruger66@live.com'],
        isAvailable: true
    },
    {
        image: 'images/poland-property.jpg',
        title: 'Polish Cotage',
        price: 50,
        location: {
            firstLine: 'no 25',
            city: 'Gdansk',
            code: 5874,
            country: 'Poland'
        },
        contact: [+1234567890, 'joshuakruger66@live.com'],
        isAvailable: false
    },
    {
        image: 'images/london-property.jpg',
        title: 'London Flat',
        price: 55,
        location: {
            firstLine: 'flat 15',
            city: 'London',
            code: 8989,
            country: 'United Kingdom'
        },
        contact: [+1234567890, 'joshuakruger66@live.com'],
        isAvailable: true
    }
];
// User details in an object
var you = {
    firstName: "Joshua",
    lastName: "Doe",
    permissions: userType.ADMIN,
    isReturning: true,
    age: 25,
    stayedAt: ["Hotel A", "Hotel B", "Hotel C", 23],
};
// Calling of functions
showReviewTotal(reviews.length, reviews[0].name, reviews[0].loyaltyUser);
populateUser(you.isReturning, you.firstName);
//Adding the properties
for (var i = 0; i < properties.length; i++) {
    var card = document.createElement('div');
    card.classList.add('card');
    card.innerHTML = properties[i].title;
    var image = document.createElement('img');
    image.setAttribute('src', properties[i].image);
    card.appendChild(image);
    propertyContainer.appendChild(card);
    showDetails(you.permissions, card, properties[i].price);
}
// Footer with current location, temperature and time
var currentLocation = ['Cape Town', '22:00', 17];
footer.innerHTML = currentLocation[0] + ' | ' + currentLocation[1] + ' | ' + currentLocation[2] + '°C';
