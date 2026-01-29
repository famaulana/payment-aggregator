import { TextFieldInput } from "@/components/molecules/form-inputs/TextField";
import { FormBuilder } from "@/components/organisms/builder";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { LoginSchema } from "@/schemas/login";
import Image from "next/image";
import { BackgroundLogin } from "@/components/atoms/background/BackgroundLogin";
import { SliderSwitch } from "@/components/molecules/form-inputs/Switch";

const Login = () => {
  const methods = useForm({
    mode: "all",
    resolver: yupResolver(LoginSchema),
  });

  const { control } = methods;
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
                        fields={[
                          {
                            component: (
                              <TextFieldInput
                                name="usename"
                                title="Username"
                                placeholder="Username"
                                control={control}
                              />
                            ),
                          },
                          {
                            component: (
                              <TextFieldInput
                                name="password"
                                title="Password"
                                placeholder="Password"
                                control={control}
                              />
                            ),
                          },
                          //   { component: <TextFieldInput /> },
                        ]}
                      />
                    </div>
                    {/* <div className="min-h-6 w-1/2 mb-0.5 block px-8">
                      <SliderSwitch label="Remember Me" />
                    </div> */}
                    <div className="text-center w-full px-6 items-center">
                      <button
                        type="button"
                        className="inline-block w-full px-6 py-3 mt-6 mb-0 font-bold text-center text-white uppercase align-middle transition-all bg-transparent border-0 rounded-lg cursor-pointer shadow-soft-md bg-x-25 bg-150 leading-pro text-xs ease-soft-in tracking-tight-soft bg-linear-to-tl from-[#473D97] to-[#E42D5D] hover:scale-102 hover:shadow-soft-xs active:opacity-85">
                        Sign in
                      </button>
                    </div>
                    {/* <div className="p-6 px-1 pt-0 w-full lg:w-1/2 text-center bg-transparent border-t-0 border-t-solid rounded-b-2xl lg:px-2">
                      <p className="mx-auto mb-6 leading-normal text-sm">
                        Don't have an account?
                        <a
                          href="../pages/sign-up.html"
                          className="relative z-10 font-semibold text-transparent bg-gradient-to-tl from-blue-600 to-cyan-400 bg-clip-text">
                          Sign up
                        </a>
                      </p>
                    </div> */}
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
                      // priority // Loads the image immediately
                      className="-z-10 rounded-xl w-full h-full" // Pushes it behind content
                    />
                    {/* <BackgroundLogin /> */}
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

export default Login;
