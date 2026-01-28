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
      <main class="mt-0 transition-all duration-200 ease-soft-in-out w-full">
        <section>
          <div class="relative flex w-full py-6 md:py-0 items-center p-0 overflow-hidden bg-center bg-cover min-h-75-screen">
            <div class="container z-10">
              <div class="flex flex-wrap mt-0 -mx-3">
                <div class="flex flex-col w-full md:w-2/3 max-w-full px-3">
                  <div class="p-6 flex flex-col min-w-1/2 justify-center items-center min-h-[90vh] wrap-break-word bg-transparent border-0 shadow-none rounded-2xl bg-clip-border">
                    <div class="p-6 pb-0 mb-0 w-full lg:w-1/2 bg-transparent border-b-0 rounded-t-2xl">
                      <h3 class="relative z-10 text-3xl font-bold text-transparent bg-linear-to-tl from-blue-600 to-cyan-400 bg-clip-text">
                        Welcome back
                      </h3>
                      <p class="mb-0 text-lg/relaxed text-[#67748E]">
                        Enter your email and password to sign in
                      </p>
                    </div>
                    <div class="flex w-full lg:w-1/2 p-6">
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
                    <div class="min-h-6 mb-0.5 block pl-12">
                      <SliderSwitch label="Remember Me" />
                    </div>
                    <div class="text-center w-1/2 px-6 items-center">
                      <button
                        type="button"
                        class="inline-block w-full px-6 py-3 mt-6 mb-0 font-bold text-center text-white uppercase align-middle transition-all bg-transparent border-0 rounded-lg cursor-pointer shadow-soft-md bg-x-25 bg-150 leading-pro text-xs ease-soft-in tracking-tight-soft bg-gradient-to-tl from-blue-600 to-cyan-400 hover:scale-102 hover:shadow-soft-xs active:opacity-85">
                        Sign in
                      </button>
                    </div>
                    <div class="p-6 px-1 pt-0 w-full lg:w-1/2 text-center bg-transparent border-t-0 border-t-solid rounded-b-2xl lg:px-2">
                      <p class="mx-auto mb-6 leading-normal text-sm">
                        Don't have an account?
                        <a
                          href="../pages/sign-up.html"
                          class="relative z-10 font-semibold text-transparent bg-gradient-to-tl from-blue-600 to-cyan-400 bg-clip-text">
                          Sign up
                        </a>
                      </p>
                    </div>
                  </div>
                </div>
                <div class="w-full max-w-full hidden px-3 lg:flex-0 shrink-0 md:w-6/12 md:block">
                  <div class="absolute top-0 hidden w-4/7 h-full -mr-32 overflow-hidden -skew-x-10 -right-40 rounded-bl-xl md:block">
                    <Image
                      src={"/images/curved6.jpg"}
                      alt="Background"
                      quality={100}
                      fill
                      objectFit="cover"
                      priority // Loads the image immediately
                      className="-z-10" // Pushes it behind content
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
