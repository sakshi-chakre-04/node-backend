const userModel = require("../models/user.model");

// // Here:   inserting of data by use of defined schema->save
exports.save = async (Name,
  Age,
  Message,
  gender,
  email,
  contact,
  Status) => {

  const user = await new userModel({
    Name,
    Age,
    Message,
    gender,
    email,
    contact,
    Status
  }).save();

  return user;
}
//HERE:method to check if the existing user by email or contact
exports.checkUserExists = async (email, contact) => {
  return await userModel.findOne({ $or: [{ email }, { contact }] })
}
// HERE :get user by id
exports.getById = async (id) => {
  try {
    return await userModel.findById(id);
  } catch (error) {
    throw new Error("Error retrieving user data :" + error.message)
  }
}
// HERE: to get all users with pagination and search
exports.getAllUsers = async (page = 1, limit = 10, search, gender, Status) => {
  // Add search conditions
  let searchquery = {};
  if (search) {
    searchquery = {
      $or: [
        { Name: { $regex: search, $options: 'i' } },
        { Age: { $regex: search } },
        { email: { $regex: search, $options: 'i' } }
      ]
    };
  }

  // Add filter conditions
  let filterquery = {};
  if (gender) {
    filterquery.gender = gender;
  }
  if (Status) {
    filterquery.Status = Status;
  }

  const query = { ...searchquery, ...filterquery };
  const totalUsers = await userModel.countDocuments(query);
  const users = await userModel.find(query)
    .skip((page - 1) * limit)
    .limit(limit);


  return { users, totalUsers };
};

// HERE : implementation of search and filter with pagination
// New function for pagination, search, and filter
exports.getUsersWithPagination = async (page, limit, search, gender, Status) => {
  

  // Add search conditions
  let searchquery = {};
  if (search) {
    searchquery = {
      $or: [
        { Name: { $regex: search, $options: 'i' } },
        { Age: { $regex: search } },
        { email: { $regex: search, $options: 'i' } }
      ]
    };
  }

  // // Add filter conditions
  // let filterquery = {};
  // if (gender) {
  //   filterquery.gender = gender;
  // }
  // if (Status) {
  //   filterquery.Status = Status;
  // }
  // Add filter conditions
let filterquery = {};
if (gender) {
  filterquery.gender =   gender ; // Case insensitive
}
if (Status) {
  filterquery.Status = Status; // Case insensitive
}
const query={...searchquery,...filterquery};
  const totalUsers = await userModel.countDocuments(query);
  const users = await userModel.find(query)
    .skip((page - 1) * limit)
    .limit(limit)


  return { users, totalUsers };
};


// HERE :update user by id
exports.update = async (id, userData) => {
  //->check if existing user by email
  const existingEmailUser = await userModel.findOne({ email: userData.email, _id: { $ne: id } })
  if (existingEmailUser) {
    throw new Error("Email already exists.")
  }
  const existingContactUser = await userModel.findOne({ contact: userData.contact, _id: { $ne: id } })
  if (existingContactUser) {
    throw new Error("Contact already exists.")
  }

  try {
    return await userModel.findByIdAndUpdate(id, userData, { new: true })
  } catch (error) {
    throw new error("Error updating the user data : " + error.message)
  }
}
// HERE :delete user by id
exports.delete = async (id) => {
  try {
    return await userModel.findByIdAndDelete(id)
  } catch (error) {
    throw new error("Error deleting the user data : " + error.message)
  }
}

//HERE:Implementing search and filter functionality with pagination
exports.searchAndFilterUsers = async (query, page, limit) => {
  const { Name, Age, email, Status, gender } = query

}

exports.dummyService = async () => {
  return "This is Dummy Service";
};
