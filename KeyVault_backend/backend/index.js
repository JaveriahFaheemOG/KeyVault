const usersmodel = require('./models/users');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const AddressModel = require('./models/address');
const authenticateToken = require('./middleware');
const BankAccount = require('./models/bankaccount');
const Password = require('./models/password');
const Note = require('./models/notes');
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
app.use(express.json());
app.use(cors());

mongoose.connect('mongodb://localhost:27017/users');

app.post('/login', async (req, res) => {
    const { email, password } = req.body;

    try {
        // Find user by email
        const user = await usersmodel.findOne({ email: email });

        if (!user) {
            return res.json({ message: 'Invalid credentials' });
        }

        // Compare provided password with stored hashed password
        const isPasswordValid = await bcrypt.compare(password, user.password);

        if (!isPasswordValid) {
            return res.json({ message: 'Invalid credentials' });
        }

        // Successful login
        const token = jwt.sign(
            { userId: user._id, email: user.email },  // Payload
            process.env.JWT_SECRET_KEY,               // Secret key (you can store it in .env)
            { expiresIn: "1h" }                       // Token expiration time
        );

        // Send the token to the client
        res.json({ message: 'Login successful', token });

    } catch (error) {
        console.error(error);
        res.json({ message: 'Internal server error' });
    }
});
app.post('/validate-token', authenticateToken, (req, res) => {
    // If we reached this point, the token is valid
    res.status(200).json({ message: 'Token is valid', user: req.user });
  });


app.post('/', async (req, res) => {
        const { email, password } = req.body;
    
        try {
    
            // Check if the email already exists
            const existingUser = await usersmodel.findOne({ email });
            if (existingUser) {
                return res.json({ message: 'Email is already in use.' });
            }
    
            // Hash the password
            const hashedPassword = await bcrypt.hash(password, 10);
    
            // Create a new user with the hashed password
            const newUser = await usersmodel.create({
                email,
                password: hashedPassword,
            });
    
            // Respond with the newly created user (excluding the password for security)
            res.status(201).json({
                message: 'User registered successfully!',
            });
        } catch (err) {
            console.error(err);
            res.json({ error: 'Internal server error.' });
        }
    });
