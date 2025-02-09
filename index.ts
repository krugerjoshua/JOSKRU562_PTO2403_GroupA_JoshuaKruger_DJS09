// Purpose: To display the properties and user details on the webpage
const propertyContainer = document.querySelector('.properties')
const reviewTotalDisplay = document.querySelector('#reviews')
const returningUserDisplay = document.querySelector('#returning-user')
const userNameDisplay = document.querySelector('#user')
const footer = document.querySelector('.footer')
const button = document.querySelector('button')
const reviewContainer = document.querySelector('.reviews')

// 
function makeMultiple(value: number) : string {
    if (value > 1 || value == 0) {
        return 's'
    } else return ''
}

// Function to display the total number of reviews and the last reviewer
function showReviewTotal(value: number, reviewer: string, isLoyalty: loyaltyUser) {
    const iconDisplay = isLoyalty === loyaltyUser.GOLD_USER ? '⭐' : ''
    reviewTotalDisplay.innerHTML = `${value.toString()} Review${makeMultiple(value)} | Last Reviewed by ${reviewer} ${iconDisplay}`
}

// Function to display the user's name and status
function populateUser(isReturning: boolean, userName: string) {
    if (isReturning == true) {
        returningUserDisplay.innerHTML = 'back'
    }
    userNameDisplay.innerHTML = userName
}

// Function to show details if authority status is passed
let isLoggedIn: boolean
let authorityStatus: any
isLoggedIn = true
function showDetails(authorityStatus: boolean | userType, element: HTMLDivElement, price: number) {
    if (authorityStatus) {
        const priceDisplay = document.createElement('div')
        priceDisplay.innerHTML = price.toString() + '/night'
        element.appendChild(priceDisplay)
    }
}

// Function to show the top 2 reviews
function getTopTwoReviews(reviews: {
    name: string;
    stars: number;
    loyaltyUser: userType;
    date: string;
}[]) : {
    name: string;
    stars: number;
    loyaltyUser: userType;
    date: string;  
}[]  {
 const sortedReviews = reviews.sort((a, b) => b.stars - a.stars)
 return sortedReviews.slice(0,2)
}

// Function to get top 2 reviews
let count = 0
function addReviews(array : { name: string; stars: number; loyaltyUser: userType; date: string; }[]) : void {
    if (!count ) {
        count++
        const topTwo = getTopTwoReviews(array)
        for (let i = 0; i < topTwo.length; i++) {
            const card = document.createElement('div')
            card.classList.add('review-card')
            card.innerHTML = topTwo[i].stars + ' stars from ' + topTwo[i].name
            reviewContainer.appendChild(card)
        }
        reviewContainer.removeChild(button)
    }
}

button.addEventListener('click', () => addReviews(reviews))

// Enum of loyalty users and user types
enum loyaltyUser {
    GOLD_USER = 'GOLD_USER',
    SILVER_USER = 'SILVER_USER',
    BRONZE_USER = 'BRONZE_USER'
}

enum userType {
    ADMIN = 'ADMIN',
    READ_ONLY = 'READ_ONLY',
}

// Object of user reviews
const reviews: any[] = [
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
const properties: {
    image: string
    title: string
    price: number
    location: {
        firstLine: string
        city: string
        code: number
        country: string
    }
    contact: [number, string]
    isAvailable: boolean
}[] = [
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
    ]

// User details in an object
const you = {
    firstName: "Joshua",
    lastName: "Doe",
    permissions: userType.ADMIN,
    isReturning: true,
    age: 25,
    stayedAt: ["Hotel A", "Hotel B", "Hotel C", 23],
}

// Calling of functions
showReviewTotal(reviews.length, reviews[0].name, reviews[0].loyaltyUser)
populateUser(you.isReturning, you.firstName)

//Adding the properties
for (let i = 0; i < properties.length; i++) {
    const card = document.createElement('div')
    card.classList.add('card')
    card.innerHTML = properties[i].title
    const image = document.createElement('img')
    image.setAttribute('src', properties[i].image)
    card.appendChild(image)
    propertyContainer.appendChild(card)
    showDetails(you.permissions, card, properties[i].price)
}

// Footer with current location, temperature and time
let currentLocation: [string, string, number] = ['Cape Town', '22:00', 17]
footer.innerHTML = currentLocation[0] + ' | ' + currentLocation[1] + ' | ' + currentLocation[2] + '°C'