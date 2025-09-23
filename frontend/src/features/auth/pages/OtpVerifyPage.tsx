import { useLocation, useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../../app/store/hooks";
import AuthLayout from "../../../components/layouts/AuthLayout";
import OTPVerification from "../components/OTPVerifcation";
import { resendOtp, verifyOtp } from "../store/thunk";
import { useEffect } from "react";

const OtpVerifyPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  // email passed from previous page
  const { email } = (location.state || {}) as { email: string };
  console.log("Locaiton:", location.state);

  // ✅ When all digits are entered OR user clicks Verify button
  const handleComplete = (otp: string) => {
    console.log("Dispatching verifyOtp with:", otp);
    dispatch(verifyOtp({ email, otp }));
  };

  // ✅ When user clicks Resend
  const handleResend = () => {
    console.log("Email:", email);

    dispatch(resendOtp({ email }));
  };

  const { loading, success } = useAppSelector((state) => state.auth.otp);

  useEffect(() => {
    if (success) {
      navigate("/login");
    }
  }, [success, navigate]);

  return (
    <AuthLayout>
      {loading ? (
        <div>Loading...</div>
      ) : (
        <OTPVerification
          length={6} // 6-digit OTP
          autoFocus={true} // focus first box on mount
          resendTimeout={60} // 60 sec countdown
          enableResend={true}
          placeholderChar="-" // show - in empty boxes
          onComplete={handleComplete} // verify once OTP is filled
          onResend={handleResend} // resend callback
          inputWidth={45}
          inputHeight={50}
          className="p-6 bg-white shadow-md rounded-xl"
          inputClassName="border border-gray-300 rounded text-center text-lg focus:border-indigo-500 focus:ring-indigo-500"
        />
      )}
    </AuthLayout>
  );
};

export default OtpVerifyPage;
