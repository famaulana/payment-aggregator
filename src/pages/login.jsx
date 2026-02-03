import { TextFieldInput } from "@/components/molecules/form-inputs/TextField";
import { FormBuilder } from "@/components/organisms/builder";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { LoginSchema } from "@/schemas/login";
import Image from "next/image";
import { DefaultButton } from "@/components/atoms/button/DefaultButton";
import { PasswordTextField } from "@/components/molecules/form-inputs/PasswordTextField";
import { useLogin } from "@/features/auth/hooks/useLogin";

const Login = () => {
  const { mutate: login } = useLogin();

  const methods = useForm({
    mode: "all",
    resolver: yupResolver(LoginSchema),
  });

  const { control } = methods;

  const submit = (value) => {
    login(value);
  };

  return (
    <>
      <main className="mt-0 transition-all duration-200 ease-soft-in-out w-full">
        <section>
          <div className="flex w-full py-6 md:py-0 items-center p-0 overflow-hidden min-h-75-screen">
            <div className="w-full z-10">
              <div className="grid grid-cols-1 md:grid-cols-2 mt-0 w-full">
                <div className="flex flex-col w-full md:items-center max-w-full px-3">
                  <div className="p-6 flex flex-col justify-center items-center w-full md:w-3/4 min-h-screen wrap-break-word bg-transparent border-0 shadow-none rounded-2xl bg-clip-border">
                    <div className="p-6 pb-0 mb-0 w-full bg-transparent border-b-0 rounded-t-2xl">
                      <div className="flex space-x-4 items-center">
                        <Image
                          src={"/images/logo.png"}
                          width={48}
                          height={48}
                          alt="Logo"
                          objectFit="contain"
                        />
                        <span className="z-10 text-xl font-semibold">
                          Juara Digital Platform
                        </span>
                      </div>
                      <p className="mb-0 mt-2 text-lg/relaxed text-[#67748E]">
                        Hello Welcome back to ‘Brand Name’ Dashboard Please Sign
                        in using your email and password.
                      </p>
                    </div>
                    <div className="flex w-full p-6">
                      <FormBuilder
                        methods={methods}
                        className="w-full"
                        onSubmit={submit}
                        fields={[
                          {
                            component: (
                              <TextFieldInput
                                name="email"
                                title="Email"
                                placeholder="Example@email.com"
                                control={control}
                              />
                            ),
                          },
                          {
                            component: (
                              <PasswordTextField
                                name="password"
                                title="Password"
                                placeholder="At least 8 character"
                                control={control}
                              />
                            ),
                          },
                          {
                            component: (
                              <div className="text-center w-full px-6 items-center">
                                <DefaultButton type="submit">
                                  Sign In
                                </DefaultButton>
                              </div>
                            ),
                          },
                        ]}
                      />
                    </div>
                  </div>
                </div>
                <div className="relative hidden md:block w-full overflow-hidden">
                  <div className="absolute p-6 hidden w-full h-full overflow-hidden rounded-xl md:block">
                    <Image
                      src={"/images/banner.jpg"}
                      width={1000}
                      height={500}
                      alt="Banner"
                      objectFit="cover"
                      quality={[75, 100]}
                      className="-z-10 rounded-xl w-full h-full" // Pushes it behind content
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
    </>
  );
};

Login.getLayout = (page) => <>{page}</>;

export default Login;
