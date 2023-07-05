import { useState } from "react";
import axios from "axios";

const projectID = "b0b91708-981f-4bad-b6c1-406f49f59af5";

const Modal = () => {
	const [username, setUsername] = useState("");
	const [password, setPassword] = useState("");
	const [error, setError] = useState("");

	const handleSubmit = async (e) => {
		e.preventDefault();

		const authObject = {
			"Project-ID": projectID,
			"User-Name": username,
			"User-Secret": password,
		};

		try {
			await axios.get("https://api.chatengine.io/chats", {
				headers: authObject,
			});

			localStorage.setItem("username", username);
			localStorage.setItem("password", password);

			window.location.reload();
			setError("");
		} catch (err) {
			setError("Oops, incorrect credentials.");
		}
	};

	return (
		<div className="wrapper">
			<div className="form">
				<h1 className="title">Chat Application</h1>
				<p className="note">
					{" "}
					Note: I have 4 users currently created in this application. You can
					use any user to login except the admin! Here are some usernames you
					could try: Zack, Cindy & Dart. The password for all these users is:
					123123{" "}
				</p>
				<form onSubmit={handleSubmit}>
					<input
						type="text"
						value={username}
						onChange={(e) => setUsername(e.target.value)}
						className="input"
						placeholder="Username"
						required
					/>
					<input
						type="password"
						value={password}
						onChange={(e) => setPassword(e.target.value)}
						className="input"
						placeholder="Password"
						required
					/>
					<div align="center">
						<button type="submit" className="button">
							<span>Start chatting</span>
						</button>
					</div>
				</form>
				<h1>{error}</h1>
			</div>
		</div>
	);
};

export default Modal;
