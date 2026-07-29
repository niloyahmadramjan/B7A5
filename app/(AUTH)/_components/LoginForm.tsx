import Link from "next/link";
import React, { useActionState } from "react";
import { loginAction } from "../_action/auth";

function LoginForm() {
  const [state, action, pedding] = useActionState(loginAction, false);

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
        className="w-full py-3 mt-2 font-semibold text-white transition-colors duration-200"
        style={{
          backgroundColor: "var(--color-navy)",
          borderRadius: "var(--radius-md)",
        }}
        onMouseOver={(e) =>
          (e.currentTarget.style.backgroundColor = "var(--color-navy-700)")
        }
        onMouseOut={(e) =>
          (e.currentTarget.style.backgroundColor = "var(--color-navy)")
        }
      >
        {pedding ? "Submitting...." : "Login"}
      </button>
    </form>
  );
}

export default LoginForm;
