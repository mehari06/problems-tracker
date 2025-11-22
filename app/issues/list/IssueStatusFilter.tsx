"use client";
import React from 'react'
import { useRouter, usePathname, useSearchParams } from 'next/navigation';

const Statuses: { label: string; value: string }[] = [
    { label: 'All', value: 'all' },
    { label: 'Open', value: 'OPEN' },
    { label: 'In Progress', value: 'IN_PROGRESS' },
    { label: 'Closed', value: 'CLOSED' },
]

const IssueStatusFilter = () => {
    const router = useRouter();
    const pathname = usePathname() ?? '/issues';
    const searchParams = useSearchParams();
    const current = searchParams?.get('status') ?? 'all';

    const onChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const val = e.target.value;
        const query = val && val !== 'all' ? `?status=${val}` : '';
        // Debug: log client-side selection and target URL
        // eslint-disable-next-line no-console
        console.log('IssueStatusFilter:onChange', { val, target: pathname + query });
        router.push(pathname + query);
    }

    return (
        <label className="flex items-center gap-2">
            <span className="sr-only">Filter by status</span>
            <select value={current} onChange={onChange} className="rounded-md border px-2 py-1 text-sm">
                {Statuses.map(s => (
                    <option key={s.value} value={s.value}>{s.label}</option>
                ))}
            </select>
        </label>
    )
}

export default IssueStatusFilter