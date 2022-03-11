

/** Globals */
const baseUrl = 'http://localhost:3000';
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

//Home Page
const homePageTemplate = () => { 
  return `
  <div class="item1">
  <h3 class="center-align">Welcome to the First Step Towards Your Goals!</h3>
  <p class="left-align">
    <h5 class = "deep-purple-text text-darken-4">
      <b> &ensp; Directions:</b>
      </h5>
    <ol>
      <li>Submit your goal in the form</li>
      <li>Make sure to clarify your "why" and add the rewards you're setting for yourself</li>
      <li>See your goal tracker appear to the right!</li>
      <li>Make sure to come back each day to check off if you have completed the day</li>
      <li>Don't beat yourself up for missing a day, just continue to improve each cycle.</li>
      <li>Start with small goals and make your next 30 days even bigger!</li>
    </ol>
  </p>
</div>
  
  `
}

//Habits Tips page
const habitTipsTemplate = () => {
  return `
  <div class="center-align">
  <h3> Atomic habits (by James Clear)</h3>

  <iframe width="560" height="315" src="https://www.youtube.com/embed/PZ7lDrwYdZc " title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
  </div>
  `
}

/**Events: */

// Form Submission/ Create Object


function handleFormSubmit(event) {
  //prevent default
  event.preventDefault();

  //setting selector so it's available within function
  const array1 = [];
  const finalCheckboxArray = [];

  

  // Step 1: get user input from the form input fields
  const goalObject = {
    id: "",
    goalName: event.target.new_habit.value,
    reasonWhy: event.target.reason_why.value,
    rewardOne: event.target.reward_one.value,
    rewardTwo: event.target.reward_two.value,
    rewardThree: event.target.reward_three.value,
    dateStarted: event.target.date_started.value,
  }
      
  

  // TODO: create animal on the server

 // Step 2: slap it on the DOM
renderNewGoal(goalObject);

//add to  db.json?
saveGoalToServer(goalObject)

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
    <p>
      <ol>
      <b> Your Reson Why: </b> ${goalObject.reasonWhy}
      </ol>
    </p>
    <p>
      <ol>
     <b>Date Started: </b> ${goalObject.dateStarted} <br> 
     <b>Reward One: </b>  ${goalObject.rewardOne}<br> 
     <b>Reward One: </b> ${goalObject.rewardTwo}<br> 
    <b>Reward One: </b> ${goalObject.rewardThree}<br> 
     </ol>
    </p>
    
    </div>
  </div>
  <div id ="checkboxdiv" style = "display:inline" >

  </div>
  <div class="buttons">
  <button class = "delete" id ="delete" data-action="delete">Delete Goal</button>
  </div>
  `
  
  //Event Listener for delete button
  newGoal.querySelector(`#delete`).addEventListener(`click`, () => {
    newGoal.remove()
    deleteGoal(goalObject.id)
  });

  for (let i = 1; i < 31; i++) {  
    let checkboxes = checkboxContainer.appendChild(document.createElement("li"));
    checkboxes.style = "display:inline"
    checkboxes.className = "checkboxes"
    checkboxes.innerHTML = `
    <label>
      <input type="checkbox" id = "checkbox" />
      <span> Day ${i}</span> &nbsp;
    </label>
    ` 
    ; 
  };


  // step 3. slap it on the DOM!
  document.querySelector("#goal-list").append(newGoal);
  newGoal.querySelector("#checkboxdiv").appendChild(checkboxContainer);

}



// const appendNewTask = item => {
//   console.log("hello");
//   document.getElementsByClassName(".newGoal").appendChild(item);
// };





const renderHomePage = () => {
  mainDiv().innerHTML = homePageTemplate();
}
const renderHabitTipsPage = () => {
  mainDiv().innerHTML = habitTipsTemplate();
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
