const userCtrl = require('../controllers/user.controller');
const router = require('express').Router();

// Route to render the user form
router.get("/userForm", (req, res) => {
    res.render("userForm");
});

// Route to render the about page
router.get("/about", (req, res) => {
    res.render("about");
});

// Route to render the blog page
router.get("/blog", (req, res) => {
    res.render("blog");
});


// New route to render the update user details page
router.get("/renderUpdateUserDetails/:id", userCtrl.renderUpdateUserDetails);


// Route to save user details
router.post("/saveUserDetails", userCtrl.saveUserDetails);

// Route to render user details page with ID
router.get("/userDetails", async (req, res) => {
    // try {
    //     const userId = req.query.id;
    //     if (!userId) {
    //         return res.status(400).send("User ID is required");
    //     }
    //     const user = await userCtrl.getUserDetails(userId);
    //     res.render("userDetails", { user });
    // } catch (error) {
    //     console.error("Error fetching user details:", error);
    //     res.status(500).send("Error fetching user details");
    // }
    res.render("userDetails");
});



// Route to view user details by ID
// router.get("/viewUserDetails/:id", userCtrl.viewUserDetails);

// Route to delete user details
router.delete("/deleteUserDetails/:id", userCtrl.deleteUserDetails); // New delete route

// Other existing routes...
router.get("/getUserDetails/:id", userCtrl.getUserDetails);
router.get("/getUserDetails", userCtrl.getUserDetails);
router.put("/updateUserDetails/:id", userCtrl.updateUserDetails);
router.get("/getAllUsers", userCtrl.getAllUsers);


module.exports = router;
