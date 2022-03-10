

/** Globals */
const baseUrl = 'http://localhost:3000';
document
  .querySelector("#goal-add-form")
  .addEventListener("submit", handleFormSubmit);



/** NODE Getters */
const mainDiv = () => document.getElementById("main");
const homePageLink = () => document.getElementById("home-page-link");
const habitTipsLink = () => document.getElementById("habit-tips")
// const checkboxContainer = document.createDocumentFragment();
// const goalsArray = "goals"


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
    checks: function () {
      for (let i = 1; i < 31; i++) {
        //let checkboxes = checkboxContainer.appendChild(document.createElement("div"));
        const checkboxes = document.createElement("li")
        checkboxes.style = "display:inline"
        checkboxes.innerHTML = `
        <label>
          <input type="checkbox" id = "checkbox" />
          <span> Day ${i}</span> &nbsp;
        </label>` ; 
        // array1.push(i);
        // finalCheckboxArray.push(array1.slice(0));
        // goalObject['checks'].push(finalCheckboxArray)
        // console.log(`${finalCheckboxArray}`)
      };
      
    }
  }

      // array1.push(i);
      // finalCheckboxArray.push(array1.slice(0));
      // goalObject['checks'].push(finalCheckboxArray)
      // console.log(`${finalCheckboxArray}`)

  // TODO: create animal on the server

 // Step 2: slap it on the DOM
renderNewGoal(goalObject);

//add to  db.json?
saveGoalToServer(goalObject)

// (optional) Step 3: clear the input fields
event.target.reset();
}




  



// function handleGoalListDelete(event){
//   if (event.target.dataset.action === "delete") {
//     // Delete Animal
//     const button = event.target;

//     // traverse the DOM to find elements we care about, relative to the button
//     const newGoal = button.closest(".newGoal");
//     const connectedboxes = button.closest("checkboxContainer")

//     // remove the animal card
//     newGoal.remove();
// }
// }






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
  <div class="buttons">
    <button class = "delete" id ="delete" data-action="delete">Delete Goal</button>
  </div>
  <div class="checkboxes">
    <li>
      ${goalObject.checks}
    </li>
  </div>
  `
  
  newGoal.querySelector(`#delete`).addEventListener(`click`, () => {
    newGoal.remove()
    deleteGoal(goalObject.id)
  });

  // for (let i = 1; i < 31; i++) {
  //   let checkboxes = checkboxContainer.appendChild(document.createElement("div"));
  //   checkboxes.style = "display:inline"
  //   checkboxes.className = "item4"
  //   checkboxes.innerHTML = `
  //   <label>
  //     <input type="checkbox" id = "checkbox" />
  //     <span> Day ${i}</span> &nbsp;
  //   </label>` ; 
  // };


  // step 3. slap it on the DOM!
  document.querySelector("#goal-list").append(newGoal);
  //document.querySelector(".checkboxes").appendChild(checkboxContainer);
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
  homePageLinkEvent();
  habitTipsLinkEvent();
 })