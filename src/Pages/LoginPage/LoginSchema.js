import * as zod from "zod";

export const loginschema = zod
  .object({

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

  });
