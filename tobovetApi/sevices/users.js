const db = require("./db");
const { checkNullish } = require("../utils/checkNullish");

// ------------------------------------------------------------ GETS

/**
 * @param {Object} arrayConditions  -- Object with the conditions to filter the query
 *                                 -- id: number
 * @returns {Object}                -- Object with the data from the query
 */
async function getUsers(arrayConditions = {}) {
  let query = `SELECT * FROM sys_users`;

  const data = await db.query(query);
  
  return data.map(({ user_id, user_name, user_full_name, user_document }) => ({
    id: user_id,
    name: user_name,
    fullName: user_full_name,
    document: user_document,
  }));
}

async function getUserById(id) {
  let query = {
    sql: "SELECT * FROM sys_users WHERE user_id=?",
    params: [id],
  };
  const data = await db.query(query.sql, query.params);

  if (!data.length) throw new Error("User not found");

  return data.map(({ user_id, user_name, user_full_name, user_document }) => ({
    id: user_id,
    name: user_name,
    fullName: user_full_name,
    document: user_document,
  }))[0];
}

// ------------------------------------------------------------ CREATES
async function createUser(user) {
  let query = {
    sql: "INSERT INTO sys_users (user_name, user_email, user_tlf, user_document, user_state, user_registration, user_password, user_photo) VALUES (?, ?, ?, ?, ?, NOW(), ?, ?)",
    params: [
      checkNullish(user.name),
      checkNullish(user.email),
      checkNullish(user.telephone),
      checkNullish(user.document),
      checkNullish(user.state),
      checkNullish(user.password),
      checkNullish(user.photo),
    ],
  };

  const result = await db.query(query.sql, query.params);

  let message = "Error in creating user";

  if (result.affectedRows) {
    message = "User created successfully";
  }

  return { message };
}

// ------------------------------------------------------------ UPDATES
async function updateUser(id, user) {
  let query = {
    sql: `UPDATE sys_users SET user_name=?, user_email=?, user_tlf=?, user_document=?, user_state=?, user_password=? WHERE user_id=?`,
    params: [
      checkNullish(user.name),
      checkNullish(user.email),
      checkNullish(user.telephone),
      checkNullish(user.document),
      checkNullish(user.state),
      checkNullish(user.password),
      checkNullish(id),
    ],
  };
  const result = await db.query(query.sql, query.params);

  let message = "Error in updating user";

  if (result.affectedRows) {
    message = "User updated successfully";
  }

  return { message };
}

async function updateUserPhoto(id, photo) {
  let query = {
    sql: `UPDATE sys_users SET user_photo=? WHERE user_id=?`,
    params: [checkNullish(photo), checkNullish(id)],
  };

  const result = await db.query(query.sql, query.params);

  let message = "Error in updating user photo";

  if (result.affectedRows) {
    message = "User photo updated successfully";
  }

  return { message };
}

// ------------------------------------------------------------ DELETES
async function deleteUser(id) {
  let query = {
    sql: `DELETE FROM sys_users WHERE user_id=?`,
    params: [checkNullish(id)],
  };
  const result = await db.query(query.sql, query.params);

  let message = "Error in deleting user";

  if (result.affectedRows) {
    message = "User deleted successfully";
  }

  return { message };
}

module.exports = {
  get: getUsers,
  getById: getUserById,
  create: createUser,
  update: updateUser,
  delete: deleteUser,
  updatePhoto: updateUserPhoto,
};
