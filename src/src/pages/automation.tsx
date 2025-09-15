import { ProOnly } from "@/components/billing/ProOnly";

export default function AutomationPage() {
  return (
    <ProOnly>
      <div className="max-w-3xl mx-auto p-6">
        <h1 className="text-2xl font-semibold mb-2">Automation</h1>
        <p className="mb-6">Configure multi-board automation runs, schedules, and templates.</p>
        <div className="rounded-xl border p-4">
          <p className="opacity-80">Skeleton: Coming soon — connect job boards, set rules, run queue.</p>
        </div>
      </div>
    </ProOnly>
  );
}
