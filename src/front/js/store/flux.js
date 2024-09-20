
const getState = ({ getStore, getActions, setStore }) => {
	return {
		store: {
			message: null,
			token: sessionStorage.getItem("token") || null,
			email: sessionStorage.getItem("email") || null
		},
		actions: {

			getMessage: async () => {
                try {
                    const response = await fetch(`${process.env.BACKEND_URL}/api/message`);
                    const data = await response.json();
                    setStore({ message: data.message });
                } catch (error) {
                    console.log("Error del backend", error);
                }
            },
			signUp: async (email, password, is_active) => {
				const store = getStore();
				try {
					const response = await fetch(`${process.env.BACKEND_URL}/api/registro`, {
						method: 'POST',
						body: JSON.stringify({ email, password, is_active }), 
						headers: { "Content-Type": "application/json" }
					});
			
					if (!response.ok) {
						const errorData = await response.json();
						console.log("Error en el registro", errorData);
						return false; 
					}
			
					const data = await response.json();
			
					if (data.access_token) {
						sessionStorage.setItem("token", data.access_token);
						sessionStorage.setItem("email", data.email);
						setStore({ ...store, token: data.access_token, email: data.email });
						return true;
					} else {
						console.log("Token no recibido", data);
						return false;
					}
				} catch (error) {
					console.log("Error en el registro", error);
					return false;
				}
			},
			
			logIn: async (email, password) => {
				const store = getStore();
				try {
					const response = await fetch(`${process.env.BACKEND_URL}/api/login`, {
						method: 'POST',
						body: JSON.stringify({ email, password }),
						headers: { "Content-Type": "application/json" }
					})
					const data = await response.json();
			
					if (data.token) {
						sessionStorage.setItem("token", data.token);
						sessionStorage.setItem("email", data.email);
						setStore({ ...store, token: data.token, email: data.email });
						return true;
					} else {
						console.log("Token no recibido", data);
						return false;
					}
				} catch (error) {
					console.log("Error del backend", error);
					return false; 
				}
			},
			logOut: () => {
				const store = getStore();
				sessionStorage.removeItem("token");
				setStore({ ...store, token: '', email: '' });
			}

		}
	};
};

export default getState;
