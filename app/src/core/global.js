import { create } from "zustand";
import secure from "./secure";
import api, { ADDRESS } from "./api";
import utils from "./utils";

//------------------------------------
//  Socket receive message handlers
//------------------------------------

function responseFriendList(set, get, friendList) {
  set((state) => ({
    friendList: friendList,
  }));
}

function responseRequestAccept(set, get, connection) {
  const user = get().user;
  // If I was the one that accepted the request, remove
  // request from the requestList
  if (user.username === connection.receiver.username) {
    const requestList = [...get().requestList];
    const requestIndex = requestList.findIndex(
      (request) => request.id === connection.id
    );
    if (requestIndex >= 0) {
      requestList.splice(requestIndex, 1);
      set((state) => ({
        requestList: requestList,
      }));
    }
  }
  // if the corresponding user is contained within the
  // searchList for the acceptor or the acceptee, update the state of the searchList item
  const sl = get().searchList;
  if (sl === null) {
    return;
  }
  const searchList = [...sl];

  let searchIndex = -1;

  // If this user accepted
  if (user.username === connection.receiver.username) {
    searchIndex = searchList.findIndex(
      (user) => user.username === connection.sender.username
    );
    // If the other user accepted
  } else {
    searchIndex = searchList.findIndex(
      (user) => user.username === connection.receiver.username
    );
  }
  if (searchIndex >= 0) {
    searchList[searchIndex].status = "connected";
    set((state) => ({
      searchList: searchList,
    }));
  }
}

function responseRequestConnect(set, get, connection) {
  const user = get().user;
  // If I was the one that made the connect request, update the search list row
  if (user.username === connection.sender.username) {
    const searchList = [...get().searchList];
    const searchIndex = searchList.findIndex(
      (request) => request.username === connection.receiver.username
    );
    if (searchIndex >= 0) {
      searchList[searchIndex].status = "pending-them";
      set((state) => ({
        searchList: searchList,
      }));
    }
    // If they were the one that sent the connect request, add request to request list
  } else {
    const requestList = [...get().requestList];
    const requestIndex = requestList.findIndex(
      (request) => request.sender.username === connection.sender.username
    );
    if (requestIndex === -1) {
      requestList.unshift(connection);
      set((state) => ({
        requestList: requestList,
      }));
    }
  }
}

function responseSearch(set, get, data) {
  set((state) => ({
    searchList: data,
  }));
}

function responseThumbnail(set, get, data) {
  set((state) => ({
    user: data,
  }));
}

function responseRequestList(set, get, requestList) {
  set((state) => ({
    requestList: requestList,
  }));
}

const useGlobal = create((set, get) => ({
  //------------------
  //  Initialization
  //------------------

  initialized: false,
  init: async () => {
    const credentials = await secure.get("credentials");
    if (credentials) {
      try {
        const response = await api({
          method: "POST",
          url: "/chat/signin/",
          data: {
            username: credentials.username,
            password: credentials.password,
          },
        });
        if (response.status !== 200) {
          throw "Authentication error!";
        }
        const user = response.data.user;
        const tokens = response.data.tokens;

        secure.set("tokens", tokens);

        set((state) => ({
          initialized: true,
          authenticated: true,
          user: user,
        }));
        return;
      } catch (error) {
        console.log("useGlobal.init: ", error);
      }
    }
    set((state) => ({
      initialized: true,
    }));
  },

  //------------------
  //  Authentication
  //------------------

  authenticated: true,
  user: {},

  login: (credentials, user, tokens) => {
    secure.set("credentials", credentials);
    secure.set("tokens", tokens);
    set((state) => ({
      authenticated: true,
      user: user,
    }));
    get().socketConnect();
  },

  logout: () => {
    secure.wipe();
    set((state) => ({
      authenticated: false,
      user: {},
    }));
  },

  //------------------
  //    Websocket
  //------------------

  socket: null,

  socketConnect: async () => {
    const tokens = await secure.get("tokens");

    const url = `ws://${ADDRESS}/chat/?token=${tokens.access}`;

    const socket = new WebSocket(url);

    socket.onopen = () => {
      utils.log("socket.onopen");

      socket.send(
        JSON.stringify({
          source: "request.list",
        })
      );

      socket.send(
        JSON.stringify({
          source: "friend.list",
        })
      );
    };

    socket.onmessage = (event) => {
      // Convert data to javascript object
      const parsed = JSON.parse(event.data);

      // Debug log formatted data
      utils.log("onmessage:", parsed);

      const responses = {
        "friend.list": responseFriendList,
        "request.accept": responseRequestAccept,
        "request.connect": responseRequestConnect,
        "request.list": responseRequestList,
        search: responseSearch,
        thumbnail: responseThumbnail,
      };

      const resp = responses[parsed.source];
      if (!resp) {
        utils.log("parsed.source: '" + parsed.source + "' not found");
        return;
      }
      // Call response function
      resp(set, get, parsed.data);
    };

    socket.onerror = (e) => {
      utils.log("socket.error", e.message);
    };

    socket.onclose = () => {
      utils.log("socket.onclose");
    };

    set((state) => ({
      socket: socket,
    }));
  },

  socketClose: () => {
    const socket = get().socket;
    if (socket) {
      socket.close();
    }
    set((state) => ({
      socket: null,
    }));
  },

  //------------------
  //  Search
  //------------------

  searchList: null,

  searchUsers: (query) => {
    if (query) {
      const socket = get().socket;
      socket.send(
        JSON.stringify({
          source: "search",
          query: query,
        })
      );
    } else {
      set((state) => ({
        searchList: null,
      }));
    }
  },

  //------------------
  //  Friends
  //------------------

  friendList: null,

  //------------------
  //  Requests
  //------------------

  requestList: null,

  requestConnect: (username) => {
    const socket = get().socket;
    socket.send(
      JSON.stringify({
        source: "request.connect",
        username: username,
      })
    );
  },

  requestAccept: (username) => {
    const socket = get().socket;
    socket.send(
      JSON.stringify({
        source: "request.accept",
        username: username,
      })
    );
  },

  //------------------
  //  Thumbnail
  //------------------

  uploadThumbnail: (file) => {
    const socket = get().socket;
    if (!socket || socket.readyState !== WebSocket.OPEN) {
      console.error("WebSocket не подключен");
      return;
    }
    socket.send(
      JSON.stringify({
        source: "thumbnail",
        base64: file.base64,
        filename: file.fileName,
      })
    );
  },
}));

export default useGlobal;
