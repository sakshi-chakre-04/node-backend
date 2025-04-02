const userModel = require("../models/user.model");
const userService = require("../services/user.service");
const moment = require("moment-timezone");

// Function to save user details
exports.saveUserDetails = async (req, res) => {
    const { Name, Age, Message, gender, email, contact, Status } = req.body; 
    try {
        const savedUser = await userService.save(Name, Age, Message, gender, email, contact, Status);
        // Fetch the saved user details
        const userDetails = await userModel.findById(savedUser._id);
           // Redirect to userDetails page after saving with success message
           res.render("userDetails", { 
               user: userDetails,
               successMessage: "Data added successfully!" // Ensure successMessage is defined
           });





    } catch (error) {
        res.status(500).json({ message: "Error saving user details", error });
    }
};

// Function to render the user form
exports.renderUserForm = (req, res) => {
    res.render("userForm");
};

// New function to render the update user details page
exports.renderUpdateUserDetails = async (req, res) => {
    const userId = req.params.id;
    try {
        const user = await userModel.findById(userId);
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        res.render("updateUserDetails", { user });
    } catch (error) {
        res.status(500).json({ message: "Error retrieving user details", error });
    }
};

// Function to get user details with pagination
exports.getUserDetails = async (req, res) => {
    const { page = 1, limit = 10, search, gender, Status } = req.query;
    
    try {
        const { users, totalUsers } = await userService.getUsersWithPagination(
            Number(page),
            Number(limit),
            search,
            gender,
            Status
        );

        res.status(200).json({
            users,
            totalPages: Math.ceil(totalUsers / limit),
            currentPage: Number(page),
            totalUsers
        });
    } catch (error) {
        res.status(500).json({ message: "Error retrieving user details", error });
    }
};



// Function to get all users
exports.getAllUsers = async (req, res) => {
    try {
        const users = await userModel.find();
        res.status(200).json(users);
    } catch (error) {
        res.status(500).json({ message: "Error retrieving users", error });
    }
};

// Function to update user details
exports.updateUserDetails = async (req, res) => {
    const userId = req.params.id;
    const userData = req.body;
    try {
        const updatedUser = await userModel.findByIdAndUpdate(userId, userData, { new: true });
        if (!updatedUser) {
            return res.status(404).json({ message: "User not found" });
        }
        console.log("Updating user with ID:", userId);
        if (!updatedUser) {
            return res.status(404).json({ message: "User not found for update." });
        }
        
        console.log("User data:", userData);
           // Redirect to userDetails page with success message
           
           res.render("userDetails", {
               user: updatedUser,
               
               successMessage: "Data Updated Successfully!" // Ensure successMessage is defined
           });




    } catch (error) {
        res.status(500).json({ message: "Error updating user details", error });
    }
};

// Function to delete user details
exports.deleteUserDetails = async (req, res) => {
    const userId = req.params.id;
    try {
        const deletedUser = await userModel.findByIdAndDelete(userId);
        if (!deletedUser) {
            return res.status(404).json({ message: "User not found" });
        }
        res.status(204).send();
    } catch (error) {
        res.status(500).json({ message: "Error deleting user details", error });
    }
};

// Function to get user details without ID
exports.getuser = async (req, res) => {
  // Implement logic as needed
};
