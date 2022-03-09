

/** Globals */
document
  .querySelector("#goal-add-form")
  .addEventListener("submit", handleFormSubmit);

/** NODE Getters */
const mainDiv = () => document.getElementById("main");
const homePageLink = () => document.getElementById("home-page-link");
const habitTipsLink = () => document.getElementById("habit-tips")
const checkboxContainer = document.createDocumentFragment();

/** Templates */

//Home Page
const homePageTemplate = () => { 
  return `
  <h3 class="center-align">Welcome to the First Step Towards Your Goals!</h3>
  `
}

//Habits Tips page
const habitTipsTemplate = () => {
  return `
  <h3 class="center-align">Check out these tips to stay on track!</h3>
  `
}

// Creates 30 checkboxes when new habit is created
for (let i = 1; i < 31; i++) {
  let checkboxes = checkboxContainer.appendChild(document.createElement("div"));
  checkboxes.style = "display:inline"
  checkboxes.innerHTML = `
  <label>
    <input type="checkbox" />
    <span> Day ${i}</span> &nbsp;
  </label>`
}

/**Events: */

// Form Submission/ Create Object
function handleFormSubmit(event) {
  //prevent default
  event.preventDefault();

  // Step 1: get user input from the form input fields
  const goalObject = {
    goalName: event.target.new_habit.value,
    reasonWhy: event.target.reason_why.value,
    rewardOne: event.target.reward_one.value,
    rewardTwo: event.target.reward_two.value,
    rewardThree: event.target.reward_three.value,
    dateStarted: event.target.date_started.value,
  };

 

  // TODO: create animal on the server

  // Step 2: slap it on the DOM
  renderNewGoal(goalObject);

  // (optional) Step 3: clear the input fields
  event.target.reset();
}


 //Navigate to Home Page when you click Habit Tracker: Reach Your...
 const homePageLinkEvent = () => {
  homePageLink().addEventListener('click', (e) => 
  {
     e.preventDefault();
     renderHomePage()
   })
 }

 //Navigate to habit tips when you click "Habit Tips"
 const habitTipsLinkEvent = () => {
  habitTipsLink().addEventListener('click', (e) => 
  {
     e.preventDefault();
     renderHabitTipsPage()
   })
 }



/** Renders */




function renderNewGoal(goalObject) {
  // step 1. create the outer element using createElement (& assign necessary attributes)
  const newGoal = document.createElement("li");
  newGoal.className = "goal-tracking-section";

  // step 2. use innerHTML to create all of its children
  newGoal.innerHTML = `
  <div class="goal-content">
    <h6>${goalObject.goalName}</h6>
    <p>
      ${goalObject.reasonWhy}
    </p>
    <p>
     Date Started: ${goalObject.dateStarted}
    </p>
    <p>
          <li>Reward One: ${goalObject.rewardOne}</li>
          <li>Reward One: ${goalObject.rewardTwo}</li>
          <li>Reward One: ${goalObject.rewardThree}</li>
    </p>
  </div>

  `;

  // step 3. slap it on the DOM!
  document.querySelector("#goal-list").append(newGoal);
  document.querySelector("#goal-list").appendChild(checkboxContainer);
}


const renderHomePage = () => {
  mainDiv().innerHTML = homePageTemplate();
}
const renderHabitTipsPage = () => {
  mainDiv().innerHTML = habitTipsTemplate();
}



/** WHEN THE DOM LOADS */
 document.addEventListener('DOMContentLoaded', () => {
  homePageLinkEvent();
  habitTipsLinkEvent();
 })
