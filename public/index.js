init();

async function init() {
  // If search in url path is undefined, get the last workout.
  // If there is an existing workout, it will send a GET request to the server for that workout's id.
  if (location.search.split("=")[1] === undefined) {
    const workout = await API.getLastWorkout();
    if (workout) {
      location.search = "?id=" + workout._id;
    } else {
      document.querySelector("#continue-btn").classList.add("d-none")
    }
  }
}

