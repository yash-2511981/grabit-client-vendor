import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { loginFormSchema, type LoginFormType } from "@/types/formType";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import useApi from "@/hooks/useApi";
import { SIGN_IN } from "@/lib/routes";
import useVendorStore from "@/store/store";
import { useNavigate } from "react-router-dom";

interface LoginProps {
  setOpenLogin: (open: boolean) => void;
}

const Login = ({ setOpenLogin }: LoginProps) => {
  const { post } = useApi();
  const { setVendor } = useVendorStore();
  const navigate = useNavigate();

  const form = useForm<LoginFormType>({
    resolver: zodResolver(loginFormSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (data: LoginFormType) => {
    const response = await post(SIGN_IN, data);
    if (response?.success && response.data) {
      setVendor(response.data.restaurant);
      navigate("/dashboard");
    }
  };

  return (
    <div className="max-w-5xl mx-auto h-screen flex items-center justify-center">
      <div className="p-4 w-md sm:w-lg">
        <Card>
          <CardHeader>
            <CardTitle>Sign In</CardTitle>
            <CardDescription>
              Sign In into your account using correct credentials
            </CardDescription>
          </CardHeader>
          <CardContent className="mt-2">
            <Form {...form}>
              <form
                className="space-y-4 w-full"
                onSubmit={form.handleSubmit(onSubmit)}
              >
                <FormField
                  name="email"
                  control={form.control}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email</FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          type="text"
                          placeholder="example@gmail.com"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  name="password"
                  control={form.control}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Password</FormLabel>
                      <FormControl>
                        <Input {...field} type="password" placeholder="" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <div className="flex gap-2 w-full justify-center mt-6">
                  <Button type="submit" className="w-1/2" variant="primary">
                    Login
                  </Button>
                  <Button
                    type="button"
                    className="w-1/2"
                    variant="outline"
                    onClick={() => form.reset()}
                  >
                    Reset
                  </Button>
                </div>
              </form>
            </Form>
          </CardContent>
          <CardFooter className="flex justify-center p-0">
            <CardAction className="text-black hover:underline p-0 text-sm">
              Are you new user?{" "}
              <span
                className="font-medium cursor-pointer"
                onClick={() => setOpenLogin(false)}
              >
                Sign Up
              </span>
            </CardAction>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
};

export default Login;
