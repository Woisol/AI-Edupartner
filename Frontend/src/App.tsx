import { useState } from "react";
import Classmate from "./screens/classmate";
import { ToastContainer } from "react-toastify";

export default function App() {

	return (
		<>
			<Classmate />
			<ToastContainer />
		</>
	)
}