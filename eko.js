// task 1

function normalizeReceivedData(receivedData) {
  const users = receivedData.users;
  const messages = receivedData.messages;

  return messages.map(message => ({
    messageText: message.text,
    userFromName: users.find(user => user.id === message.userId).name,
    userToName: users.find(user => user.id === message.receiverId).name,
  }));
}

// task 1 bonus

function normalizeReceivedData(receivedData) {
  const users = receivedData.users;
  const messages = receivedData.messages;

  const userIdToUserNameMap = {};

  function getUserNameById(userId) {
    if (!userIdToUserNameMap[userId]) {
      userIdToUserNameMap[userId] = users.find(user => user.id === userId).name;
    }

    return userIdToUserNameMap[userId];
  }

  return messages.map(message => ({
    messageText: message.text,
    userFromName: getUserNameById(message.userId),
    userToName: getUserNameById(message.receiverId),
  }));
}

// In theory if we have millions of messages we can reuse message objects by removing unnecessary fields and
// adding fields that we want (messageText, userFromName, userToName). In order no not create another millions
// of objects in a heap. But I am not sure if it results in real perfomance profit.

// task 2

function equalShiftsAmount(input) {
  let amount = 0;
  let prevShiftedInput = input;

  for (let i = 0; i < input.length; i++) {
    const newShiftedInput = prevShiftedInput[prevShiftedInput.length - 1]
      + prevShiftedInput.substring(0, prevShiftedInput.length - 1);

    if (newShiftedInput === input) {
      amount++;
    }

    prevShiftedInput = newShiftedInput;
  }

  return amount;
}


// task 3
function sumLinkedList(l1, l2) {
  function getNumber(listNode) {
    let str = '';
    let currentListNode = listNode;

    while (currentListNode !== null) {
      str = `${currentListNode.val}${str}`;

      currentListNode = currentListNode.next;
    }

    return Number.parseInt(str, 10);
  }

  function getList(number) {
    let node;

    String(number).split('').forEach(digit => {
      const newNode = new ListNode(Number.parseInt(digit, 10));

      if (node) {
        newNode.next = node;
        node = newNode;
      } else {
        node = newNode;
      }
    });

    return node;
  }

  return getList(getNumber(l1) + getNumber(l2));
}
