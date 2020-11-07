// get all workout data from back-end

fetch("/api/workouts/range")
  .then(response => {
    return response.json();
  })
  .then(data => {
    populateChart(data);
  });


API.getWorkoutsInRange()

function generatePalette() {
  const arr = [
    "#003f5c",
    "#2f4b7c",
    "#665191",
    "#a05195",
    "#d45087",
    "#f95d6a",
    "#ff7c43",
    "ffa600",
    "#003f5c",
    "#2f4b7c",
    "#665191",
    "#a05195",
    "#d45087",
    "#f95d6a",
    "#ff7c43",
    "ffa600"
  ]

  return arr;
}
// Function to get all workout information to display in charts on the stats page
function populateChart(data) {
  let durations = duration(data);
  let pounds = calculateTotalWeight(data);
  let workouts = workoutNames(data);
  let exerciseTime = calcExerciseTime(data);
  let exerciseWeight = calcExerciseWeight(data);
  const colors = generatePalette();

  let line = document.querySelector("#canvas").getContext("2d");
  let bar = document.querySelector("#canvas2").getContext("2d");
  let pie = document.querySelector("#canvas3").getContext("2d");
  let pie2 = document.querySelector("#canvas4").getContext("2d");

  // Line graph to show total workout minutes per day
  let lineChart = new Chart(line, {
    type: "line",
    data: {
      labels: [
        "Sunday",
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday"
      ],
      datasets: [
        {
          label: "Workout Duration In Minutes",
          backgroundColor: "red",
          borderColor: "red",
          data: durations,
          fill: false
        }
      ]
    },
    options: {
      responsive: true,
      title: {
        display: true
      },
      scales: {
        xAxes: [
          {
            display: true,
            scaleLabel: {
              display: true
            }
          }
        ],
        yAxes: [
          {
            display: true,
            scaleLabel: {
              display: true
            }
          }
        ]
      }
    }
  });

  // Bar graph to show total weight lifted per day
  let barChart = new Chart(bar, {
    type: "bar",
    data: {
      labels: [
        "Sunday",
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday",
      ],
      datasets: [
        {
          label: "Pounds",
          data: pounds,
          backgroundColor: [
            "rgba(255, 99, 132, 0.2)",
            "rgba(54, 162, 235, 0.2)",
            "rgba(255, 206, 86, 0.2)",
            "rgba(75, 192, 192, 0.2)",
            "rgba(153, 102, 255, 0.2)",
            "rgba(255, 159, 64, 0.2)"
          ],
          borderColor: [
            "rgba(255, 99, 132, 1)",
            "rgba(54, 162, 235, 1)",
            "rgba(255, 206, 86, 1)",
            "rgba(75, 192, 192, 1)",
            "rgba(153, 102, 255, 1)",
            "rgba(255, 159, 64, 1)"
          ],
          borderWidth: 1
        }
      ]
    },
    options: {
      title: {
        display: true,
        text: "Pounds Lifted"
      },
      scales: {
        yAxes: [
          {
            ticks: {
              beginAtZero: true
            }
          }
        ]
      }
    }
  });

  // Pie chart to show total minutes per each exercise type per week
  let pieChart = new Chart(pie, {
    type: "pie",
    data: {
      labels: workouts,
      datasets: [
        {
          label: "Excercises Performed",
          backgroundColor: colors,
          data: Object.values(exerciseTime)
        }
      ]
    },
    options: {
      title: {
        display: true,
        text: "Excercises Performed"
      }
    }
  });

  // Donut chart to show total weight per each exercise type per week
  let donutChart = new Chart(pie2, {
    type: "doughnut",
    data: {
      labels: workouts,
      datasets: [
        {
          label: "Excercises Performed",
          backgroundColor: colors,
          data: Object.values(exerciseWeight)
        }
      ]
    },
    options: {
      title: {
        display: true,
        text: "Excercises Performed"
      }
    }
  });
};

// Function to calculate total duration of each day's workout
function duration(data) {
  let durations = [];
  // For each workout, calculate the sum duration of exercises and push to the durations array.
  data.forEach(workout => {
    let dayDuration = workout.exercises.reduce((sum, exercise) => sum + exercise.duration, 0)
    durations.push(dayDuration);
  });

  // Return an array of each workout's total duration
  return durations;
};

// Function to calculate total weight of each day's workout
function calculateTotalWeight(data) {
  let total = [];
  // Calculate the total weight for each workout by adding all exercise weights for a day. 
  // Push them to the total array which stores total weight for each day of the week.
  data.forEach(workout => {
    let dayWeight = 0;
    workout.exercises.forEach(exercise => {
      if (exercise.weight) {
        dayWeight += (exercise.weight)
      };
    });
    total.push(dayWeight);
  });

  return total;
};

// Function to get names of all the workouts
function workoutNames(data) {
  let workouts = [];
  // Go through each workout and add workout type/name to the workouts array if it's not already captured
  data.forEach(workout => {
    workout.exercises.forEach(exercise => {
      if (workouts.indexOf(exercise.name) === -1)
        workouts.push(exercise.name);
    });
  });
  return workouts;
};

// Function to calculate total time for each exercise type for the week
function calcExerciseTime(data) {
  let exerciseTime = {};
  // Go through each workout and add workout type/name to the workouts object if it's not already captured
  // Add workout time as a value for each workout, if it already exists add it to the existing value to update total
  data.forEach(workout => {
    workout.exercises.forEach(exercise => {
      if (exerciseTime[exercise.name]) {
        exerciseTime[exercise.name] = exerciseTime[exercise.name] + exercise.duration
      } else {
        exerciseTime[exercise.name] = exercise.duration;
      }
    });
  });
  console.log("exercise time: " + exerciseTime);
  return exerciseTime;
};

// Function to calculate total weight for each exercise type for the week
function calcExerciseWeight(data) {
  let exerciseWeight = {};
  // Go through each workout and add workout type/name to the workouts object if it's not already captured
  // Add workout weight as a value for each workout, if it already exists add it to the existing value to update total
  data.forEach(workout => {
    workout.exercises.forEach(exercise => {
      if (exerciseWeight[exercise.name]) {
        exerciseWeight[exercise.name] = exerciseWeight[exercise.name] + exercise.weight
      } else {
        exerciseWeight[exercise.name] = exercise.weight;
      }
    });
  });
  console.log("exercise weight:" + exerciseWeight);
  return exerciseWeight;
};
