import CommonForm from "@/components/common/form";
import { useToast } from "@/components/ui/use-toast";
import { loginFormControls } from "@/config";
import { loginUser } from "@/store/auth-slice";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";

const initialState = {
  email: "",
  password: "",
};

function AuthLogin() {
  const [formData, setFormData] = useState(initialState);
  const dispatch = useDispatch();
  const { toast } = useToast();

  function onSubmit(event) {
    event.preventDefault();

    dispatch(loginUser(formData)).then((data) => {
      if (data?.payload?.success) {
        toast({
          title: data?.payload?.message,
        });
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
          Sign In
        </h1>
        <p className="text-muted-foreground font-medium flex items-center justify-center gap-2">
          New to Smart Service?
          <Link
            className="text-primary font-bold hover:underline transition-all"
            to="/auth/register"
          >
            Create Account
          </Link>
        </p>
      </div>
      <div className="glass p-8 rounded-[32px] shadow-2xl">
        <CommonForm
          formControls={loginFormControls}
          buttonText={"Sign In"}
          formData={formData}
          setFormData={setFormData}
          onSubmit={onSubmit}
        />
      </div>

      <p className="text-[10px] text-center text-muted-foreground uppercase tracking-widest font-bold">
        Secure Encryption Enabled &bull; Private Access
      </p>
    </div>
  );
}

export default AuthLogin;
