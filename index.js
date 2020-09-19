const express = require('express');
const app = express();

app.use(express.json());

const courses = [
    {id: 1, name:'course 1'},
    { id: 2, name: 'course 2' },
    { id: 3, name: 'course 3' },
    { id: 4, name: 'course 4' },

]

app.get('/', (req, res) => {
    res.send('Hello World! :)');
});

app.get('/api/courses', (req, res) => {
    res.send(courses);
});

app.post('/api/courses', (req, res) => {
    // check course name validity
    if (!req.body.name) {
        res.status(404).send('Name is required!');
        return;
    }
    
    let course = {
        id: courses.length + 1,
        name: req.body.name
    };

    courses.push(course);
    res.send(course);
});

app.put('/api/courses/:id', (req, res) => {
    // look up course 
    let course = courses.find(c => c.id === parseInt(req.params.id));
    if (!course) {
        res.status(404).send('The course with the given ID was not found');
        return;
    }
    // check course name validity
    if (!req.body.name) {
        res.status(404).send('Name is required!');
        return;
    }

    course.name = req.body.name;
    res.send(course);
});

app.get('/api/courses/:id', (req, res) => {
    // look up course 
    let course = courses.find(c => c.id === parseInt(req.params.id));
    if (!course) {
        res.status(404).send('The course with the given ID was not found');
        return;
    }

    res.send(course);
});

app.delete('/api/courses/:id', (req, res) => {
    // look up course 
    let course = courses.find(c => c.id === parseInt(req.params.id));
    if (!course) {
        res.status(404).send('The course with the given ID was not found');
        return;
    }

    // delete course
    let index = courses.indexOf(course);
    courses.splice(index, 1);

    res.send(course);

});

const port = process.env.PORT || 3000;

app.listen(port, () => console.log(`Listening on port ${port}`));  