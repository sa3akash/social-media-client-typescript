import * as z from "zod";

export const registerSchema = z.object({
  firstname: z.string().min(3, {
    message: "First name must be at least 3 characters.",
  }),
  lastname: z.string().min(3, {
    message: "Last name must be at least 3 characters.",
  }),
  email: z.string().email({ message: "Please enter a valid email address." }),
  password: z
    .string()
    .min(6, {
      message: "Password must be at least 6 characters",
    })
    .max(30, {
      message: "Password must be at less then 30 characters",
    }),
  gender: z
    .string()
    .refine(
      (value) => value === "male" || value === "female" || value === "custom",
      {
        message: "Gender must be either male, female or custom.",
      },
    ),
  check: z
    .boolean()
    .default(false)
    .refine((value) => value === true),
});

export const loginSchema = z.object({
  email: z.string().email({ message: "Please enter a valid email address." }),
  password: z
    .string()
    .min(6, {
      message: "Password must be at least 6 characters",
    })
    .max(30, {
      message: "Password must be at less then 30 characters",
    }),
  check: z.boolean().default(false).optional(),
});

export const forgotSchema = z.object({
  email: z.string().email({ message: "Please enter a valid email address." }),
});
export const resetSchema = z.object({
  password: z
    .string()
    .min(6, {
      message: "Password must be at least 6 characters",
    })
    .max(30, {
      message: "Password must be at less then 30 characters",
    }),
  confirmPassword: z
    .string()
    .min(6, {
      message: "Password must be at least 6 characters",
    })
    .max(30, {
      message: "Password must be at less then 30 characters",
    }),
});

export const profileFormSchema = z.object({
  username: z
    .string()
    .min(2, {
      message: "Username must be at least 2 characters.",
    })
    .max(30, {
      message: "Username must not be longer than 30 characters.",
    }),
  email: z
    .string({
      required_error: "Please select an email to display.",
    })
    .email(),
  bio: z.string().max(160).min(4),
  urls: z
    .array(
      z.object({
        value: z.string().url({ message: "Please enter a valid URL." }),
      }),
    )
    .optional(),
});

export const usernameSchema = z.object({
  username: z
    .string()
    .min(4, {
      message: "Username must be at least 4 characters.",
    })
    .max(30, {
      message: "Username must not be longer than 30 characters.",
    })
    .regex(/^[a-zA-Z0-9_-]{5,20}$/, {
      message: "invalid username format",
    }),
});

export const passwordSchema = z
  .object({
    oldPassword: z
      .string()
      .min(6, {
        message: "Old Password must be at least 6 characters.",
      })
      .max(30, {
        message: "Old Password must not be longer than 30 characters.",
      })
      .regex(/^[a-zA-Z0-9]{6,30}$/, {
        message: "invalid password format.",
      }),
    password: z
      .string()
      .min(6, {
        message: "Password must be at least 6 characters.",
      })
      .max(30, {
        message: "Password must not be longer than 30 characters.",
      })
      .regex(/^[a-zA-Z0-9]{6,30}$/, {
        message: "Invalid password format.",
      }),
    confirmPassword: z
      .string()
      .min(6, {
        message: "Confirm Password must be at least 6 characters.",
      })
      .max(30, {
        message: "Confirm Password must not be longer than 30 characters.",
      })
      .regex(/^[a-zA-Z0-9]{6,30}$/, {
        message: "Invalid password format.",
      }),
  })
  .refine((d) => d.password === d.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
  });
