# Fitness Tracker

## Description
Looking for that extra motivation to hit the gym? Or are you looking for a way to track your fitness progress? Fitness Tracker is an app that allows users to track their workouts. Users can create daily workouts, add exercises to workouts, update daily workouts, and view daily stats of their workouts on a dashboard. The app tracks both resistance and cardio exercises and logs the applicable type, name, weight, sets, reps, distance and duration for each exercise. Fitness Tracker is just the app you need to track and reach your fitness goals, no matter how big or small they may be.

## Features
* A Mongo database and a Mongoose schema are used to store user data
    * Mongoose is used to define the schema for Workout
    * The Mongoose schema maps to a Mongo database collection which holds user data
* Express is used to create routes that connect front-end client requests to the back-end server
    * The client sends requests to the server while interacting with the application to create workouts, add exercises, and view stats
    * The server queries the database and sends a response to the client to display the requested information
* Heroku and MongoDB Atlas are used to host the application 
    * Heroku is used to host the website in the cloud
    * MongoDB Atlas is used to host the Monog database in the cloud

## Built With
* [MongoDB](https://www.mongodb.com/) - a NoSQL document-oriented database program
* [Mongoose](https://mongoosejs.com/) - MongoDB object modeling library for creating schemas to model application data
* [MongoDB Atlas](https://www.mongodb.com/cloud/atlas) - a multi-cloud database service for MongoDB
* [Express](https://expressjs.com/) - a back-end web application framework for Node.js
* [Node.js](https://nodejs.org/en/) - a JavaScript runtime environment that allows JavaScript to be run in command line
* [JavaScript](https://developer.mozilla.org/en-US/docs/Web/JavaScript) - code that creates the logic and structure of the program
* [HTML](https://developer.mozilla.org/en-US/docs/Web/HTML) - defines meaning and structure of web page
* [CSS](https://developer.mozilla.org/en-US/docs/Web/CSS) - defines styling on the HTML page
* [Heroku](https://heroku.com) - a cloud platform for deploying web applications
* [Git](https://git-scm.com/) - version control system to track changes in source code
* [GitHub](https://github.com/) - hosts repository and deploys page on GitHub

## Deployed Link
[Fitness Tracker](https://shielded-everglades-57807.herokuapp.com/) - See it online

![Burger Eater](assets/Fitness_Tracker.gif)

## Instructions
1. Click "New Workout" to start a new workout for the day
2. Select the type of exercise to log: cardio or resistance
3. Enter required information for that type of exercise: name, weight, sets, reps, duration, and distance
4. Click "Add Exercise" to add the exercise to your workout
5. Add another exercise or click "Complete" to view your daily summary
6. To add another exercise to the current day's workout, click "Continue Workout"
7. Click "Dashboard" in the nav bar to see your workout dashboard for the week

## Code
The below code demonstrates how Mongoose is used to create the Workout schema which maps to a collection in a Mongo database

        // Schema for Exercise
        const ExerciseSchema = new Schema({
            type: String,
            name: String,
            weight: Number,
            sets: Number,
            reps: Number,
            distance: Number,
            duration: Number
        }, {
            _id: false
        });

        // Schema Workout which includes the Exercise schema as an array called exercises
        const WorkoutSchema = new Schema({
            day: { type: Date, default: () => new Date() },
            exercises: [
                ExerciseSchema
            ]
        }, {
            toJSON: { virtuals: true }
        });


The below code demonstrates how Express is used so client-side JavaScript can make requests to API routes on the back-end to interact with the database

        <!-- Client-side JavaScript that sends requests to the above API route -->
        async addExercise(data) {
            const id = location.search.split("=")[1];
            const res = await fetch("/api/workouts/" + id, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(data)
            });
            const json = await res.json();
            return json;
        },

        // API route for adding an exercise to an existing workout
        app.put("/api/workouts/:id", (req, res) => {
        // Get workout id from req.params
        const { id } = req.params
        // Find requested id in the Workout collection
        // Update the corresponding document and add new exercise info to the exercise array
        db.Workout.findByIdAndUpdate(id, { $push: { exercises: req.body } })
            .then(workout => {
            res.json(workout);
            })
        })

## License
This project is licensed under the MIT license.

## Author
* Rebecca Eng
* [GitHub](https://github.com/engrebecca)
* [LinkedIn](https://www.linkedin.com/in/engrebecca/)
