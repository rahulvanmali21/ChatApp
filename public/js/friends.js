class Friends {
    friendRequestURL = '/friendsApi/request';
    friendactionURL = '/friendsApi/action';
    unfriendURL = '/friendsApi/remove'
    testUrl = '/friendsApi/test'
    searchUrl = '/search/'

    requested_id;
    constructor() { }
    setRequestedId(id) {
        this.requested_id = id;
    }
    Test() {
        $.post(this.testUrl, {
            hello: "hello"
        })
    }
    sendFriendRequest() {
        return fetch(this.friendRequestURL, {
            method: "POST",
            body: new URLSearchParams({ id: this.requested_id })
        })
            .then(response => response.json());
    }
    cancelFriendRequest() {
        return fetch(this.friendRequestURL, {
            method: "DELETE",
            body: new URLSearchParams({ id: this.requested_id })
        })
            .then(response => response.json());
    }
    acceptFriendRequest() {
        return fetch(this.friendactionURL, {
            method: "PUT",
            body: new URLSearchParams({ user: this.requested_id, action: "accepted" })
        })
            .then(response => response.json());
    }
    rejectFriendRequest() {
        return fetch(this.friendactionURL, {
            method: "PUT",
            body: new URLSearchParams({ user: this.requested_id, action: "rejected" })
        })
            .then(response => response.json());
    }
    unfriend() {
        return fetch(this.unfriendURL, {
            method: "DELETE",
            body: new URLSearchParams({ id: this.requested_id })
        })
    }
    getFriendRequestCount() {
        let url = this.friendRequestURL + "/count";
        return fetch(url, {
            method: "GET",
        })
            .then(response => response.json());
    }
    searchFriends(searchInput) {
        let url = this.searchUrl + searchInput;
        return fetch(url, {
            method: "GET",
        })
            .then(response => response.json());
    }
}