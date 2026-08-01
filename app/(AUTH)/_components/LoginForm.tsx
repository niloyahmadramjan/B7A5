import Link from "next/link";
import React, { useActionState, useEffect } from "react";
import { loginAction } from "../_action/auth";
import { toast } from "sonner";
import { useRouter } from "next/dist/client/components/navigation";

function LoginForm() {
  const [state, action, pedding] = useActionState(loginAction, false);
  const router  = useRouter();

  useEffect(() => {
    if (!state) return;

    if (!state.success && state.message) {
      toast.error(state.message);
    }

    if (state.success) {
      toast.success("Login successful");

      if(state.role === "ADMIN"){
        router.push("/admin-dashboard");
      }else if(state.role === "TECHNICIAN"){
        router.push("/technician-dashboard");
      }else if(state.role === "CUSTOMER"){
        router.push("/dashboard");
      }else{
        router.push("/");
      }

    }
  }, [state]);

  return (
    <form
      action={action}
      className="space-y-5"
      style={{ fontFamily: "var(--font-body)" }}
    >
      <div>
        <label
          htmlFor="email"
          className="block text-sm font-medium mb-1"
          style={{ color: "var(--color-ink)" }}
        >
          Email
        </label>
        <input
          id="email"
          name="email"
          type="email"
          placeholder="john@gmail.com"
          className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2"
          style={
            {
              borderColor: "var(--color-steel-200)",
              borderRadius: "var(--radius-sm)",
              "--tw-ring-color": "var(--color-signal)",
            } as React.CSSProperties
          }
          required
        />
      </div>

      <div>
        <div className="flex justify-between items-center mb-1">
          <label
            htmlFor="password"
            className="block text-sm font-medium"
            style={{ color: "var(--color-ink)" }}
          >
            Password
          </label>
          <Link
            href="/forgot-password"
            className="text-sm font-medium hover:underline focus:outline-none"
            style={{ color: "var(--color-signal)" }}
          >
            Forgot password?
          </Link>
        </div>
        <input
          id="password"
          name="password"
          type="password"
          placeholder="••••••••"
          className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2"
          style={
            {
              borderColor: "var(--color-steel-200)",
              borderRadius: "var(--radius-sm)",
              "--tw-ring-color": "var(--color-signal)",
            } as React.CSSProperties
          }
          required
        />
      </div>

      <button
        type="submit"
        className="w-full py-3 mt-2 cursor-pointer font-semibold text-white transition-colors duration-200"
        style={{
          backgroundColor: "var(--color-primary)",
          borderRadius: "var(--radius-md)",
        }}
        onMouseOver={(e) =>
          (e.currentTarget.style.backgroundColor = "var(--color-steel)")
        }
        onMouseOut={(e) =>
          (e.currentTarget.style.backgroundColor = "var(--color-primary)")
        }
      >
        {pedding ? "Submitting...." : "Login"}
      </button>
    </form>
  );
}

export default LoginForm;
