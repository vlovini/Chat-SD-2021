const users = [];

// Function to join user to chat
function JoinChat(id, currentUser, room) {
    const user = { id, currentUser, room };
  
    users.push(user);
  
    return user;
  }
  
  // Function to get current user
  function getUser(id) {
    return users.find(user => user.id === id);
  }
  
  // User leaves chat
  function LeaveChat(id) {
    const index = users.findIndex(user => user.id === id);
  
    if (index !== -1) {
      return users.splice(index, 1)[0];
    }
  }
  
  // Function to get room users
  function getRoom(room) {
    return users.filter(user => user.room === room);
  }
  
  module.exports = {
    JoinChat,
    getUser,
    LeaveChat,
    getRoom
  };