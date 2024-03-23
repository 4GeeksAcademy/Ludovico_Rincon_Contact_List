const getState = ({ getStore, getActions, setStore }) => {
	return {
		store: {
			contacts: [] // Empty Array
		},
		actions: {
			// Use getActions to call a function within a fuction
			getContacts: () => {
				fetch('https://playground.4geeks.com/apis/fake/contact/agenda/LRN')
					.then(resp => {
						console.log("is response succesful: " + resp.ok); 
						console.log("status code: " + resp.status); 
						return resp.json(); // (returns promise) will try to parse the result as json as return a promise that you can .then for results
					})
					.then(data => {
						console.log(data); //this will print on the console the exact object received from the server
						setStore({ contacts: data })
						console.log(getStore().contacts)
					})
					.catch(error => {
						//error handling
						console.log(error);
					});
			},

			uploadContact: (objContact) => {
				fetch(`https://playground.4geeks.com/apis/fake/contact`, {
					method: "POST",
					headers: {
						"Content-Type": "application/json"
					},
					body: JSON.stringify(objContact)
				})
					.then(response => {
						console.log("uplaod response: ", response)
						console.log("uplaod JSON:", response.json())
						getActions().getContacts()
					})
					.catch(error => console.log(error))
			},

			editContact: (objContact) => {
				fetch(`https://playground.4geeks.com/apis/fake/contact/${objContact.id}`, {
					method: "PUT",
					headers: {
						"Content-Type": "application/json"
					},
					body: JSON.stringify(objContact)
				})
					.then(response => {
						console.log("uplaod response: ", response)
						console.log("uplaod JSON:", response.json())
						getActions().getContacts()
					})
					.catch(error => console.log(error))
			},

			deleteContact: (id) => {
				console.log("deleteID", id)
				fetch(`https://playground.4geeks.com/apis/fake/contact/${id}`, {
					method: "DELETE",
					headers: {
						"Content-Type": "application/json"
					}
				})
					.then(response => {
						console.log("uplaod response: ", response)
						console.log("uplaod JSON:", response.json())
						getActions().getContacts()
					})
					.catch(error => console.log(error))
			}

		} // End actions
	}; // End Return
}; // End Function getState

export default getState;
