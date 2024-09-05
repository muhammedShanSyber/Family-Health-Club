/* eslint-disable no-undef */
require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const cors = require('cors');
const jwt = require('jsonwebtoken');
const jwtSecretKey = 'b5e9ed1a49a01f1a';
const bcrypt = require('bcrypt');
// const nodemailer = require('nodemailer');

const app = express();
const PORT = 3002;

mongoose.connect('mongodb://localhost:27017/thefamilyhub');
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

// const somedataSchema = new mongoose.Schema({
//     name: String,
//     email: String,
//     password: String,
//     age: Number,
//     gender: String,
//     fmembers: [{
//         name: String,
//         age: Number,
//         email: String
//     }]
// })
const userSchema = new mongoose.Schema({
    name: String,
    email: String,
    password: String,
    age: Number,
    gender: String,
    fmembers: [{
        name: String,
        age: Number,
        email: String,
        gender: String,
        bloodgroup: String
    }]
});

const adSchema = new mongoose.Schema({
    username: String,
    password: String
});
const docSchema = new mongoose.Schema({
    email: { type: String, unique: true },
    password: String,
    name: String,
    age: Number,
    gender: String,
    hospital: String,
    specialization: String,
    paymentupi: String,
    image: String
})
const feedSchema = new mongoose.Schema({
    heading: { type: String, unique: true },
    description: String,
    time: String,
    date: String
});
const ticketSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    member: String,
    doctor: String,
    doctorId: String,
    subject: String,
    remarks: String
});

const Feed = mongoose.model('Feed', feedSchema);
const User = mongoose.model('User', userSchema);
const Admin = mongoose.model('Admin', adSchema);
const Doc = mongoose.model('Doc', docSchema);
const Ticket = mongoose.model('Ticket', ticketSchema);
// const Somedata = mongoose.model('Somedata', somedataSchema)

app.use(cors());
app.use(bodyParser.json());

