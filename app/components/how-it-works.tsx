const steps = [
  "Flags are stored as Program Derived Accounts (PDAs).",
  "Your wallet is the admin of your flags.",
  "Toggling a flag updates on-chain state.",
  "Your application can poll or subscribe to account changes.",
  "No backend server required.",
]

export function HowItWorks() {
  return (
    <section>
      <div className="mb-6 border-t border-border" />
      <h2 className="text-sm font-semibold text-foreground">How This Works</h2>
      <ul className="mt-3 flex flex-col gap-2">
        {steps.map((step) => (
          <li
            key={step}
            className="flex items-start gap-2 text-sm text-muted-foreground"
          >
            <span className="mt-1.5 block h-1 w-1 shrink-0 rounded-full bg-muted-foreground" />
            {step}
          </li>
        ))}
      </ul>
    </section>
  )
}
