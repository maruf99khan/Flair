import CommonForm from "@/components/common/form";
import { useToast } from "@/components/ui/use-toast";
import { registerFormControls } from "@/config";
import { registerUser } from "@/store/auth-slice";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";

const initialState = {
  userName: "",
  email: "",
  password: "",
};

function AuthRegister() {
  const [formData, setFormData] = useState(initialState);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { toast } = useToast();

  function onSubmit(event) {
    event.preventDefault();
    dispatch(registerUser(formData)).then((data) => {
      if (data?.payload?.success) {
        toast({
          title: data?.payload?.message,
        });
        navigate("/auth/login");
      } else {
        toast({
          title: data?.payload?.message,
          variant: "destructive",
        });
      }
    });
  }

  return (
    <div className="mx-auto w-full max-w-md space-y-6">
      <div className="text-center">
        <h1 className="text-4xl font-black tracking-tighter text-gray-900 uppercase mb-2">
          Join Us
        </h1>
        <p className="text-muted-foreground font-medium flex items-center justify-center gap-2">
          Already have an account?
          <Link
            className="text-primary font-bold hover:underline transition-all"
            to="/auth/login"
          >
            Sign In
          </Link>
        </p>
      </div>
      <div className="glass p-8 rounded-[32px] shadow-2xl">
        <CommonForm
          formControls={registerFormControls}
          buttonText={"Create Account"}
          formData={formData}
          setFormData={setFormData}
          onSubmit={onSubmit}
        />
      </div>

      <p className="text-[10px] text-center text-muted-foreground uppercase tracking-widest font-bold">
        By joining, you agree to our Premium Terms & Privacy
      </p>
    </div>
  );
}

export default AuthRegister;
