import * as zod from "zod";

export const registerschema = zod
  .object({
    name: zod
      .string()
      .nonempty("Name is required")
      .min(3, "Name must be at least 3 characters")
      .max(8, "Name must be max 10 characters"),

    email: zod
      .string()
      .nonempty("Email is required")
      .regex(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/, "Email is Invalid"),

    password: zod
      .string()
      .nonempty("password is required")
      .regex(
        /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/,
        "Minimum eight characters, at least one letter, one number and one special character:"
      ),

    rePassword: zod.string().nonempty("Confirm password is required"),

    dateOfBirth: zod.coerce.date().refine(
      (date) => {
        const dateofbirth = date.getFullYear();
        const currentDate = new Date().getFullYear();
        const age = currentDate - dateofbirth;
        return age >= 18;
      },
      { message: "Age must be at least 18 years old" }
    ),
    // .nonempty("date is required"),

    gender: zod
      .string()
      .nonempty("gender is required")
      .regex(/^(male|female)$/, "Enter valid gender"),
  })
  .refine((data) => data.password === data.rePassword, {
    message: "confirm password and password must be matched",
    path: ["rePassword"],
  });
