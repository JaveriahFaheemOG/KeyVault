const mongoose = require('mongoose');

// Define the Address schema
const AddressSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId, // Reference to the user
        ref: 'users',                         // Referencing the 'users' model
        required: true,                       // Ensure each address is linked to a user
    },
    name: {
        type: String,
        required: true,  // Ensure the address has a name (could be a label like 'Home', 'Office')
    },
    street: {
        type: String,
        required: true,  // Ensure the address has a street
    },
    city: {
        type: String,
        required: true,  // Ensure the address has a city
    },
    postalCode: {
        type: String,
        required: true,  // Ensure the address has a postal code
    },
    createdAt: {
        type: Date,
        default: Date.now,  // Timestamp of when the address was created
    },
});

// Create the model for Address
const AddressModel = mongoose.model('addresses', AddressSchema);

// Export the model to use in other files
module.exports = AddressModel;