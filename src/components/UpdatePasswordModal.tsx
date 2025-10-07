import useApi from "@/hooks/useApi";
import {
  updatePasswordModalSchema,
  type UpdatePasswordModalType,
} from "@/types/formType";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";
import { Button } from "./ui/button";
import { Eye, EyeOff, Lock } from "lucide-react";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "./ui/form";
import { Input } from "./ui/input";
import { UPDATE_PASSWORD } from "@/lib/routes";

const UpdatePasswordModal = () => {
  const form = useForm<UpdatePasswordModalType>({
    resolver: zodResolver(updatePasswordModalSchema),
    defaultValues: {
      oldPassword: "",
      newPassword: "",
    },
  });

  const [open, setOpen] = useState(false);
  const [showOldPassword, setShowOldPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const { post } = useApi();

  //onsubmit handler
  const onSubmit = async (data: UpdatePasswordModalType) => {
    const result = await post(
      UPDATE_PASSWORD,
      data,
      "Password Updated Successfully"
    );
    if (result?.success) {
      setOpen(false);
      form.reset();
    }
  };

  return (
    <Dialog
      onOpenChange={() => {
        setOpen(!open);
        form.reset();
      }}
      open={open}
    >
      <DialogTrigger asChild>
        <Button className="w-full mt-1 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-white text-sm h-8 shadow-sm">
          Manage Password
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-md">
        <DialogHeader className="space-y-3">
          <DialogTitle className="text-xl flex items-center gap-2">
            <Lock className="w-5 h-5 text-amber-600" />
            Update Password
          </DialogTitle>
          <DialogDescription className="text-sm text-gray-600">
            Change your account password. Make sure to use a strong password.
          </DialogDescription>
          <div className="bg-amber-50 border border-amber-200 rounded-lg p-3">
            <p className="text-xs text-amber-700 leading-relaxed text-start">
              Password must be at least{" "}
              <span className="font-semibold">6 characters</span> long and
              different from your current password.
            </p>
          </div>
        </DialogHeader>

        <div className="mt-2">
          <Form {...form}>
            <form className="space-y-5" onSubmit={form.handleSubmit(onSubmit)}>
              <FormField
                control={form.control}
                name="oldPassword"
                render={({ field }) => (
                  <FormItem>
                    <div className="flex items-center justify-between mb-2">
                      <FormLabel className="text-sm font-medium">
                        Current Password
                      </FormLabel>
                      <FormMessage className="text-xs" />
                    </div>
                    <FormControl>
                      <div className="relative">
                        <Input
                          type={showOldPassword ? "text" : "password"}
                          placeholder="Enter current password"
                          {...field}
                          className="pr-10"
                        />
                        <button
                          type="button"
                          onClick={() => setShowOldPassword(!showOldPassword)}
                          className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
                        >
                          {showOldPassword ? (
                            <EyeOff className="w-4 h-4" />
                          ) : (
                            <Eye className="w-4 h-4" />
                          )}
                        </button>
                      </div>
                    </FormControl>
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="newPassword"
                render={({ field }) => (
                  <FormItem>
                    <div className="flex items-center justify-between mb-2">
                      <FormLabel className="text-sm font-medium">
                        New Password
                      </FormLabel>
                      <FormMessage className="text-xs" />
                    </div>
                    <FormControl>
                      <div className="relative">
                        <Input
                          type={showNewPassword ? "text" : "password"}
                          placeholder="Enter new password"
                          {...field}
                          className="pr-10"
                        />
                        <button
                          type="button"
                          onClick={() => setShowNewPassword(!showNewPassword)}
                          className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
                        >
                          {showNewPassword ? (
                            <EyeOff className="w-4 h-4" />
                          ) : (
                            <Eye className="w-4 h-4" />
                          )}
                        </button>
                      </div>
                    </FormControl>
                  </FormItem>
                )}
              />

              <div className="flex gap-3 pt-2">
                <Button
                  type="button"
                  variant="outline"
                  className="flex-1 h-10"
                  onClick={() => {
                    setOpen(false);
                    form.reset();
                  }}
                >
                  Cancel
                </Button>
                <Button type="submit" className="flex-1 h-10" variant="primary">
                  Update Password
                </Button>
              </div>
            </form>
          </Form>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default UpdatePasswordModal;
