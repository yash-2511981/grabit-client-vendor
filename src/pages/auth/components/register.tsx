import { Button } from "@/components/ui/button";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Textarea } from "@/components/ui/textarea";
import useApi from "@/hooks/useApi";
import { SIGN_UP } from "@/lib/routes";
import useVendorStore from "@/pages/vendor/store/store";
import { registerFormSchema, type RegisterFormSchema } from "@/types/formType";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";

interface RegisterProps {
  setOpenLogin: (open: boolean) => void;
}

const Register = ({ setOpenLogin }: RegisterProps) => {
  const { post } = useApi();
  const { setVendor } = useVendorStore();
  const navigate = useNavigate();

  const form = useForm<RegisterFormSchema>({
    resolver: zodResolver(registerFormSchema),
    defaultValues: {
      name: "",
      email: "",
      address: "",
      pincode: "",
      password: "",
      phone: "",
      category: "both",
    },
  });

  const onsubmit = async (data: RegisterFormSchema) => {
    try {
      const response = await post(SIGN_UP, data, "Regestration Completed");
      if (response?.success && response.data) {
        console.log(response.data);
        setVendor(response.data.restaurant);
        navigate("/dashboard");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="max-w-5xl mx-auto h-screen flex items-center justify-center">
      <div className="w-full max-w-lg px-4">
        <Card className="shadow-lg rounded-2xl">
          <CardHeader className="text-center">
            <CardTitle className="text-2xl font-bold">Sign Up</CardTitle>
            <CardDescription>Sign up to do business with us</CardDescription>
          </CardHeader>

          <CardContent className="">
            <Form {...form}>
              <form
                className="space-y-3"
                onSubmit={form.handleSubmit(onsubmit)}
              >
                <FormField
                  name="name"
                  control={form.control}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Business Name</FormLabel>
                      <FormControl>
                        <Input {...field} placeholder="Tandoori Nights" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  name="email"
                  control={form.control}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email</FormLabel>
                      <FormControl>
                        <Input {...field} placeholder="example@gmail.com" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="address"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Address</FormLabel>
                      <FormControl>
                        <Textarea {...field} placeholder="Enter your address" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="category"
                  render={({ field }) => (
                    <FormItem className="flex items-center">
                      <FormLabel>Choose Category :</FormLabel>
                      <FormControl>
                        <RadioGroup
                          value={field.value}
                          onValueChange={field.onChange}
                          className="flex gap-4 justify-start flex-1 ml-3"
                        >
                          <div className="flex items-center space-x-2">
                            <RadioGroupItem value="veg" id="veg" />
                            <Label htmlFor="veg">Veg</Label>
                          </div>
                          <div className="flex items-center space-x-2">
                            <RadioGroupItem value="non-veg" id="non-veg" />
                            <Label htmlFor="non-veg">Non Veg</Label>
                          </div>
                          <div className="flex items-center space-x-2">
                            <RadioGroupItem value="both" id="both" />
                            <Label htmlFor="both">Both</Label>
                          </div>
                        </RadioGroup>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="pincode"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Pincode</FormLabel>
                        <FormControl>
                          <Input placeholder="123443" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="phone"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Contact</FormLabel>
                        <FormControl>
                          <Input placeholder="9876543210" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <FormField
                  control={form.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Password</FormLabel>
                      <FormControl>
                        <Input type="password" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <div className="flex gap-3 w-full justify-center mt-6">
                  <Button type="submit" className="w-1/2">
                    Register
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

          <CardFooter className="flex justify-center">
            <CardAction className="text-black text-sm">
              Already registered?{" "}
              <span
                className="font-medium hover:underline cursor-pointer"
                onClick={() => setOpenLogin(true)}
              >
                Sign In
              </span>
            </CardAction>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
};

export default Register;
