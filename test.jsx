import React, { useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import axios from "axios";
import { ImSpinner2 } from "react-icons/im";
import { useSetRecoilState } from "recoil";
import { tokenState } from "@/store/auth";

const UserLogin = () => {
	const [email, setEmail] = useState("");
	const [fullName, setFullName] = useState("");
	const [showPassword, setShowPassword] = useState(false);
	const [password, setPassword] = useState("");
	const [otp, setOtp] = useState("");
	const [isOtpSent, setIsOtpSent] = useState(false);
	const [loading, setLoading] = useState(false);
	const [verifyLoading, setVerifyLoading] = useState(false);
	const [activeTab, setActiveTab] = useState("login");
	const [timer, setTimer] = useState(300);
	const [timerRunning, setTimerRunning] = useState(false);
	const [agreeTerms, setAgreeTerms] = useState(false);
	const [showTermsModal, setShowTermsModal] = useState(false);
	
	const navigate = useNavigate();
	const setTokenState = useSetRecoilState(tokenState);

	const togglePasswordVisibility = () => setShowPassword(!showPassword);

	const handleLogin = async (e) => {
		e.preventDefault();
		setLoading(true);
		if (!email || !password) return toast.error("All fields are required");
		try {
			const res = await axios.post(`${import.meta.env.VITE_BASE_URL}/api/user/login`, { email, password });
			if (res.status === 200) {
				toast.success(res.data.message);
				setTokenState(res.data?.token);
				localStorage.setItem("token", res.data?.token || "");
				localStorage.setItem("user", JSON.stringify(res.data?.user));
				navigate("/dashboard");
			}
		} catch (err) {
			toast.error("Invalid email or password");
		} finally {
			setLoading(false);
		}
	};

	const handleSignup = async (e) => {
		e.preventDefault();
		setLoading(true);
		if (!fullName || !email || !password) return toast.error("All fields are required");
		try {
			const res = await axios.post(`${import.meta.env.VITE_BASE_URL}/api/user/register`, {
				fullName,
				email,
				password,
			});
			if (res.status === 200) {
				setIsOtpSent(true);
				toast.success(res.data.message);
				startTimer();
			}
		} catch (err) {
			toast.error(err.response?.data?.message || "Server Error");
		} finally {
			setLoading(false);
		}
	};

	const startTimer = () => {
		setTimerRunning(true);
		const intervalId = setInterval(() => {
			setTimer((prev) => {
				if (prev === 1) {
					clearInterval(intervalId);
					setTimerRunning(false);
				}
				return prev - 1;
			});
		}, 1000);
	};

	const handleVerifyOtp = async (e) => {
		e.preventDefault();
		setVerifyLoading(true);
		try {
			const res = await axios.post(`${import.meta.env.VITE_BASE_URL}/api/user/verify-otp`, {
				email,
				enteredOTP: otp,
				fullName,
				password,
			});
			if (res.status === 200) {
				toast.success(res.data.message);
				setActiveTab("login");
			}
		} catch (err) {
			toast.error("Failed to verify OTP");
		} finally {
			setVerifyLoading(false);
		}
	};

	useEffect(() => {
		window.scrollTo(0, 0);
		document.title = "JOBIFY | USER LOGIN / SIGNUP";
	}, []);

	return (
		<form
			className="justify-center min-h-[80vh] flex items-center flex-col"
			onSubmit={(e) => {
				e.preventDefault();
				const activeTab = document.querySelector("[data-state='active']").textContent;
				if (activeTab === "Login") handleLogin(e);
				else if (activeTab === "Sign Up") handleSignup(e);
			}}
		>
			<Tabs value={activeTab} onValueChange={setActiveTab} className="w-[400px]">
				<TabsList className="grid w-full grid-cols-2">
					<TabsTrigger value="login">Login</TabsTrigger>
					<TabsTrigger value="signup">Sign Up</TabsTrigger>
				</TabsList>

				<TabsContent value="login">
					<Card
						style={{
							backgroundColor: `var(--background-color)`,
							color: `var(--text-color)`,
							borderColor: `var(--borderColor)`,
						}}
					>
						<CardHeader>
							<CardTitle className="font-bold">
								Welcome <span className="text-primary">User</span>
							</CardTitle>
							<CardDescription>
								Ready to shape your future? Let's build your career together.
							</CardDescription>
						</CardHeader>
						<CardContent className="space-y-2">
							<div className="space-y-1">
								<Label htmlFor="email">Email</Label>
								<Input
									type="email"
									className="inputField"
									placeholder="Enter Your Email"
									value={email}
									onChange={(e) => setEmail(e.target.value)}
									required
								/>
							</div>
							<div className="space-y-1">
								<Label htmlFor="password">Password</Label>
								<div className="w-full relative">
									<Input
										type={showPassword ? "text" : "password"}
										placeholder="Enter Your Password"
										value={password}
										onChange={(e) => setPassword(e.target.value)}
										className="w-full pr-10 inputField"
										required
									/>
									{showPassword ? (
										<FaEye
											onClick={togglePasswordVisibility}
											className="absolute right-2 top-3 cursor-pointer text-sm"
										/>
									) : (
										<FaEyeSlash
											onClick={togglePasswordVisibility}
											className="absolute right-2 top-3 cursor-pointer text-sm"
										/>
									)}
								</div>
							</div>
						</CardContent>
						<CardFooter>
							<Button className="w-full" disabled={loading} type="submit">
								{loading ? (
									<div className="flex flex-row gap-2 items-center">
										<ImSpinner2 className="animate-spin" /> Logging you in
									</div>
								) : (
									"Login"
								)}
							</Button>
						</CardFooter>

						<CardFooter>
							<div className="flex items-center w-full">
								<div className="flex-grow border-t border-primary" />
								<span className="mx-4 text-sm">or</span>
								<div className="flex-grow border-t border-primary" />
							</div>
						</CardFooter>

						<CardFooter>
							<div className="w-full text-center -mt-2">
								<Link
									to="/companylogin"
									className="text-primary hover:underline text-sm"
								>
									Login as a company
								</Link>
							</div>
						</CardFooter>
					</Card>
				</TabsContent>

				<TabsContent value="signup">
					<Card>
						<CardHeader>
							<CardTitle className="font-bold">
								Join <span className="text-primary">JOBIFY</span>
							</CardTitle>
							<CardDescription>
								Start building your future today. Create your personalized career journey.
							</CardDescription>
						</CardHeader>
						<CardContent className="space-y-2">
                        <div className="space-y-1">
								<Label htmlFor="fullname">Full Name</Label>
								<Input
									className="inputField"
									type="text"
									value={fullName}
									onChange={(e) => setFullName(e.target.value)}
									placeholder="Enter Your Full Name"
									required
								/>
							</div>
							<div className="space-y-1">
								<Label htmlFor="email">Email</Label>
								<Input
									className="inputField"
									type="email"
									value={email}
									onChange={(e) => setEmail(e.target.value)}
									placeholder="Enter Your Email"
									required
								/>
							</div>
							<div className="space-y-1">
								<Label htmlFor="password">Create Password</Label>
								<div className="w-full relative">
									<Input
										value={password}
										onChange={(e) => setPassword(e.target.value)}
										type={showPassword ? "text" : "password"}
										placeholder="Create Your Password"
										className="w-full pr-10 inputField"
										required
									/>
									{showPassword ? (
										<FaEye
											onClick={togglePasswordVisibility}
											className="absolute right-2 top-3 cursor-pointer text-sm"
										/>
									) : (
										<FaEyeSlash
											onClick={togglePasswordVisibility}
											className="absolute right-2 top-3 cursor-pointer text-sm"
										/>
									)}
								</div>
							</div>

							{!isOtpSent && (
								<div className="flex items-start space-x-2">
									<input
										type="checkbox"
										id="terms"
										checked={agreeTerms}
										onChange={() => setAgreeTerms(!agreeTerms)}
										className="mt-1"
									/>
									<label htmlFor="terms" className="text-sm text-gray-300">
										I agree to the{' '}
										<button
											type="button"
											onClick={() => setShowTermsModal(true)}
											className="text-blue-400 underline hover:text-blue-300"
										>
											Terms and Conditions
										</button>
									</label>
								</div>
							)}
						</CardContent>
						<CardFooter>
							{!isOtpSent && (
								<Button disabled={loading || !agreeTerms} className="w-full" type="submit">
									{loading ? (
										<div className="flex flex-row gap-2 items-center">
											<ImSpinner2 className="animate-spin" /> Sending OTP
										</div>
									) : (
										"Sign Up"
									)}
								</Button>
							)}
						</CardFooter>
					</Card>
				</TabsContent>
			</Tabs>

			{showTermsModal && (
				<div className="fixed inset-0 z-50 bg-black bg-opacity-50 flex justify-center items-center">
					<div className="bg-white dark:bg-gray-800 p-6 rounded-lg max-w-2xl w-full overflow-y-auto max-h-[80vh]">
						<h2 className="text-xl font-semibold mb-4">Terms and Conditions</h2>
						<div className="text-sm text-gray-300 whitespace-pre-wrap overflow-y-auto max-h-[60vh]">
							{`Terms and Conditions\n\nEffective Date: May 4, 2025\n\nWelcome to JOBeSpot (\"Platform\", \"we\", \"us\", or \"our\")...\n\n[Please insert your full terms here]`}
						</div>
						<div className="mt-4 flex justify-end">
							<Button onClick={() => setShowTermsModal(false)}>I Agree</Button>
						</div>
					</div>
				</div>
			)}
		</form>
	);
};

export default UserLogin;