app.post('/addresses', authenticateToken, async (req, res) => {
        const { name, street, city, postalCode } = req.body;
        const userId = req.userId;  // Extracted userId from the JWT token in middleware
    
        try {
            // Create the new address linked to the user
            const newAddress = await AddressModel.create({
                userId,  // Link address to the authenticated user
                name,
                street,
                city,
                postalCode,
            });
    
            res.status(201).json({
                message: 'Address added successfully',
                address: newAddress,  // Return the created address as confirmation
            });
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Internal server error' });
        }
    });
    
    app.get('/addresses', authenticateToken, async (req, res) => {
        const userId = req.userId; // `userId` is attached by `authenticateToken`
    
        try {
            // Fetch addresses associated with the authenticated user
            const addresses = await AddressModel.find({ userId });
    
            // Respond with the addresses
            res.status(200).json({ addresses });
        } catch (error) {
            console.error('Error fetching addresses:', error);
            res.status(500).json({ message: 'Internal server error' });
        }
    });
    app.post('/accounts', authenticateToken, async (req, res) => {
        const { holder, number, bank } = req.body;
    
        // Validate request body
        if (!holder || !number || !bank) {
            return res.status(400).json({ message: 'All fields are required.' });
        }
    
        try {
            // Create a new bank account document
            const newAccount = new BankAccount({
                userId: req.userId, // Provided by authenticateToken
                holder,
                number,
                bank,
            });
    
            // Save to database
            const savedAccount = await newAccount.save();
    
            // Respond with the saved account
            res.status(201).json({ message: 'Account created successfully', account: savedAccount });
        } catch (error) {
            console.error('Error saving account:', error);
    
            // Handle duplicate account number error
            if (error.code === 11000) {
                return res.status(409).json({ message: 'Account number already exists.' });
            }
    
            res.status(500).json({ message: 'Internal server error' });
        }
    });

    app.get('/accounts', authenticateToken, async (req, res) => {
        try {
            // Find accounts associated with the logged-in user
            const accounts = await BankAccount.find({ userId: req.userId });
    
            // Respond with the list of accounts
            res.status(200).json({ accounts });
        } catch (error) {
            console.error('Error fetching accounts:', error);
            res.status(500).json({ message: 'Internal server error' });
        }
    });
    app.post('/passwords', authenticateToken, async (req, res) => {
        const { folder, url, name, username, password } = req.body;
    
        try {
            const newPassword = new Password({
                userId: req.userId,
                folder,
                url,
                name,
                username,
                password,
            });
    
            await newPassword.save();
    
            res.status(201).json({ message: 'Password saved successfully', password: newPassword });
        } catch (error) {
            console.error('Error saving password:', error);
            res.status(500).json({ message: 'Failed to save password', error: error.message });
        }
    });
    app.get('/passwords', authenticateToken, async (req, res) => {
        try {
            const passwords = await Password.find({ userId: req.userId });
            res.status(200).json({ message: 'Passwords fetched successfully', passwords });
        } catch (error) {
            console.error('Error fetching passwords:', error);
            res.status(500).json({ message: 'Failed to fetch passwords', error: error.message });
        }
    });

    app.post('/notes', authenticateToken, async (req, res) => {
        const { title, content } = req.body;
    
        try {
            const newNote = new Note({
                title,
                content,
                userId: req.userId,
            });
            await newNote.save();
            res.status(201).json({ note: newNote });
        } catch (error) {
            res.status(500).json({ error: 'Failed to save note' });
        }
    });
    
    // Get Notes Route (Only authenticated users can fetch their notes)
    app.get('/notes', authenticateToken, async (req, res) => {
        try {
            const notes = await Note.find({ userId: req.userId }); // Get notes for the authenticated user
            res.json({ notes });
        } catch (error) {
            res.status(500).json({ error: 'Failed to fetch notes' });
        }
    });
    app.get('/dashboard', authenticateToken, async (req, res) => {
        try {
            const userId = req.userId;
    
            // Fetch all data for the user
            const passwords = await Password.find({ user: userId });
            const notes = await Note.find({ user: userId });
            const addresses = await AddressModel.find({ user: userId });
            const bankAccounts = await BankAccount.find({ user: userId });
    
            // Send combined data in response
            res.status(200).json({
                passwords,
                notes,
                addresses,
                bankAccounts,
            });
        } catch (error) {
            console.error('Error fetching dashboard data:', error);
            res.status(500).json({ message: 'Failed to load dashboard data.' });
        }
    });
    app.post('/change-password', authenticateToken, async (req, res) => {
        const { currentPassword, newPassword } = req.body;
        const userId = req.userId; // User ID is added to the request after token verification
      
        try {
          const user = await usersmodel.findById(userId);
          if (!user) return res.status(404).json({ message: 'User not found' });
      
          // Check if the current password is correct
          const isMatch = await bcrypt.compare(currentPassword, user.password);
          if (!isMatch) 
        {
            return res.status(400).json({ message: 'Incorrect current password' })
        };
      
          // Hash the new password
          const hashedPassword = await bcrypt.hash(newPassword, 10);
          
          // Update the password
          user.password = hashedPassword;
          await user.save();
      
          res.status(200).json({ message: 'Password changed successfully' });
        } catch (err) {
          res.status(500).json({ message: 'Server error' });
        }
      });

      app.put('/passwords/:id', authenticateToken, async (req, res) => {
        const { id } = req.params;
        const { folder, url, name, username, password } = req.body;
    
        try {
            const updatedPassword = await Password.findByIdAndUpdate(
                id,
                { folder, url, name, username, password },
                { new: true } // Returns the updated document
            );
    
            if (!updatedPassword) {
                return res.status(404).json({ message: 'Password entry not found' });
            }
    
            res.json({ message: 'Password updated successfully', password: updatedPassword });
        } catch (error) {
            console.error('Error updating password:', error);
            res.status(500).json({ message: 'An error occurred while updating the password' });
        }
    });

    app.delete('/passwords/:id', authenticateToken, async (req, res) => {
        const { id } = req.params;
    
        try {
            const deletedPassword = await Password.findByIdAndDelete(id);
    
            if (!deletedPassword) {
                return res.status(404).json({ message: 'Password entry not found' });
            }
    
            res.json({ message: 'Password deleted successfully' });
        } catch (error) {
            console.error('Error deleting password:', error);
            res.status(500).json({ message: 'An error occurred while deleting the password' });
        }
    });

    app.put('/notes/:id', authenticateToken, async (req, res) => {
        const { title, content } = req.body;
        const { id } = req.params;
    
        if (!title || !content) {
            return res.status(400).json({ error: 'Title and content are required' });
        }
    
        try {
            const note = await Note.findById(id);
    
            if (!note) {
                return res.status(404).json({ error: 'Note not found' });
            }
    
            if (note.userId.toString() !== req.userId) {
                return res.status(403).json({ error: 'Not authorized to edit this note' });
            }
    
            note.title = title;
            note.content = content;
    
            const updatedNote = await note.save();
            res.json({ note: updatedNote });
        } catch (error) {
            res.status(500).json({ error: 'Error updating note' });
        }
    });
    
    // Delete a note (DELETE)
    app.delete('/notes/:id', authenticateToken, async (req, res) => {
        const { id } = req.params;
    
        try {
            const deletednote = await Note.findByIdAndDelete(id);
    
            if (!deletednote) {
                return res.status(404).json({ message: 'note entry not found' });
            }
    
            res.status(200).json({ message: 'note deleted successfully' });
        } catch (error) {
            console.error('Error deleting note:', error);
            res.status(500).json({ message: 'An error occurred while deleting the note' });
        }
    });

    app.put('/accounts/:id', authenticateToken, async (req, res) => {
        const { holder, number, bank } = req.body; // Get the new account data from the request body
        const accountId = req.params.id; // Get account ID from URL parameter
        
        try {
            // Find the account by ID and update it with the new data
            const updatedAccount = await BankAccount.findByIdAndUpdate(
                accountId,
                { holder, number, bank },
                { new: true } // Return the updated account
            );
    
            if (!updatedAccount) {
                return res.status(404).json({ message: 'Account not found' });
            }
    
            res.json({ account: updatedAccount }); // Return the updated account
        } catch (error) {
            console.error('Error updating account:', error);
            res.status(500).json({ message: 'Failed to update account' });
        }
    });
    
    // DELETE Route for deleting an account
    app.delete('/accounts/:id', authenticateToken, async (req, res) => {
        const accountId = req.params.id; // Get account ID from URL parameter
        
        try {
            // Find the account by ID and delete it
            const deletedAccount = await BankAccount.findByIdAndDelete(accountId);
    
            if (!deletedAccount) {
                return res.status(404).json({ message: 'Account not found' });
            }
    
            res.json({ message: 'Account deleted successfully' }); // Return success message
        } catch (error) {
            console.error('Error deleting account:', error);
            res.status(500).json({ message: 'Failed to delete account' });
        }
    });
app.listen(3001, () => {
    console.log('Server has started');
});

app.delete('/addresses/:id', authenticateToken, async (req, res) => {
    try {
        const { id } = req.params;
        const address = await AddressModel.findByIdAndDelete(id);

        if (!address) {
            return res.status(404).send('Address not found');
        }

        res.status(200).send({ message: 'Address deleted successfully' });
    } catch (error) {
        console.error('Error deleting address:', error);
        res.status(500).send('Failed to delete address');
    }
});

// PUT route for updating an address
app.put('/addresses/:id', authenticateToken, async (req, res) => {
    try {
        const { id } = req.params;
        const { name, street, city, postalCode } = req.body;

        // Ensure all fields are provided
        if (!name || !street || !city || !postalCode) {
            return res.status(400).send('All fields are required');
        }

        const updatedAddress = await AddressModel.findByIdAndUpdate(
            id,
            { name, street, city, postalCode },
            { new: true }
        );

        if (!updatedAddress) {
            return res.status(404).send('Address not found');
        }

        res.status(200).json({ address: updatedAddress });
    } catch (error) {
        console.error('Error updating address:', error);
        res.status(500).send('Failed to update address');
    }
});