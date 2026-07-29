import React, { useActionState } from "react";
import { registerAction } from "../_action/auth";

function RegisterForm() {
  const [state, action, pedding] = useActionState(registerAction, false);
  
  return (
    <form
      action={action}
      className="space-y-4"
      style={{ fontFamily: "var(--font-body)" }}
    >
      <div>
        <label
          htmlFor="name"
          className="block text-sm font-medium mb-1"
          style={{ color: "var(--color-ink)" }}
        >
          Name
        </label>
        <input
          id="name"
          name="name"
          type="text"
          placeholder="John Doe"
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
        <label
          htmlFor="phone"
          className="block text-sm font-medium mb-1"
          style={{ color: "var(--color-ink)" }}
        >
          Phone
        </label>
        <input
          id="phone"
          name="phone"
          type="tel"
          placeholder="01812345678"
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
        <label
          htmlFor="password"
          className="block text-sm font-medium mb-1"
          style={{ color: "var(--color-ink)" }}
        >
          Password
        </label>
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
        className="w-full py-3 mt-4 font-semibold text-white transition-colors duration-200"
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
        {pedding ? (
          <span className="ml-2">Submitting...</span>
        ) : (
          " Register Account"
        )}
      </button>
    </form>
  );
}

export default RegisterForm;