// Middleware to log requests
app.use((req, res, next) => {
    console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`);
    next();
});

// Middleware for handling errors
// eslint-disable-next-line no-unused-vars
app.use((err, req, res, next) => { // Added 'next' parameter
    console.error(err.stack);
    res.status(500).send('Something broke!');
});


// const transporter = nodemailer.createTransport({
//     host: 'smtp.google.com',
//     port: 587,
//     secure: false, // true for 465, false for other ports
//     auth: {
//         user: 'demo88510@gmail.com',
//         pass: '123@abcd',
//     },
// });

// Route to handle sending emails
app.post('/sendemail', async (req, res) => {
    const { content } = req.body;

    try {
        // eslint-disable-next-line no-undef
        await transporter.sendMail({
            from: 'demo88510@gmail.com',
            to: 'recipient@example.com',
            subject: 'Urgent Visit',
            html: `<p>${content}</p>`,
        });
        console.log('Email sent successfully');
        res.sendStatus(200);
    } catch (error) {
        console.error('Error sending email:', error);
        res.sendStatus(500);
    }
});

app.get('/feed', async (req, res) => {
    try {
        // Fetch feed items from the database
        const feedItems = await Feed.find({}, { _id: 1, heading: 1, description: 1, time: 1, date: 1 });

        // Log the fetched feed items
        console.log('Fetched feed items:', feedItems);
        res.status(200).json({ feedItems });
    } catch (error) {
        console.error('Error fetching feed:', error);
        res.status(500).send('Error fetching feed');
    }
});

app.post('/feed', async (req, res) => {
    const { heading, description, time, date } = req.body;

    try {
        const newFeedItem = new Feed({ heading, description, time, date });
        await newFeedItem.save();

        console.log('New feed item added:', newFeedItem);
        res.status(200).send('New feed item added successfully');
    } catch (error) {
        console.error('Error adding feed item:', error);
        res.status(500).send('Error adding feed item');
    }
});

app.delete('/feed/:id', async (req, res) => {
    const { id } = req.params;

    try {
        const deleteFeed = await Feed.findByIdAndDelete(id);
        if (!deleteFeed) {
            console.log(`Feed with ID ${id} not found`);
            return res.status(404).send('Feed not found');
        }

        console.log(`Feed with ID ${id} deleted successfully`);
        res.status(200).send('Feed deleted successfully');
    } catch (error) {
        console.error('Error deleting Feed:', error);
        res.status(500).send('Error deleting Feed');
    }
});

app.put('/feed/:id', async (req, res) => {
    const { id } = req.params;
    const { heading, description } = req.body;
    try {
        const updatedFeed = await Feed.findByIdAndUpdate(id, { heading, description }, { new: true });
        res.json(updatedFeed);
    } catch (error) {
        console.error('Error updating feed item:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

app.post('/register', async (req, res) => {
    const { name, email, password, age, gender } = req.body;
    try {
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ error: 'User already exists' });
        }


        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = new User({ name, email, password: hashedPassword, age, gender, fmembers: [] });
        console.log(newUser);
        await newUser.save()
        // .then(res => { res.status(200)})


        res.status(201).json({ message: 'User registered successfully' });
    } catch (error) {
        console.error('Error saving user:', error);
        return res.status(500).json({ error: error.message });
    }
});

app.post('/login', async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await User.findOne({ email });

        if (!user) {
            return res.status(401).json({ error: 'Invalid credentials' });
        }

        const passwordMatch = await bcrypt.compare(password, user.password);

        if (!passwordMatch) {
            return res.status(401).json({ error: 'Invalid credentials' });
        }

        const token = jwt.sign({ userId: user._id, email: user.email, name: user.name }, jwtSecretKey);
        res.json({ token, name: user.name, userId: user._id });
    } catch (error) {
        console.error('Error logging in:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

app.get('/fmembers', async (req, res) => {
    const _id = req.query._id;
    try {
        console.log(_id)
        console.log('Request received to fetch family members');
        const users = await User.findById(_id);
        console.log(users)
        res.status(200).json(users);
    } catch (error) {
        console.error('Error fetching family members:', error);
        res.status(500).send('Error fetching family members');
    }
});

app.post('/fmembers', async (req, res) => {
    const { userId, name, age, email, gender, bloodgroup } = req.body;

    try {
        const user = await User.findById(userId);

        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }
        // const isDuplicateEmail = user.fmembers.some(member => member.email === email);
        // if (isDuplicateEmail) {
        //     return res.status(400).json({ error: 'Duplicate email address' });
        // }

        // Add the new family member to the user's fmembers array
        user.fmembers.push({ name, age, email, gender, bloodgroup });

        await user.save();

        res.status(201).json({ message: 'Family member added successfully' });
    } catch (error) {
        console.error('Error adding family member:', error);
        res.status(500).json({ error: 'Error adding family member' });
    }
});

app.get('/fielddoctors', async (req, res) => {
    const { field } = req.query;
    try {
        if (!field) {
            return res.status(400).json({ error: 'Doctor field parameter is required' });
        }

        const doctors = await Doc.find({ specialization: field }, { _id: 1, email: 1, name: 1 });
        res.status(200).json(doctors);
    } catch (error) {
        console.error('Error fetching doctors:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});


app.post('/tickets', async (req, res) => {
    const { userId, member, doctor, doctorId, subject, remarks } = req.body;

    try {
        const newTicket = new Ticket({ userId, member, doctor, doctorId, subject, remarks });
        await newTicket.save();

        res.status(201).json(newTicket);
    } catch (error) {
        console.error('Error saving ticket:', error);
        res.status(500).json({ error: 'Error saving ticket' });
    }
});

app.get('/tickets', async (req, res) => {
    const userId = req.query.userId;
    try {
        if (!userId) {
            return res.status(400).json({ error: 'User ID is missing' });
        }
        const tickets = await Ticket.find({ userId });
        console.log(tickets)
        res.status(200).json(tickets);
    } catch (error) {
        console.error('Error fetching tickets:', error);
        res.status(500).json({ error: 'Error fetching tickets' });
    }
});

app.delete('/tickets/:id', async (req, res) => {
    const ticketId = req.params.id;
    try {
        const userId = req.body.yourId;
        if (!userId) {
            return res.status(400).json({ error: 'USER ID IS MISSING' });
        }

        const deletedTicket = await Ticket.findOneAndDelete({ _id: ticketId, userId });

        if (!deletedTicket) {
            return res.status(404).json({ error: 'Ticket not found' });
        }

        res.status(200).json({ message: 'Ticket cancelled successfully' });
    } catch (error) {
        console.error('Error cancelling ticket:', error);
        res.status(500).json({ error: 'Error cancelling ticket' });
    }
});

app.get('/appointments', async (req, res) => {
    const doctorId = req.query.doctorId;
    try {
        if (!doctorId) {
            return res.status(400).json({ error: 'Doctor name is missing' });
        }

        const tickets = await Ticket.find({ doctorId });
        res.status(200).json(tickets);
    } catch (error) {
        console.error('Error fetching appointments:', error);
        res.status(500).json({ error: 'Error fetching appointments' });
    }
});


app.post('/logout', (req, res) => {
    res.status(200).json({ message: 'Logout successful' });
});

// Middleware to verify JWT token
function verifyToken(req, res, next) {
    // const token = req.headers.authorization;
    const authHeader = req.headers.authorization;

    if (!authHeader) {
        return res.status(401).json({ error: 'Unauthorized' });
    }

    //     if (!token) {
    //         return res.status(401).json({ error: 'Unauthorized' });
    //     }

    //     jwt.verify(token, jwtSecretKey, (err, decoded) => {
    //         if (err) {
    //             console.error('Error verifying token:', err);
    //             return res.status(401).json({ error: 'Unauthorized' });
    //         }
    //         req.user = decoded;
    //         next();
    //     });
    // }
    const token = authHeader.split(' ')[1]; // Extract the token
    jwt.verify(token, jwtSecretKey, (err, decoded) => {
        if (err) {
            console.error('Error verifying token:', err);
            return res.status(401).json({ error: 'Unauthorized' });
        }
        req.user = decoded;
        next();
    });
}

// Protected route example
app.get('/protected', verifyToken, (req, res) => {
    res.json({ message: 'This is protected data!' });
});

// Doctor 
app.post('/doclogin', async (req, res) => {
    const { email, password } = req.body;

    try {
        const doctor = await Doc.findOne({ email });

        if (!doctor) {
            return res.status(401).json({ error: 'Invalid credentials' });
        }

        const passwordMatch = await bcrypt.compare(password, doctor.password);

        if (!passwordMatch) {
            return res.status(401).json({ error: 'Invalid credentials' });
        }


        res.json({ name: doctor.name, id: doctor._id });
    } catch (error) {
        console.error('Error logging in:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

//Admin
app.post('/adlogin', async (req, res) => {
    const { username, password } = req.body;

    try {
        const user_name = await Admin.findOne({ username });

        if (!user_name) {
            return res.status(401).json({ error: 'Invalid credentials' });
        }

        if (user_name.password !== password) {
            return res.status(401).json({ error: 'Invalid credentials' });
        }
        // Login successful
        console.log(`Admin with username ${username} logged in successfully`);
        res.status(200).send('Admin Login successful');

    } catch (error) {
        console.error('Error logging in:', error);
        return res.status(500).send('Error logging in');
    }
});

app.get('/totalDoctors', async (req, res) => {
    try {
        const totalDoctors = await Doc.countDocuments();
        res.status(200).json({ totalDoctors });
    } catch (error) {
        console.error('Error fetching total doctors:', error);
        res.status(500).json({ error: 'Error fetching total doctors' });
    }
});

app.get('/totalUsers', async (req, res) => {
    try {
        const totalUsers = await User.countDocuments();
        res.status(200).json({ totalUsers });
    } catch (error) {
        console.error('Error fetching total users:', error);
        res.status(500).json({ error: 'Error fetching total users' });
    }
});

app.delete('/doctors/:id', async (req, res) => {
    const { id } = req.params;

    try {
        const deletedDoctor = await Doc.findByIdAndDelete(id);
        if (!deletedDoctor) {
            console.log(`Doctor with ID ${id} not found`);
            return res.status(404).send('Doctor not found');
        }

        console.log(`Doctor with ID ${id} deleted successfully`);
        res.status(200).send('Doctor deleted successfully');
    } catch (error) {
        console.error('Error deleting doctor:', error);
        res.status(500).send('Error deleting doctor');
    }
});

app.get('/doctors', async (req, res) => {
    try {
        // Fetch doctors from the database
        const doctors = await Doc.find({}, { _id: 1, email: 1, name: 1, specialization: 1, age: 1, gender: 1, hospital: 1, paymentupi: 1, image: 1 });
        res.status(200).json(doctors);
    } catch (error) {
        console.error('Error fetching doctors:', error);
        res.status(500).send('Error fetching doctors');
    }
});
// Route to update the paymentupi of a doctor
app.put('/doctors/:id/', async (req, res) => {
    const { id } = req.params;
    console.log(id);
    const { paymentupi } = req.body;
    console.log(paymentupi)

    try {
        const updatedDoctor = await Doc.findByIdAndUpdate(id, { paymentupi }, { new: true });

        if (!updatedDoctor) {
            return res.status(404).json({ message: 'Doctor not found' });
        }

        res.status(200).json(updatedDoctor);
    } catch (error) {
        console.error('Error updating paymentupi for doctor:', error);
        res.status(500).send('Error updating paymentupi for doctor');
    }
});

app.post('/addDoctor', async (req, res) => {
    const { name, email, password, age, gender, hospital, paymentupi, specialization, image } = req.body;
    console.log('Received data:', name, email, password, age, gender, hospital, paymentupi, specialization, image);

    try {
        const existingDoctor = await Doc.findOne({ email });
        if (existingDoctor) {
            console.log(`Doctor with  email ${email} already exists`);
            return res.status(400).json({ error: 'Doctor with that email already exists' });
        }

        const dochashedPassword = await bcrypt.hash(password, 10);
        const newDoctor = new Doc({ name, email, password: dochashedPassword, age, gender, hospital, paymentupi, specialization, image });
        await newDoctor.save();

        console.log(`Doctor with name ${name} , email ${email} ${paymentupi} and specialization : ${specialization} added successfully`);
        res.status(200).json({ message: 'Doctor added successfully' });
    } catch (error) {
        console.error('Error adding doctor:', error);
        return res.status(500).send('Error adding doctor');
    }
});

app.delete('/users/:id', async (req, res) => {
    const { id } = req.params;

    try {
        const deletedUser = await User.findByIdAndDelete(id);
        if (!deletedUser) {
            console.log(`User with ID ${id} not found`);
            return res.status(404).send('User not found');
        }

        console.log(`User with ID ${id} deleted successfully`);
        res.status(200).send('User deleted successfully');
    } catch (error) {
        console.error('Error deleting doctor:', error);
        res.status(500).send('Error deleting User');
    }
});


app.get('/users', async (req, res) => {
    try {
        const users = await User.find({}, { _id: 1, email: 1, name: 1, age: 1, fmembers: 1 });
        res.status(200).json({ users });
    } catch (error) {
        console.error('Error fetching users:', error);
        res.status(500).send('Error fetching users');
    }
});

app.get('/user', async (req, res) => {
    const _id = req.query._id;
    console.log(_id);
    try {
        const user = await User.findById(_id);
        res.status(200).json({ user });
    } catch (error) {
        console.error('Error fetching users:', error);
        res.status(500).json({ error: 'Error fetching users' });
    }
});

app.get('/doc', async (req, res) => {
    const _id = req.query._id;
    console.log(_id);
    try {
        const user = await Doc.findById(_id);
        res.status(200).json({ user });
    } catch (error) {
        console.error('Error fetching users:', error);
        res.status(500).json({ error: 'Error fetching users' });
    }
});

app.post('/addUser', async (req, res) => {
    const { name, email, password, age } = req.body;
    console.log('Received data:', name, email, password, age);

    try {
        // Check if a doctor with the provided email already exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            console.log(`User with  email ${email} already exists`);
            return res.status(400).send('User with that email already exists');
        }

        // If doctor doesn't exist, create and save the new doctor
        const newUser = new User({ name, email, password, age });
        await newUser.save();

        // Doctor added successfully
        console.log(`User with name ${name} and email ${email} added successfully`);
        res.status(200).send('User added successfully');
    } catch (error) {
        console.error('Error adding user', error);
        return res.status(500).send('Error adding user');
    }
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});