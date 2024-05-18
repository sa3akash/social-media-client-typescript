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
      })
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

export const accountFormSchema = z.object({
  firstName: z
    .string()
    .min(2, {
      message: "Name must be at least 2 characters.",
    })
    .max(30, {
      message: "Name must not be longer than 30 characters.",
    }),
  lastName: z
    .string()
    .min(2, {
      message: "Name must be at least 2 characters.",
    })
    .max(30, {
      message: "Name must not be longer than 30 characters.",
    }),
  nickName: z
    .string().optional(),
  dobYear: z.string(),
  dobMonth: z.string(),
  dobDay: z.string(),
  quote: z.string().optional(),
  work: z.string().optional(),
  school: z.string().optional(),
  website: z.string().optional(),
  gender: z.enum(["male", "female", "custom"]),
  facebook: z.string().optional(),
  instagram: z.string().optional(),
  twitter: z.string().optional(),
  youtube: z.string().optional(),
  relationShipType: z.enum([
    "Single",
    "In a relationship",
    "Married",
    "Divorced",
  ]),
  relationShipPartner: z.string().optional(),
  addStreet: z.string().optional(),
  addcity: z.string().optional(),
  addZipcode: z.string().optional(),
  addLocal: z.string().optional(),
  addCountry: z.string().optional(),
});


export type AccountFormValues = z.infer<typeof accountFormSchema>;

// This can come from your database or API.
export const udateProfileValues: Partial<AccountFormValues> = {
  firstName: "",
  lastName: "",
  nickName: "",
  quote: "",
  dobDay: "",
  dobMonth: "",
  dobYear: "",
  work: "",
  school: "",
  website: "",
  addcity: "",
  addCountry: "",
  addLocal: "",
  addStreet: "",
  addZipcode: "",
  relationShipType: "Single",
  relationShipPartner: "",
  gender: "male",
  facebook: "",
  instagram: "",
  twitter: "",
  youtube: "",
};