const cleanClientObject = (client) => {
  const { _id, createdAt, updatedAt, __v, ...rest } = client; // Destructure and exclude unwanted fields
  return {
    id: _id, // Rename _id to id
    ...rest, // Include the remaining fields
  };
};

module.exports = {
  cleanClientObject,
};
