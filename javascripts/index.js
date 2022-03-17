

/** Globals */
const baseUrl = 'http://localhost:3000';
//Eventlistener One
document
  .querySelector("#goal-add-form")
  .addEventListener("submit", handleFormSubmit);



/** NODE Getters */
const mainDiv = () => document.getElementById("main");
const homePageLink = () => document.getElementById("home-page-link");
const habitTipsLink = () => document.getElementById("habit-tips")
const checkboxContainer = document.createDocumentFragment();
// const goalsArray = "goals"


/** Templates */

//Home Page w/ Directions
const homePageTemplate = () => { 
  return `
  <div class="item1">
  <h3 class="center-align">Welcome to the First Step Towards Your Goals!</h3>
  <p class="left-align">
    <h5 class = "deep-purple-text text-darken-4">
      <b> &ensp; Directions:</b>
      </h5>
    <ol>
      <li>Submit your main goal and the habit you are going to track to get you there </li>
      <li>Make sure to clarify your "why" and add the rewards you're setting for yourself</li>
      <li>See your goal tracker appear to the right!</li>
      <li>Make sure to come back each day to check off if you have completed the day</li>
      <li>Don't beat yourself up for missing a day, just continue to improve each cycle.</li>
      <li>Start with small goals and make your next 30 days even bigger!</li>
    </ol>
  </p>
  <div class="quote_button">
  <button class = "quote" id ="quote">Click Me for Motivation!</button>
  </div>
  <div id = counter>
  <p> 1</p>
  </div>
</div>
  `
}

//Habits Tips w/video
const habitTipsTemplate = () => {
  return `
  <div class="center-align">
  <h3> Atomic habits (by James Clear)</h3>

  <iframe width="560" height="315" src="https://www.youtube.com/embed/PZ7lDrwYdZc" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
  </div>
  `
}

/**Events: */

// Form Submission/ Create Object - Gets called by Event Listener on Form

function handleFormSubmit(event) {
  //prevent default
  event.preventDefault();
  // Step 1: get user input from the form input fields
  const goalObject = {
    id: "",
    goalName: event.target.new_goal.value,
    dailyHabit: event.target.new_habit.value,
    reasonWhy: event.target.reason_why.value,
    rewardOne: event.target.reward_one.value,
    rewardTwo: event.target.reward_two.value,
    rewardThree: event.target.reward_three.value,
    dateStarted: event.target.date_started.value,
  }
 // Step 2: slap it on the DOM
renderNewGoal(goalObject);
//add to object to serve
saveGoalToServer(goalObject)
// Step 3: clear the input fields
event.target.reset();
}





 //Navigate back to Home Page when you click Habit Tracker: Reach Your...
 //Event Listener Two
 const homePageLinkEvent = () => {
  homePageLink().addEventListener('click', (e) => 
  {
     e.preventDefault();
     renderHomePage()
   })
 }

 //Navigate to habit video  when you click "Video tips"
 //Event Listener Three
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
  newGoal.className = "newGoal";
  newGoal.id = goalObject.id
  // step 2. use innerHTML to create all of its children
  newGoal.innerHTML = `
  <div class="goal-content">
    <h5 class="deep-purple-text text-darken-4">
    <b>
    &ensp; ${goalObject.goalName}
    </b>
    </h5>
    <h6 class="indigo-text text-darken-4">
    <b>
    &ensp; &ensp; Your daily Habit: </b> ${goalObject.dailyHabit}
    </b>
    </h6>
    <p>
      <ol>
      <b> Your Reson Why: </b> ${goalObject.reasonWhy}
      </ol>
    </p>
    <p>
      <ol>
     <b>Date Started: </b> ${goalObject.dateStarted} <br> 
     <b>Reward One: </b>  ${goalObject.rewardOne}<br> 
     <b>Reward Two: </b> ${goalObject.rewardTwo}<br> 
    <b>Reward Three: </b> ${goalObject.rewardThree}<br> 
     </ol>
    </p>
    
    </div>
  </div>
  <div id ="checkboxdiv" class = "checkboxdiv" style = "display:inline" >

  </div>
  <div class="buttons">
  <button class = "delete" id ="delete" data-action="delete">Delete Goal</button>
  </div>
  `
  //Event Listener FOUR 
  //Listens to Delete Button
  newGoal.querySelector(`#delete`).addEventListener(`click`, () => {
    newGoal.remove()
    deleteGoal(goalObject.id)
  });

  //For Loop that creates 30 checkboxes for 30 days
  for (let i = 1; i < 31; i++) {  
    let checkboxes = checkboxContainer.appendChild(document.createElement("li"));
    checkboxes.style = "display:inline";
    checkboxes.className = "checkboxes";
    checkboxes.innerHTML = "";
    if (i == 10|| i == 20 || i == 30) {
    checkboxes.innerHTML = `
    <label>
      <input type="checkbox" id = "checkbox" />  
      <span> </span>
      <text> ${i} Days completed! Collect a reward! </text>
      </label>
    <br>
    ` 
    } else {
    checkboxes.innerHTML = `
    <label>
      <input type="checkbox" id = "checkbox" />
      <span> </span> &nbsp;
    </label>
    ` 
    }
  };
  // step 3. slap it on the DOM!
  document.querySelector("#goal-list").append(newGoal);
  newGoal.querySelector("#checkboxdiv").appendChild(checkboxContainer);

}





const renderHomePage = () => {
  mainDiv().innerHTML = homePageTemplate();
  document.querySelector(`#quote`).addEventListener(`click`, () => {
    getMotivation()
  });
}
const renderHabitTipsPage = () => {
  mainDiv().innerHTML = habitTipsTemplate();
}

//FetchMotivation
function getMotivation(){
  fetch('https://quoteclear.web.app/api/random', {
    method: 'GET',
  })
  .then(res=> res.json())
  .then(res => alert(` ${res.text} - James Clear , ${res.source}`))
}


//Fetch Goals on reload
function retrieveAllGoals(){
  fetch('http://localhost:3000/goals')
  .then(res=> res.json())
  .then(goals => goals.forEach(goal => renderNewGoal(goal)))
}

//POST goals to db json
function saveGoalToServer(goalObject){
  fetch('http://localhost:3000/goals',{
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body:JSON.stringify(goalObject),
  })
  .then(res => res.json())
  .then(goal => console.log(goal))
}

//DELETE
function deleteGoal(id){
  fetch(`http://localhost:3000/goals/${id}`,{
  method: 'DELETE',
  headers: {
    'Content-Type': 'application/json'
  }
})
.then(res => res.json())
.then((goals) => console.log(goals))
}


//Initialize
function initialize(){
  retrieveAllGoals()
}


/** WHEN THE DOM LOADS */
 document.addEventListener('DOMContentLoaded', () => {
  initialize();
  renderHomePage();
  homePageLinkEvent();
  habitTipsLinkEvent();
 })
